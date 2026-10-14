import { sql, type MigrateUpArgs, type MigrateDownArgs } from '@payloadcms/db-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`CREATE TABLE IF NOT EXISTS "public_content" (
    "id" serial PRIMARY KEY NOT NULL, "resource" varchar NOT NULL, "content" jsonb NOT NULL,
    "summary" jsonb, "localized_content" jsonb, "localized_summary" jsonb,
    "updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
    "created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  ALTER TABLE "public_content" ADD COLUMN IF NOT EXISTS "localized_content" jsonb;
  ALTER TABLE "public_content" ADD COLUMN IF NOT EXISTS "localized_summary" jsonb;
  CREATE UNIQUE INDEX IF NOT EXISTS "public_content_resource_idx" ON "public_content" ("resource");
  CREATE INDEX IF NOT EXISTS "public_content_updated_at_idx" ON "public_content" ("updated_at");
  CREATE INDEX IF NOT EXISTS "public_content_created_at_idx" ON "public_content" ("created_at");
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN IF NOT EXISTS "public_content_id" integer;
  DO $$ BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname='payload_locked_documents_rels_public_content_fk') THEN
      ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_public_content_fk"
        FOREIGN KEY ("public_content_id") REFERENCES "public_content"("id") ON DELETE CASCADE;
    END IF;
  END $$;
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_public_content_id_idx" ON "payload_locked_documents_rels" ("public_content_id");`)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "public_content_id";
    DROP TABLE "public_content";`)
}
