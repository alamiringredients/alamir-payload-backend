import { sql, type MigrateUpArgs, type MigrateDownArgs } from '@payloadcms/db-postgres'
import { refreshPublicContent } from '../services/publicContent'

async function convert({ db, payload, req }: MigrateUpArgs, reverse = false): Promise<void> {
  // Layouts store localized values in JSON. Transform source documents and saved
  // versions together so restoring an older version keeps the shared block.
  for (const [table, column] of [
    ['pages', 'layout'],
    ['_pages_v', 'version_layout'],
  ]) {
    const source = sql.identifier(column)
    const match = reverse
      ? sql`block->>'blockType' = 'text-media' AND block->>'blockName' = 'News' AND block ? 'articles'`
      : sql`block->>'blockType' = 'careers-news'`
    const replacement = reverse
      ? sql`(block - 'eyebrow' - 'heading' - 'body' - 'media' - 'mediaAlt' - 'articles' - 'articleLinkLabel' - 'theme' - 'columnWidth') || jsonb_build_object(
          'blockType', 'careers-news', 'content', jsonb_build_object(
            'kicker', block->'eyebrow', 'title', block->'heading', 'intro', block->'body',
            'image', block->'media', 'imageAlt', block->'mediaAlt', 'articles', block->'articles'))`
      : sql`(block - 'content') || jsonb_build_object(
          'blockType', 'text-media', 'theme', 'tint', 'columnWidth', 'original',
          'eyebrow', block->'content'->'kicker', 'heading', block->'content'->'title',
          'body', block->'content'->'intro', 'media', block->'content'->'image',
          'mediaAlt', block->'content'->'imageAlt', 'articles', block->'content'->'articles',
          'articleLinkLabel', jsonb_build_object('en', 'Read article', 'ar', 'قراءة المقال', 'fr', 'Lire l’article'))`
    await db.execute(sql`UPDATE ${sql.identifier(table)} SET ${source} = (
      SELECT jsonb_agg(CASE WHEN ${match} THEN ${replacement} ELSE block END ORDER BY position)
      FROM jsonb_array_elements(${source}) WITH ORDINALITY AS items(block, position)
    ) WHERE EXISTS (SELECT 1 FROM jsonb_array_elements(${source}) AS block WHERE ${match})`)
  }
  const collections = [
    'pages',
    'products',
    'categories',
    'news',
    'sustainability',
    'jobs',
    'events',
  ]
  for (const collection of collections) {
    for (const [table, column] of [
      [collection, 'layout'],
      [`_${collection}_v`, 'version_layout'],
    ]) {
      const source = sql.identifier(column)
      const native = sql`block->>'blockType' NOT IN ('hero', 'text', 'gallery', 'call-to-action', 'form')`
      await db.execute(sql`UPDATE ${sql.identifier(table)} SET ${source} = (
        SELECT jsonb_agg(CASE WHEN ${native} THEN ${
          reverse
            ? sql`block - 'columnWidth'`
            : sql`jsonb_build_object('columnWidth', 'original') || block`
        } ELSE block END ORDER BY position)
        FROM jsonb_array_elements(${source}) WITH ORDINALITY AS items(block, position)
      ) WHERE EXISTS (SELECT 1 FROM jsonb_array_elements(${source}) AS block
        WHERE ${native} AND ${reverse ? sql`block ? 'columnWidth'` : sql`NOT block ? 'columnWidth'`})`)
    }
  }
  await refreshPublicContent(payload, collections, req)
}

export async function up(args: MigrateUpArgs): Promise<void> {
  await convert(args)
}

export async function down(args: MigrateDownArgs): Promise<void> {
  await convert(args, true)
}
