import 'dotenv/config'
import { randomUUID } from 'node:crypto'
import { afterAll, beforeAll, expect, it } from 'vitest'
import { getPayload, type Payload } from 'payload'
import { postgresAdapter } from '@payloadcms/db-postgres'
import config from '../../src/payload.config'
import { refreshPublicContent } from '../../src/services/publicContent'
import { parsePublicQuery, readPublicProjection } from '../../src/services/publicContentReads'

const schema = `public_reads_${randomUUID().replaceAll('-', '')}`
const context = { disableRevalidate: true, disableOwnerForms: true, disableSlotGeneration: true }
const title = (text: string) => ({root: {type: 'root', version: 1, direction: null, format: '' as const, indent: 0,
  children: [{type: 'paragraph', version: 1, direction: null, format: '' as const, indent: 0,
    children: [{type: 'text', version: 1, text, format: 0, detail: 0, mode: 'normal', style: ''}]}]}})
let payload: Payload

beforeAll(async () => {
  const base = await config
  payload = await getPayload({key: schema, config: Promise.resolve({...base,
    db: {...postgresAdapter({blocksAsJSON: true, pool: {connectionString: process.env.DATABASE_URL}, schemaName: schema, push: true}), allowIDOnCreate: false, name: 'postgres'},
  })})
  await refreshPublicContent(payload)
}, 120000)
afterAll(async () => {
  if (payload) {
    await payload.db.pool.query(`DROP SCHEMA "${schema}" CASCADE`)
    await payload.destroy()
  }
})

it('serves compact localized search text from published records without bodies, media or drafts', async () => {
  const article = await payload.create({collection: 'news', locale: 'en', context, data: {
    title: title('Published title'), slug: 'public-title', _status: 'published',
    layout: [{blockType: 'news-hero', data: {summary: 'English summary'}}, {blockType: 'news-body', data: {body: title('Body must not be transferred'), introStyle: 'body'}}],
  }})
  const hero = article.layout!.find(block => block.blockType === 'news-hero')!
  await payload.update({collection: 'news', id: article.id, locale: 'fr', context, data: {
    title: title('Titre publié'), layout: [{...hero, data: {summary: 'Résumé français'}}, article.layout![1]],
  }})
  await payload.create({collection: 'news', locale: 'en', context, data: {title: title('Draft title'), slug: 'draft-title', _status: 'draft'}})
  const query = parsePublicQuery(new URLSearchParams({scope: 'search', locale: 'fr'}))!
  const result = await readPublicProjection(payload, query)
  const docs = result.news.docs as Record<string, unknown>[]
  expect(docs).toHaveLength(1)
  expect(docs[0]).toMatchObject({slug: 'public-title', summary: {en: 'English summary', fr: 'Résumé français'}})
  expect(docs[0]).not.toHaveProperty('layout')
  expect(docs[0]).not.toHaveProperty('body')
  expect(docs[0]).not.toHaveProperty('relationships')
  expect(JSON.stringify(docs)).not.toContain('Body must not be transferred')
  expect(docs[0].title).not.toHaveProperty('ar')
})

it('keeps identities narrow and validates the public read scope', async () => {
  const article = await payload.create({collection: 'news', locale: 'en', context, data: {
    title: title('Identity title'), slug: 'identity-title', _status: 'published',
  }})
  const result = await readPublicProjection(payload, parsePublicQuery(new URLSearchParams({scope: 'identities'}))!)
  const identity = (result.news.docs as Record<string, unknown>[]).find(doc => doc.id === article.id)
  expect(identity).toMatchObject({slug: 'identity-title'})
  expect(identity).not.toHaveProperty('title')
  expect(parsePublicQuery(new URLSearchParams({resources: 'users'}))).toBeUndefined()
  expect(parsePublicQuery(new URLSearchParams({scope: 'private'}))).toBeUndefined()
  expect(parsePublicQuery(new URLSearchParams({locale: 'invalid'}))).toBeUndefined()
})

it('exposes only enabled deduplicated Section types in compact page summaries', async () => {
  const page = await payload.create({collection: 'pages', locale: 'en', context, data: {
    title: 'Mixed Sections', slug: 'mixed-sections', _status: 'published', layout: [
      {blockType: 'careers-jobs'},
      {blockType: 'careers-jobs'},
      {blockType: 'news-articles', enabled: false},
      {blockType: 'home-certifications'},
    ],
  }})
  const result = await readPublicProjection(payload, parsePublicQuery(new URLSearchParams({scope: 'shared', locale: 'fr'}))!)
  const summary = (result.pages.docs as Record<string, unknown>[]).find(doc => doc.id === page.id)
  expect(summary).toMatchObject({slug: 'mixed-sections', sectionTypes: ['careers-jobs', 'home-certifications']})
  expect(summary).not.toHaveProperty('layout')
  expect(summary).not.toHaveProperty('page')
})
