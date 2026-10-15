import { sql } from '@payloadcms/db-postgres'
import { inArray } from '@payloadcms/db-postgres/drizzle'
import { unstable_cache } from 'next/cache'
import type { Payload } from 'payload'
import { contentTag } from './publicCache'
import {
  identityFields, identityResources, nativeReadDependencies, publicResources,
  searchFields, searchResources, sharedResources,
} from './publicContentPolicy'
import { publicReadContext } from './queryProfile'

type PublicQuery = {
  scope: 'shared' | 'content' | 'identities' | 'search'
  resources: string[]
  locale: string
  owner: string
  ownerId: string
  purpose: string
}
export function parsePublicQuery(params: URLSearchParams): PublicQuery | undefined {
  const scope = params.get('scope') ?? 'content'
  const locale = params.get('locale') ?? 'all'
  const allowed: readonly string[] = scope === 'identities' ? identityResources
    : scope === 'search' ? searchResources : publicResources
  const resources = scope === 'shared' ? sharedResources
    : scope === 'search' ? [...searchResources]
    : (params.get('resources') ?? allowed.join(',')).split(',')
  if (!['shared', 'content', 'identities', 'search'].includes(scope)
    || !['en', 'ar', 'fr', 'all'].includes(locale)
    || resources.some(resource => !allowed.includes(resource))) return undefined
  return {
    scope: scope as PublicQuery['scope'], resources: [...new Set(resources)].sort(), locale,
    owner: params.get('owner') ?? '', ownerId: params.get('ownerId') ?? '', purpose: params.get('purpose') ?? '',
  }
}

// Reads the access-filtered publication, never source drafts or private fields.
export async function readPublicProjection(payload: Payload, query: PublicQuery) {
  const { scope, resources, locale, owner, ownerId, purpose } = query
  const table = payload.db.tables.public_content
  const localized = scope === 'shared' ? table.localizedSummary : table.localizedContent
  const source = locale === 'all' ? (scope === 'shared' ? table.summary : table.content)
    : sql`${localized} -> ${locale}`
  const fields = scope === 'identities' ? identityFields : searchFields
  const data = scope === 'identities' || scope === 'search'
    ? sql`case when ${source} is null then null else jsonb_build_object('docs', coalesce((
        select jsonb_agg((select jsonb_object_agg(key, value) from jsonb_each(doc)
          where key in (${sql.join(fields.map(field => sql`${field}`), sql`, `)}))
          || ${scope === 'search' ? sql`jsonb_build_object('summary', (
            select block -> 'data' -> 'summary'
            from jsonb_array_elements(coalesce(doc -> 'layout', '[]'::jsonb)) with ordinality as sections(block, position)
            where block -> 'data' ? 'summary' order by position desc limit 1
          ))` : sql`'{}'::jsonb`} order by position)
        from jsonb_array_elements(${source} -> 'docs') with ordinality as records(doc, position)
      ), '[]'::jsonb)) end`
    : source
  const rows = await payload.db.drizzle.select({ resource: table.resource, data })
    .from(table).where(inArray(table.resource, resources))
  const result = Object.fromEntries(rows.map(row => {
    let content = row.data as Record<string, unknown> | null
    if (!content) throw new Error('Run the public content refresh before serving the website.')
    if (row.resource === 'forms' && (owner || ownerId || purpose)) {
      const forms = content.docs as { owner?: { relationTo: string; value: number }; purpose: string }[]
      content = { ...content, docs: forms.filter(form => (!owner || form.owner?.relationTo === owner)
        && (!ownerId || String(form.owner?.value) === ownerId) && (!purpose || form.purpose === purpose)) }
    }
    return [String(row.resource), content]
  }))
  if (resources.some(resource => !(resource in result))) throw new Error('Public content projection is incomplete.')
  return result
}

export function readPublicSite(loadPayload: () => Promise<Payload>, query: PublicQuery) {
  return unstable_cache(async () => publicReadContext.run('site', async () =>
    readPublicProjection(await loadPayload(), query)), ['public-site-v5', JSON.stringify(query)], {
    tags: ['public-content', ...query.resources.map(contentTag)], revalidate: 300,
  })()
}

type NativeRead = (request: Request, context: { params: Promise<{ slug: string[] }> }) => Promise<Response>
const pending = new Map<string, Promise<unknown>>()
export function readNativePublicContent(read: NativeRead, path: string, search: string) {
  return unstable_cache(() => {
    const key = `${path}?${search}`
    let result = pending.get(key)
    if (!result) {
      result = publicReadContext.run(path, async () => {
        const response = await read(new Request(`http://localhost/api/${path}?${search}`), {
          params: Promise.resolve({ slug: path.split('/') }),
        })
        if (!response.ok) throw new Error(`Public content request failed (${response.status}).`)
        return response.json()
      }).finally(() => pending.delete(key))
      pending.set(key, result)
    }
    return result
  }, ['public-payload-rest-v3', path, search], {
    tags: ['public-content', ...nativeReadDependencies(path, Number(new URLSearchParams(search).get('depth') ?? 2)).map(contentTag)],
    revalidate: 300,
  })()
}
