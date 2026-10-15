import {sql, type MigrateUpArgs, type MigrateDownArgs} from '@payloadcms/db-postgres'
import {refreshPublicContent} from '../services/publicContent'

export async function up({db, payload, req}: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    DO $$ BEGIN
      CREATE TYPE "public"."enum_categories_appearance" AS ENUM ('standard', 'muted');
    EXCEPTION WHEN duplicate_object THEN NULL; END $$;
    DO $$ BEGIN
      CREATE TYPE "public"."enum__categories_v_version_appearance" AS ENUM ('standard', 'muted');
    EXCEPTION WHEN duplicate_object THEN NULL; END $$;
    ALTER TABLE "categories" ADD COLUMN IF NOT EXISTS "appearance" "enum_categories_appearance" DEFAULT 'standard';
    ALTER TABLE "_categories_v" ADD COLUMN IF NOT EXISTS "version_appearance" "enum__categories_v_version_appearance" DEFAULT 'standard';
    UPDATE "categories" SET "appearance" = 'muted' WHERE "source_id" = 1;
    UPDATE "_categories_v" SET "version_appearance" = 'muted' WHERE "version_source_id" = 1;
  `)
  for (const [collection, leadIDs, blockType] of [
    ['news', [1], 'news-body'],
    ['events', [1, 4], 'event-body'],
  ] as const) {
    for (const [table, column, identity] of [
      [collection, 'layout', 'source_id'],
      [`_${collection}_v`, 'version_layout', 'version_source_id'],
    ]) {
      await db.execute(sql`UPDATE ${sql.identifier(table)} SET ${sql.identifier(column)} = (
        SELECT jsonb_agg(CASE WHEN block->>'blockType' = ${blockType}
          THEN jsonb_set(block, '{data}', jsonb_build_object('introStyle',
            CASE WHEN ${sql.identifier(identity)} IN (${sql.join(leadIDs.map(id=>sql`${id}`),sql`, `)}) THEN 'lead' ELSE 'body' END
          ) || COALESCE(block->'data', '{}'::jsonb)) ELSE block END ORDER BY position)
        FROM jsonb_array_elements(${sql.identifier(column)}) WITH ORDINALITY AS items(block, position)
      ) WHERE ${sql.identifier(column)} IS NOT NULL`)
    }
  }
  await refreshPublicContent(payload, ['categories', 'news', 'events'], req)
}

export async function down({db, payload, req}: MigrateDownArgs): Promise<void> {
  for (const collection of ['news', 'events']) {
    for (const [table, column] of [[collection, 'layout'], [`_${collection}_v`, 'version_layout']]) {
      await db.execute(sql`UPDATE ${sql.identifier(table)} SET ${sql.identifier(column)} = (
        SELECT jsonb_agg(CASE WHEN block->>'blockType' IN ('news-body', 'event-body')
          THEN block #- '{data,introStyle}' ELSE block END ORDER BY position)
        FROM jsonb_array_elements(${sql.identifier(column)}) WITH ORDINALITY AS items(block, position)
      ) WHERE ${sql.identifier(column)} IS NOT NULL`)
    }
  }
  await db.execute(sql`
    ALTER TABLE "categories" DROP COLUMN "appearance";
    ALTER TABLE "_categories_v" DROP COLUMN "version_appearance";
    DROP TYPE "public"."enum_categories_appearance";
    DROP TYPE "public"."enum__categories_v_version_appearance";
  `)
  await refreshPublicContent(payload, ['categories', 'news', 'events'], req)
}
