import {publicContentWrites} from './hooks/publicContentWrites'
import { nodemailerAdapter } from '@payloadcms/email-nodemailer'
import { EmailReplies } from './collections/EmailReplies'
import { sendEmailTask } from './services/emails'
import { publicReadContext } from './services/queryProfile'
import { PublicContent } from './collections/PublicContent'
import { formsPlugin } from './collections/FormBuilder'
import { ApplicationFiles } from './collections/ApplicationFiles'
import { mediaURL } from './storage/mediaURL'
import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { s3Storage } from '@payloadcms/storage-s3'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

import { Users } from './collections/Users'
import { Roles } from './collections/Roles'
import { dashboardPermissions, superAdmin } from './access/permissions'
import { seedAdminRoles } from './services/adminRoles'
import { Media } from './collections/Media'
import { collections, globals } from './content'
import { Enquiries, Applications, MeetingSlots, Reservations } from './collections/Inbox'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: Users.slug,
    timezones: { defaultTimezone: process.env.APP_TIMEZONE || undefined },
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  collections: [
    Users,
    Roles,
    Media,
    ...collections,
    Enquiries,
    Applications,
    MeetingSlots,
    Reservations,
    ApplicationFiles,
    PublicContent,
    EmailReplies,
  ],
  onInit: seedAdminRoles,
  globals,
  serverURL: process.env.PAYLOAD_PUBLIC_URL || 'http://localhost:8000',
  cors: [process.env.FRONTEND_URL || 'http://localhost:3000'],
  csrf: [process.env.FRONTEND_URL || 'http://localhost:3000'],
  localization: {
    locales: [
      { code: 'en', label: 'English' },
      { code: 'ar', label: 'Arabic', rtl: true },
      { code: 'fr', label: 'French' },
    ],
    defaultLocale: 'en',
    fallback: true,
  },
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: postgresAdapter({
    blocksAsJSON: true,
    pool: { connectionString: process.env.DATABASE_URL || '' },
    logger:
      process.env.PAYLOAD_QUERY_LOG === '1'
        ? {
            logQuery: () => {
              const resource = publicReadContext.getStore()
              if (resource) console.info('PAYLOAD_SQL', resource)
            },
          }
        : undefined,
    push: process.env.NODE_ENV === 'test' ? false : undefined,
  }),
  email:
    process.env.MAIL_HOST && process.env.MAIL_FROM_ADDRESS
      ? nodemailerAdapter({
          defaultFromAddress: process.env.MAIL_FROM_ADDRESS,
          defaultFromName: process.env.MAIL_FROM_NAME || '',
          skipVerify: true,
          transportOptions: {
            host: process.env.MAIL_HOST,
            port: Number(process.env.MAIL_PORT || 587),
            connectionTimeout: 10000, greetingTimeout: 10000, socketTimeout: 30000,
      secure: process.env.MAIL_SECURE === 'true',
            ...(process.env.MAIL_USERNAME
              ? { auth: { user: process.env.MAIL_USERNAME, pass: process.env.MAIL_PASSWORD } }
              : {}),
          },
        })
      : undefined,
  jobs: {
    tasks: [sendEmailTask],
    deleteJobOnComplete: false,
    access: { queue: () => false, run: () => false },
    jobsCollectionOverrides: ({ defaultJobsCollection }) => ({
      ...defaultJobsCollection,
      admin: { ...defaultJobsCollection.admin, hidden: false, group: 'Administration' },
      access: { ...defaultJobsCollection.access, admin: superAdmin, read: superAdmin },
    }),
  },
  sharp,
  plugins: [
    formsPlugin,
    s3Storage({
      bucket: process.env.R2_BUCKET!,
      collections: {
        media: {
          prefix: '',
          disablePayloadAccessControl: true,
          generateFileURL: ({ filename, prefix }) => mediaURL(filename, prefix),
        },
      },
      config: {
        endpoint: process.env.R2_ENDPOINT,
        region: 'auto',
        forcePathStyle: true,
        credentials: {
          accessKeyId: process.env.R2_ACCESS_KEY_ID!,
          secretAccessKey: process.env.R2_SECRET_ACCESS_KEY!,
        },
      },
    }),
    dashboardPermissions,
    publicContentWrites,
  ],
})
