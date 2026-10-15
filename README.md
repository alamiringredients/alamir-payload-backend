# Alamir Payload backend

Use Node.js 24 LTS for development and deployment. The tooling also supports Node.js 22.13+ (22.x) and Node.js 26+.

The CMS and public API use Payload 3 with its standard admin, Lexical editor, localization, authentication, and PostgreSQL adapter. The separate website is in `../alamir-payload-frontend`.

## Run locally

PostgreSQL runs on the installed server at port 5432. Configure `DATABASE_URL` and `PAYLOAD_SECRET` in `.env`, using `.env.example` as a guide. Configure the existing Cloudflare R2 bucket with `R2_BUCKET`, `R2_ENDPOINT`, `R2_ACCESS_KEY_ID`, `R2_SECRET_ACCESS_KEY`, and `R2_PUBLIC_URL`.

```sh
npm ci
npm run dev
```

Open <http://localhost:8000/admin>. Payload retains its default first-user setup and login flow. Its generated REST API is under `/api`.

## Asset storage

Public Media uses the official `@payloadcms/storage-s3` plugin with Cloudflare R2. Existing assets retain their original object paths. New uploads use `payload/media` in the existing bucket and are served through `R2_PUBLIC_URL`. Replacing an image or video uses the same plugin's standard upload operation. Local upload storage is disabled.

To populate a database with the current dashboard defaults in English, Arabic, and French:

```sh
NODE_ENV=production npm run seed
```

`seed/content.json` is a snapshot of the current dashboard content, captured on October 14, 2026: 17 pages, 14 products, 4 categories, 18 certificates, 33 forms, 570 shared translations, 123 meeting slots, all content options and articles, roles, Navigation and Site settings. All three locales are captured, including the existing English fallback for untranslated values. Form defaults and individually edited owner forms are included. Relationship references are remapped to the target database's IDs. Shared interface text, including country names and social-link accessibility labels, comes from Payload Translations. Page, event and form copy stays in its native localized owner fields. The frontend has no translation JSON catalogs or hardcoded language overrides. The owned-translations migration updates matching old defaults while preserving administrator edits; fresh installations receive the same values from the seed.

The 196 media records link existing R2 files by filename and prefix. Seeding does not download, upload, copy, or delete their bytes. Computed upload URLs are excluded from the fixture so Payload does not treat them as replacement uploads. Normal admin uploads still use the official S3 plugin.

Seeding only creates missing records and uninitialized globals. Existing administrator edits and bookings are preserved; booked flags are not copied into fresh defaults because reservations are not seeded. Source writes run in one PostgreSQL transaction, then published projections and caches are refreshed. Accounts, passwords, enquiries, applications, reservations, form submissions and private CVs are excluded. The first account created through `/admin` receives Super Admin.

The shared **Two columns** block and existing section blocks expose **Column widths**. **Original design** preserves each layout's original proportions; editors can choose 50/50, 55/45, 60/40, 70/30, or the reversed proportions. The shared-columns migration converts the retired careers News block in pages and saved versions, preserving its localized content, media and article order. The careers form-copy migration aligns unchanged application-form defaults with the original website. Both changes are included in the seed for fresh installations.

Category **Page appearance** controls the category label treatment independently of its slug. News and event content sections expose **Introduction style** (body text or lead paragraph). The presentation migration preserves the original choices in existing documents and saved versions; the seeder includes the same settings. URL changes do not select a different design. Frontend template metadata identifies copy roles and accordion formats explicitly, rather than inspecting English labels.

To capture future intentional dashboard changes as the new defaults, run `NODE_ENV=production npm run seed:export` locally against the source dashboard database, review `seed/content.json`, and deploy that file with the application. Do not run export against an empty production database before seeding.

## Production deployment

