# Alamir administration

You need Node.js 24, a PostgreSQL database, an existing Cloudflare R2 bucket with the website’s media files, and SMTP credentials for sending emails.

1. Open a terminal in this project folder and install dependencies:

   ```sh
   npm ci --include=dev
   ```

2. On the first installation, create the settings file:

   ```sh
   cp .env.example .env
   ```

   Edit `.env` with your settings. Keep an existing `.env` when updating.

   | Setting | Value |
   | --- | --- |
   | `PORT` | Administration port, usually `8000` |
   | `DATABASE_URL` | PostgreSQL connection URL; the database must exist |
   | `PAYLOAD_SECRET` | A random secret generated below; keep it unchanged after installation |
   | `PAYLOAD_PUBLIC_URL` | Backend URL, without `/admin` or `/api` |
   | `FRONTEND_URL` | Website URL |
   | `R2_BUCKET` | Existing media bucket name |
   | `R2_ENDPOINT` | Your R2 S3 endpoint |
   | `R2_ACCESS_KEY_ID` | R2 access key |
   | `R2_SECRET_ACCESS_KEY` | R2 secret key |
   | `R2_PUBLIC_URL` | Public media URL |
   | `CMS_REVALIDATION_SECRET` | A second random secret; use the same value in the frontend |
   | `APP_TIMEZONE` | Your timezone, for example `Africa/Cairo` |
   | `MAIL_HOST`, `MAIL_PORT` | Your SMTP server and port |
   | `MAIL_SECURE` | `true` for port `465`; usually `false` for port `587` |
   | `MAIL_USERNAME`, `MAIL_PASSWORD` | SMTP login details |
   | `MAIL_FROM_ADDRESS`, `MAIL_FROM_NAME` | Your verified sender email and name |

   Generate each secret separately with:

   ```sh
   openssl rand -hex 32
   ```

3. Set up the database, load the initial website content, and build:

   ```sh
   npm run migrate
   NODE_ENV=production npm run seed
   npm run build
   ```

4. Start the administration site:

   ```sh
   npm run start
   ```

5. In a separate terminal, from the same folder, start email delivery:

   ```sh
   npm run jobs:work
   ```

Keep both processes running. Open your backend URL followed by `/admin`, or [localhost:8000/admin](http://localhost:8000/admin) locally, and create the first administrator account.

Then [install and start the website](../alamir-payload-frontend/README.md).

For updates, back up the database, keep `.env` and its secrets, run `npm ci --include=dev`, `npm run migrate`, and `npm run build`, then restart both processes. After changing `.env`, rebuild and restart both processes.
