import 'dotenv/config'
import { promisify } from 'node:util'
import { execFile } from 'node:child_process'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { getPayload, type Payload } from 'payload'
import { postgresAdapter } from '@payloadcms/db-postgres'
import config from '../../src/payload.config'
import content from '../../seed/content.json'
import {
  dashboardSnapshot,
  locales,
  resolveReferences,
  seedCollections,
  type Data,
  type SeedSnapshot,
} from '../../scripts/seed-data'

const run = promisify(execFile)
const database = process.env.SEED_VERIFY_DATABASE_URL
const expected = content as unknown as SeedSnapshot
let payload: Payload
const seedEnvironment: NodeJS.ProcessEnv = {
  ...process.env,
  DATABASE_URL: database,
  NODE_ENV: 'production',
  CMS_REVALIDATION_SECRET: '',
}

// Payload normalizes empty optional block fields between null and omission.
function contentValue(value: unknown): unknown {
  if (Array.isArray(value)) return value.map(contentValue)
  if (value && typeof value === 'object')
    return Object.fromEntries(
      Object.entries(value)
        .filter(([key, item]) => key !== 'id' && item !== null && item !== undefined)
        .map(([key, item]) => [key, contentValue(item)]),
    )
  return value
}

describe.skipIf(!database)('production defaults on an isolated PostgreSQL database', () => {
  beforeAll(async () => {
    if (!new URL(database!).pathname.startsWith('/alamir_seed_verify_'))
      throw new Error('Use a dedicated alamir_seed_verify_ database.')
    await run('npm', ['run', 'migrate'], { env: seedEnvironment })
    await run('npm', ['run', 'seed'], { env: seedEnvironment })
    const base = await config
    payload = await getPayload({
      key: 'production-seed-verification',
      config: Promise.resolve({
        ...base,
        db: {
          ...postgresAdapter({
            blocksAsJSON: true,
            push: false,
            pool: { connectionString: database },
          }),
          allowIDOnCreate: false,
          name: 'postgres',
        },
      }),
    })
  }, 120000)
  afterAll(async () => {
    await payload?.destroy()
  })

  it('reproduces every content record, form, relationship and setting in all three locales', async () => {
    const actual = await dashboardSnapshot(payload)
    const ids = new Map<string, number>()
    const actualIDs = new Map<string, number>()
    const pairs: {
      source: (typeof expected.collections)[string][number]
      saved: (typeof expected.collections)[string][number]
    }[] = []
    for (const collection of seedCollections) {
      expect(actual.collections[collection].length, collection).toBe(
        expected.collections[collection].length,
      )
      for (const row of actual.collections[collection])
        actualIDs.set(row.key, Number(row.key.split(':').at(-1)))
      for (const source of expected.collections[collection]) {
        const match = resolveReferences(source.match, ids) as Data
        if (collection === 'forms' && source.data.en.owner) {
          const owner = resolveReferences(source.data.en.owner, ids) as {
            relationTo: string
            value: number
          }
          match.key = `${owner.relationTo}:${owner.value}:${source.data.en.purpose}`
        }
        const saved = actual.collections[collection].find(
          (row) =>
            JSON.stringify(resolveReferences(row.match, actualIDs)) === JSON.stringify(match),
        )
        expect(saved, `${collection}/${source.key}`).toBeDefined()
        ids.set(source.key, actualIDs.get(saved!.key)!)
        pairs.push({ source, saved: saved! })
      }
    }
    for (const { source, saved } of pairs)
      for (const locale of locales) {
        const data = resolveReferences(source.data[locale], ids) as Data
        const owner = data.owner as { relationTo: string; value: number } | undefined
        if (owner && data.purpose !== 'custom')
          data.key = `${owner.relationTo}:${owner.value}:${data.purpose}`
        expect(
          contentValue(resolveReferences(saved.data[locale], actualIDs)),
          `${source.key}/${locale}`,
        ).toEqual(contentValue(data))
      }
    for (const slug of Object.keys(expected.globals))
      for (const locale of locales)
        expect(
          contentValue(resolveReferences(actual.globals[slug][locale], actualIDs)),
          `${slug}/${locale}`,
        ).toEqual(contentValue(resolveReferences(expected.globals[slug][locale], ids)))
    for (const collection of [
      'users',
      'enquiries',
      'applications',
      'reservations',
      'form-submissions',
      'application-files',
    ] as const)
      expect((await payload.count({ collection })).totalDocs, collection).toBe(0)
    expect((await payload.count({ collection: 'public-content' })).totalDocs).toBe(19)
  }, 60000)

  it('preserves administrator edits and booked slots when seeded again without duplicates', async () => {
    const translation = (await payload.find({ collection: 'translations', limit: 1, depth: 0 }))
      .docs[0]
    const slot = (await payload.find({ collection: 'meeting-slots', limit: 1, depth: 0 })).docs[0]
    await payload.update({
      collection: 'translations',
      id: translation.id,
      locale: 'fr',
      data: { text: 'Administrator edit preserved' },
      context: { disableRevalidate: true },
    })
    await payload.update({
      collection: 'meeting-slots',
      id: slot.id,
      data: { reserved: true },
      context: { disableRevalidate: true },
    })
    await run('npm', ['run', 'seed'], { env: seedEnvironment })
    expect(
      (await payload.findByID({ collection: 'translations', id: translation.id, locale: 'fr' }))
        .text,
    ).toBe('Administrator edit preserved')
    expect((await payload.findByID({ collection: 'meeting-slots', id: slot.id })).reserved).toBe(
      true,
    )
    for (const collection of seedCollections)
      expect((await payload.count({ collection })).totalDocs, collection).toBe(
        expected.collections[collection].length,
      )
  }, 120000)
})
