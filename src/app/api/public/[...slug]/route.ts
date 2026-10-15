import config from '@payload-config'
import { REST_GET } from '@payloadcms/next/routes'
import { publicResources } from '@/services/publicContentPolicy'
import { readNativePublicContent } from '@/services/publicContentReads'

const nativeGet = REST_GET(config)
export async function GET(request: Request, context: { params: Promise<{ slug: string[] }> }) {
  const { slug } = await context.params
  const path = slug.join('/')
  const search = new URL(request.url).searchParams
  if (request.headers.has('authorization') || request.headers.has('cookie') || search.get('draft') === 'true') return new Response(null, { status: 400 })
  if (!publicResources.includes(path)) return new Response(null, { status: 404 })
  search.sort()
  try {
    return Response.json(await readNativePublicContent(nativeGet, path, search.toString()), {
      headers: { 'Cache-Control': 'public, max-age=0, s-maxage=60' },
    })
  } catch {
    return Response.json({ message: 'Unable to load public content.' }, { status: 502 })
  }
}
