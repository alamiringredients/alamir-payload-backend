import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  const existing = await db.execute(sql`SELECT to_regclass('public.pages') AS name`)
  if (existing.rows[0]?.name) return
  await db.execute(sql`
   CREATE TYPE "public"."_locales" AS ENUM('en', 'ar', 'fr');
  CREATE TYPE "public"."enum_product_applications_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__product_applications_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__product_applications_v_published_locale" AS ENUM('en', 'ar', 'fr');
  CREATE TYPE "public"."enum_product_concentrations_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__product_concentrations_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__product_concentrations_v_published_locale" AS ENUM('en', 'ar', 'fr');
  CREATE TYPE "public"."enum_sustainability_goals_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__sustainability_goals_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__sustainability_goals_v_published_locale" AS ENUM('en', 'ar', 'fr');
  CREATE TYPE "public"."enum_pages_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__pages_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__pages_v_published_locale" AS ENUM('en', 'ar', 'fr');
  CREATE TYPE "public"."enum_categories_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__categories_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__categories_v_published_locale" AS ENUM('en', 'ar', 'fr');
  CREATE TYPE "public"."enum_products_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__products_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__products_v_published_locale" AS ENUM('en', 'ar', 'fr');
  CREATE TYPE "public"."enum_certification_types_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum_certification_types_kind" AS ENUM('certification', 'registration', 'membership', 'audit');
  CREATE TYPE "public"."enum__certification_types_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__certification_types_v_published_locale" AS ENUM('en', 'ar', 'fr');
  CREATE TYPE "public"."enum__certification_types_v_version_kind" AS ENUM('certification', 'registration', 'membership', 'audit');
  CREATE TYPE "public"."enum_certifications_holder" AS ENUM('group', 'sadat-city');
  CREATE TYPE "public"."enum_certifications_standing" AS ENUM('planned', 'in-progress', 'held', 'suspended', 'expired');
  CREATE TYPE "public"."enum_certifications_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__certifications_v_version_holder" AS ENUM('group', 'sadat-city');
  CREATE TYPE "public"."enum__certifications_v_version_standing" AS ENUM('planned', 'in-progress', 'held', 'suspended', 'expired');
  CREATE TYPE "public"."enum__certifications_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__certifications_v_published_locale" AS ENUM('en', 'ar', 'fr');
  CREATE TYPE "public"."enum_news_taxonomies_kind" AS ENUM('category', 'tag');
  CREATE TYPE "public"."enum_news_taxonomies_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__news_taxonomies_v_version_kind" AS ENUM('category', 'tag');
  CREATE TYPE "public"."enum__news_taxonomies_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__news_taxonomies_v_published_locale" AS ENUM('en', 'ar', 'fr');
  CREATE TYPE "public"."enum_news_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__news_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__news_v_published_locale" AS ENUM('en', 'ar', 'fr');
  CREATE TYPE "public"."enum_sustainability_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__sustainability_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__sustainability_v_published_locale" AS ENUM('en', 'ar', 'fr');
  CREATE TYPE "public"."enum_jobs_availability" AS ENUM('open', 'closed');
  CREATE TYPE "public"."enum_jobs_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__jobs_v_version_availability" AS ENUM('open', 'closed');
  CREATE TYPE "public"."enum__jobs_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__jobs_v_published_locale" AS ENUM('en', 'ar', 'fr');
  CREATE TYPE "public"."enum_events_kind" AS ENUM('event', 'recap');
  CREATE TYPE "public"."enum_events_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__events_v_version_kind" AS ENUM('event', 'recap');
  CREATE TYPE "public"."enum__events_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__events_v_published_locale" AS ENUM('en', 'ar', 'fr');
  CREATE TYPE "public"."enum_enquiries_locale" AS ENUM('en', 'ar', 'fr');
  CREATE TYPE "public"."enum_enquiries_kind" AS ENUM('contact', 'quote', 'home');
  CREATE TYPE "public"."enum_enquiries_channel" AS ENUM('WhatsApp', 'Email', 'Call');
  CREATE TYPE "public"."enum_enquiries_status" AS ENUM('new', 'in-progress', 'resolved');
  CREATE TYPE "public"."enum_applications_locale" AS ENUM('en', 'ar', 'fr');
  CREATE TYPE "public"."enum_applications_status" AS ENUM('new', 'in-progress', 'resolved');
  CREATE TYPE "public"."enum_reservations_locale" AS ENUM('en', 'ar', 'fr');
  CREATE TYPE "public"."enum_forms_confirmation_type" AS ENUM('message', 'redirect');
  CREATE TYPE "public"."enum_forms_purpose" AS ENUM('custom', 'home', 'contact', 'quote', 'application', 'reservation', 'search');
  CREATE TYPE "public"."enum_form_submissions_locale" AS ENUM('en', 'ar', 'fr');
  CREATE TYPE "public"."enum_navigation_page_header_left_link_type" AS ENUM('page', 'url');
  CREATE TYPE "public"."enum_navigation_page_header_right_link_type" AS ENUM('page', 'url');
  CREATE TYPE "public"."enum_navigation_page_footer_explore_link_type" AS ENUM('page', 'url');
  CREATE TYPE "public"."enum_navigation_page_footer_company_link_type" AS ENUM('page', 'url');
  CREATE TYPE "public"."enum_navigation_page_footer_legal_link_type" AS ENUM('page', 'url');
  CREATE TABLE "users_sessions" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"created_at" timestamp(3) with time zone,
  	"expires_at" timestamp(3) with time zone NOT NULL
  );
  
  CREATE TABLE "users" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"role_id" integer,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"email" varchar NOT NULL,
  	"reset_password_token" varchar,
  	"reset_password_expiration" timestamp(3) with time zone,
  	"salt" varchar,
  	"hash" varchar,
  	"reset_password_requested_at" timestamp(3) with time zone,
  	"login_attempts" numeric DEFAULT 0,
  	"lock_until" timestamp(3) with time zone
  );
  
  CREATE TABLE "roles" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"description" varchar,
  	"code" varchar,
  	"permissions_media_view" boolean DEFAULT false,
  	"permissions_media_create" boolean DEFAULT false,
  	"permissions_media_edit" boolean DEFAULT false,
  	"permissions_media_delete" boolean DEFAULT false,
  	"permissions_pages_view" boolean DEFAULT false,
  	"permissions_pages_create" boolean DEFAULT false,
  	"permissions_pages_edit" boolean DEFAULT false,
  	"permissions_pages_delete" boolean DEFAULT false,
  	"permissions_translations_view" boolean DEFAULT false,
  	"permissions_translations_create" boolean DEFAULT false,
  	"permissions_translations_edit" boolean DEFAULT false,
  	"permissions_translations_delete" boolean DEFAULT false,
  	"permissions_website_settings_view" boolean DEFAULT false,
  	"permissions_website_settings_edit" boolean DEFAULT false,
  	"permissions_navigation_view" boolean DEFAULT false,
  	"permissions_navigation_edit" boolean DEFAULT false,
  	"permissions_forms_view" boolean DEFAULT false,
  	"permissions_forms_create" boolean DEFAULT false,
  	"permissions_forms_edit" boolean DEFAULT false,
  	"permissions_forms_delete" boolean DEFAULT false,
  	"permissions_categories_view" boolean DEFAULT false,
  	"permissions_categories_create" boolean DEFAULT false,
  	"permissions_categories_edit" boolean DEFAULT false,
  	"permissions_categories_delete" boolean DEFAULT false,
  	"permissions_products_view" boolean DEFAULT false,
  	"permissions_products_create" boolean DEFAULT false,
  	"permissions_products_edit" boolean DEFAULT false,
  	"permissions_products_delete" boolean DEFAULT false,
  	"permissions_product_applications_view" boolean DEFAULT false,
  	"permissions_product_applications_create" boolean DEFAULT false,
  	"permissions_product_applications_edit" boolean DEFAULT false,
  	"permissions_product_applications_delete" boolean DEFAULT false,
  	"permissions_product_concentrations_view" boolean DEFAULT false,
  	"permissions_product_concentrations_create" boolean DEFAULT false,
  	"permissions_product_concentrations_edit" boolean DEFAULT false,
  	"permissions_product_concentrations_delete" boolean DEFAULT false,
  	"permissions_certification_types_view" boolean DEFAULT false,
  	"permissions_certification_types_create" boolean DEFAULT false,
  	"permissions_certification_types_edit" boolean DEFAULT false,
  	"permissions_certification_types_delete" boolean DEFAULT false,
  	"permissions_certifications_view" boolean DEFAULT false,
  	"permissions_certifications_create" boolean DEFAULT false,
  	"permissions_certifications_edit" boolean DEFAULT false,
  	"permissions_certifications_delete" boolean DEFAULT false,
  	"permissions_news_taxonomies_view" boolean DEFAULT false,
  	"permissions_news_taxonomies_create" boolean DEFAULT false,
  	"permissions_news_taxonomies_edit" boolean DEFAULT false,
  	"permissions_news_taxonomies_delete" boolean DEFAULT false,
  	"permissions_news_view" boolean DEFAULT false,
  	"permissions_news_create" boolean DEFAULT false,
  	"permissions_news_edit" boolean DEFAULT false,
  	"permissions_news_delete" boolean DEFAULT false,
  	"permissions_sustainability_goals_view" boolean DEFAULT false,
  	"permissions_sustainability_goals_create" boolean DEFAULT false,
  	"permissions_sustainability_goals_edit" boolean DEFAULT false,
  	"permissions_sustainability_goals_delete" boolean DEFAULT false,
  	"permissions_sustainability_view" boolean DEFAULT false,
  	"permissions_sustainability_create" boolean DEFAULT false,
  	"permissions_sustainability_edit" boolean DEFAULT false,
  	"permissions_sustainability_delete" boolean DEFAULT false,
  	"permissions_jobs_view" boolean DEFAULT false,
  	"permissions_jobs_create" boolean DEFAULT false,
  	"permissions_jobs_edit" boolean DEFAULT false,
  	"permissions_jobs_delete" boolean DEFAULT false,
  	"permissions_applications_view" boolean DEFAULT false,
  	"permissions_applications_create" boolean DEFAULT false,
  	"permissions_applications_edit" boolean DEFAULT false,
  	"permissions_applications_delete" boolean DEFAULT false,
  	"permissions_events_view" boolean DEFAULT false,
  	"permissions_events_create" boolean DEFAULT false,
  	"permissions_events_edit" boolean DEFAULT false,
  	"permissions_events_delete" boolean DEFAULT false,
  	"permissions_reservations_view" boolean DEFAULT false,
  	"permissions_reservations_create" boolean DEFAULT false,
  	"permissions_reservations_edit" boolean DEFAULT false,
  	"permissions_reservations_delete" boolean DEFAULT false,
  	"permissions_enquiries_view" boolean DEFAULT false,
  	"permissions_enquiries_create" boolean DEFAULT false,
  	"permissions_enquiries_edit" boolean DEFAULT false,
  	"permissions_enquiries_delete" boolean DEFAULT false,
  	"permissions_users_view" boolean DEFAULT false,
  	"permissions_users_create" boolean DEFAULT false,
  	"permissions_users_edit" boolean DEFAULT false,
  	"permissions_users_delete" boolean DEFAULT false,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "media" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"source_url" varchar,
  	"prefix" varchar DEFAULT 'payload/media',
  	"_objectkey" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"url" varchar,
  	"thumbnail_u_r_l" varchar,
  	"filename" varchar,
  	"mime_type" varchar,
  	"filesize" numeric,
  	"width" numeric,
  	"height" numeric,
  	"focal_x" numeric,
  	"focal_y" numeric
  );
  
  CREATE TABLE "media_locales" (
  	"alt" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "product_applications" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"_order" varchar,
  	"source_id" numeric,
  	"generate_slug" boolean DEFAULT true,
  	"key" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_product_applications_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "product_applications_locales" (
  	"name" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_product_applications_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version__order" varchar,
  	"version_source_id" numeric,
  	"version_generate_slug" boolean DEFAULT true,
  	"version_key" varchar,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__product_applications_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"snapshot" boolean,
  	"published_locale" "enum__product_applications_v_published_locale",
  	"latest" boolean
  );
  
  CREATE TABLE "_product_applications_v_locales" (
  	"version_name" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "product_concentrations" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"_order" varchar,
  	"source_id" numeric,
  	"generate_slug" boolean DEFAULT true,
  	"key" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_product_concentrations_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "product_concentrations_locales" (
  	"name" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_product_concentrations_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version__order" varchar,
  	"version_source_id" numeric,
  	"version_generate_slug" boolean DEFAULT true,
  	"version_key" varchar,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__product_concentrations_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"snapshot" boolean,
  	"published_locale" "enum__product_concentrations_v_published_locale",
  	"latest" boolean
  );
  
  CREATE TABLE "_product_concentrations_v_locales" (
  	"version_name" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "sustainability_goals" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"_order" varchar,
  	"source_id" numeric,
  	"reference" numeric,
  	"color" varchar,
  	"image_id" integer,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_sustainability_goals_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "sustainability_goals_locales" (
  	"name" varchar,
  	"alt" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_sustainability_goals_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version__order" varchar,
  	"version_source_id" numeric,
  	"version_reference" numeric,
  	"version_color" varchar,
  	"version_image_id" integer,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__sustainability_goals_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"snapshot" boolean,
  	"published_locale" "enum__sustainability_goals_v_published_locale",
  	"latest" boolean
  );
  
  CREATE TABLE "_sustainability_goals_v_locales" (
  	"version_name" varchar,
  	"version_alt" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "pages" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"_order" varchar,
  	"generate_slug" boolean DEFAULT true,
  	"slug" varchar,
  	"source_key" varchar,
  	"layout" jsonb,
  	"page_seo_social_image_id" integer,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_pages_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "pages_locales" (
  	"title" varchar,
  	"page_copy_seo_title" varchar,
  	"page_copy_contact_title" jsonb,
  	"page_copy_related_title" jsonb,
  	"page_copy_contact_kicker" varchar,
  	"page_copy_related_kicker" varchar,
  	"page_copy_seo_description" varchar,
  	"page_copy_contact_description" varchar,
  	"page_seo_title" varchar,
  	"page_seo_description" varchar,
  	"page_seo_social_title" varchar,
  	"page_seo_social_description" varchar,
  	"page_empty_states_no_tds" varchar,
  	"page_empty_states_no_company" varchar,
  	"page_empty_states_empty" varchar,
  	"page_related_title" jsonb,
  	"page_related_kicker" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "pages_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"sustainability_goals_id" integer
  );
  
  CREATE TABLE "_pages_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version__order" varchar,
  	"version_generate_slug" boolean DEFAULT true,
  	"version_slug" varchar,
  	"version_source_key" varchar,
  	"version_layout" jsonb,
  	"version_page_seo_social_image_id" integer,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__pages_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"snapshot" boolean,
  	"published_locale" "enum__pages_v_published_locale",
  	"latest" boolean,
  	"autosave" boolean
  );
  
  CREATE TABLE "_pages_v_locales" (
  	"version_title" varchar,
  	"version_page_copy_seo_title" varchar,
  	"version_page_copy_contact_title" jsonb,
  	"version_page_copy_related_title" jsonb,
  	"version_page_copy_contact_kicker" varchar,
  	"version_page_copy_related_kicker" varchar,
  	"version_page_copy_seo_description" varchar,
  	"version_page_copy_contact_description" varchar,
  	"version_page_seo_title" varchar,
  	"version_page_seo_description" varchar,
  	"version_page_seo_social_title" varchar,
  	"version_page_seo_social_description" varchar,
  	"version_page_empty_states_no_tds" varchar,
  	"version_page_empty_states_no_company" varchar,
  	"version_page_empty_states_empty" varchar,
  	"version_page_related_title" jsonb,
  	"version_page_related_kicker" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"sustainability_goals_id" integer
  );
  
  CREATE TABLE "categories_page_artwork_images" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer
  );
  
  CREATE TABLE "categories_page_artwork_images_locales" (
  	"caption" varchar,
  	"alt" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "categories" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"_order" varchar,
  	"source_id" numeric,
  	"generate_slug" boolean DEFAULT true,
  	"slug" varchar,
  	"layout" jsonb,
  	"icon_id" integer,
  	"page_artwork_enabled" boolean DEFAULT true,
  	"page_sort_order" numeric,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_categories_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "categories_locales" (
  	"title" jsonb,
  	"name" varchar,
  	"description" varchar,
  	"seo_title" varchar,
  	"seo_description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_categories_v_version_page_artwork_images" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_categories_v_version_page_artwork_images_locales" (
  	"caption" varchar,
  	"alt" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_categories_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version__order" varchar,
  	"version_source_id" numeric,
  	"version_generate_slug" boolean DEFAULT true,
  	"version_slug" varchar,
  	"version_layout" jsonb,
  	"version_icon_id" integer,
  	"version_page_artwork_enabled" boolean DEFAULT true,
  	"version_page_sort_order" numeric,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__categories_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"snapshot" boolean,
  	"published_locale" "enum__categories_v_published_locale",
  	"latest" boolean
  );
  
  CREATE TABLE "_categories_v_locales" (
  	"version_title" jsonb,
  	"version_name" varchar,
  	"version_description" varchar,
  	"version_seo_title" varchar,
  	"version_seo_description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "products_page_artwork_images" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer
  );
  
  CREATE TABLE "products_page_artwork_images_locales" (
  	"caption" varchar,
  	"alt" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "products" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"_order" varchar,
  	"source_id" numeric,
  	"generate_slug" boolean DEFAULT true,
  	"slug" varchar,
  	"category_id" integer,
  	"layout" jsonb,
  	"page_artwork_enabled" boolean DEFAULT true,
  	"page_sort_order" numeric,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_products_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "products_locales" (
  	"title" jsonb,
  	"name" varchar,
  	"description" varchar,
  	"tds_id" integer,
  	"seo_title" varchar,
  	"seo_description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "products_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"product_applications_id" integer,
  	"product_concentrations_id" integer
  );
  
  CREATE TABLE "_products_v_version_page_artwork_images" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_products_v_version_page_artwork_images_locales" (
  	"caption" varchar,
  	"alt" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_products_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version__order" varchar,
  	"version_source_id" numeric,
  	"version_generate_slug" boolean DEFAULT true,
  	"version_slug" varchar,
  	"version_category_id" integer,
  	"version_layout" jsonb,
  	"version_page_artwork_enabled" boolean DEFAULT true,
  	"version_page_sort_order" numeric,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__products_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"snapshot" boolean,
  	"published_locale" "enum__products_v_published_locale",
  	"latest" boolean
  );
  
  CREATE TABLE "_products_v_locales" (
  	"version_title" jsonb,
  	"version_name" varchar,
  	"version_description" varchar,
  	"version_tds_id" integer,
  	"version_seo_title" varchar,
  	"version_seo_description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_products_v_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"product_applications_id" integer,
  	"product_concentrations_id" integer
  );
  
  CREATE TABLE "certification_types" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"source_id" numeric,
  	"generate_slug" boolean DEFAULT true,
  	"slug" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_certification_types_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "certification_types_locales" (
  	"name" varchar,
  	"description" varchar,
  	"logo_id" integer,
  	"badge" varchar,
  	"kind" "enum_certification_types_kind",
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_certification_types_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_source_id" numeric,
  	"version_generate_slug" boolean DEFAULT true,
  	"version_slug" varchar,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__certification_types_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"snapshot" boolean,
  	"published_locale" "enum__certification_types_v_published_locale",
  	"latest" boolean
  );
  
  CREATE TABLE "_certification_types_v_locales" (
  	"version_name" varchar,
  	"version_description" varchar,
  	"version_logo_id" integer,
  	"version_badge" varchar,
  	"version_kind" "enum__certification_types_v_version_kind",
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "certifications" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"source_id" numeric,
  	"certification_type_id" integer,
  	"holder" "enum_certifications_holder",
  	"standing" "enum_certifications_standing",
  	"target_date" varchar,
  	"issue_date" varchar,
  	"expiry_date" varchar,
  	"certificate_number" varchar,
  	"page_sort_order" numeric,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_certifications_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "certifications_locales" (
  	"name" varchar,
  	"scope" varchar,
  	"document_id" integer,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_certifications_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_source_id" numeric,
  	"version_certification_type_id" integer,
  	"version_holder" "enum__certifications_v_version_holder",
  	"version_standing" "enum__certifications_v_version_standing",
  	"version_target_date" varchar,
  	"version_issue_date" varchar,
  	"version_expiry_date" varchar,
  	"version_certificate_number" varchar,
  	"version_page_sort_order" numeric,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__certifications_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"snapshot" boolean,
  	"published_locale" "enum__certifications_v_published_locale",
  	"latest" boolean
  );
  
  CREATE TABLE "_certifications_v_locales" (
  	"version_name" varchar,
  	"version_scope" varchar,
  	"version_document_id" integer,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "news_taxonomies" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"source_id" numeric,
  	"generate_slug" boolean DEFAULT true,
  	"slug" varchar,
  	"kind" "enum_news_taxonomies_kind" DEFAULT 'tag',
  	"page_sort_order" numeric,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_news_taxonomies_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "news_taxonomies_locales" (
  	"name" varchar,
  	"page_metadata_locale_tree_description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_news_taxonomies_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_source_id" numeric,
  	"version_generate_slug" boolean DEFAULT true,
  	"version_slug" varchar,
  	"version_kind" "enum__news_taxonomies_v_version_kind" DEFAULT 'tag',
  	"version_page_sort_order" numeric,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__news_taxonomies_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"snapshot" boolean,
  	"published_locale" "enum__news_taxonomies_v_published_locale",
  	"latest" boolean
  );
  
  CREATE TABLE "_news_taxonomies_v_locales" (
  	"version_name" varchar,
  	"version_page_metadata_locale_tree_description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "news" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"_order" varchar,
  	"source_id" numeric,
  	"relationships_category_id" integer,
  	"relationships_previous_article_id" integer,
  	"relationships_next_article_id" integer,
  	"generate_slug" boolean DEFAULT true,
  	"slug" varchar,
  	"layout" jsonb,
  	"page_metadata_date" varchar,
  	"page_metadata_featured" boolean,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_news_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "news_locales" (
  	"title" jsonb,
  	"name" varchar,
  	"seo_title" varchar,
  	"seo_description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "news_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"news_taxonomies_id" integer,
  	"news_id" integer
  );
  
  CREATE TABLE "_news_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version__order" varchar,
  	"version_source_id" numeric,
  	"version_relationships_category_id" integer,
  	"version_relationships_previous_article_id" integer,
  	"version_relationships_next_article_id" integer,
  	"version_generate_slug" boolean DEFAULT true,
  	"version_slug" varchar,
  	"version_layout" jsonb,
  	"version_page_metadata_date" varchar,
  	"version_page_metadata_featured" boolean,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__news_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"snapshot" boolean,
  	"published_locale" "enum__news_v_published_locale",
  	"latest" boolean
  );
  
  CREATE TABLE "_news_v_locales" (
  	"version_title" jsonb,
  	"version_name" varchar,
  	"version_seo_title" varchar,
  	"version_seo_description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_news_v_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"news_taxonomies_id" integer,
  	"news_id" integer
  );
  
  CREATE TABLE "sustainability" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"_order" varchar,
  	"source_id" numeric,
  	"relationships_primary_goal_id" integer,
  	"generate_slug" boolean DEFAULT true,
  	"slug" varchar,
  	"layout" jsonb,
  	"page_metadata_date" varchar,
  	"page_metadata_updated_date" varchar,
  	"page_metadata_featured" boolean,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_sustainability_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "sustainability_locales" (
  	"title" jsonb,
  	"name" varchar,
  	"seo_title" varchar,
  	"seo_description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "sustainability_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"sustainability_goals_id" integer,
  	"sustainability_id" integer
  );
  
  CREATE TABLE "_sustainability_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version__order" varchar,
  	"version_source_id" numeric,
  	"version_relationships_primary_goal_id" integer,
  	"version_generate_slug" boolean DEFAULT true,
  	"version_slug" varchar,
  	"version_layout" jsonb,
  	"version_page_metadata_date" varchar,
  	"version_page_metadata_updated_date" varchar,
  	"version_page_metadata_featured" boolean,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__sustainability_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"snapshot" boolean,
  	"published_locale" "enum__sustainability_v_published_locale",
  	"latest" boolean
  );
  
  CREATE TABLE "_sustainability_v_locales" (
  	"version_title" jsonb,
  	"version_name" varchar,
  	"version_seo_title" varchar,
  	"version_seo_description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_sustainability_v_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"sustainability_goals_id" integer,
  	"sustainability_id" integer
  );
  
  CREATE TABLE "jobs" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"_order" varchar,
  	"source_id" numeric,
  	"generate_slug" boolean DEFAULT true,
  	"slug" varchar,
  	"availability" "enum_jobs_availability" DEFAULT 'open',
  	"layout" jsonb,
  	"page_code" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_jobs_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "jobs_locales" (
  	"title" jsonb,
  	"name" varchar,
  	"department" varchar,
  	"location" varchar,
  	"contract" varchar,
  	"experience" varchar,
  	"reports_to" varchar,
  	"closing" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_jobs_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version__order" varchar,
  	"version_source_id" numeric,
  	"version_generate_slug" boolean DEFAULT true,
  	"version_slug" varchar,
  	"version_availability" "enum__jobs_v_version_availability" DEFAULT 'open',
  	"version_layout" jsonb,
  	"version_page_code" varchar,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__jobs_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"snapshot" boolean,
  	"published_locale" "enum__jobs_v_published_locale",
  	"latest" boolean
  );
  
  CREATE TABLE "_jobs_v_locales" (
  	"version_title" jsonb,
  	"version_name" varchar,
  	"version_department" varchar,
  	"version_location" varchar,
  	"version_contract" varchar,
  	"version_experience" varchar,
  	"version_reports_to" varchar,
  	"version_closing" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "events_meeting_schedule" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"starts_at" timestamp(3) with time zone,
  	"ends_at" timestamp(3) with time zone,
  	"duration" numeric DEFAULT 30,
  	"gap" numeric DEFAULT 0
  );
  
  CREATE TABLE "events" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"_order" varchar,
  	"source_id" numeric,
  	"generate_slug" boolean DEFAULT true,
  	"slug" varchar,
  	"kind" "enum_events_kind",
  	"layout" jsonb,
  	"starts_at" timestamp(3) with time zone,
  	"ends_at" timestamp(3) with time zone,
  	"page_sort_order" numeric,
  	"page_seo_social_image_id" integer,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_events_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "events_locales" (
  	"title" jsonb,
  	"name" varchar,
  	"location" varchar,
  	"venue" varchar,
  	"stand" varchar,
  	"page_seo_title" varchar,
  	"page_seo_description" varchar,
  	"page_seo_social_title" varchar,
  	"page_seo_social_description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_events_v_version_meeting_schedule" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"starts_at" timestamp(3) with time zone,
  	"ends_at" timestamp(3) with time zone,
  	"duration" numeric DEFAULT 30,
  	"gap" numeric DEFAULT 0,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_events_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version__order" varchar,
  	"version_source_id" numeric,
  	"version_generate_slug" boolean DEFAULT true,
  	"version_slug" varchar,
  	"version_kind" "enum__events_v_version_kind",
  	"version_layout" jsonb,
  	"version_starts_at" timestamp(3) with time zone,
  	"version_ends_at" timestamp(3) with time zone,
  	"version_page_sort_order" numeric,
  	"version_page_seo_social_image_id" integer,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__events_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"snapshot" boolean,
  	"published_locale" "enum__events_v_published_locale",
  	"latest" boolean
  );
  
  CREATE TABLE "_events_v_locales" (
  	"version_title" jsonb,
  	"version_name" varchar,
  	"version_location" varchar,
  	"version_venue" varchar,
  	"version_stand" varchar,
  	"version_page_seo_title" varchar,
  	"version_page_seo_description" varchar,
  	"version_page_seo_social_title" varchar,
  	"version_page_seo_social_description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "translations" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"source_id" numeric,
  	"key" varchar NOT NULL,
  	"group" varchar NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "translations_locales" (
  	"text" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "enquiries" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"email" varchar NOT NULL,
  	"company" varchar,
  	"country" varchar,
  	"dial_code" varchar,
  	"locale" "enum_enquiries_locale" NOT NULL,
  	"key" varchar NOT NULL,
  	"phone" varchar,
  	"consent" boolean,
  	"kind" "enum_enquiries_kind" NOT NULL,
  	"job_title" varchar,
  	"website" varchar,
  	"industry" varchar,
  	"category_id" integer,
  	"product" varchar,
  	"volume" varchar,
  	"channel" "enum_enquiries_channel",
  	"message" varchar,
  	"brix" varchar,
  	"destination" varchar,
  	"status" "enum_enquiries_status" DEFAULT 'new',
  	"notes" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "applications" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"email" varchar NOT NULL,
  	"phone" varchar,
  	"company" varchar,
  	"country" varchar,
  	"dial_code" varchar,
  	"locale" "enum_applications_locale" NOT NULL,
  	"key" varchar NOT NULL,
  	"consent" boolean DEFAULT false NOT NULL,
  	"cv_id" integer,
  	"job_id" integer,
  	"department" varchar,
  	"letter" varchar,
  	"status" "enum_applications_status" DEFAULT 'new',
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"url" varchar,
  	"thumbnail_u_r_l" varchar,
  	"filename" varchar,
  	"mime_type" varchar,
  	"filesize" numeric,
  	"width" numeric,
  	"height" numeric,
  	"focal_x" numeric,
  	"focal_y" numeric
  );
  
  CREATE TABLE "meeting_slots" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"event_id" integer NOT NULL,
  	"starts_at" timestamp(3) with time zone NOT NULL,
  	"ends_at" timestamp(3) with time zone NOT NULL,
  	"reserved" boolean DEFAULT false,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "reservations" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"email" varchar NOT NULL,
  	"phone" varchar,
  	"company" varchar,
  	"country" varchar,
  	"dial_code" varchar,
  	"locale" "enum_reservations_locale" NOT NULL,
  	"key" varchar NOT NULL,
  	"consent" boolean DEFAULT false NOT NULL,
  	"slot_id" integer NOT NULL,
  	"topic" varchar,
  	"message" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "application_files" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"url" varchar,
  	"thumbnail_u_r_l" varchar,
  	"filename" varchar,
  	"mime_type" varchar,
  	"filesize" numeric,
  	"width" numeric,
  	"height" numeric,
  	"focal_x" numeric,
  	"focal_y" numeric
  );
  
  CREATE TABLE "public_content" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"resource" varchar NOT NULL,
  	"content" jsonb NOT NULL,
  	"summary" jsonb,
  	"localized_content" jsonb,
  	"localized_summary" jsonb,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "forms_emails" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"email_to" varchar,
  	"cc" varchar,
  	"bcc" varchar,
  	"reply_to" varchar,
  	"email_from" varchar
  );
  
  CREATE TABLE "forms_emails_locales" (
  	"subject" varchar DEFAULT 'You''ve received a new message.' NOT NULL,
  	"message" jsonb,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "forms" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"fields" jsonb,
  	"confirmation_type" "enum_forms_confirmation_type" DEFAULT 'message',
  	"redirect_url" varchar,
  	"key" varchar,
  	"purpose" "enum_forms_purpose" DEFAULT 'custom' NOT NULL,
  	"make_default" boolean DEFAULT false,
  	"apply_to_existing" boolean DEFAULT false,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "forms_locales" (
  	"submit_button_label" varchar,
  	"confirmation_message" jsonb,
  	"ui_sending" varchar DEFAULT 'Sending…',
  	"ui_invalid" varchar DEFAULT 'Please check this field.',
  	"ui_failure" varchar DEFAULT 'Unable to submit. Please try again.',
  	"ui_cancel" varchar,
  	"ui_loading_failure" varchar,
  	"ui_whatsapp_sales" varchar,
  	"ui_position_label" varchar,
  	"ui_pick_another_slot" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "forms_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"pages_id" integer,
  	"jobs_id" integer,
  	"events_id" integer,
  	"products_id" integer
  );
  
  CREATE TABLE "form_submissions_submission_data" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"field" varchar NOT NULL,
  	"value" varchar NOT NULL,
  	"label" varchar,
  	"category_id" integer
  );
  
  CREATE TABLE "form_submissions_submission_uploads" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"field" varchar NOT NULL
  );
  
  CREATE TABLE "form_submissions" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"form_id" integer NOT NULL,
  	"page_id" integer,
  	"locale" "enum_form_submissions_locale" NOT NULL,
  	"key" varchar NOT NULL,
  	"slot_id" numeric,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "form_submissions_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"application_files_id" integer,
  	"enquiries_id" integer,
  	"applications_id" integer,
  	"reservations_id" integer
  );
  
  CREATE TABLE "payload_kv" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"key" varchar NOT NULL,
  	"data" jsonb NOT NULL
  );
  
  CREATE TABLE "payload_locked_documents" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"global_slug" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_locked_documents_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"users_id" integer,
  	"roles_id" integer,
  	"media_id" integer,
  	"product_applications_id" integer,
  	"product_concentrations_id" integer,
  	"sustainability_goals_id" integer,
  	"pages_id" integer,
  	"categories_id" integer,
  	"products_id" integer,
  	"certification_types_id" integer,
  	"certifications_id" integer,
  	"news_taxonomies_id" integer,
  	"news_id" integer,
  	"sustainability_id" integer,
  	"jobs_id" integer,
  	"events_id" integer,
  	"translations_id" integer,
  	"enquiries_id" integer,
  	"applications_id" integer,
  	"meeting_slots_id" integer,
  	"reservations_id" integer,
  	"application_files_id" integer,
  	"public_content_id" integer,
  	"forms_id" integer,
  	"form_submissions_id" integer
  );
  
  CREATE TABLE "payload_preferences" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"key" varchar,
  	"value" jsonb,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_preferences_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"users_id" integer
  );
  
  CREATE TABLE "payload_migrations" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"batch" numeric,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "website_settings" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"page_icon_id" integer,
  	"page_logo_id" integer,
  	"page_group_logo_id" integer,
  	"page_social_image_id" integer,
  	"page_company_email" varchar,
  	"page_company_phone" varchar,
  	"page_company_export_phone" varchar,
  	"page_company_secondary_phone" varchar,
  	"page_company_sales_whatsapp" varchar,
  	"page_company_website" varchar,
  	"page_company_social_links_facebook" varchar,
  	"page_company_social_links_instagram" varchar,
  	"page_company_social_links_linkedin" varchar,
  	"page_company_social_links_youtube" varchar,
  	"page_company_social_links_whatsapp" varchar,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "website_settings_locales" (
  	"page_site_name" varchar,
  	"page_company_address" varchar,
  	"page_company_profile_id" integer,
  	"page_default_seo_title" varchar,
  	"page_default_seo_description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "navigation_page_header_left" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"link_type" "enum_navigation_page_header_left_link_type" DEFAULT 'page' NOT NULL,
  	"page_id" integer,
  	"url" varchar
  );
  
  CREATE TABLE "navigation_page_header_left_locales" (
  	"label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "navigation_page_header_right" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"link_type" "enum_navigation_page_header_right_link_type" DEFAULT 'page' NOT NULL,
  	"page_id" integer,
  	"url" varchar
  );
  
  CREATE TABLE "navigation_page_header_right_locales" (
  	"label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "navigation_page_footer_explore" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"link_type" "enum_navigation_page_footer_explore_link_type" DEFAULT 'page' NOT NULL,
  	"page_id" integer,
  	"url" varchar
  );
  
  CREATE TABLE "navigation_page_footer_explore_locales" (
  	"label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "navigation_page_footer_company" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"link_type" "enum_navigation_page_footer_company_link_type" DEFAULT 'page' NOT NULL,
  	"page_id" integer,
  	"url" varchar
  );
  
  CREATE TABLE "navigation_page_footer_company_locales" (
  	"label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "navigation_page_footer_legal" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"link_type" "enum_navigation_page_footer_legal_link_type" DEFAULT 'page' NOT NULL,
  	"page_id" integer,
  	"url" varchar
  );
  
  CREATE TABLE "navigation_page_footer_legal_locales" (
  	"label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "navigation" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"page_header_enabled" boolean DEFAULT true,
  	"page_footer_enabled" boolean,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "navigation_locales" (
  	"page_footer_text2_values" varchar,
  	"page_footer_text3_values" varchar,
  	"page_footer_text4_values" varchar,
  	"page_footer_text9_values" varchar,
  	"page_footer_text16_values" varchar,
  	"page_footer_text17_values" varchar,
  	"page_footer_text18_values" varchar,
  	"page_footer_text23_values" varchar,
  	"page_footer_text24_values" varchar,
  	"page_footer_text25_values" varchar,
  	"page_footer_text26_values" varchar,
  	"page_footer_text27_values" varchar,
  	"page_footer_text28_values" varchar,
  	"page_footer_text29_values" varchar,
  	"page_footer_body_values" jsonb,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  ALTER TABLE "users_sessions" ADD CONSTRAINT "users_sessions_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "users" ADD CONSTRAINT "users_role_id_roles_id_fk" FOREIGN KEY ("role_id") REFERENCES "public"."roles"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "media_locales" ADD CONSTRAINT "media_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "product_applications_locales" ADD CONSTRAINT "product_applications_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."product_applications"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_product_applications_v" ADD CONSTRAINT "_product_applications_v_parent_id_product_applications_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."product_applications"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_product_applications_v_locales" ADD CONSTRAINT "_product_applications_v_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_product_applications_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "product_concentrations_locales" ADD CONSTRAINT "product_concentrations_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."product_concentrations"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_product_concentrations_v" ADD CONSTRAINT "_product_concentrations_v_parent_id_product_concentrations_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."product_concentrations"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_product_concentrations_v_locales" ADD CONSTRAINT "_product_concentrations_v_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_product_concentrations_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "sustainability_goals" ADD CONSTRAINT "sustainability_goals_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "sustainability_goals_locales" ADD CONSTRAINT "sustainability_goals_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."sustainability_goals"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_sustainability_goals_v" ADD CONSTRAINT "_sustainability_goals_v_parent_id_sustainability_goals_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."sustainability_goals"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_sustainability_goals_v" ADD CONSTRAINT "_sustainability_goals_v_version_image_id_media_id_fk" FOREIGN KEY ("version_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_sustainability_goals_v_locales" ADD CONSTRAINT "_sustainability_goals_v_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_sustainability_goals_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages" ADD CONSTRAINT "pages_page_seo_social_image_id_media_id_fk" FOREIGN KEY ("page_seo_social_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_locales" ADD CONSTRAINT "pages_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_rels" ADD CONSTRAINT "pages_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_rels" ADD CONSTRAINT "pages_rels_sustainability_goals_fk" FOREIGN KEY ("sustainability_goals_id") REFERENCES "public"."sustainability_goals"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v" ADD CONSTRAINT "_pages_v_parent_id_pages_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v" ADD CONSTRAINT "_pages_v_version_page_seo_social_image_id_media_id_fk" FOREIGN KEY ("version_page_seo_social_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_locales" ADD CONSTRAINT "_pages_v_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_rels" ADD CONSTRAINT "_pages_v_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_rels" ADD CONSTRAINT "_pages_v_rels_sustainability_goals_fk" FOREIGN KEY ("sustainability_goals_id") REFERENCES "public"."sustainability_goals"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "categories_page_artwork_images" ADD CONSTRAINT "categories_page_artwork_images_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "categories_page_artwork_images" ADD CONSTRAINT "categories_page_artwork_images_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."categories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "categories_page_artwork_images_locales" ADD CONSTRAINT "categories_page_artwork_images_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."categories_page_artwork_images"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "categories" ADD CONSTRAINT "categories_icon_id_media_id_fk" FOREIGN KEY ("icon_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "categories_locales" ADD CONSTRAINT "categories_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."categories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_categories_v_version_page_artwork_images" ADD CONSTRAINT "_categories_v_version_page_artwork_images_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_categories_v_version_page_artwork_images" ADD CONSTRAINT "_categories_v_version_page_artwork_images_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_categories_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_categories_v_version_page_artwork_images_locales" ADD CONSTRAINT "_categories_v_version_page_artwork_images_locales_parent__fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_categories_v_version_page_artwork_images"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_categories_v" ADD CONSTRAINT "_categories_v_parent_id_categories_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."categories"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_categories_v" ADD CONSTRAINT "_categories_v_version_icon_id_media_id_fk" FOREIGN KEY ("version_icon_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_categories_v_locales" ADD CONSTRAINT "_categories_v_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_categories_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "products_page_artwork_images" ADD CONSTRAINT "products_page_artwork_images_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "products_page_artwork_images" ADD CONSTRAINT "products_page_artwork_images_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."products"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "products_page_artwork_images_locales" ADD CONSTRAINT "products_page_artwork_images_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."products_page_artwork_images"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "products" ADD CONSTRAINT "products_category_id_categories_id_fk" FOREIGN KEY ("category_id") REFERENCES "public"."categories"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "products_locales" ADD CONSTRAINT "products_locales_tds_id_media_id_fk" FOREIGN KEY ("tds_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "products_locales" ADD CONSTRAINT "products_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."products"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "products_rels" ADD CONSTRAINT "products_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."products"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "products_rels" ADD CONSTRAINT "products_rels_product_applications_fk" FOREIGN KEY ("product_applications_id") REFERENCES "public"."product_applications"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "products_rels" ADD CONSTRAINT "products_rels_product_concentrations_fk" FOREIGN KEY ("product_concentrations_id") REFERENCES "public"."product_concentrations"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_products_v_version_page_artwork_images" ADD CONSTRAINT "_products_v_version_page_artwork_images_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_products_v_version_page_artwork_images" ADD CONSTRAINT "_products_v_version_page_artwork_images_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_products_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_products_v_version_page_artwork_images_locales" ADD CONSTRAINT "_products_v_version_page_artwork_images_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_products_v_version_page_artwork_images"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_products_v" ADD CONSTRAINT "_products_v_parent_id_products_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."products"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_products_v" ADD CONSTRAINT "_products_v_version_category_id_categories_id_fk" FOREIGN KEY ("version_category_id") REFERENCES "public"."categories"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_products_v_locales" ADD CONSTRAINT "_products_v_locales_version_tds_id_media_id_fk" FOREIGN KEY ("version_tds_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_products_v_locales" ADD CONSTRAINT "_products_v_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_products_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_products_v_rels" ADD CONSTRAINT "_products_v_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_products_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_products_v_rels" ADD CONSTRAINT "_products_v_rels_product_applications_fk" FOREIGN KEY ("product_applications_id") REFERENCES "public"."product_applications"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_products_v_rels" ADD CONSTRAINT "_products_v_rels_product_concentrations_fk" FOREIGN KEY ("product_concentrations_id") REFERENCES "public"."product_concentrations"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "certification_types_locales" ADD CONSTRAINT "certification_types_locales_logo_id_media_id_fk" FOREIGN KEY ("logo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "certification_types_locales" ADD CONSTRAINT "certification_types_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."certification_types"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_certification_types_v" ADD CONSTRAINT "_certification_types_v_parent_id_certification_types_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."certification_types"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_certification_types_v_locales" ADD CONSTRAINT "_certification_types_v_locales_version_logo_id_media_id_fk" FOREIGN KEY ("version_logo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_certification_types_v_locales" ADD CONSTRAINT "_certification_types_v_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_certification_types_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "certifications" ADD CONSTRAINT "certifications_certification_type_id_certification_types_id_fk" FOREIGN KEY ("certification_type_id") REFERENCES "public"."certification_types"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "certifications_locales" ADD CONSTRAINT "certifications_locales_document_id_media_id_fk" FOREIGN KEY ("document_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "certifications_locales" ADD CONSTRAINT "certifications_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."certifications"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_certifications_v" ADD CONSTRAINT "_certifications_v_parent_id_certifications_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."certifications"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_certifications_v" ADD CONSTRAINT "_certifications_v_version_certification_type_id_certification_types_id_fk" FOREIGN KEY ("version_certification_type_id") REFERENCES "public"."certification_types"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_certifications_v_locales" ADD CONSTRAINT "_certifications_v_locales_version_document_id_media_id_fk" FOREIGN KEY ("version_document_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_certifications_v_locales" ADD CONSTRAINT "_certifications_v_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_certifications_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "news_taxonomies_locales" ADD CONSTRAINT "news_taxonomies_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."news_taxonomies"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_news_taxonomies_v" ADD CONSTRAINT "_news_taxonomies_v_parent_id_news_taxonomies_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."news_taxonomies"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_news_taxonomies_v_locales" ADD CONSTRAINT "_news_taxonomies_v_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_news_taxonomies_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "news" ADD CONSTRAINT "news_relationships_category_id_news_taxonomies_id_fk" FOREIGN KEY ("relationships_category_id") REFERENCES "public"."news_taxonomies"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "news" ADD CONSTRAINT "news_relationships_previous_article_id_news_id_fk" FOREIGN KEY ("relationships_previous_article_id") REFERENCES "public"."news"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "news" ADD CONSTRAINT "news_relationships_next_article_id_news_id_fk" FOREIGN KEY ("relationships_next_article_id") REFERENCES "public"."news"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "news_locales" ADD CONSTRAINT "news_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."news"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "news_rels" ADD CONSTRAINT "news_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."news"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "news_rels" ADD CONSTRAINT "news_rels_news_taxonomies_fk" FOREIGN KEY ("news_taxonomies_id") REFERENCES "public"."news_taxonomies"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "news_rels" ADD CONSTRAINT "news_rels_news_fk" FOREIGN KEY ("news_id") REFERENCES "public"."news"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_news_v" ADD CONSTRAINT "_news_v_parent_id_news_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."news"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_news_v" ADD CONSTRAINT "_news_v_version_relationships_category_id_news_taxonomies_id_fk" FOREIGN KEY ("version_relationships_category_id") REFERENCES "public"."news_taxonomies"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_news_v" ADD CONSTRAINT "_news_v_version_relationships_previous_article_id_news_id_fk" FOREIGN KEY ("version_relationships_previous_article_id") REFERENCES "public"."news"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_news_v" ADD CONSTRAINT "_news_v_version_relationships_next_article_id_news_id_fk" FOREIGN KEY ("version_relationships_next_article_id") REFERENCES "public"."news"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_news_v_locales" ADD CONSTRAINT "_news_v_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_news_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_news_v_rels" ADD CONSTRAINT "_news_v_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_news_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_news_v_rels" ADD CONSTRAINT "_news_v_rels_news_taxonomies_fk" FOREIGN KEY ("news_taxonomies_id") REFERENCES "public"."news_taxonomies"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_news_v_rels" ADD CONSTRAINT "_news_v_rels_news_fk" FOREIGN KEY ("news_id") REFERENCES "public"."news"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "sustainability" ADD CONSTRAINT "sustainability_relationships_primary_goal_id_sustainability_goals_id_fk" FOREIGN KEY ("relationships_primary_goal_id") REFERENCES "public"."sustainability_goals"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "sustainability_locales" ADD CONSTRAINT "sustainability_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."sustainability"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "sustainability_rels" ADD CONSTRAINT "sustainability_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."sustainability"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "sustainability_rels" ADD CONSTRAINT "sustainability_rels_sustainability_goals_fk" FOREIGN KEY ("sustainability_goals_id") REFERENCES "public"."sustainability_goals"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "sustainability_rels" ADD CONSTRAINT "sustainability_rels_sustainability_fk" FOREIGN KEY ("sustainability_id") REFERENCES "public"."sustainability"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_sustainability_v" ADD CONSTRAINT "_sustainability_v_parent_id_sustainability_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."sustainability"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_sustainability_v" ADD CONSTRAINT "_sustainability_v_version_relationships_primary_goal_id_sustainability_goals_id_fk" FOREIGN KEY ("version_relationships_primary_goal_id") REFERENCES "public"."sustainability_goals"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_sustainability_v_locales" ADD CONSTRAINT "_sustainability_v_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_sustainability_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_sustainability_v_rels" ADD CONSTRAINT "_sustainability_v_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_sustainability_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_sustainability_v_rels" ADD CONSTRAINT "_sustainability_v_rels_sustainability_goals_fk" FOREIGN KEY ("sustainability_goals_id") REFERENCES "public"."sustainability_goals"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_sustainability_v_rels" ADD CONSTRAINT "_sustainability_v_rels_sustainability_fk" FOREIGN KEY ("sustainability_id") REFERENCES "public"."sustainability"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "jobs_locales" ADD CONSTRAINT "jobs_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."jobs"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_jobs_v" ADD CONSTRAINT "_jobs_v_parent_id_jobs_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."jobs"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_jobs_v_locales" ADD CONSTRAINT "_jobs_v_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_jobs_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "events_meeting_schedule" ADD CONSTRAINT "events_meeting_schedule_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."events"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "events" ADD CONSTRAINT "events_page_seo_social_image_id_media_id_fk" FOREIGN KEY ("page_seo_social_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "events_locales" ADD CONSTRAINT "events_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."events"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_events_v_version_meeting_schedule" ADD CONSTRAINT "_events_v_version_meeting_schedule_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_events_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_events_v" ADD CONSTRAINT "_events_v_parent_id_events_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."events"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_events_v" ADD CONSTRAINT "_events_v_version_page_seo_social_image_id_media_id_fk" FOREIGN KEY ("version_page_seo_social_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_events_v_locales" ADD CONSTRAINT "_events_v_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_events_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "translations_locales" ADD CONSTRAINT "translations_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."translations"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "enquiries" ADD CONSTRAINT "enquiries_category_id_categories_id_fk" FOREIGN KEY ("category_id") REFERENCES "public"."categories"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "applications" ADD CONSTRAINT "applications_cv_id_application_files_id_fk" FOREIGN KEY ("cv_id") REFERENCES "public"."application_files"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "applications" ADD CONSTRAINT "applications_job_id_jobs_id_fk" FOREIGN KEY ("job_id") REFERENCES "public"."jobs"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "meeting_slots" ADD CONSTRAINT "meeting_slots_event_id_events_id_fk" FOREIGN KEY ("event_id") REFERENCES "public"."events"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "reservations" ADD CONSTRAINT "reservations_slot_id_meeting_slots_id_fk" FOREIGN KEY ("slot_id") REFERENCES "public"."meeting_slots"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "forms_emails" ADD CONSTRAINT "forms_emails_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."forms"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "forms_emails_locales" ADD CONSTRAINT "forms_emails_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."forms_emails"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "forms_locales" ADD CONSTRAINT "forms_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."forms"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "forms_rels" ADD CONSTRAINT "forms_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."forms"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "forms_rels" ADD CONSTRAINT "forms_rels_pages_fk" FOREIGN KEY ("pages_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "forms_rels" ADD CONSTRAINT "forms_rels_jobs_fk" FOREIGN KEY ("jobs_id") REFERENCES "public"."jobs"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "forms_rels" ADD CONSTRAINT "forms_rels_events_fk" FOREIGN KEY ("events_id") REFERENCES "public"."events"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "forms_rels" ADD CONSTRAINT "forms_rels_products_fk" FOREIGN KEY ("products_id") REFERENCES "public"."products"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "form_submissions_submission_data" ADD CONSTRAINT "form_submissions_submission_data_category_id_categories_id_fk" FOREIGN KEY ("category_id") REFERENCES "public"."categories"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "form_submissions_submission_data" ADD CONSTRAINT "form_submissions_submission_data_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."form_submissions"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "form_submissions_submission_uploads" ADD CONSTRAINT "form_submissions_submission_uploads_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."form_submissions"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "form_submissions" ADD CONSTRAINT "form_submissions_form_id_forms_id_fk" FOREIGN KEY ("form_id") REFERENCES "public"."forms"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "form_submissions" ADD CONSTRAINT "form_submissions_page_id_pages_id_fk" FOREIGN KEY ("page_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "form_submissions_rels" ADD CONSTRAINT "form_submissions_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."form_submissions"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "form_submissions_rels" ADD CONSTRAINT "form_submissions_rels_application_files_fk" FOREIGN KEY ("application_files_id") REFERENCES "public"."application_files"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "form_submissions_rels" ADD CONSTRAINT "form_submissions_rels_enquiries_fk" FOREIGN KEY ("enquiries_id") REFERENCES "public"."enquiries"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "form_submissions_rels" ADD CONSTRAINT "form_submissions_rels_applications_fk" FOREIGN KEY ("applications_id") REFERENCES "public"."applications"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "form_submissions_rels" ADD CONSTRAINT "form_submissions_rels_reservations_fk" FOREIGN KEY ("reservations_id") REFERENCES "public"."reservations"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_locked_documents"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_roles_fk" FOREIGN KEY ("roles_id") REFERENCES "public"."roles"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_product_applications_fk" FOREIGN KEY ("product_applications_id") REFERENCES "public"."product_applications"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_product_concentrations_fk" FOREIGN KEY ("product_concentrations_id") REFERENCES "public"."product_concentrations"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_sustainability_goals_fk" FOREIGN KEY ("sustainability_goals_id") REFERENCES "public"."sustainability_goals"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_pages_fk" FOREIGN KEY ("pages_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_categories_fk" FOREIGN KEY ("categories_id") REFERENCES "public"."categories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_products_fk" FOREIGN KEY ("products_id") REFERENCES "public"."products"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_certification_types_fk" FOREIGN KEY ("certification_types_id") REFERENCES "public"."certification_types"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_certifications_fk" FOREIGN KEY ("certifications_id") REFERENCES "public"."certifications"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_news_taxonomies_fk" FOREIGN KEY ("news_taxonomies_id") REFERENCES "public"."news_taxonomies"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_news_fk" FOREIGN KEY ("news_id") REFERENCES "public"."news"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_sustainability_fk" FOREIGN KEY ("sustainability_id") REFERENCES "public"."sustainability"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_jobs_fk" FOREIGN KEY ("jobs_id") REFERENCES "public"."jobs"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_events_fk" FOREIGN KEY ("events_id") REFERENCES "public"."events"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_translations_fk" FOREIGN KEY ("translations_id") REFERENCES "public"."translations"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_enquiries_fk" FOREIGN KEY ("enquiries_id") REFERENCES "public"."enquiries"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_applications_fk" FOREIGN KEY ("applications_id") REFERENCES "public"."applications"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_meeting_slots_fk" FOREIGN KEY ("meeting_slots_id") REFERENCES "public"."meeting_slots"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_reservations_fk" FOREIGN KEY ("reservations_id") REFERENCES "public"."reservations"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_application_files_fk" FOREIGN KEY ("application_files_id") REFERENCES "public"."application_files"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_public_content_fk" FOREIGN KEY ("public_content_id") REFERENCES "public"."public_content"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_forms_fk" FOREIGN KEY ("forms_id") REFERENCES "public"."forms"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_form_submissions_fk" FOREIGN KEY ("form_submissions_id") REFERENCES "public"."form_submissions"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_preferences"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "website_settings" ADD CONSTRAINT "website_settings_page_icon_id_media_id_fk" FOREIGN KEY ("page_icon_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "website_settings" ADD CONSTRAINT "website_settings_page_logo_id_media_id_fk" FOREIGN KEY ("page_logo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "website_settings" ADD CONSTRAINT "website_settings_page_group_logo_id_media_id_fk" FOREIGN KEY ("page_group_logo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "website_settings" ADD CONSTRAINT "website_settings_page_social_image_id_media_id_fk" FOREIGN KEY ("page_social_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "website_settings_locales" ADD CONSTRAINT "website_settings_locales_page_company_profile_id_media_id_fk" FOREIGN KEY ("page_company_profile_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "website_settings_locales" ADD CONSTRAINT "website_settings_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."website_settings"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "navigation_page_header_left" ADD CONSTRAINT "navigation_page_header_left_page_id_pages_id_fk" FOREIGN KEY ("page_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "navigation_page_header_left" ADD CONSTRAINT "navigation_page_header_left_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."navigation"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "navigation_page_header_left_locales" ADD CONSTRAINT "navigation_page_header_left_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."navigation_page_header_left"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "navigation_page_header_right" ADD CONSTRAINT "navigation_page_header_right_page_id_pages_id_fk" FOREIGN KEY ("page_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "navigation_page_header_right" ADD CONSTRAINT "navigation_page_header_right_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."navigation"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "navigation_page_header_right_locales" ADD CONSTRAINT "navigation_page_header_right_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."navigation_page_header_right"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "navigation_page_footer_explore" ADD CONSTRAINT "navigation_page_footer_explore_page_id_pages_id_fk" FOREIGN KEY ("page_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "navigation_page_footer_explore" ADD CONSTRAINT "navigation_page_footer_explore_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."navigation"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "navigation_page_footer_explore_locales" ADD CONSTRAINT "navigation_page_footer_explore_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."navigation_page_footer_explore"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "navigation_page_footer_company" ADD CONSTRAINT "navigation_page_footer_company_page_id_pages_id_fk" FOREIGN KEY ("page_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "navigation_page_footer_company" ADD CONSTRAINT "navigation_page_footer_company_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."navigation"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "navigation_page_footer_company_locales" ADD CONSTRAINT "navigation_page_footer_company_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."navigation_page_footer_company"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "navigation_page_footer_legal" ADD CONSTRAINT "navigation_page_footer_legal_page_id_pages_id_fk" FOREIGN KEY ("page_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "navigation_page_footer_legal" ADD CONSTRAINT "navigation_page_footer_legal_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."navigation"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "navigation_page_footer_legal_locales" ADD CONSTRAINT "navigation_page_footer_legal_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."navigation_page_footer_legal"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "navigation_locales" ADD CONSTRAINT "navigation_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."navigation"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "users_sessions_order_idx" ON "users_sessions" USING btree ("_order");
  CREATE INDEX "users_sessions_parent_id_idx" ON "users_sessions" USING btree ("_parent_id");
  CREATE INDEX "users_role_idx" ON "users" USING btree ("role_id");
  CREATE INDEX "users_updated_at_idx" ON "users" USING btree ("updated_at");
  CREATE INDEX "users_created_at_idx" ON "users" USING btree ("created_at");
  CREATE UNIQUE INDEX "users_email_idx" ON "users" USING btree ("email");
  CREATE UNIQUE INDEX "roles_name_idx" ON "roles" USING btree ("name");
  CREATE UNIQUE INDEX "roles_code_idx" ON "roles" USING btree ("code");
  CREATE INDEX "roles_updated_at_idx" ON "roles" USING btree ("updated_at");
  CREATE INDEX "roles_created_at_idx" ON "roles" USING btree ("created_at");
  CREATE UNIQUE INDEX "media_filename_compound_idx" ON "media" USING btree ("filename","prefix");
  CREATE UNIQUE INDEX "media_source_url_idx" ON "media" USING btree ("source_url");
  CREATE INDEX "media_updated_at_idx" ON "media" USING btree ("updated_at");
  CREATE INDEX "media_created_at_idx" ON "media" USING btree ("created_at");
  CREATE INDEX "media_filename_idx" ON "media" USING btree ("filename");
  CREATE UNIQUE INDEX "media_locales_locale_parent_id_unique" ON "media_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "product_applications__order_idx" ON "product_applications" USING btree ("_order");
  CREATE UNIQUE INDEX "product_applications_source_id_idx" ON "product_applications" USING btree ("source_id");
  CREATE UNIQUE INDEX "product_applications_key_idx" ON "product_applications" USING btree ("key");
  CREATE INDEX "product_applications_updated_at_idx" ON "product_applications" USING btree ("updated_at");
  CREATE INDEX "product_applications_created_at_idx" ON "product_applications" USING btree ("created_at");
  CREATE INDEX "product_applications__status_idx" ON "product_applications" USING btree ("_status");
  CREATE UNIQUE INDEX "product_applications_locales_locale_parent_id_unique" ON "product_applications_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_product_applications_v_parent_idx" ON "_product_applications_v" USING btree ("parent_id");
  CREATE INDEX "_product_applications_v_version_version__order_idx" ON "_product_applications_v" USING btree ("version__order");
  CREATE INDEX "_product_applications_v_version_version_source_id_idx" ON "_product_applications_v" USING btree ("version_source_id");
  CREATE INDEX "_product_applications_v_version_version_key_idx" ON "_product_applications_v" USING btree ("version_key");
  CREATE INDEX "_product_applications_v_version_version_updated_at_idx" ON "_product_applications_v" USING btree ("version_updated_at");
  CREATE INDEX "_product_applications_v_version_version_created_at_idx" ON "_product_applications_v" USING btree ("version_created_at");
  CREATE INDEX "_product_applications_v_version_version__status_idx" ON "_product_applications_v" USING btree ("version__status");
  CREATE INDEX "_product_applications_v_created_at_idx" ON "_product_applications_v" USING btree ("created_at");
  CREATE INDEX "_product_applications_v_updated_at_idx" ON "_product_applications_v" USING btree ("updated_at");
  CREATE INDEX "_product_applications_v_snapshot_idx" ON "_product_applications_v" USING btree ("snapshot");
  CREATE INDEX "_product_applications_v_published_locale_idx" ON "_product_applications_v" USING btree ("published_locale");
  CREATE INDEX "_product_applications_v_latest_idx" ON "_product_applications_v" USING btree ("latest");
  CREATE UNIQUE INDEX "_product_applications_v_locales_locale_parent_id_unique" ON "_product_applications_v_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "product_concentrations__order_idx" ON "product_concentrations" USING btree ("_order");
  CREATE UNIQUE INDEX "product_concentrations_source_id_idx" ON "product_concentrations" USING btree ("source_id");
  CREATE UNIQUE INDEX "product_concentrations_key_idx" ON "product_concentrations" USING btree ("key");
  CREATE INDEX "product_concentrations_updated_at_idx" ON "product_concentrations" USING btree ("updated_at");
  CREATE INDEX "product_concentrations_created_at_idx" ON "product_concentrations" USING btree ("created_at");
  CREATE INDEX "product_concentrations__status_idx" ON "product_concentrations" USING btree ("_status");
  CREATE UNIQUE INDEX "product_concentrations_locales_locale_parent_id_unique" ON "product_concentrations_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_product_concentrations_v_parent_idx" ON "_product_concentrations_v" USING btree ("parent_id");
  CREATE INDEX "_product_concentrations_v_version_version__order_idx" ON "_product_concentrations_v" USING btree ("version__order");
  CREATE INDEX "_product_concentrations_v_version_version_source_id_idx" ON "_product_concentrations_v" USING btree ("version_source_id");
  CREATE INDEX "_product_concentrations_v_version_version_key_idx" ON "_product_concentrations_v" USING btree ("version_key");
  CREATE INDEX "_product_concentrations_v_version_version_updated_at_idx" ON "_product_concentrations_v" USING btree ("version_updated_at");
  CREATE INDEX "_product_concentrations_v_version_version_created_at_idx" ON "_product_concentrations_v" USING btree ("version_created_at");
  CREATE INDEX "_product_concentrations_v_version_version__status_idx" ON "_product_concentrations_v" USING btree ("version__status");
  CREATE INDEX "_product_concentrations_v_created_at_idx" ON "_product_concentrations_v" USING btree ("created_at");
  CREATE INDEX "_product_concentrations_v_updated_at_idx" ON "_product_concentrations_v" USING btree ("updated_at");
  CREATE INDEX "_product_concentrations_v_snapshot_idx" ON "_product_concentrations_v" USING btree ("snapshot");
  CREATE INDEX "_product_concentrations_v_published_locale_idx" ON "_product_concentrations_v" USING btree ("published_locale");
  CREATE INDEX "_product_concentrations_v_latest_idx" ON "_product_concentrations_v" USING btree ("latest");
  CREATE UNIQUE INDEX "_product_concentrations_v_locales_locale_parent_id_unique" ON "_product_concentrations_v_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "sustainability_goals__order_idx" ON "sustainability_goals" USING btree ("_order");
  CREATE UNIQUE INDEX "sustainability_goals_source_id_idx" ON "sustainability_goals" USING btree ("source_id");
  CREATE UNIQUE INDEX "sustainability_goals_reference_idx" ON "sustainability_goals" USING btree ("reference");
  CREATE INDEX "sustainability_goals_image_idx" ON "sustainability_goals" USING btree ("image_id");
  CREATE INDEX "sustainability_goals_updated_at_idx" ON "sustainability_goals" USING btree ("updated_at");
  CREATE INDEX "sustainability_goals_created_at_idx" ON "sustainability_goals" USING btree ("created_at");
  CREATE INDEX "sustainability_goals__status_idx" ON "sustainability_goals" USING btree ("_status");
  CREATE UNIQUE INDEX "sustainability_goals_locales_locale_parent_id_unique" ON "sustainability_goals_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_sustainability_goals_v_parent_idx" ON "_sustainability_goals_v" USING btree ("parent_id");
  CREATE INDEX "_sustainability_goals_v_version_version__order_idx" ON "_sustainability_goals_v" USING btree ("version__order");
  CREATE INDEX "_sustainability_goals_v_version_version_source_id_idx" ON "_sustainability_goals_v" USING btree ("version_source_id");
  CREATE INDEX "_sustainability_goals_v_version_version_reference_idx" ON "_sustainability_goals_v" USING btree ("version_reference");
  CREATE INDEX "_sustainability_goals_v_version_version_image_idx" ON "_sustainability_goals_v" USING btree ("version_image_id");
  CREATE INDEX "_sustainability_goals_v_version_version_updated_at_idx" ON "_sustainability_goals_v" USING btree ("version_updated_at");
  CREATE INDEX "_sustainability_goals_v_version_version_created_at_idx" ON "_sustainability_goals_v" USING btree ("version_created_at");
  CREATE INDEX "_sustainability_goals_v_version_version__status_idx" ON "_sustainability_goals_v" USING btree ("version__status");
  CREATE INDEX "_sustainability_goals_v_created_at_idx" ON "_sustainability_goals_v" USING btree ("created_at");
  CREATE INDEX "_sustainability_goals_v_updated_at_idx" ON "_sustainability_goals_v" USING btree ("updated_at");
  CREATE INDEX "_sustainability_goals_v_snapshot_idx" ON "_sustainability_goals_v" USING btree ("snapshot");
  CREATE INDEX "_sustainability_goals_v_published_locale_idx" ON "_sustainability_goals_v" USING btree ("published_locale");
  CREATE INDEX "_sustainability_goals_v_latest_idx" ON "_sustainability_goals_v" USING btree ("latest");
  CREATE UNIQUE INDEX "_sustainability_goals_v_locales_locale_parent_id_unique" ON "_sustainability_goals_v_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages__order_idx" ON "pages" USING btree ("_order");
  CREATE UNIQUE INDEX "pages_slug_idx" ON "pages" USING btree ("slug");
  CREATE UNIQUE INDEX "pages_source_key_idx" ON "pages" USING btree ("source_key");
  CREATE INDEX "pages_page_seo_page_seo_social_image_idx" ON "pages" USING btree ("page_seo_social_image_id");
  CREATE INDEX "pages_updated_at_idx" ON "pages" USING btree ("updated_at");
  CREATE INDEX "pages_created_at_idx" ON "pages" USING btree ("created_at");
  CREATE INDEX "pages__status_idx" ON "pages" USING btree ("_status");
  CREATE UNIQUE INDEX "pages_locales_locale_parent_id_unique" ON "pages_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_rels_order_idx" ON "pages_rels" USING btree ("order");
  CREATE INDEX "pages_rels_parent_idx" ON "pages_rels" USING btree ("parent_id");
  CREATE INDEX "pages_rels_path_idx" ON "pages_rels" USING btree ("path");
  CREATE INDEX "pages_rels_sustainability_goals_id_idx" ON "pages_rels" USING btree ("sustainability_goals_id");
  CREATE INDEX "_pages_v_parent_idx" ON "_pages_v" USING btree ("parent_id");
  CREATE INDEX "_pages_v_version_version__order_idx" ON "_pages_v" USING btree ("version__order");
  CREATE INDEX "_pages_v_version_version_slug_idx" ON "_pages_v" USING btree ("version_slug");
  CREATE INDEX "_pages_v_version_version_source_key_idx" ON "_pages_v" USING btree ("version_source_key");
  CREATE INDEX "_pages_v_version_page_seo_version_page_seo_social_image_idx" ON "_pages_v" USING btree ("version_page_seo_social_image_id");
  CREATE INDEX "_pages_v_version_version_updated_at_idx" ON "_pages_v" USING btree ("version_updated_at");
  CREATE INDEX "_pages_v_version_version_created_at_idx" ON "_pages_v" USING btree ("version_created_at");
  CREATE INDEX "_pages_v_version_version__status_idx" ON "_pages_v" USING btree ("version__status");
  CREATE INDEX "_pages_v_created_at_idx" ON "_pages_v" USING btree ("created_at");
  CREATE INDEX "_pages_v_updated_at_idx" ON "_pages_v" USING btree ("updated_at");
  CREATE INDEX "_pages_v_snapshot_idx" ON "_pages_v" USING btree ("snapshot");
  CREATE INDEX "_pages_v_published_locale_idx" ON "_pages_v" USING btree ("published_locale");
  CREATE INDEX "_pages_v_latest_idx" ON "_pages_v" USING btree ("latest");
  CREATE INDEX "_pages_v_autosave_idx" ON "_pages_v" USING btree ("autosave");
  CREATE UNIQUE INDEX "_pages_v_locales_locale_parent_id_unique" ON "_pages_v_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_rels_order_idx" ON "_pages_v_rels" USING btree ("order");
  CREATE INDEX "_pages_v_rels_parent_idx" ON "_pages_v_rels" USING btree ("parent_id");
  CREATE INDEX "_pages_v_rels_path_idx" ON "_pages_v_rels" USING btree ("path");
  CREATE INDEX "_pages_v_rels_sustainability_goals_id_idx" ON "_pages_v_rels" USING btree ("sustainability_goals_id");
  CREATE INDEX "categories_page_artwork_images_order_idx" ON "categories_page_artwork_images" USING btree ("_order");
  CREATE INDEX "categories_page_artwork_images_parent_id_idx" ON "categories_page_artwork_images" USING btree ("_parent_id");
  CREATE INDEX "categories_page_artwork_images_image_idx" ON "categories_page_artwork_images" USING btree ("image_id");
  CREATE UNIQUE INDEX "categories_page_artwork_images_locales_locale_parent_id_uniq" ON "categories_page_artwork_images_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "categories__order_idx" ON "categories" USING btree ("_order");
  CREATE UNIQUE INDEX "categories_source_id_idx" ON "categories" USING btree ("source_id");
  CREATE UNIQUE INDEX "categories_slug_idx" ON "categories" USING btree ("slug");
  CREATE INDEX "categories_icon_idx" ON "categories" USING btree ("icon_id");
  CREATE INDEX "categories_updated_at_idx" ON "categories" USING btree ("updated_at");
  CREATE INDEX "categories_created_at_idx" ON "categories" USING btree ("created_at");
  CREATE INDEX "categories__status_idx" ON "categories" USING btree ("_status");
  CREATE UNIQUE INDEX "categories_locales_locale_parent_id_unique" ON "categories_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_categories_v_version_page_artwork_images_order_idx" ON "_categories_v_version_page_artwork_images" USING btree ("_order");
  CREATE INDEX "_categories_v_version_page_artwork_images_parent_id_idx" ON "_categories_v_version_page_artwork_images" USING btree ("_parent_id");
  CREATE INDEX "_categories_v_version_page_artwork_images_image_idx" ON "_categories_v_version_page_artwork_images" USING btree ("image_id");
  CREATE UNIQUE INDEX "_categories_v_version_page_artwork_images_locales_locale_par" ON "_categories_v_version_page_artwork_images_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_categories_v_parent_idx" ON "_categories_v" USING btree ("parent_id");
  CREATE INDEX "_categories_v_version_version__order_idx" ON "_categories_v" USING btree ("version__order");
  CREATE INDEX "_categories_v_version_version_source_id_idx" ON "_categories_v" USING btree ("version_source_id");
  CREATE INDEX "_categories_v_version_version_slug_idx" ON "_categories_v" USING btree ("version_slug");
  CREATE INDEX "_categories_v_version_version_icon_idx" ON "_categories_v" USING btree ("version_icon_id");
  CREATE INDEX "_categories_v_version_version_updated_at_idx" ON "_categories_v" USING btree ("version_updated_at");
  CREATE INDEX "_categories_v_version_version_created_at_idx" ON "_categories_v" USING btree ("version_created_at");
  CREATE INDEX "_categories_v_version_version__status_idx" ON "_categories_v" USING btree ("version__status");
  CREATE INDEX "_categories_v_created_at_idx" ON "_categories_v" USING btree ("created_at");
  CREATE INDEX "_categories_v_updated_at_idx" ON "_categories_v" USING btree ("updated_at");
  CREATE INDEX "_categories_v_snapshot_idx" ON "_categories_v" USING btree ("snapshot");
  CREATE INDEX "_categories_v_published_locale_idx" ON "_categories_v" USING btree ("published_locale");
  CREATE INDEX "_categories_v_latest_idx" ON "_categories_v" USING btree ("latest");
  CREATE UNIQUE INDEX "_categories_v_locales_locale_parent_id_unique" ON "_categories_v_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "products_page_artwork_images_order_idx" ON "products_page_artwork_images" USING btree ("_order");
  CREATE INDEX "products_page_artwork_images_parent_id_idx" ON "products_page_artwork_images" USING btree ("_parent_id");
  CREATE INDEX "products_page_artwork_images_image_idx" ON "products_page_artwork_images" USING btree ("image_id");
  CREATE UNIQUE INDEX "products_page_artwork_images_locales_locale_parent_id_unique" ON "products_page_artwork_images_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "products__order_idx" ON "products" USING btree ("_order");
  CREATE UNIQUE INDEX "products_source_id_idx" ON "products" USING btree ("source_id");
  CREATE INDEX "products_slug_idx" ON "products" USING btree ("slug");
  CREATE INDEX "products_category_idx" ON "products" USING btree ("category_id");
  CREATE INDEX "products_updated_at_idx" ON "products" USING btree ("updated_at");
  CREATE INDEX "products_created_at_idx" ON "products" USING btree ("created_at");
  CREATE INDEX "products__status_idx" ON "products" USING btree ("_status");
  CREATE UNIQUE INDEX "category_slug_idx" ON "products" USING btree ("category_id","slug");
  CREATE INDEX "products_tds_idx" ON "products_locales" USING btree ("tds_id","_locale");
  CREATE UNIQUE INDEX "products_locales_locale_parent_id_unique" ON "products_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "products_rels_order_idx" ON "products_rels" USING btree ("order");
  CREATE INDEX "products_rels_parent_idx" ON "products_rels" USING btree ("parent_id");
  CREATE INDEX "products_rels_path_idx" ON "products_rels" USING btree ("path");
  CREATE INDEX "products_rels_product_applications_id_idx" ON "products_rels" USING btree ("product_applications_id");
  CREATE INDEX "products_rels_product_concentrations_id_idx" ON "products_rels" USING btree ("product_concentrations_id");
  CREATE INDEX "_products_v_version_page_artwork_images_order_idx" ON "_products_v_version_page_artwork_images" USING btree ("_order");
  CREATE INDEX "_products_v_version_page_artwork_images_parent_id_idx" ON "_products_v_version_page_artwork_images" USING btree ("_parent_id");
  CREATE INDEX "_products_v_version_page_artwork_images_image_idx" ON "_products_v_version_page_artwork_images" USING btree ("image_id");
  CREATE UNIQUE INDEX "_products_v_version_page_artwork_images_locales_locale_paren" ON "_products_v_version_page_artwork_images_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_products_v_parent_idx" ON "_products_v" USING btree ("parent_id");
  CREATE INDEX "_products_v_version_version__order_idx" ON "_products_v" USING btree ("version__order");
  CREATE INDEX "_products_v_version_version_source_id_idx" ON "_products_v" USING btree ("version_source_id");
  CREATE INDEX "_products_v_version_version_slug_idx" ON "_products_v" USING btree ("version_slug");
  CREATE INDEX "_products_v_version_version_category_idx" ON "_products_v" USING btree ("version_category_id");
  CREATE INDEX "_products_v_version_version_updated_at_idx" ON "_products_v" USING btree ("version_updated_at");
  CREATE INDEX "_products_v_version_version_created_at_idx" ON "_products_v" USING btree ("version_created_at");
  CREATE INDEX "_products_v_version_version__status_idx" ON "_products_v" USING btree ("version__status");
  CREATE INDEX "_products_v_created_at_idx" ON "_products_v" USING btree ("created_at");
  CREATE INDEX "_products_v_updated_at_idx" ON "_products_v" USING btree ("updated_at");
  CREATE INDEX "_products_v_snapshot_idx" ON "_products_v" USING btree ("snapshot");
  CREATE INDEX "_products_v_published_locale_idx" ON "_products_v" USING btree ("published_locale");
  CREATE INDEX "_products_v_latest_idx" ON "_products_v" USING btree ("latest");
  CREATE INDEX "version_category_version_slug_idx" ON "_products_v" USING btree ("version_category_id","version_slug");
  CREATE INDEX "_products_v_version_version_tds_idx" ON "_products_v_locales" USING btree ("version_tds_id","_locale");
  CREATE UNIQUE INDEX "_products_v_locales_locale_parent_id_unique" ON "_products_v_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_products_v_rels_order_idx" ON "_products_v_rels" USING btree ("order");
  CREATE INDEX "_products_v_rels_parent_idx" ON "_products_v_rels" USING btree ("parent_id");
  CREATE INDEX "_products_v_rels_path_idx" ON "_products_v_rels" USING btree ("path");
  CREATE INDEX "_products_v_rels_product_applications_id_idx" ON "_products_v_rels" USING btree ("product_applications_id");
  CREATE INDEX "_products_v_rels_product_concentrations_id_idx" ON "_products_v_rels" USING btree ("product_concentrations_id");
  CREATE UNIQUE INDEX "certification_types_source_id_idx" ON "certification_types" USING btree ("source_id");
  CREATE UNIQUE INDEX "certification_types_slug_idx" ON "certification_types" USING btree ("slug");
  CREATE INDEX "certification_types_updated_at_idx" ON "certification_types" USING btree ("updated_at");
  CREATE INDEX "certification_types_created_at_idx" ON "certification_types" USING btree ("created_at");
  CREATE INDEX "certification_types__status_idx" ON "certification_types" USING btree ("_status");
  CREATE INDEX "certification_types_logo_idx" ON "certification_types_locales" USING btree ("logo_id","_locale");
  CREATE UNIQUE INDEX "certification_types_locales_locale_parent_id_unique" ON "certification_types_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_certification_types_v_parent_idx" ON "_certification_types_v" USING btree ("parent_id");
  CREATE INDEX "_certification_types_v_version_version_source_id_idx" ON "_certification_types_v" USING btree ("version_source_id");
  CREATE INDEX "_certification_types_v_version_version_slug_idx" ON "_certification_types_v" USING btree ("version_slug");
  CREATE INDEX "_certification_types_v_version_version_updated_at_idx" ON "_certification_types_v" USING btree ("version_updated_at");
  CREATE INDEX "_certification_types_v_version_version_created_at_idx" ON "_certification_types_v" USING btree ("version_created_at");
  CREATE INDEX "_certification_types_v_version_version__status_idx" ON "_certification_types_v" USING btree ("version__status");
  CREATE INDEX "_certification_types_v_created_at_idx" ON "_certification_types_v" USING btree ("created_at");
  CREATE INDEX "_certification_types_v_updated_at_idx" ON "_certification_types_v" USING btree ("updated_at");
  CREATE INDEX "_certification_types_v_snapshot_idx" ON "_certification_types_v" USING btree ("snapshot");
  CREATE INDEX "_certification_types_v_published_locale_idx" ON "_certification_types_v" USING btree ("published_locale");
  CREATE INDEX "_certification_types_v_latest_idx" ON "_certification_types_v" USING btree ("latest");
  CREATE INDEX "_certification_types_v_version_version_logo_idx" ON "_certification_types_v_locales" USING btree ("version_logo_id","_locale");
  CREATE UNIQUE INDEX "_certification_types_v_locales_locale_parent_id_unique" ON "_certification_types_v_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "certifications_source_id_idx" ON "certifications" USING btree ("source_id");
  CREATE INDEX "certifications_certification_type_idx" ON "certifications" USING btree ("certification_type_id");
  CREATE INDEX "certifications_updated_at_idx" ON "certifications" USING btree ("updated_at");
  CREATE INDEX "certifications_created_at_idx" ON "certifications" USING btree ("created_at");
  CREATE INDEX "certifications__status_idx" ON "certifications" USING btree ("_status");
  CREATE INDEX "certifications_document_idx" ON "certifications_locales" USING btree ("document_id","_locale");
  CREATE UNIQUE INDEX "certifications_locales_locale_parent_id_unique" ON "certifications_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_certifications_v_parent_idx" ON "_certifications_v" USING btree ("parent_id");
  CREATE INDEX "_certifications_v_version_version_source_id_idx" ON "_certifications_v" USING btree ("version_source_id");
  CREATE INDEX "_certifications_v_version_version_certification_type_idx" ON "_certifications_v" USING btree ("version_certification_type_id");
  CREATE INDEX "_certifications_v_version_version_updated_at_idx" ON "_certifications_v" USING btree ("version_updated_at");
  CREATE INDEX "_certifications_v_version_version_created_at_idx" ON "_certifications_v" USING btree ("version_created_at");
  CREATE INDEX "_certifications_v_version_version__status_idx" ON "_certifications_v" USING btree ("version__status");
  CREATE INDEX "_certifications_v_created_at_idx" ON "_certifications_v" USING btree ("created_at");
  CREATE INDEX "_certifications_v_updated_at_idx" ON "_certifications_v" USING btree ("updated_at");
  CREATE INDEX "_certifications_v_snapshot_idx" ON "_certifications_v" USING btree ("snapshot");
  CREATE INDEX "_certifications_v_published_locale_idx" ON "_certifications_v" USING btree ("published_locale");
  CREATE INDEX "_certifications_v_latest_idx" ON "_certifications_v" USING btree ("latest");
  CREATE INDEX "_certifications_v_version_version_document_idx" ON "_certifications_v_locales" USING btree ("version_document_id","_locale");
  CREATE UNIQUE INDEX "_certifications_v_locales_locale_parent_id_unique" ON "_certifications_v_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "news_taxonomies_source_id_idx" ON "news_taxonomies" USING btree ("source_id");
  CREATE UNIQUE INDEX "news_taxonomies_slug_idx" ON "news_taxonomies" USING btree ("slug");
  CREATE INDEX "news_taxonomies_updated_at_idx" ON "news_taxonomies" USING btree ("updated_at");
  CREATE INDEX "news_taxonomies_created_at_idx" ON "news_taxonomies" USING btree ("created_at");
  CREATE INDEX "news_taxonomies__status_idx" ON "news_taxonomies" USING btree ("_status");
  CREATE UNIQUE INDEX "news_taxonomies_locales_locale_parent_id_unique" ON "news_taxonomies_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_news_taxonomies_v_parent_idx" ON "_news_taxonomies_v" USING btree ("parent_id");
  CREATE INDEX "_news_taxonomies_v_version_version_source_id_idx" ON "_news_taxonomies_v" USING btree ("version_source_id");
  CREATE INDEX "_news_taxonomies_v_version_version_slug_idx" ON "_news_taxonomies_v" USING btree ("version_slug");
  CREATE INDEX "_news_taxonomies_v_version_version_updated_at_idx" ON "_news_taxonomies_v" USING btree ("version_updated_at");
  CREATE INDEX "_news_taxonomies_v_version_version_created_at_idx" ON "_news_taxonomies_v" USING btree ("version_created_at");
  CREATE INDEX "_news_taxonomies_v_version_version__status_idx" ON "_news_taxonomies_v" USING btree ("version__status");
  CREATE INDEX "_news_taxonomies_v_created_at_idx" ON "_news_taxonomies_v" USING btree ("created_at");
  CREATE INDEX "_news_taxonomies_v_updated_at_idx" ON "_news_taxonomies_v" USING btree ("updated_at");
  CREATE INDEX "_news_taxonomies_v_snapshot_idx" ON "_news_taxonomies_v" USING btree ("snapshot");
  CREATE INDEX "_news_taxonomies_v_published_locale_idx" ON "_news_taxonomies_v" USING btree ("published_locale");
  CREATE INDEX "_news_taxonomies_v_latest_idx" ON "_news_taxonomies_v" USING btree ("latest");
  CREATE UNIQUE INDEX "_news_taxonomies_v_locales_locale_parent_id_unique" ON "_news_taxonomies_v_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "news__order_idx" ON "news" USING btree ("_order");
  CREATE UNIQUE INDEX "news_source_id_idx" ON "news" USING btree ("source_id");
  CREATE INDEX "news_relationships_relationships_category_idx" ON "news" USING btree ("relationships_category_id");
  CREATE INDEX "news_relationships_relationships_previous_article_idx" ON "news" USING btree ("relationships_previous_article_id");
  CREATE INDEX "news_relationships_relationships_next_article_idx" ON "news" USING btree ("relationships_next_article_id");
  CREATE UNIQUE INDEX "news_slug_idx" ON "news" USING btree ("slug");
  CREATE INDEX "news_updated_at_idx" ON "news" USING btree ("updated_at");
  CREATE INDEX "news_created_at_idx" ON "news" USING btree ("created_at");
  CREATE INDEX "news__status_idx" ON "news" USING btree ("_status");
  CREATE UNIQUE INDEX "news_locales_locale_parent_id_unique" ON "news_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "news_rels_order_idx" ON "news_rels" USING btree ("order");
  CREATE INDEX "news_rels_parent_idx" ON "news_rels" USING btree ("parent_id");
  CREATE INDEX "news_rels_path_idx" ON "news_rels" USING btree ("path");
  CREATE INDEX "news_rels_news_taxonomies_id_idx" ON "news_rels" USING btree ("news_taxonomies_id");
  CREATE INDEX "news_rels_news_id_idx" ON "news_rels" USING btree ("news_id");
  CREATE INDEX "_news_v_parent_idx" ON "_news_v" USING btree ("parent_id");
  CREATE INDEX "_news_v_version_version__order_idx" ON "_news_v" USING btree ("version__order");
  CREATE INDEX "_news_v_version_version_source_id_idx" ON "_news_v" USING btree ("version_source_id");
  CREATE INDEX "_news_v_version_relationships_version_relationships_cate_idx" ON "_news_v" USING btree ("version_relationships_category_id");
  CREATE INDEX "_news_v_version_relationships_version_relationships_prev_idx" ON "_news_v" USING btree ("version_relationships_previous_article_id");
  CREATE INDEX "_news_v_version_relationships_version_relationships_next_idx" ON "_news_v" USING btree ("version_relationships_next_article_id");
  CREATE INDEX "_news_v_version_version_slug_idx" ON "_news_v" USING btree ("version_slug");
  CREATE INDEX "_news_v_version_version_updated_at_idx" ON "_news_v" USING btree ("version_updated_at");
  CREATE INDEX "_news_v_version_version_created_at_idx" ON "_news_v" USING btree ("version_created_at");
  CREATE INDEX "_news_v_version_version__status_idx" ON "_news_v" USING btree ("version__status");
  CREATE INDEX "_news_v_created_at_idx" ON "_news_v" USING btree ("created_at");
  CREATE INDEX "_news_v_updated_at_idx" ON "_news_v" USING btree ("updated_at");
  CREATE INDEX "_news_v_snapshot_idx" ON "_news_v" USING btree ("snapshot");
  CREATE INDEX "_news_v_published_locale_idx" ON "_news_v" USING btree ("published_locale");
  CREATE INDEX "_news_v_latest_idx" ON "_news_v" USING btree ("latest");
  CREATE UNIQUE INDEX "_news_v_locales_locale_parent_id_unique" ON "_news_v_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_news_v_rels_order_idx" ON "_news_v_rels" USING btree ("order");
  CREATE INDEX "_news_v_rels_parent_idx" ON "_news_v_rels" USING btree ("parent_id");
  CREATE INDEX "_news_v_rels_path_idx" ON "_news_v_rels" USING btree ("path");
  CREATE INDEX "_news_v_rels_news_taxonomies_id_idx" ON "_news_v_rels" USING btree ("news_taxonomies_id");
  CREATE INDEX "_news_v_rels_news_id_idx" ON "_news_v_rels" USING btree ("news_id");
  CREATE INDEX "sustainability__order_idx" ON "sustainability" USING btree ("_order");
  CREATE UNIQUE INDEX "sustainability_source_id_idx" ON "sustainability" USING btree ("source_id");
  CREATE INDEX "sustainability_relationships_relationships_primary_goal_idx" ON "sustainability" USING btree ("relationships_primary_goal_id");
  CREATE UNIQUE INDEX "sustainability_slug_idx" ON "sustainability" USING btree ("slug");
  CREATE INDEX "sustainability_updated_at_idx" ON "sustainability" USING btree ("updated_at");
  CREATE INDEX "sustainability_created_at_idx" ON "sustainability" USING btree ("created_at");
  CREATE INDEX "sustainability__status_idx" ON "sustainability" USING btree ("_status");
  CREATE UNIQUE INDEX "sustainability_locales_locale_parent_id_unique" ON "sustainability_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "sustainability_rels_order_idx" ON "sustainability_rels" USING btree ("order");
  CREATE INDEX "sustainability_rels_parent_idx" ON "sustainability_rels" USING btree ("parent_id");
  CREATE INDEX "sustainability_rels_path_idx" ON "sustainability_rels" USING btree ("path");
  CREATE INDEX "sustainability_rels_sustainability_goals_id_idx" ON "sustainability_rels" USING btree ("sustainability_goals_id");
  CREATE INDEX "sustainability_rels_sustainability_id_idx" ON "sustainability_rels" USING btree ("sustainability_id");
  CREATE INDEX "_sustainability_v_parent_idx" ON "_sustainability_v" USING btree ("parent_id");
  CREATE INDEX "_sustainability_v_version_version__order_idx" ON "_sustainability_v" USING btree ("version__order");
  CREATE INDEX "_sustainability_v_version_version_source_id_idx" ON "_sustainability_v" USING btree ("version_source_id");
  CREATE INDEX "_sustainability_v_version_relationships_version_relation_idx" ON "_sustainability_v" USING btree ("version_relationships_primary_goal_id");
  CREATE INDEX "_sustainability_v_version_version_slug_idx" ON "_sustainability_v" USING btree ("version_slug");
  CREATE INDEX "_sustainability_v_version_version_updated_at_idx" ON "_sustainability_v" USING btree ("version_updated_at");
  CREATE INDEX "_sustainability_v_version_version_created_at_idx" ON "_sustainability_v" USING btree ("version_created_at");
  CREATE INDEX "_sustainability_v_version_version__status_idx" ON "_sustainability_v" USING btree ("version__status");
  CREATE INDEX "_sustainability_v_created_at_idx" ON "_sustainability_v" USING btree ("created_at");
  CREATE INDEX "_sustainability_v_updated_at_idx" ON "_sustainability_v" USING btree ("updated_at");
  CREATE INDEX "_sustainability_v_snapshot_idx" ON "_sustainability_v" USING btree ("snapshot");
  CREATE INDEX "_sustainability_v_published_locale_idx" ON "_sustainability_v" USING btree ("published_locale");
  CREATE INDEX "_sustainability_v_latest_idx" ON "_sustainability_v" USING btree ("latest");
  CREATE UNIQUE INDEX "_sustainability_v_locales_locale_parent_id_unique" ON "_sustainability_v_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_sustainability_v_rels_order_idx" ON "_sustainability_v_rels" USING btree ("order");
  CREATE INDEX "_sustainability_v_rels_parent_idx" ON "_sustainability_v_rels" USING btree ("parent_id");
  CREATE INDEX "_sustainability_v_rels_path_idx" ON "_sustainability_v_rels" USING btree ("path");
  CREATE INDEX "_sustainability_v_rels_sustainability_goals_id_idx" ON "_sustainability_v_rels" USING btree ("sustainability_goals_id");
  CREATE INDEX "_sustainability_v_rels_sustainability_id_idx" ON "_sustainability_v_rels" USING btree ("sustainability_id");
  CREATE INDEX "jobs__order_idx" ON "jobs" USING btree ("_order");
  CREATE UNIQUE INDEX "jobs_source_id_idx" ON "jobs" USING btree ("source_id");
  CREATE UNIQUE INDEX "jobs_slug_idx" ON "jobs" USING btree ("slug");
  CREATE INDEX "jobs_updated_at_idx" ON "jobs" USING btree ("updated_at");
  CREATE INDEX "jobs_created_at_idx" ON "jobs" USING btree ("created_at");
  CREATE INDEX "jobs__status_idx" ON "jobs" USING btree ("_status");
  CREATE UNIQUE INDEX "jobs_locales_locale_parent_id_unique" ON "jobs_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_jobs_v_parent_idx" ON "_jobs_v" USING btree ("parent_id");
  CREATE INDEX "_jobs_v_version_version__order_idx" ON "_jobs_v" USING btree ("version__order");
  CREATE INDEX "_jobs_v_version_version_source_id_idx" ON "_jobs_v" USING btree ("version_source_id");
  CREATE INDEX "_jobs_v_version_version_slug_idx" ON "_jobs_v" USING btree ("version_slug");
  CREATE INDEX "_jobs_v_version_version_updated_at_idx" ON "_jobs_v" USING btree ("version_updated_at");
  CREATE INDEX "_jobs_v_version_version_created_at_idx" ON "_jobs_v" USING btree ("version_created_at");
  CREATE INDEX "_jobs_v_version_version__status_idx" ON "_jobs_v" USING btree ("version__status");
  CREATE INDEX "_jobs_v_created_at_idx" ON "_jobs_v" USING btree ("created_at");
  CREATE INDEX "_jobs_v_updated_at_idx" ON "_jobs_v" USING btree ("updated_at");
  CREATE INDEX "_jobs_v_snapshot_idx" ON "_jobs_v" USING btree ("snapshot");
  CREATE INDEX "_jobs_v_published_locale_idx" ON "_jobs_v" USING btree ("published_locale");
  CREATE INDEX "_jobs_v_latest_idx" ON "_jobs_v" USING btree ("latest");
  CREATE UNIQUE INDEX "_jobs_v_locales_locale_parent_id_unique" ON "_jobs_v_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "events_meeting_schedule_order_idx" ON "events_meeting_schedule" USING btree ("_order");
  CREATE INDEX "events_meeting_schedule_parent_id_idx" ON "events_meeting_schedule" USING btree ("_parent_id");
  CREATE INDEX "events__order_idx" ON "events" USING btree ("_order");
  CREATE UNIQUE INDEX "events_source_id_idx" ON "events" USING btree ("source_id");
  CREATE UNIQUE INDEX "events_slug_idx" ON "events" USING btree ("slug");
  CREATE INDEX "events_page_seo_page_seo_social_image_idx" ON "events" USING btree ("page_seo_social_image_id");
  CREATE INDEX "events_updated_at_idx" ON "events" USING btree ("updated_at");
  CREATE INDEX "events_created_at_idx" ON "events" USING btree ("created_at");
  CREATE INDEX "events__status_idx" ON "events" USING btree ("_status");
  CREATE UNIQUE INDEX "events_locales_locale_parent_id_unique" ON "events_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_events_v_version_meeting_schedule_order_idx" ON "_events_v_version_meeting_schedule" USING btree ("_order");
  CREATE INDEX "_events_v_version_meeting_schedule_parent_id_idx" ON "_events_v_version_meeting_schedule" USING btree ("_parent_id");
  CREATE INDEX "_events_v_parent_idx" ON "_events_v" USING btree ("parent_id");
  CREATE INDEX "_events_v_version_version__order_idx" ON "_events_v" USING btree ("version__order");
  CREATE INDEX "_events_v_version_version_source_id_idx" ON "_events_v" USING btree ("version_source_id");
  CREATE INDEX "_events_v_version_version_slug_idx" ON "_events_v" USING btree ("version_slug");
  CREATE INDEX "_events_v_version_page_seo_version_page_seo_social_image_idx" ON "_events_v" USING btree ("version_page_seo_social_image_id");
  CREATE INDEX "_events_v_version_version_updated_at_idx" ON "_events_v" USING btree ("version_updated_at");
  CREATE INDEX "_events_v_version_version_created_at_idx" ON "_events_v" USING btree ("version_created_at");
  CREATE INDEX "_events_v_version_version__status_idx" ON "_events_v" USING btree ("version__status");
  CREATE INDEX "_events_v_created_at_idx" ON "_events_v" USING btree ("created_at");
  CREATE INDEX "_events_v_updated_at_idx" ON "_events_v" USING btree ("updated_at");
  CREATE INDEX "_events_v_snapshot_idx" ON "_events_v" USING btree ("snapshot");
  CREATE INDEX "_events_v_published_locale_idx" ON "_events_v" USING btree ("published_locale");
  CREATE INDEX "_events_v_latest_idx" ON "_events_v" USING btree ("latest");
  CREATE UNIQUE INDEX "_events_v_locales_locale_parent_id_unique" ON "_events_v_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "translations_source_id_idx" ON "translations" USING btree ("source_id");
  CREATE UNIQUE INDEX "translations_key_idx" ON "translations" USING btree ("key");
  CREATE INDEX "translations_updated_at_idx" ON "translations" USING btree ("updated_at");
  CREATE INDEX "translations_created_at_idx" ON "translations" USING btree ("created_at");
  CREATE UNIQUE INDEX "translations_locales_locale_parent_id_unique" ON "translations_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "enquiries_key_idx" ON "enquiries" USING btree ("key");
  CREATE INDEX "enquiries_category_idx" ON "enquiries" USING btree ("category_id");
  CREATE INDEX "enquiries_updated_at_idx" ON "enquiries" USING btree ("updated_at");
  CREATE INDEX "enquiries_created_at_idx" ON "enquiries" USING btree ("created_at");
  CREATE UNIQUE INDEX "applications_key_idx" ON "applications" USING btree ("key");
  CREATE INDEX "applications_cv_idx" ON "applications" USING btree ("cv_id");
  CREATE INDEX "applications_job_idx" ON "applications" USING btree ("job_id");
  CREATE INDEX "applications_updated_at_idx" ON "applications" USING btree ("updated_at");
  CREATE INDEX "applications_created_at_idx" ON "applications" USING btree ("created_at");
  CREATE UNIQUE INDEX "applications_filename_idx" ON "applications" USING btree ("filename");
  CREATE INDEX "meeting_slots_event_idx" ON "meeting_slots" USING btree ("event_id");
  CREATE INDEX "meeting_slots_updated_at_idx" ON "meeting_slots" USING btree ("updated_at");
  CREATE INDEX "meeting_slots_created_at_idx" ON "meeting_slots" USING btree ("created_at");
  CREATE UNIQUE INDEX "event_startsAt_idx" ON "meeting_slots" USING btree ("event_id","starts_at");
  CREATE UNIQUE INDEX "reservations_key_idx" ON "reservations" USING btree ("key");
  CREATE UNIQUE INDEX "reservations_slot_idx" ON "reservations" USING btree ("slot_id");
  CREATE INDEX "reservations_updated_at_idx" ON "reservations" USING btree ("updated_at");
  CREATE INDEX "reservations_created_at_idx" ON "reservations" USING btree ("created_at");
  CREATE INDEX "application_files_updated_at_idx" ON "application_files" USING btree ("updated_at");
  CREATE INDEX "application_files_created_at_idx" ON "application_files" USING btree ("created_at");
  CREATE UNIQUE INDEX "application_files_filename_idx" ON "application_files" USING btree ("filename");
  CREATE UNIQUE INDEX "public_content_resource_idx" ON "public_content" USING btree ("resource");
  CREATE INDEX "public_content_updated_at_idx" ON "public_content" USING btree ("updated_at");
  CREATE INDEX "public_content_created_at_idx" ON "public_content" USING btree ("created_at");
  CREATE INDEX "forms_emails_order_idx" ON "forms_emails" USING btree ("_order");
  CREATE INDEX "forms_emails_parent_id_idx" ON "forms_emails" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "forms_emails_locales_locale_parent_id_unique" ON "forms_emails_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "forms_key_idx" ON "forms" USING btree ("key");
  CREATE INDEX "forms_updated_at_idx" ON "forms" USING btree ("updated_at");
  CREATE INDEX "forms_created_at_idx" ON "forms" USING btree ("created_at");
  CREATE UNIQUE INDEX "forms_locales_locale_parent_id_unique" ON "forms_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "forms_rels_order_idx" ON "forms_rels" USING btree ("order");
  CREATE INDEX "forms_rels_parent_idx" ON "forms_rels" USING btree ("parent_id");
  CREATE INDEX "forms_rels_path_idx" ON "forms_rels" USING btree ("path");
  CREATE INDEX "forms_rels_pages_id_idx" ON "forms_rels" USING btree ("pages_id");
  CREATE INDEX "forms_rels_jobs_id_idx" ON "forms_rels" USING btree ("jobs_id");
  CREATE INDEX "forms_rels_events_id_idx" ON "forms_rels" USING btree ("events_id");
  CREATE INDEX "forms_rels_products_id_idx" ON "forms_rels" USING btree ("products_id");
  CREATE INDEX "form_submissions_submission_data_order_idx" ON "form_submissions_submission_data" USING btree ("_order");
  CREATE INDEX "form_submissions_submission_data_parent_id_idx" ON "form_submissions_submission_data" USING btree ("_parent_id");
  CREATE INDEX "form_submissions_submission_data_category_idx" ON "form_submissions_submission_data" USING btree ("category_id");
  CREATE INDEX "form_submissions_submission_uploads_order_idx" ON "form_submissions_submission_uploads" USING btree ("_order");
  CREATE INDEX "form_submissions_submission_uploads_parent_id_idx" ON "form_submissions_submission_uploads" USING btree ("_parent_id");
  CREATE INDEX "form_submissions_form_idx" ON "form_submissions" USING btree ("form_id");
  CREATE INDEX "form_submissions_page_idx" ON "form_submissions" USING btree ("page_id");
  CREATE UNIQUE INDEX "form_submissions_key_idx" ON "form_submissions" USING btree ("key");
  CREATE INDEX "form_submissions_updated_at_idx" ON "form_submissions" USING btree ("updated_at");
  CREATE INDEX "form_submissions_created_at_idx" ON "form_submissions" USING btree ("created_at");
  CREATE INDEX "form_submissions_rels_order_idx" ON "form_submissions_rels" USING btree ("order");
  CREATE INDEX "form_submissions_rels_parent_idx" ON "form_submissions_rels" USING btree ("parent_id");
  CREATE INDEX "form_submissions_rels_path_idx" ON "form_submissions_rels" USING btree ("path");
  CREATE INDEX "form_submissions_rels_application_files_id_idx" ON "form_submissions_rels" USING btree ("application_files_id");
  CREATE INDEX "form_submissions_rels_enquiries_id_idx" ON "form_submissions_rels" USING btree ("enquiries_id");
  CREATE INDEX "form_submissions_rels_applications_id_idx" ON "form_submissions_rels" USING btree ("applications_id");
  CREATE INDEX "form_submissions_rels_reservations_id_idx" ON "form_submissions_rels" USING btree ("reservations_id");
  CREATE UNIQUE INDEX "payload_kv_key_idx" ON "payload_kv" USING btree ("key");
  CREATE INDEX "payload_locked_documents_global_slug_idx" ON "payload_locked_documents" USING btree ("global_slug");
  CREATE INDEX "payload_locked_documents_updated_at_idx" ON "payload_locked_documents" USING btree ("updated_at");
  CREATE INDEX "payload_locked_documents_created_at_idx" ON "payload_locked_documents" USING btree ("created_at");
  CREATE INDEX "payload_locked_documents_rels_order_idx" ON "payload_locked_documents_rels" USING btree ("order");
  CREATE INDEX "payload_locked_documents_rels_parent_idx" ON "payload_locked_documents_rels" USING btree ("parent_id");
  CREATE INDEX "payload_locked_documents_rels_path_idx" ON "payload_locked_documents_rels" USING btree ("path");
  CREATE INDEX "payload_locked_documents_rels_users_id_idx" ON "payload_locked_documents_rels" USING btree ("users_id");
  CREATE INDEX "payload_locked_documents_rels_roles_id_idx" ON "payload_locked_documents_rels" USING btree ("roles_id");
  CREATE INDEX "payload_locked_documents_rels_media_id_idx" ON "payload_locked_documents_rels" USING btree ("media_id");
  CREATE INDEX "payload_locked_documents_rels_product_applications_id_idx" ON "payload_locked_documents_rels" USING btree ("product_applications_id");
  CREATE INDEX "payload_locked_documents_rels_product_concentrations_id_idx" ON "payload_locked_documents_rels" USING btree ("product_concentrations_id");
  CREATE INDEX "payload_locked_documents_rels_sustainability_goals_id_idx" ON "payload_locked_documents_rels" USING btree ("sustainability_goals_id");
  CREATE INDEX "payload_locked_documents_rels_pages_id_idx" ON "payload_locked_documents_rels" USING btree ("pages_id");
  CREATE INDEX "payload_locked_documents_rels_categories_id_idx" ON "payload_locked_documents_rels" USING btree ("categories_id");
  CREATE INDEX "payload_locked_documents_rels_products_id_idx" ON "payload_locked_documents_rels" USING btree ("products_id");
  CREATE INDEX "payload_locked_documents_rels_certification_types_id_idx" ON "payload_locked_documents_rels" USING btree ("certification_types_id");
  CREATE INDEX "payload_locked_documents_rels_certifications_id_idx" ON "payload_locked_documents_rels" USING btree ("certifications_id");
  CREATE INDEX "payload_locked_documents_rels_news_taxonomies_id_idx" ON "payload_locked_documents_rels" USING btree ("news_taxonomies_id");
  CREATE INDEX "payload_locked_documents_rels_news_id_idx" ON "payload_locked_documents_rels" USING btree ("news_id");
  CREATE INDEX "payload_locked_documents_rels_sustainability_id_idx" ON "payload_locked_documents_rels" USING btree ("sustainability_id");
  CREATE INDEX "payload_locked_documents_rels_jobs_id_idx" ON "payload_locked_documents_rels" USING btree ("jobs_id");
  CREATE INDEX "payload_locked_documents_rels_events_id_idx" ON "payload_locked_documents_rels" USING btree ("events_id");
  CREATE INDEX "payload_locked_documents_rels_translations_id_idx" ON "payload_locked_documents_rels" USING btree ("translations_id");
  CREATE INDEX "payload_locked_documents_rels_enquiries_id_idx" ON "payload_locked_documents_rels" USING btree ("enquiries_id");
  CREATE INDEX "payload_locked_documents_rels_applications_id_idx" ON "payload_locked_documents_rels" USING btree ("applications_id");
  CREATE INDEX "payload_locked_documents_rels_meeting_slots_id_idx" ON "payload_locked_documents_rels" USING btree ("meeting_slots_id");
  CREATE INDEX "payload_locked_documents_rels_reservations_id_idx" ON "payload_locked_documents_rels" USING btree ("reservations_id");
  CREATE INDEX "payload_locked_documents_rels_application_files_id_idx" ON "payload_locked_documents_rels" USING btree ("application_files_id");
  CREATE INDEX "payload_locked_documents_rels_public_content_id_idx" ON "payload_locked_documents_rels" USING btree ("public_content_id");
  CREATE INDEX "payload_locked_documents_rels_forms_id_idx" ON "payload_locked_documents_rels" USING btree ("forms_id");
  CREATE INDEX "payload_locked_documents_rels_form_submissions_id_idx" ON "payload_locked_documents_rels" USING btree ("form_submissions_id");
  CREATE INDEX "payload_preferences_key_idx" ON "payload_preferences" USING btree ("key");
  CREATE INDEX "payload_preferences_updated_at_idx" ON "payload_preferences" USING btree ("updated_at");
  CREATE INDEX "payload_preferences_created_at_idx" ON "payload_preferences" USING btree ("created_at");
  CREATE INDEX "payload_preferences_rels_order_idx" ON "payload_preferences_rels" USING btree ("order");
  CREATE INDEX "payload_preferences_rels_parent_idx" ON "payload_preferences_rels" USING btree ("parent_id");
  CREATE INDEX "payload_preferences_rels_path_idx" ON "payload_preferences_rels" USING btree ("path");
  CREATE INDEX "payload_preferences_rels_users_id_idx" ON "payload_preferences_rels" USING btree ("users_id");
  CREATE INDEX "payload_migrations_updated_at_idx" ON "payload_migrations" USING btree ("updated_at");
  CREATE INDEX "payload_migrations_created_at_idx" ON "payload_migrations" USING btree ("created_at");
  CREATE INDEX "website_settings_page_page_icon_idx" ON "website_settings" USING btree ("page_icon_id");
  CREATE INDEX "website_settings_page_page_logo_idx" ON "website_settings" USING btree ("page_logo_id");
  CREATE INDEX "website_settings_page_page_group_logo_idx" ON "website_settings" USING btree ("page_group_logo_id");
  CREATE INDEX "website_settings_page_page_social_image_idx" ON "website_settings" USING btree ("page_social_image_id");
  CREATE INDEX "website_settings_page_page_company_profile_idx" ON "website_settings_locales" USING btree ("page_company_profile_id","_locale");
  CREATE UNIQUE INDEX "website_settings_locales_locale_parent_id_unique" ON "website_settings_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "navigation_page_header_left_order_idx" ON "navigation_page_header_left" USING btree ("_order");
  CREATE INDEX "navigation_page_header_left_parent_id_idx" ON "navigation_page_header_left" USING btree ("_parent_id");
  CREATE INDEX "navigation_page_header_left_page_idx" ON "navigation_page_header_left" USING btree ("page_id");
  CREATE UNIQUE INDEX "navigation_page_header_left_locales_locale_parent_id_unique" ON "navigation_page_header_left_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "navigation_page_header_right_order_idx" ON "navigation_page_header_right" USING btree ("_order");
  CREATE INDEX "navigation_page_header_right_parent_id_idx" ON "navigation_page_header_right" USING btree ("_parent_id");
  CREATE INDEX "navigation_page_header_right_page_idx" ON "navigation_page_header_right" USING btree ("page_id");
  CREATE UNIQUE INDEX "navigation_page_header_right_locales_locale_parent_id_unique" ON "navigation_page_header_right_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "navigation_page_footer_explore_order_idx" ON "navigation_page_footer_explore" USING btree ("_order");
  CREATE INDEX "navigation_page_footer_explore_parent_id_idx" ON "navigation_page_footer_explore" USING btree ("_parent_id");
  CREATE INDEX "navigation_page_footer_explore_page_idx" ON "navigation_page_footer_explore" USING btree ("page_id");
  CREATE UNIQUE INDEX "navigation_page_footer_explore_locales_locale_parent_id_uniq" ON "navigation_page_footer_explore_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "navigation_page_footer_company_order_idx" ON "navigation_page_footer_company" USING btree ("_order");
  CREATE INDEX "navigation_page_footer_company_parent_id_idx" ON "navigation_page_footer_company" USING btree ("_parent_id");
  CREATE INDEX "navigation_page_footer_company_page_idx" ON "navigation_page_footer_company" USING btree ("page_id");
  CREATE UNIQUE INDEX "navigation_page_footer_company_locales_locale_parent_id_uniq" ON "navigation_page_footer_company_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "navigation_page_footer_legal_order_idx" ON "navigation_page_footer_legal" USING btree ("_order");
  CREATE INDEX "navigation_page_footer_legal_parent_id_idx" ON "navigation_page_footer_legal" USING btree ("_parent_id");
  CREATE INDEX "navigation_page_footer_legal_page_idx" ON "navigation_page_footer_legal" USING btree ("page_id");
  CREATE UNIQUE INDEX "navigation_page_footer_legal_locales_locale_parent_id_unique" ON "navigation_page_footer_legal_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "navigation_locales_locale_parent_id_unique" ON "navigation_locales" USING btree ("_locale","_parent_id");`)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "users_sessions" CASCADE;
  DROP TABLE "users" CASCADE;
  DROP TABLE "roles" CASCADE;
  DROP TABLE "media" CASCADE;
  DROP TABLE "media_locales" CASCADE;
  DROP TABLE "product_applications" CASCADE;
  DROP TABLE "product_applications_locales" CASCADE;
  DROP TABLE "_product_applications_v" CASCADE;
  DROP TABLE "_product_applications_v_locales" CASCADE;
  DROP TABLE "product_concentrations" CASCADE;
  DROP TABLE "product_concentrations_locales" CASCADE;
  DROP TABLE "_product_concentrations_v" CASCADE;
  DROP TABLE "_product_concentrations_v_locales" CASCADE;
  DROP TABLE "sustainability_goals" CASCADE;
  DROP TABLE "sustainability_goals_locales" CASCADE;
  DROP TABLE "_sustainability_goals_v" CASCADE;
  DROP TABLE "_sustainability_goals_v_locales" CASCADE;
  DROP TABLE "pages" CASCADE;
  DROP TABLE "pages_locales" CASCADE;
  DROP TABLE "pages_rels" CASCADE;
  DROP TABLE "_pages_v" CASCADE;
  DROP TABLE "_pages_v_locales" CASCADE;
  DROP TABLE "_pages_v_rels" CASCADE;
  DROP TABLE "categories_page_artwork_images" CASCADE;
  DROP TABLE "categories_page_artwork_images_locales" CASCADE;
  DROP TABLE "categories" CASCADE;
  DROP TABLE "categories_locales" CASCADE;
  DROP TABLE "_categories_v_version_page_artwork_images" CASCADE;
  DROP TABLE "_categories_v_version_page_artwork_images_locales" CASCADE;
  DROP TABLE "_categories_v" CASCADE;
  DROP TABLE "_categories_v_locales" CASCADE;
  DROP TABLE "products_page_artwork_images" CASCADE;
  DROP TABLE "products_page_artwork_images_locales" CASCADE;
  DROP TABLE "products" CASCADE;
  DROP TABLE "products_locales" CASCADE;
  DROP TABLE "products_rels" CASCADE;
  DROP TABLE "_products_v_version_page_artwork_images" CASCADE;
  DROP TABLE "_products_v_version_page_artwork_images_locales" CASCADE;
  DROP TABLE "_products_v" CASCADE;
  DROP TABLE "_products_v_locales" CASCADE;
  DROP TABLE "_products_v_rels" CASCADE;
  DROP TABLE "certification_types" CASCADE;
  DROP TABLE "certification_types_locales" CASCADE;
  DROP TABLE "_certification_types_v" CASCADE;
  DROP TABLE "_certification_types_v_locales" CASCADE;
  DROP TABLE "certifications" CASCADE;
  DROP TABLE "certifications_locales" CASCADE;
  DROP TABLE "_certifications_v" CASCADE;
  DROP TABLE "_certifications_v_locales" CASCADE;
  DROP TABLE "news_taxonomies" CASCADE;
  DROP TABLE "news_taxonomies_locales" CASCADE;
  DROP TABLE "_news_taxonomies_v" CASCADE;
  DROP TABLE "_news_taxonomies_v_locales" CASCADE;
  DROP TABLE "news" CASCADE;
  DROP TABLE "news_locales" CASCADE;
  DROP TABLE "news_rels" CASCADE;
  DROP TABLE "_news_v" CASCADE;
  DROP TABLE "_news_v_locales" CASCADE;
  DROP TABLE "_news_v_rels" CASCADE;
  DROP TABLE "sustainability" CASCADE;
  DROP TABLE "sustainability_locales" CASCADE;
  DROP TABLE "sustainability_rels" CASCADE;
  DROP TABLE "_sustainability_v" CASCADE;
  DROP TABLE "_sustainability_v_locales" CASCADE;
  DROP TABLE "_sustainability_v_rels" CASCADE;
  DROP TABLE "jobs" CASCADE;
  DROP TABLE "jobs_locales" CASCADE;
  DROP TABLE "_jobs_v" CASCADE;
  DROP TABLE "_jobs_v_locales" CASCADE;
  DROP TABLE "events_meeting_schedule" CASCADE;
  DROP TABLE "events" CASCADE;
  DROP TABLE "events_locales" CASCADE;
  DROP TABLE "_events_v_version_meeting_schedule" CASCADE;
  DROP TABLE "_events_v" CASCADE;
  DROP TABLE "_events_v_locales" CASCADE;
  DROP TABLE "translations" CASCADE;
  DROP TABLE "translations_locales" CASCADE;
  DROP TABLE "enquiries" CASCADE;
  DROP TABLE "applications" CASCADE;
  DROP TABLE "meeting_slots" CASCADE;
  DROP TABLE "reservations" CASCADE;
  DROP TABLE "application_files" CASCADE;
  DROP TABLE "public_content" CASCADE;
  DROP TABLE "forms_emails" CASCADE;
  DROP TABLE "forms_emails_locales" CASCADE;
  DROP TABLE "forms" CASCADE;
  DROP TABLE "forms_locales" CASCADE;
  DROP TABLE "forms_rels" CASCADE;
  DROP TABLE "form_submissions_submission_data" CASCADE;
  DROP TABLE "form_submissions_submission_uploads" CASCADE;
  DROP TABLE "form_submissions" CASCADE;
  DROP TABLE "form_submissions_rels" CASCADE;
  DROP TABLE "payload_kv" CASCADE;
  DROP TABLE "payload_locked_documents" CASCADE;
  DROP TABLE "payload_locked_documents_rels" CASCADE;
  DROP TABLE "payload_preferences" CASCADE;
  DROP TABLE "payload_preferences_rels" CASCADE;
  DROP TABLE "payload_migrations" CASCADE;
  DROP TABLE "website_settings" CASCADE;
  DROP TABLE "website_settings_locales" CASCADE;
  DROP TABLE "navigation_page_header_left" CASCADE;
  DROP TABLE "navigation_page_header_left_locales" CASCADE;
  DROP TABLE "navigation_page_header_right" CASCADE;
  DROP TABLE "navigation_page_header_right_locales" CASCADE;
  DROP TABLE "navigation_page_footer_explore" CASCADE;
  DROP TABLE "navigation_page_footer_explore_locales" CASCADE;
  DROP TABLE "navigation_page_footer_company" CASCADE;
  DROP TABLE "navigation_page_footer_company_locales" CASCADE;
  DROP TABLE "navigation_page_footer_legal" CASCADE;
  DROP TABLE "navigation_page_footer_legal_locales" CASCADE;
  DROP TABLE "navigation" CASCADE;
  DROP TABLE "navigation_locales" CASCADE;
  DROP TYPE "public"."_locales";
  DROP TYPE "public"."enum_product_applications_status";
  DROP TYPE "public"."enum__product_applications_v_version_status";
  DROP TYPE "public"."enum__product_applications_v_published_locale";
  DROP TYPE "public"."enum_product_concentrations_status";
  DROP TYPE "public"."enum__product_concentrations_v_version_status";
  DROP TYPE "public"."enum__product_concentrations_v_published_locale";
  DROP TYPE "public"."enum_sustainability_goals_status";
  DROP TYPE "public"."enum__sustainability_goals_v_version_status";
  DROP TYPE "public"."enum__sustainability_goals_v_published_locale";
  DROP TYPE "public"."enum_pages_status";
  DROP TYPE "public"."enum__pages_v_version_status";
  DROP TYPE "public"."enum__pages_v_published_locale";
  DROP TYPE "public"."enum_categories_status";
  DROP TYPE "public"."enum__categories_v_version_status";
  DROP TYPE "public"."enum__categories_v_published_locale";
  DROP TYPE "public"."enum_products_status";
  DROP TYPE "public"."enum__products_v_version_status";
  DROP TYPE "public"."enum__products_v_published_locale";
  DROP TYPE "public"."enum_certification_types_status";
  DROP TYPE "public"."enum_certification_types_kind";
  DROP TYPE "public"."enum__certification_types_v_version_status";
  DROP TYPE "public"."enum__certification_types_v_published_locale";
  DROP TYPE "public"."enum__certification_types_v_version_kind";
  DROP TYPE "public"."enum_certifications_holder";
  DROP TYPE "public"."enum_certifications_standing";
  DROP TYPE "public"."enum_certifications_status";
  DROP TYPE "public"."enum__certifications_v_version_holder";
  DROP TYPE "public"."enum__certifications_v_version_standing";
  DROP TYPE "public"."enum__certifications_v_version_status";
  DROP TYPE "public"."enum__certifications_v_published_locale";
  DROP TYPE "public"."enum_news_taxonomies_kind";
  DROP TYPE "public"."enum_news_taxonomies_status";
  DROP TYPE "public"."enum__news_taxonomies_v_version_kind";
  DROP TYPE "public"."enum__news_taxonomies_v_version_status";
  DROP TYPE "public"."enum__news_taxonomies_v_published_locale";
  DROP TYPE "public"."enum_news_status";
  DROP TYPE "public"."enum__news_v_version_status";
  DROP TYPE "public"."enum__news_v_published_locale";
  DROP TYPE "public"."enum_sustainability_status";
  DROP TYPE "public"."enum__sustainability_v_version_status";
  DROP TYPE "public"."enum__sustainability_v_published_locale";
  DROP TYPE "public"."enum_jobs_availability";
  DROP TYPE "public"."enum_jobs_status";
  DROP TYPE "public"."enum__jobs_v_version_availability";
  DROP TYPE "public"."enum__jobs_v_version_status";
  DROP TYPE "public"."enum__jobs_v_published_locale";
  DROP TYPE "public"."enum_events_kind";
  DROP TYPE "public"."enum_events_status";
  DROP TYPE "public"."enum__events_v_version_kind";
  DROP TYPE "public"."enum__events_v_version_status";
  DROP TYPE "public"."enum__events_v_published_locale";
  DROP TYPE "public"."enum_enquiries_locale";
  DROP TYPE "public"."enum_enquiries_kind";
  DROP TYPE "public"."enum_enquiries_channel";
  DROP TYPE "public"."enum_enquiries_status";
  DROP TYPE "public"."enum_applications_locale";
  DROP TYPE "public"."enum_applications_status";
  DROP TYPE "public"."enum_reservations_locale";
  DROP TYPE "public"."enum_forms_confirmation_type";
  DROP TYPE "public"."enum_forms_purpose";
  DROP TYPE "public"."enum_form_submissions_locale";
  DROP TYPE "public"."enum_navigation_page_header_left_link_type";
  DROP TYPE "public"."enum_navigation_page_header_right_link_type";
  DROP TYPE "public"."enum_navigation_page_footer_explore_link_type";
  DROP TYPE "public"."enum_navigation_page_footer_company_link_type";
  DROP TYPE "public"."enum_navigation_page_footer_legal_link_type";`)
}
