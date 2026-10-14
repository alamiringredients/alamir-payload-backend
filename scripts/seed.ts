import 'dotenv/config'
import { createLocalReq, getPayload, type CollectionSlug, type GlobalSlug } from 'payload'
import config from '../src/payload.config'
import content from '../seed/content.json'
import {
  locales,
  resolveReferences,
  seedCollections,
  type Data,
  type SeedSnapshot,
} from './seed-data'
import { refreshPublicContent } from '../src/services/publicContent'

const snapshot = content as unknown as SeedSnapshot
if (snapshot.version !== 1)
  throw new Error('Unsupported seed snapshot. Export current dashboard defaults first.')
const payload = await getPayload({ config })
const req = await createLocalReq(
  {
    context: {
      bootstrapRoles: true,
      disableEmails: true,
      disableRevalidate: true,
      disablePublicProjection: true,
      disableOwnerForms: true,
      disableSlotGeneration: true,
      propagatingForms: true,
    },
  },
  payload,
)
const transaction = await payload.db.beginTransaction()
if (!transaction) throw new Error('Seeding requires a PostgreSQL transaction.')
req.transactionID = transaction
let committed = false
const ids = new Map<string, number>()
const created = new Set<string>()
const savedDocuments = new Map<string, Record<string, unknown>>()
function preserveRowIDs(value: unknown, previous: unknown): unknown {
  if (Array.isArray(value))
    return value.map((row, index) => {
      const saved = Array.isArray(previous) ? previous[index] : undefined
      const prepared = preserveRowIDs(row, saved)
      return prepared && typeof prepared === 'object' && !Array.isArray(prepared) && saved?.id
        ? { ...prepared, id: saved.id }
        : prepared
    })
  if (value && typeof value === 'object')
    return Object.fromEntries(
      Object.entries(value).map(([key, item]) => [
        key,
        preserveRowIDs(item, (previous as Data | undefined)?.[key]),
      ]),
    )
  return value
}
function dataFor(value: unknown, defer = false): Record<string, unknown> {
  const data = resolveReferences(value, ids, defer) as Data
  const owner = data.owner as { relationTo: string; value: number } | undefined
  if (owner?.value && data.purpose && data.purpose !== 'custom')
    data.key = `${owner.relationTo}:${owner.value}:${data.purpose}`
  if (data.slug || data.key) data.generateSlug = false
  return data
}
try {
  // Create identities first; optional circular relationships are connected in the second pass.
  for (const collection of seedCollections) {
    for (const record of snapshot.collections[collection]) {
      const match = resolveReferences(record.match, ids) as Data
      if (collection === 'forms') match.key = dataFor(record.data.en).key
      const existing = await payload.find({
        collection,
        where: {
          and: Object.entries(match).map(([field, value]) => ({ [field]: { equals: value } })),
        },
        limit: 1,
        depth: 0,
        joins: false as never,
        req,
      })
      let doc = existing.docs[0]
      if (!doc) {
        doc = await payload.create({
          collection,
          locale: 'en',
          data: dataFor(record.data.en, true) as never,
          req,
          depth: 0,
        })
        created.add(record.key)
      }
      ids.set(record.key, doc.id)
      savedDocuments.set(record.key, doc as unknown as Data)
    }
    console.log(`${collection}: ${snapshot.collections[collection].length} defaults checked`)
  }
  for (const collection of seedCollections) {
    for (const record of snapshot.collections[collection]) {
      if (!created.has(record.key)) continue
      let saved = savedDocuments.get(record.key)
      for (const locale of locales)
        saved = (await payload.update({
          collection: collection as CollectionSlug,
          id: ids.get(record.key)!,
          locale,
          data: preserveRowIDs(dataFor(record.data[locale]), saved) as never,
          req,
          depth: 0,
        })) as unknown as Data
    }
  }
  for (const [slug, data] of Object.entries(snapshot.globals)) {
    let current = await payload.findGlobal({ slug: slug as GlobalSlug, depth: 0, req })
    if (current.createdAt) continue
    for (const locale of locales)
      current = await payload.updateGlobal({
        slug: slug as GlobalSlug,
        locale,
        data: preserveRowIDs(dataFor(data[locale]), current) as never,
        req,
        depth: 0,
      })
  }
  await payload.db.commitTransaction(transaction)
  committed = true
  await refreshPublicContent(payload)
  if (process.env.CMS_REVALIDATION_SECRET)
    for (const origin of [process.env.PAYLOAD_PUBLIC_URL, process.env.FRONTEND_URL]) {
      if (!origin) continue
      try {
        const response = await fetch(`${origin}/api/revalidate`, {
          method: 'POST',
          headers: { authorization: `Bearer ${process.env.CMS_REVALIDATION_SECRET}` },
          signal: AbortSignal.timeout(3000),
        })
        if (!response.ok) console.warn(`Cache refresh failed for ${origin} (${response.status}).`)
      } catch {
        console.warn(
          `Cache refresh unavailable for ${origin}; restart the deployed services after seeding.`,
        )
      }
    }
  console.log(
    `Seed complete: ${created.size} records created; existing records and administrator edits preserved.`,
  )
  console.log('Create the first Super Admin through /admin. No accounts or submissions are seeded.')
} catch (error) {
  if (!committed) await payload.db.rollbackTransaction(transaction)
  throw error
} finally {
  await payload.destroy()
}

process.exit(0)
