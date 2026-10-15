import { sql, type MigrateUpArgs, type MigrateDownArgs } from '@payloadcms/db-postgres'
import { refreshPublicContent } from '../services/publicContent'

const copy = {
  en: [
    'Aseptic line commissioning completed in Sadat City',
    'The CFT aseptic processing line has completed commissioning and validation ahead of the first tomato campaign.',
  ],
  ar: [
    'تم الانتهاء من تشغيل الخط المعقم في مدينة السادات .',
    'أكمل خط المعالجة المعقمة من CFT التشغيل التجريبي والتحقق من الأداء استعدادًا لموسم الطماطم الأول.',
  ],
  fr: [
    'Mise en service de la ligne aseptique terminée en Sadat City.',
    'La ligne de transformation aseptique CFT a achevé sa mise en service et sa validation avant la première campagne de tomates.',
  ],
}
const title = (text: string) => ({
  root: {
    type: 'root',
    version: 1,
    format: '',
    indent: 0,
    direction: null,
    children: [
      {
        type: 'paragraph',
        version: 1,
        format: '',
        indent: 0,
        direction: null,
        children: [
          { type: 'text', version: 1, text, format: 0, detail: 0, mode: 'normal', style: '' },
        ],
      },
    ],
  },
})
const defaults = {
  cardTitle: Object.fromEntries(
    Object.entries(copy).map(([locale, [text]]) => [locale, title(text)]),
  ),
  cardSummary: Object.fromEntries(Object.entries(copy).map(([locale, [, text]]) => [locale, text])),
}

async function apply({ db, payload, req }: MigrateUpArgs, reverse = false): Promise<void> {
  for (const [table, column, identity] of [
    ['news', 'layout', 'source_id'],
    ['_news_v', 'version_layout', 'version_source_id'],
  ]) {
    const data = reverse
      ? sql`CASE WHEN block->'data' @> ${JSON.stringify(defaults)}::jsonb THEN block->'data' - 'cardTitle' - 'cardSummary' ELSE block->'data' END`
      : sql`${JSON.stringify(defaults)}::jsonb || (block->'data')`
    await db.execute(sql`UPDATE ${sql.identifier(table)} SET ${sql.identifier(column)} = (
      SELECT jsonb_agg(CASE WHEN block->>'blockType' = 'news-hero'
        THEN jsonb_set(block, '{data}', ${data}) ELSE block END ORDER BY position)
      FROM jsonb_array_elements(${sql.identifier(column)}) WITH ORDINALITY AS items(block, position)
    ) WHERE ${sql.identifier(identity)}::text = '1'`)
  }
  await refreshPublicContent(payload, ['news'], req)
}

export async function up(args: MigrateUpArgs): Promise<void> {
  await apply(args)
}
export async function down(args: MigrateDownArgs): Promise<void> {
  await apply(args, true)
}
