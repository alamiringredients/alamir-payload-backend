import 'dotenv/config'
import { createServer, type Server } from 'node:http'
import { randomUUID } from 'node:crypto'
import { afterAll, beforeAll, beforeEach, expect, it, vi } from 'vitest'
import { getPayload, type Payload } from 'payload'
import { postgresAdapter } from '@payloadcms/db-postgres'
import config from '../../src/payload.config'

// Native cache invalidation requires a Next request; the database and website
// notification below use real PostgreSQL transactions and a real HTTP receiver.
vi.mock('next/cache', () => ({ revalidateTag: vi.fn() }))

const schema = `publication_check_${randomUUID().replaceAll('-', '')}`
const context = { disableOwnerForms: true }
const originalURL = process.env.FRONTEND_URL
const originalSecret = process.env.CMS_REVALIDATION_SECRET
let payload: Payload
let website: Server
const observed: string[][] = []

beforeAll(async () => {
  const base = await config
  payload = await getPayload({
    key: schema,
    config: Promise.resolve({
      ...base,
      db: {
        ...postgresAdapter({
          blocksAsJSON: true,
          pool: { connectionString: process.env.DATABASE_URL },
          schemaName: schema,
          push: true,
        }),
        allowIDOnCreate: false,
        name: 'postgres',
      },
    }),
  })
  website = createServer(async (_request, response) => {
    try {
      const result = await payload.find({
        collection: 'public-content',
        where: { resource: { equals: 'pages' } },
        depth: 0,
      })
      const content = result.docs[0]?.content as { docs: { slug: string }[] } | undefined
      observed.push(content?.docs.map(doc => doc.slug) ?? [])
      response.writeHead(200).end('{}')
    } catch {
      response.writeHead(500).end()
    }
  })
  await new Promise<void>(resolve => website.listen(0, '127.0.0.1', resolve))
  const address = website.address()
  if (!address || typeof address === 'string') throw new Error('Website receiver did not start.')
  process.env.FRONTEND_URL = `http://127.0.0.1:${address.port}`
  process.env.CMS_REVALIDATION_SECRET = 'publication-test'
}, 120000)

beforeEach(() => { observed.length = 0 })
afterAll(async () => {
  if (originalURL === undefined) delete process.env.FRONTEND_URL
  else process.env.FRONTEND_URL = originalURL
  if (originalSecret === undefined) delete process.env.CMS_REVALIDATION_SECRET
  else process.env.CMS_REVALIDATION_SECRET = originalSecret
  if (website) await new Promise<void>((resolve, reject) => website.close(error => error ? reject(error) : resolve()))
  if (payload) {
    await payload.db.pool.query(`DROP SCHEMA "${schema}" CASCADE`)
    await payload.destroy()
  }
})

it('notifies the website only when a separate reader can see the publication', async () => {
  const slug = `published-${randomUUID()}`
  await payload.create({
    collection: 'pages', context,
    data: { title: 'Committed publication', slug, layout: [], _status: 'published' },
  })
  expect(observed).toHaveLength(1)
  expect(observed[0]).toContain(slug)
})

it('coalesces writes in an explicit transaction and notifies after its commit', async () => {
  const transactionID = await payload.db.beginTransaction()
  if (!transactionID) throw new Error('A transaction is required.')
  const slugs = [randomUUID(), randomUUID()]
  try {
    for (const slug of slugs) await payload.create({
      collection: 'pages', req: { transactionID }, context,
      data: { title: 'Batched publication', slug, layout: [], _status: 'published' },
    })
    expect(observed).toHaveLength(0)
    await payload.db.commitTransaction(transactionID)
    expect(observed).toHaveLength(1)
    expect(observed[0]).toEqual(expect.arrayContaining(slugs))
  } finally {
    await payload.db.rollbackTransaction(transactionID)
  }
})

it('does not notify the website for a rolled-back publication', async () => {
  const transactionID = await payload.db.beginTransaction()
  if (!transactionID) throw new Error('A transaction is required.')
  const slug = `rollback-${randomUUID()}`
  try {
    await payload.create({
      collection: 'pages', req: { transactionID }, context,
      data: { title: 'Rolled back publication', slug, layout: [], _status: 'published' },
    })
  } finally {
    await payload.db.rollbackTransaction(transactionID)
  }
  expect(observed).toHaveLength(0)
  const result = await payload.find({ collection: 'pages', where: { slug: { equals: slug } } })
  expect(result.docs).toHaveLength(0)
})
