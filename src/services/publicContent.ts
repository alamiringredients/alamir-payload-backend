import {
  createLocalReq,
  type CollectionSlug,
  type GlobalSlug,
  type Payload,
  type PayloadRequest,
} from 'payload'
import { sql } from '@payloadcms/db-postgres'

const publicCollections = [
  'pages',
  'products',
  'categories',
  'media',
  'translations',
  'news',
  'news-taxonomies',
  'sustainability',
  'sustainability-goals',
  'jobs',
  'events',
  'meeting-slots',
  'certifications',
  'certification-types',
  'product-applications',
  'product-concentrations',
  'forms',
] as const
const publicGlobals = ['website-settings', 'navigation'] as const
export const publicResources = [
  ...publicCollections,
  ...publicGlobals.map((slug) => `globals/${slug}`),
]
const sharedFields: Record<string, string[]> = {
  pages: ['title', 'slug', 'sourceKey', '_status'],
  products: ['name', 'slug', 'sourceId', 'category', 'gallery'],
  categories: ['name', 'slug', 'sourceId', 'icon', 'description', 'page.artwork'],
  media: ['url', 'width', 'height', 'mimeType', 'filename', 'prefix', 'alt'],
  translations: ['key', 'text'],
}
export const sharedResources = [
  ...Object.keys(sharedFields),
  ...publicGlobals.map((slug) => `globals/${slug}`),
]

function forLocale(value: unknown, locale: string): unknown {
  if (!value || typeof value !== 'object') return value
  if (Array.isArray(value)) return value.map((item) => forLocale(item, locale))
  const row = value as Record<string, unknown>,
    localized = 'en' in row && ('ar' in row || 'fr' in row)
  return Object.fromEntries(
    Object.entries(row)
      .filter(([key]) => !localized || key === 'en' || key === locale)
      .map(([key, value]) => [key, forLocale(value, locale)]),
  )
}
function localizedResponses(content: Record<string, unknown> | null) {
  return content
    ? Object.fromEntries(['en', 'ar', 'fr'].map((locale) => [locale, forLocale(content, locale)]))
    : null
}

function summary(resource: string, content: Record<string, unknown>) {
  const paths = sharedFields[resource]
  if (!paths) return resource.startsWith('globals/') ? content : null
  return {
    ...content,
    docs: (content.docs as Record<string, unknown>[]).map((doc) => {
      const result: Record<string, unknown> = { id: doc.id }
      if (resource === 'products') {
        const layout = doc.layout as
          { blockType: string; enabled?: boolean; data?: { gallery?: unknown[] } }[] | undefined
        result.gallery =
          layout
            ?.find((block) => block.blockType === 'prd-gallery' && block.enabled !== false)
            ?.data?.gallery?.slice(0, 1) ?? []
      }
      for (const path of paths) {
        const keys = path.split('.')
        let source = doc,
          target = result
        for (const key of keys.slice(0, -1)) {
          source = source?.[key] as Record<string, unknown>
          target[key] ??= {}
          target = target[key] as Record<string, unknown>
        }
        if (source && source[keys.at(-1)!] !== undefined)
          target[keys.at(-1)!] = source[keys.at(-1)!]
      }
      return result
    }),
  }
}

export async function lockPublicContent(req: PayloadRequest) {
  if (req.context.disablePublicProjection) return
  const transaction = await req.transactionID
  if (!transaction) throw new Error('Public content publication requires a transaction.')
  if (req.context.publicContentLock === transaction) return
  const db = req.payload.db.sessions?.[transaction]?.db as typeof req.payload.db.drizzle | undefined
  if (!db) throw new Error('Public content transaction is unavailable.')
  await db.execute(sql`SELECT pg_advisory_xact_lock(hashtext('alamir-public-content'))`)
  req.context.publicContentLock = transaction
}

export async function refreshPublicContent(
  payload: Payload,
  resources: readonly string[] = publicResources,
  sourceReq?: PayloadRequest,
) {
  if (sourceReq?.context.disablePublicProjection) return
  const existingTransaction = await sourceReq?.transactionID
  const transaction = existingTransaction ?? (await payload.db.beginTransaction())
  if (!transaction) throw new Error('Public content publication requires a transaction.')
  const req = await createLocalReq({ req: { transactionID: transaction, context: sourceReq?.context }, locale: 'all' }, payload)
  const db = payload.db.sessions?.[transaction]?.db as typeof payload.db.drizzle | undefined
  if (!db) throw new Error('Public content transaction is unavailable.')
  try {
    await lockPublicContent(req)
    const affected = new Set(
      resources.filter((resource) =>
        publicResources.includes(resource as (typeof publicResources)[number]),
      ),
    )
    if (affected.has('categories')) affected.add('forms')
    for (const resource of affected) {
      const content = resource.startsWith('globals/')
        ? await payload.findGlobal({
            slug: resource.slice(8) as GlobalSlug,
            locale: 'all',
            depth: 0,
            req,
            overrideAccess: false,
          })
        : await payload.find({
            collection: resource as CollectionSlug,
            locale: 'all',
            depth: 0,
            joins: false as never,
            pagination: false,
            limit: 0,
            sort: payload.collections[resource as CollectionSlug].config.orderable
              ? '_order'
              : 'createdAt',
            req,
            overrideAccess: false,
          })
      const existing = await payload.find({
        collection: 'public-content',
        where: { resource: { equals: resource } },
        limit: 1,
        depth: 0,
        req,
      })
      const document = content as unknown as Record<string, unknown>
      const shared = summary(resource, document)
      const data = {
        resource,
        content: document,
        summary: shared,
        localizedContent: localizedResponses(document),
        localizedSummary: localizedResponses(shared),
      }
      if (existing.docs[0])
        await payload.update({ collection: 'public-content', id: existing.docs[0].id, data, req })
      else await payload.create({ collection: 'public-content', data, req })
    }
    if (!existingTransaction) await payload.db.commitTransaction(transaction)
  } catch (error) {
    if (!existingTransaction) await payload.db.rollbackTransaction(transaction)
    throw error
  }
}