Deploy the backend first, then follow the [frontend production steps](../alamir-payload-frontend/README.md#production-deployment). Use an existing PostgreSQL server and R2 bucket; no container is required. The production database must already exist and its user must have permission to create and alter the application tables. Back up an existing production database before applying migrations.

1. From the deployed `alamir-payload-backend` folder, install the locked dependencies, including the build and seeding tools:

   ```sh
   npm ci --include=dev
   ```

2. On the first deployment only, create the environment file:

   ```sh
   cp .env.example .env
   ```

   If `.env` already exists, edit it instead of copying over it. Hosting-provided environment variables can replace the file.

   Generate the Payload secret once:

   ```sh
   openssl rand -hex 32
   ```

   Copy that output into `PAYLOAD_SECRET`. Payload does not generate it automatically. Keep it unchanged across deployments; changing it invalidates existing login tokens. Do not commit `.env` or secrets to Git.

   Run the same command again to generate a separate `CMS_REVALIDATION_SECRET`. Copy this second value into both projects, without a `NEXT_PUBLIC_` prefix.

   Configure these values before migrating, seeding or building:

   | Variable | Production value |
   | --- | --- |
   | `PORT` | Server listening port; default `8000` in `.env.example`, editable in `.env` |
   | `DATABASE_URL` | Connection string for the production PostgreSQL database |
   | `PAYLOAD_SECRET` | The first generated secret; backend only |
   | `PAYLOAD_PUBLIC_URL` | Backend HTTPS origin, for example `https://cms.example.com`, without `/admin` or `/api` |
   | `FRONTEND_URL` | Frontend HTTPS origin, for example `https://www.example.com` |
   | `R2_BUCKET` | Existing bucket name |
   | `R2_ENDPOINT` | Account's S3 endpoint, `https://your-account-id.r2.cloudflarestorage.com` |
   | `R2_ACCESS_KEY_ID` | R2 access key; backend only |
   | `R2_SECRET_ACCESS_KEY` | R2 secret key; backend only |
   | `R2_PUBLIC_URL` | Public media origin, for example `https://media.example.com` |
   | `CMS_REVALIDATION_SECRET` | The second generated secret, identical in the frontend |
   | `APP_TIMEZONE` | Optional; leave empty if no explicit display timezone is wanted |

   The seeded media objects must exist in this bucket at their saved filename/prefix paths. `R2_PUBLIC_URL` must serve those objects and match the frontend's `NEXT_PUBLIC_MEDIA_URL`.

3. Run these commands in order:

   ```sh
   npm run migrate
   npm run migrate:status
   NODE_ENV=production npm run seed
   npm run build
   ```

   The migration scripts explicitly use production mode and apply the committed schema migrations. The initial migration creates a fresh schema, including the published-content table; existing databases use the applicable upgrade migrations. Do not generate migrations on the production server or run `migrate:fresh`, `migrate:reset`, or `migrate:refresh` to seed content.

   `NODE_ENV=production` on the seed command prevents Payload's development schema push from automatically changing tables. If your environment already sets `NODE_ENV=production`, `npm run seed` is sufficient. The seed creates missing defaults, preserves existing edits and bookings, and rebuilds published projections; a separate `refresh:public` command is unnecessary. It registers existing R2 media without uploading or downloading files, and does not create accounts or copy submissions.

4. Start the backend:

   ```sh
   npm run start
   ```

   This runs the production server on the `PORT` configured in `.env` and stays in the foreground. The provided backend default is `8000`. The start and development commands preload `.env` before Next.js reads the port; a hosting-provided `PORT` takes precedence. Changing the port requires restarting the service, without changing the start script. Under a process manager, configure `npm run start` as the service start command and use the manager's restart command for subsequent deployments. Route your backend HTTPS domain to your configured listening port.

5. On a fresh installation, open the backend's `/admin` URL and create your own first Super Admin account. Then build and start the frontend in its separate folder/terminal. The seeded backend must be reachable before the frontend build.

To change the listening port, edit `PORT` in this project's `.env`, then restart:

```env
PORT=8000
```

For local development, update the matching public URLs in both projects when their ports change. In production, public URLs should use your HTTPS domains and remain separate from the internal listening ports.

For later deployments, keep the existing secrets and environment values, install dependencies, apply migrations, build and restart the service. Run the seed again only when you want to add missing default records; it does not replace edited records. Build/restart the frontend after seeding so its output cache uses the seeded data.

## SMTP and queued emails

Email uses Payload's official `@payloadcms/email-nodemailer` adapter and its built-in PostgreSQL Jobs Queue. The restored original flows are meeting confirmations and administrator replies to enquiries and job applications. Replies retain the original branded HTML; meeting confirmations retain their original wording and styling. Meeting dates use the reservation locale and optional `APP_TIMEZONE`, with no per-event timezone field. Meeting email copy is editable under Shared translations in the Meeting emails group, and its defaults are included in the seeder. The original implementation used English wording for all locales, so those defaults are preserved; administrators can translate them independently.

Set your SMTP provider credentials in the backend `.env`:

```env
MAIL_HOST=smtp.example.com
MAIL_PORT=587
MAIL_SECURE=false
MAIL_USERNAME=your-smtp-username
MAIL_PASSWORD=your-smtp-password
MAIL_FROM_ADDRESS=no-reply@your-domain.com
MAIL_FROM_NAME="Alamir Ingredients"
```

Use your provider's SMTP host, port, credentials and verified sender address. Use `MAIL_SECURE=true` for implicit TLS, typically port 465, or `false` for SMTP with STARTTLS, typically port 587. Keep these settings in the backend only; neither the seeder nor Form Builder stores SMTP credentials. Restart the backend and worker after changing them. If SMTP is unconfigured, queued delivery fails and retries instead of being reported as sent.

Apply migrations, seed defaults, and build the backend using the production steps above. Run **two separate supervised services**, both from this backend directory and using the same environment/database:

```sh
# HTTP/admin service
npm run start
```

```sh
# Email worker service, in a separate terminal/process
npm run jobs:work
```

The worker runs Payload's native job runner every five seconds, processing up to 25 jobs per pass. It has no listening port. Keep it running and restart it when deploying backend code or changing SMTP credentials. Queued records persist in PostgreSQL if the worker is stopped. For a one-off processing pass:

```sh
npm run jobs:run
```

The API saves the record and queues the email in the same transaction. SMTP runs in the worker, with three native retries and exponential backoff starting at 30 seconds. Delivery status, Message ID, sent time and the last error appear on reservations and replies. Saving an existing reservation does not enqueue another confirmation. An already-sent confirmation or reply is skipped if another job references it. SMTP does not provide exactly-once delivery across a worker crash between provider acceptance and saving the receipt.

Open an Enquiry or Application and use **Email replies → Create new** to compose a reply with the native Payload editor. Select the target if creating from the Email replies collection directly. Its recipient comes from that record, and saving queues the reply. Existing View/Edit permissions for Enquiries or Applications control access; anonymous visitors cannot create replies. Queued reply content is immutable. Super Admin can inspect pending, completed and failed native jobs in **Administration → Jobs**; the jobs endpoints deny public queueing and execution.

Optional email definitions configured through Form Builder also use the native queue. No automatic contact/application notification is added by default because the original website did not send one. Existing booking confirmations are not resent during seeding or migration, and the seeder excludes replies and queued jobs.

## Verification

```sh
npm run typecheck
npm run lint
npm run test:int
npm run build
```

Integration tests run in parallel against the configured database. The seed round-trip tests additionally use `SEED_VERIFY_DATABASE_URL` pointing to a disposable `alamir_seed_verify_*` PostgreSQL database; they run the real production migrations and seeder, compare every exported content field in all locales, and check repeat-seed preservation of edits and bookings. The R2 test creates a temporary image, verifies its actual bytes and the absence of a local copy, then deletes it and verifies removal. It requires working R2 credentials and a seeded database.

## Editing content

Website pages are managed in one **Website pages** collection. Create a page, enter its title and URL slug, then add sections from Payload's native Blocks picker. Drag sections to reorder them; the native row menu supports duplication and removal. Each section has a Show section checkbox, and media sections offer Original design, Left, or Right placement. Reusable content sections use the same frontend components and styles as the existing website. Normal Lexical editors, upload selectors, and arrays provide all editing controls; there are no custom admin components.

Publishing creates the public page route automatically. Preview opens an authenticated frontend preview of the saved draft; it uses the existing Payload login cookie. Native drafts and autosave preserve changes before publishing. The original 17 website pages and all three locales are seeded into this collection. Site settings, Navigation, and Product filters and labels remain separate shared settings. Navigation has sortable header and footer link arrays that can point to any website page or a custom URL. Each link owns its label in English, Arabic, and French. Shared navigation interface messages are in Shared translations, and homepage hero content belongs to the Home website page. Navigation has no SEO tab.

Products, categories, news, sustainability articles, jobs, and events use the same reusable section editor as Website pages. Each record has one formatted Title using the default Lexical editor; the same title supplies its heading, cards, and readable admin label. Page content is the first tab and contains sortable native blocks: the existing branded record sections plus shared Hero, Text, Text with image or video, Gallery, and Call to action blocks. Add, duplicate, reorder, remove, or hide sections independently. Record-level relationships appear as named selectors in the right sidebar. Section-specific relationships and galleries stay in their owning sections. News and sustainability articles have no redundant Details tab. Certifications have readable names identifying their type and holder. Collection lists support Payload's standard manual ordering. Shared interface copy is searchable in Shared translations.

Set the same `CMS_REVALIDATION_SECRET` in both projects to refresh the website cache immediately after publishing a page or content record, or saving shared settings. Existing R2 references are preserved; uploads and replacements use the official storage plugin. The build generates Payload's import map and types before Next.js compilation.

`APP_TIMEZONE` in `.env` optionally configures the application’s shared time display. Leave it empty to use the runtime default. Events do not store individual timezone settings, and the admin and booking screens have no timezone selector. Existing UTC timestamps are preserved.

Sustainability articles use one native Lexical article editor, with Payload uploads, the built-in table feature, and reusable figures, callout, text, media, gallery, and action blocks. There are no chapter forms or fixed empty table slots. Each article has one hero image, shared by its listing and related-article cards. Existing article paragraphs, embedded assets, tables, and figures are seeded in all three locales.

Related Sustainability articles are selected by name in the right sidebar. Drag the selected articles to control their order; clear the selection to hide the public related section. They are ordinary Payload relationships, with no separate Related articles editor block.

Inside each event, the Meeting slots tab contains a native Meeting schedule repeater. Add a dated window (up to 24 hours), duration in minutes, a gap duration for that window, then publish the event. The generator adds complete meetings that fit the window, adds the gap after each meeting, and skips any time overlapping an existing slot. It keeps all existing slots and bookings; schedule edits do not remove previously generated slots. The database enforces a unique event/start pair. The seed captures the current slot definitions and schedules, preserves existing slots and bookings, and does not regenerate or replace edited schedules. Reservations are grouped under Events; Jobs and Applications are grouped under Careers.

Media opens in a thumbnail grid in both the library and the native upload picker. Images use their existing R2 URLs; videos show a paused frame loaded only when their card approaches the viewport. PDF cards show the file type. All / Images / Videos / PDFs type filters, Grid/List, sorting, and Payload's existing search, filters, pagination, upload, and bulk selection remain available. The custom list component replaces only the table slot of DefaultListView and uses Payload's existing query and selection providers, without additional database queries or duplicate media assets.

Form Builder uses the official Payload plugin. Open the owning page, job, event or product and select its Forms tab to edit its form. New jobs, upcoming events and products receive their own copy of the current default. Labels, placeholders, options, required fields, help text and visibility can be edited in English, Arabic and French. Identity, consent and CV fields remain required where the submission workflow needs them.

When saving a form, **Use this as the default for future records of this type** updates the default without changing other existing forms. **Apply this form to all existing forms of this type** replaces their form definitions while preserving ownership. Both options copy all three locales and reset after saving. The seeder creates missing forms and defaults without resetting edited forms.

Form Builder submissions retain additional answers and create the existing Enquiry, Application or Reservation record. Applications keep their owning job and private CV attachment. Reservations keep event/slot validation and the unique slot constraint. CVs remain private; website media continues to use R2.

Form labels, placeholders, options, confirmation content and the Messages and actions group belong to Form Builder. The current snapshot contains those messages in their forms and excludes the retired form translation rows; repeated runs preserve form edits. Page headings and surrounding editorial copy remain in their page records.

Product select is a reusable Form Builder field backed by published Categories. Its choices use the selected locale and category order, and are fetched once per request. The default category uses Payload’s relationship picker. The snapshot uses Product select fields; repeated seeds preserve edited labels, visibility and required settings. Submission answers retain a category relationship and a readable category-name snapshot; enquiries link the selected product category in the sidebar.

Site settings has four tabs: Branding (site name, icon, logos and sharing image), Contact & sales (email, phone numbers, sales WhatsApp, address, website and social media links), Documents, and SEO. Company profile is a localized PDF upload in Documents, using Media and R2. The selected file appears on product detail pages and in Downloads. No company profile PDF is currently selected in Site settings, so the captured default remains empty until an administrator selects a file.

Roles use Payload's native collection, global and field access controls. The first user receives **Super Admin**, with full access. Super Admins manage Roles under Administration, create named roles with View/Create/Edit/Delete abilities, and assign a role in each user's sidebar. Site settings and Navigation have View/Edit abilities. Unchecked abilities are denied by the API and reflected in the admin interface. Permissions are loaded once per request so saved role changes apply without requiring users to log in again.

Public content on `/api/public/site` reads a hidden, persistent PostgreSQL `public-content` collection. Its documents are derived from native Payload reads with anonymous public access, retaining the published source records and all three locales. Publication also prepares localized public responses so serving a page selects only its requested locale, retaining English fallback and omitting unused locale properties, without transforming all languages during the request. Publication and deletion refresh the affected resource transactionally before invalidating caches; concurrent publication refreshes are serialized to prevent lost updates. Shared summaries contain only the fields needed by navigation and the site shell, including the first enabled product gallery image. The ordinary `/api/public/` resource routes retain the native Payload REST reader behind the Next server data cache. Only anonymous, published public content is cached. Authenticated, draft and private requests use the normal uncached Payload API. Concurrent identical cache misses share one pending read. Backend entries expire after five minutes; frontend entries expire after one minute. Publishing, deleting, changing media or reserving a slot invalidates both caches. The seeder rebuilds published projections and refreshes both caches after completion. Run `npm run refresh:public` when introducing this collection to an existing database; it rebuilds derived content without resetting or editing CMS source records. Cold HTTP-cache misses still use the persistent published read model. Publication costs more work than a page read; the measured disposable page publication used 11 SELECTs, 9 writes and 3 transaction statements.

The frontend selects navigation/card data, reads individual pages, and batches media and relationship references at depth zero. Media selection includes filename and R2 prefix so generated URLs remain correct. Visible page-owned forms render with their page. Hidden quote forms load on intent; application and selected-event reservation forms retain their owners and fresh server-side submission validation.

CMS block fields use Payload's documented `blocksAsJSON: true` Postgres option, preserving the default Blocks/Form Builder editors while avoiding joins across every possible block table. Products, categories, media, taxonomy relations, users, jobs, events, slots, reservations, enquiries and applications remain native relational records. The existing database was converted with Payload's official blocks-to-JSON migrator; all 1,533 block-bearing documents/versions were verified against their original content. Run `npm run migrate` to apply the native storage migration; it skips an already converted schema. Reverse the storage conversion by restoring the pre-migration database backup.

The frontend retains the original font assets, external font stylesheets and font preloads. A response-header preload starts that stylesheet earlier; no inline font CSS or replacement font was retained. Responsive hero sizes follow the existing CSS breakpoints. Page conversion is memoized per request without changing independently edited or repeated blocks. The remaining browser TTFB difference is documented in the comparison rather than reported as an improvement.

### Custom forms on website pages

In **Website → Forms**, create a form, define its fields, submit button and confirmation message or redirect, and save it. New forms use the Custom purpose and accept the fields you choose without requiring contact/application fields.

In **Website pages → Page content**, add a **Form** section, select the custom form (or create one from the relationship picker), and optionally add a heading and introduction. Publish the page. The same form can be reused across pages and inherits the shared frontend section, field and button styles.

Answers appear in **Inbox → Form submissions**, including the originating page. Forms permissions control access to custom submissions; existing enquiry, application and reservation permissions continue to control their workflow submissions. Submissions require an enabled Form section on a published page.

Run `npm run migrate` before deploying to apply all pending production migrations. Development uses Payload schema push.

## Where to make changes

- **Content fields:** `src/collections/` owns record schemas; `src/blocks/` owns reusable page and record sections. Use the existing blocks before adding a new one.
- **Business behavior:** `src/services/` owns forms, bookings, email delivery, and published content. Collection hooks call those functions.
- **Publication:** `src/hooks/revalidate.ts` refreshes the public read model and invalidates caches. `src/hooks/publicContentWrites.ts` acquires the shared publication lock before content writes; nested operations must pass the same `req` to keep one transaction.
- **Defaults:** export intentional dashboard changes with `npm run seed:export`, review `seed/content.json`, and verify fresh migrations and seeding with `tests/int/seed.int.spec.ts` using a disposable `SEED_VERIFY_DATABASE_URL`.
- **Schema changes:** add a migration and run `npm run generate:types`. Keep migrations: Payload discovers them at runtime even when static analysis reports them as unused.

The backend owns persistence, permissions, and submissions. The sibling frontend owns rendering and browser interactions. Keep new code in those existing locations; no additional repository, controller, or dependency-injection layer is needed for ordinary content changes.
