import { sql, type MigrateUpArgs, type MigrateDownArgs } from '@payloadcms/db-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`ALTER TYPE "public"."enum_forms_purpose" ADD VALUE IF NOT EXISTS 'custom';
    ALTER TABLE "form_submissions" ADD COLUMN IF NOT EXISTS "page_id" integer;
    DO $$ BEGIN
      IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname='form_submissions_page_id_pages_id_fk') THEN
        ALTER TABLE "form_submissions" ADD CONSTRAINT "form_submissions_page_id_pages_id_fk"
          FOREIGN KEY ("page_id") REFERENCES "public"."pages"("id") ON DELETE SET NULL;
      END IF;
    END $$;
    CREATE INDEX IF NOT EXISTS "form_submissions_page_idx" ON "form_submissions" USING btree ("page_id");`)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`DROP INDEX "public"."form_submissions_page_idx";
    ALTER TABLE "form_submissions" DROP COLUMN "page_id";`)
}
