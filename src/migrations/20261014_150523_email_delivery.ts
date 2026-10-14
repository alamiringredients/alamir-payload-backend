import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_reservations_email_delivery_status" AS ENUM('queued', 'retrying', 'sent', 'failed');
  CREATE TYPE "public"."enum_email_replies_email_delivery_status" AS ENUM('queued', 'retrying', 'sent', 'failed');
  CREATE TYPE "public"."enum_payload_jobs_log_task_slug" AS ENUM('inline', 'send-email');
  CREATE TYPE "public"."enum_payload_jobs_log_state" AS ENUM('failed', 'succeeded');
  CREATE TYPE "public"."enum_payload_jobs_task_slug" AS ENUM('inline', 'send-email');
  CREATE TABLE "email_replies" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"subject" varchar NOT NULL,
  	"body" varchar NOT NULL,
  	"recipient" varchar NOT NULL,
  	"email_delivery_status" "enum_email_replies_email_delivery_status",
  	"email_delivery_message_i_d" varchar,
  	"email_delivery_sent_at" timestamp(3) with time zone,
  	"email_delivery_error" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "email_replies_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"enquiries_id" integer,
  	"applications_id" integer
  );
  
  CREATE TABLE "payload_jobs_log" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"executed_at" timestamp(3) with time zone NOT NULL,
  	"completed_at" timestamp(3) with time zone NOT NULL,
  	"task_slug" "enum_payload_jobs_log_task_slug" NOT NULL,
  	"task_i_d" varchar NOT NULL,
  	"input" jsonb,
  	"output" jsonb,
  	"state" "enum_payload_jobs_log_state" NOT NULL,
  	"error" jsonb
  );
  
  CREATE TABLE "payload_jobs" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"input" jsonb,
  	"completed_at" timestamp(3) with time zone,
  	"total_tried" numeric DEFAULT 0,
  	"has_error" boolean DEFAULT false,
  	"error" jsonb,
  	"task_slug" "enum_payload_jobs_task_slug",
  	"queue" varchar DEFAULT 'default',
  	"wait_until" timestamp(3) with time zone,
  	"processing" boolean DEFAULT false,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  ALTER TABLE "reservations" ADD COLUMN "email_delivery_status" "enum_reservations_email_delivery_status";
  ALTER TABLE "reservations" ADD COLUMN "email_delivery_message_i_d" varchar;
  ALTER TABLE "reservations" ADD COLUMN "email_delivery_sent_at" timestamp(3) with time zone;
  ALTER TABLE "reservations" ADD COLUMN "email_delivery_error" varchar;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "email_replies_id" integer;
  ALTER TABLE "email_replies_rels" ADD CONSTRAINT "email_replies_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."email_replies"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "email_replies_rels" ADD CONSTRAINT "email_replies_rels_enquiries_fk" FOREIGN KEY ("enquiries_id") REFERENCES "public"."enquiries"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "email_replies_rels" ADD CONSTRAINT "email_replies_rels_applications_fk" FOREIGN KEY ("applications_id") REFERENCES "public"."applications"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_jobs_log" ADD CONSTRAINT "payload_jobs_log_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."payload_jobs"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "email_replies_updated_at_idx" ON "email_replies" USING btree ("updated_at");
  CREATE INDEX "email_replies_created_at_idx" ON "email_replies" USING btree ("created_at");
  CREATE INDEX "email_replies_rels_order_idx" ON "email_replies_rels" USING btree ("order");
  CREATE INDEX "email_replies_rels_parent_idx" ON "email_replies_rels" USING btree ("parent_id");
  CREATE INDEX "email_replies_rels_path_idx" ON "email_replies_rels" USING btree ("path");
  CREATE INDEX "email_replies_rels_enquiries_id_idx" ON "email_replies_rels" USING btree ("enquiries_id");
  CREATE INDEX "email_replies_rels_applications_id_idx" ON "email_replies_rels" USING btree ("applications_id");
  CREATE INDEX "payload_jobs_log_order_idx" ON "payload_jobs_log" USING btree ("_order");
  CREATE INDEX "payload_jobs_log_parent_id_idx" ON "payload_jobs_log" USING btree ("_parent_id");
  CREATE INDEX "payload_jobs_completed_at_idx" ON "payload_jobs" USING btree ("completed_at");
  CREATE INDEX "payload_jobs_total_tried_idx" ON "payload_jobs" USING btree ("total_tried");
  CREATE INDEX "payload_jobs_has_error_idx" ON "payload_jobs" USING btree ("has_error");
  CREATE INDEX "payload_jobs_task_slug_idx" ON "payload_jobs" USING btree ("task_slug");
  CREATE INDEX "payload_jobs_queue_idx" ON "payload_jobs" USING btree ("queue");
  CREATE INDEX "payload_jobs_wait_until_idx" ON "payload_jobs" USING btree ("wait_until");
  CREATE INDEX "payload_jobs_processing_idx" ON "payload_jobs" USING btree ("processing");
  CREATE INDEX "payload_jobs_updated_at_idx" ON "payload_jobs" USING btree ("updated_at");
  CREATE INDEX "payload_jobs_created_at_idx" ON "payload_jobs" USING btree ("created_at");
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_email_replies_fk" FOREIGN KEY ("email_replies_id") REFERENCES "public"."email_replies"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "payload_locked_documents_rels_email_replies_id_idx" ON "payload_locked_documents_rels" USING btree ("email_replies_id");`)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "email_replies" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "email_replies_rels" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "payload_jobs_log" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "payload_jobs" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "email_replies" CASCADE;
  DROP TABLE "email_replies_rels" CASCADE;
  DROP TABLE "payload_jobs_log" CASCADE;
  DROP TABLE "payload_jobs" CASCADE;
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_email_replies_fk";
  
  DROP INDEX "payload_locked_documents_rels_email_replies_id_idx";
  ALTER TABLE "reservations" DROP COLUMN "email_delivery_status";
  ALTER TABLE "reservations" DROP COLUMN "email_delivery_message_i_d";
  ALTER TABLE "reservations" DROP COLUMN "email_delivery_sent_at";
  ALTER TABLE "reservations" DROP COLUMN "email_delivery_error";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "email_replies_id";
  DROP TYPE "public"."enum_reservations_email_delivery_status";
  DROP TYPE "public"."enum_email_replies_email_delivery_status";
  DROP TYPE "public"."enum_payload_jobs_log_task_slug";
  DROP TYPE "public"."enum_payload_jobs_log_state";
  DROP TYPE "public"."enum_payload_jobs_task_slug";`)
}
