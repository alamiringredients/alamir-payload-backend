import { contentTag } from '@/services/publicCache'
import { publicReadContext } from '@/services/queryProfile'
import config from '@payload-config'
import { REST_GET } from '@payloadcms/next/routes'
import { unstable_cache } from 'next/cache'

const collections = new Set(['pages', 'products', 'categories', 'media', 'translations', 'news', 'news-taxonomies', 'sustainability', 'sustainability-goals', 'jobs', 'events', 'meeting-slots', 'certifications', 'certification-types', 'product-applications', 'product-concentrations', 'forms'])
const globals = new Set(['website-settings', 'navigation'])
const nativeGet = REST_GET(config)
const pending = new Map<string, Promise<unknown>>()

// Only anonymous public content is cached. Payload still enforces its native read access.
const loadPublic = async (path: string, search: string) => {
  const key = `${path}?${search}`
  let data = pending.get(key)
  if (!data) {
    data = publicReadContext.run(path, async () => {
      const response = await nativeGet(new Request(`http://localhost/api/${path}?${search}`), { params: Promise.resolve({ slug: path.split('/') }) })
      if (!response.ok) throw new Error(`Public content request failed (${response.status}).`)
      return response.json()
    }).finally(() => pending.delete(key))
    pending.set(key, data)
  }
  return data
}
function readPublic(path: string, search: string) {
  const depth = Number(new URLSearchParams(search).get('depth') ?? 2)
  const resources = depth > 0 ? [...collections, ...[...globals].map(slug => `globals/${slug}`)] : [path, ...(path === 'forms' ? ['categories'] : [])]
  return unstable_cache(() => loadPublic(path, search), ['public-payload-rest-v2', path, search], { tags: ['public-content', ...resources.map(contentTag)], revalidate: 300 })()
}

export async function GET(request: Request, context: { params: Promise<{ slug: string[] }> }) {
  const { slug } = await context.params
  const search = new URL(request.url).searchParams
  if (request.headers.has('authorization') || request.headers.has('cookie') || search.get('draft') === 'true') return new Response(null, { status: 400 })
  if (!(slug.length === 1 && collections.has(slug[0])) && !(slug.length === 2 && slug[0] === 'globals' && globals.has(slug[1]))) return new Response(null, { status: 404 })
  search.sort()
  try {
    return Response.json(await readPublic(slug.join('/'), search.toString()), { headers: { 'Cache-Control': 'public, max-age=0, s-maxage=60' } })
  } catch {
    return Response.json({ message: 'Unable to load public content.' }, { status: 502 })
  }
}
