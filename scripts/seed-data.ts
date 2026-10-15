import type { Field, Payload } from 'payload'
import { standardBlocks } from '../src/blocks/sharedSections'

export type Data = Record<string, unknown>
export const locales = ['en', 'ar', 'fr'] as const
export const seedCollections = [
  'roles',
  'media',
  'product-applications',
  'product-concentrations',
  'sustainability-goals',
  'news-taxonomies',
  'certification-types',
  'categories',
  'products',
  'certifications',
  'news',
  'sustainability',
  'jobs',
  'events',
  'pages',
  'forms',
  'translations',
  'meeting-slots',
] as const
export type SeedRecord = { key: string; match: Data; data: Record<string, Data> }
export type SeedSnapshot = {
  version: 1
  collections: Record<string, SeedRecord[]>
  globals: Record<string, Record<string, Data>>
}
const ignored = new Set([
  'id',
  'createdAt',
  'updatedAt',
  'deletedAt',
  'makeDefault',
  'applyToExisting',
  'generateSlug',
])

function identity(collection: string, doc: Data): Data {
  if (collection === 'media') return { filename: doc.filename, prefix: doc.prefix ?? '' }
  if (collection === 'meeting-slots') return { event: doc.event, startsAt: doc.startsAt }
  for (const field of collection === 'forms'
    ? ['key']
    : ['sourceId', 'sourceKey', 'code', 'key', 'slug', 'name'])
    if (doc[field] !== undefined && doc[field] !== null && doc[field] !== '')
      return { [field]: doc[field] }
  throw new Error(`No stable seed identity for ${collection}/${doc.id}`)
}

export async function dashboardSnapshot(payload: Payload): Promise<SeedSnapshot> {
  const records = new Map<string, Record<string, Data[]>>()
  const references = new Map<string, Map<string, string>>()
  for (const collection of seedCollections) {
    const localized: Record<string, Data[]> = {}
    for (const locale of locales) {
      const result = await payload.find({
        collection,
        locale,
        fallbackLocale: 'en',
        depth: 0,
        pagination: false,
        joins: false as never,
        sort: 'id',
      })
      localized[locale] = result.docs as unknown as Data[]
    }
    records.set(collection, localized)
    references.set(
      collection,
      new Map(localized.en.map((doc) => [String(doc.id), `${collection}:${doc.id}`])),
    )
  }
  const reference = (collection: string, value: unknown): unknown => {
    if (value === null || value === undefined) return value
    const key = references
      .get(collection)
      ?.get(String(typeof value === 'object' ? (value as Data).id : value))
    if (!key) throw new Error(`Seed references excluded or missing ${collection}/${value}`)
    return { $seed: { collection, key } }
  }
  const richText = (value: unknown): unknown => {
    if (Array.isArray(value)) return value.map(richText)
    if (!value || typeof value !== 'object') return value
    const row = value as Data
    if (
      typeof row.type === 'string' &&
      ['upload', 'relationship'].includes(row.type) &&
      typeof row.relationTo === 'string' &&
      row.value != null
    )
      return { ...row, value: reference(row.relationTo, row.value) }
    const blockFields = row.fields as Data | undefined
    if (row.type === 'block' && blockFields?.blockType) {
      const block = standardBlocks.find((block) => block.slug === blockFields.blockType)
      if (block)
        return { ...row, fields: { blockType: block.slug, ...fields(block.fields, blockFields) } }
    }
    return Object.fromEntries(
      Object.entries(value)
        .filter(([key]) => key !== 'id')
        .map(([key, child]) => [key, richText(child)]),
    )
  }
  const fields = (schema: Field[], doc: Data): Data => {
    const output: Data = {}
    for (const field of schema) {
      if (field.type === 'tabs') {
        for (const tab of field.tabs) {
          if ('name' in tab && tab.name)
            output[tab.name] = fields(tab.fields, (doc[tab.name] ?? {}) as Data)
          else Object.assign(output, fields(tab.fields, doc))
        }
        continue
      }
      if (!('name' in field) || !field.name) {
        if ('fields' in field) Object.assign(output, fields(field.fields, doc))
        continue
      }
      const name = field.name,
        value = doc[name]
      if (
        ignored.has(name) ||
        field.type === 'join' ||
        ('virtual' in field && field.virtual) ||
        value === undefined
      )
        continue
      if (field.type === 'relationship' || field.type === 'upload') {
        const convert = (item: unknown) => {
          if (item == null) return item
          if (typeof field.relationTo === 'string') return reference(field.relationTo, item)
          const relation = item as { relationTo: string; value: unknown }
          return {
            relationTo: relation.relationTo,
            value: reference(relation.relationTo, relation.value),
          }
        }
        output[name] = Array.isArray(value) ? value.map(convert) : convert(value)
      } else if (field.type === 'array')
        output[name] =
          (value as Data[] | null)?.map((row: Data) => fields(field.fields, row)) ?? value
      else if (field.type === 'blocks')
        output[name] =
          (value as Data[] | null)?.map((row: Data) => {
            const block = field.blocks.find(
              (block) => typeof block !== 'string' && block.slug === row.blockType,
            )
            if (!block || typeof block === 'string')
              throw new Error(`Unknown seed block ${row.blockType}`)
            return { blockType: row.blockType, ...fields(block.fields, row) }
          }) ?? value
      else if ('fields' in field)
        output[name] = value == null ? value : fields(field.fields, value as Data)
      else output[name] = field.type === 'richText' ? richText(value) : value
    }
    return output
  }
  const snapshot: SeedSnapshot = { version: 1, collections: {}, globals: {} }
  for (const collection of seedCollections) {
    const documents = records.get(collection)!
    const schema = payload.collections[collection].config.fields
    snapshot.collections[collection] = documents.en.map((doc, index) => {
      const data = Object.fromEntries(
        locales.map((locale) => [locale, fields(schema, documents[locale][index])]),
      )
      if (collection === 'meeting-slots')
        for (const locale of locales) data[locale].reserved = false
      if (collection === 'media')
        for (const locale of locales) {
          delete data[locale].url
          delete data[locale].thumbnailURL
        }
      const match = identity(collection, doc)
      if (collection === 'meeting-slots') match.event = reference('events', doc.event)
      return { key: references.get(collection)!.get(String(doc.id))!, match, data }
    })
  }
  for (const global of payload.config.globals) {
    const data: Record<string, Data> = {}
    for (const locale of locales) {
      const doc = await payload.findGlobal({
        slug: global.slug,
        locale,
        fallbackLocale: 'en',
        depth: 0,
      })
      data[locale] = fields(global.fields, doc as unknown as Data)
    }
    snapshot.globals[global.slug] = data
  }
  return snapshot
}

export function resolveReferences(
  value: unknown,
  ids: Map<string, number>,
  defer = false,
): unknown {
  if (Array.isArray(value))
    return value
      .map((item) => resolveReferences(item, ids, defer))
      .filter((item) => item !== undefined)
  if (!value || typeof value !== 'object') return value
  const reference = (value as Data).$seed as { key: string } | undefined
  if (reference) {
    const id = ids.get(reference.key)
    if (id === undefined && !defer) throw new Error(`Unresolved seed reference ${reference.key}`)
    return id
  }
  return Object.fromEntries(
    Object.entries(value)
      .map(([key, item]) => [key, resolveReferences(item, ids, defer)])
      .filter(([, item]) => item !== undefined),
  )
}
