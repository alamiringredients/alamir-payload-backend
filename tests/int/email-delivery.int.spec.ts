import 'dotenv/config'
import { afterAll, beforeAll, expect, it } from 'vitest'
import { getPayload, createLocalReq, type Payload } from 'payload'
import { postgresAdapter } from '@payloadcms/db-postgres'
import { nodemailerAdapter } from '@payloadcms/email-nodemailer'
import { randomUUID } from 'node:crypto'
import type { User } from '../../src/payload-types'
import config from '../../src/payload.config'
import seed from '../../seed/content.json'

let payload: Payload, admin: User
const schema = `email_check_${randomUUID().replaceAll('-', '')}`
const context = {
  disableRevalidate: true,
  disablePublicProjection: true,
  disableOwnerForms: true,
  disableSlotGeneration: true,
}
const prefix = `payload-${randomUUID()}`
const mailpit = 'http://127.0.0.1:8025'
const title = {
  root: {
    type: 'root',
    version: 1,
    direction: null,
    format: '' as const,
    indent: 0,
    children: [
      {
        type: 'paragraph',
        version: 1,
        children: [
          {
            type: 'text',
            version: 1,
            text: `Mailpit verification ${prefix}`,
            format: 0,
            detail: 0,
            mode: 'normal',
            style: '',
          },
        ],
      },
    ],
  },
}
async function messages(recipient: string) {
  const response = await fetch(`${mailpit}/api/v1/messages?limit=1000`)
  const data = (await response.json()) as {
    messages: { ID: string; To: { Address: string }[]; Subject: string }[]
  }
  return data.messages.filter((message) => message.To.some((to) => to.Address === recipient))
}
async function jobFor(kind: string, id: number) {
  const result = await payload.find({ collection: 'payload-jobs', depth: 0, pagination: false })
  return result.docs.filter((job) => {
    const input = job.input as { kind: string; recordId: number }
    return input.kind === kind && input.recordId === id
  })
}
async function reservation(locale: 'en' | 'ar' | 'fr' = 'en') {
  const event = await payload.create({
    collection: 'events',
    context,
    data: { title, slug: `event-${randomUUID()}`, kind: 'event', _status: 'published' },
  })
  const slot = await payload.create({
    collection: 'meeting-slots',
    context,
    data: {
      event: event.id,
      startsAt: '2030-01-15T09:00:00.000Z',
      endsAt: '2030-01-15T09:30:00.000Z',
    },
  })
  return payload.create({
    collection: 'reservations',
    context,
    data: {
      slot: slot.id,
      name: 'Mailpit <verification>',
      email: `${prefix}-${randomUUID()}@mail.test`,
      phone: '123',
      locale,
      consent: true,
      key: randomUUID(),
      topic: 'Email verification',
    },
  })
}
beforeAll(async () => {
  const base = await config
  payload = await getPayload({
    key: schema,
    config: Promise.resolve({
      ...base,
      db: {
        ...postgresAdapter({
          blocksAsJSON: true,
          schemaName: schema,
          push: true,
          pool: { connectionString: process.env.DATABASE_URL },
        }),
        name: 'postgres',
        allowIDOnCreate: false,
      },
      email: await nodemailerAdapter({
        defaultFromAddress: 'careers@alamir.test',
        defaultFromName: 'Alamir Ingredients',
        skipVerify: true,
        transportOptions: { host: '127.0.0.1', port: 1025, secure: false },
      }),
    }),
  })
  const source = seed.collections.media.find((row) => row.data.en.filename === 'logo-full.svg')!
  const logo = await payload.create({ collection: 'media', context, data: source.data.en as never })
  await payload.updateGlobal({
    slug: 'website-settings',
    context,
    data: { page: { siteName: 'Alamir Ingredients', logo: logo.id } },
  })
  for (const row of seed.collections.translations.filter((row) =>
    row.data.en.key.startsWith('email.meeting.'),
  )) {
    let id: number | undefined
    for (const locale of ['en', 'ar', 'fr'] as const) {
      const doc = id
        ? await payload.update({
            collection: 'translations',
            id,
            locale,
            context,
            data: row.data[locale],
          })
        : await payload.create({
            collection: 'translations',
            locale,
            context,
            data: row.data[locale],
          })
      id = doc.id
    }
  }
  admin = {
    ...(await payload.create({
      collection: 'users',
      context,
      data: {
        name: 'Email verification administrator',
        email: `${prefix}-admin@mail.test`,
        password: 'email-verification-password-123',
        role: 0,
      },
    })),
    collection: 'users',
  }
}, 120000)
afterAll(async () => {
  if (!payload) return
  const files = await payload.find({ collection: 'application-files', depth: 0, pagination: false })
  for (const file of files.docs)
    await payload.delete({ collection: 'application-files', id: file.id })
  await payload.db.pool.query(`DROP SCHEMA "${schema}" CASCADE`)
  await payload.destroy()
})
it('queues a booking transactionally, sends the original HTML through Mailpit, and does not send again on edits or repeated jobs', async () => {
  const booking = await reservation()
  expect(booking.emailDelivery?.status).toBe('queued')
  expect(await messages(booking.email)).toHaveLength(0)
  const jobs = await jobFor('reservation', booking.id)
  expect(jobs).toHaveLength(1)
  await payload.update({
    collection: 'reservations',
    id: booking.id,
    context,
    data: { topic: 'Updated topic' },
  })
  expect(await jobFor('reservation', booking.id)).toHaveLength(1)
  await payload.jobs.runByID({ id: jobs[0].id, req: await createLocalReq({ context }, payload) })
  const sent = await messages(booking.email)
  expect(sent).toHaveLength(1)
  expect(sent[0].Subject).toContain('Meeting confirmed — Mailpit verification')
  const email = (await (await fetch(`${mailpit}/api/v1/message/${sent[0].ID}`)).json()) as {
    Text: string
    HTML: string
  }
  expect(email.Text).toContain('Your meeting for Mailpit verification')
  expect(email.HTML).toContain('Mailpit &lt;verification&gt;')
  expect(email.HTML).toContain('border-top:5px solid #c8402c')
  expect(
    (await payload.findByID({ collection: 'reservations', id: booking.id, depth: 0 }))
      .emailDelivery,
  ).toMatchObject({ status: 'sent', messageID: expect.any(String), sentAt: expect.any(String) })
  const repeated = await payload.jobs.queue({
    task: 'send-email',
    queue: 'emails',
    input: { kind: 'reservation', recordId: booking.id },
  })
  await payload.jobs.runByID({ id: repeated.id, req: await createLocalReq({ context }, payload) })
  expect(await messages(booking.email)).toHaveLength(1)
}, 60000)
it('sends branded admin replies for both enquiries and applications, with HTML escaping and native permission checks', async () => {
  const enquiry = await payload.create({
    collection: 'enquiries',
    context,
    data: {
      name: 'Mailpit enquiry',
      email: `${prefix}-enquiry@mail.test`,
      kind: 'home',
      locale: 'en',
      key: randomUUID(),
    },
  })
  const bytes = Buffer.from(
    '%PDF-1.4\n1 0 obj\n<< /Type /Catalog >>\nendobj\nxref\n0 2\n0000000000 65535 f \n0000000009 00000 n \ntrailer\n<< /Size 2 /Root 1 0 R >>\nstartxref\n58\n%%EOF',
  )
  const cv = await payload.create({
    collection: 'application-files',
    context,
    file: { name: `${prefix}.pdf`, data: bytes, mimetype: 'application/pdf', size: bytes.length },
    data: {},
  })
  const application = await payload.create({
    collection: 'applications',
    context: { ...context, submittedForm: true },
    data: {
      name: 'Mailpit applicant',
      email: `${prefix}-application@mail.test`,
      phone: '123',
      locale: 'en',
      key: randomUUID(),
      consent: true,
      cv: cv.id,
    },
  })
  for (const [relationTo, record] of [
    ['enquiries', enquiry],
    ['applications', application],
  ] as const) {
    const reply = await payload.create({
      collection: 'email-replies',
      user: admin,
      overrideAccess: false,
      context,
      data: {
        record: { relationTo, value: record.id },
        subject: `Reply verification ${prefix}`,
        body: 'Thank you for your message.\n\n<script>unsafe</script>',
      },
    })
    expect(reply.recipient).toBe(record.email)
    await expect(
      payload.update({
        collection: 'email-replies',
        id: reply.id,
        user: admin,
        overrideAccess: false,
        data: { body: 'Changed after queueing' },
      }),
    ).rejects.toThrow()
    const jobs = await jobFor('reply', reply.id)
    expect(jobs).toHaveLength(1)
    await payload.jobs.runByID({ id: jobs[0].id })
    const sent = await messages(record.email)
    expect(sent).toHaveLength(1)
    const email = (await (await fetch(`${mailpit}/api/v1/message/${sent[0].ID}`)).json()) as {
      Text: string
      HTML: string
    }
    expect(email.Text).toContain('Thank you for your message.')
    expect(email.HTML).toContain('&lt;script&gt;unsafe&lt;/script&gt;')
    expect(email.HTML).toContain('logo-full.svg')
    expect(email.HTML).toContain('class="email-header" align="center"')
    expect(email.HTML).toContain('width="160"')
    expect(
      (await payload.findByID({ collection: 'email-replies', id: reply.id })).emailDelivery?.status,
    ).toBe('sent')
  }
  await expect(
    payload.create({
      collection: 'email-replies',
      overrideAccess: false,
      data: {
        record: { relationTo: 'enquiries', value: enquiry.id },
        subject: 'Unauthorized',
        body: 'Denied',
      },
    }),
  ).rejects.toThrow()
}, 60000)
it('retries real SMTP failures through the native queue and delivers once SMTP recovers', async () => {
  const booking = await reservation('fr')
  const jobs = await jobFor('reservation', booking.id)
  const base = await config
  const broken = await getPayload({
    key: schema + '-unavailable-smtp',
    config: Promise.resolve({
      ...base,
      db: {
        ...postgresAdapter({
          blocksAsJSON: true,
          schemaName: schema,
          push: false,
          pool: { connectionString: process.env.DATABASE_URL },
        }),
        name: 'postgres',
        allowIDOnCreate: false,
      },
      email: await nodemailerAdapter({
        defaultFromAddress: 'careers@alamir.test',
        defaultFromName: 'Alamir Ingredients',
        skipVerify: true,
        transportOptions: { host: '127.0.0.1', port: 1, secure: false, connectionTimeout: 1000 },
      }),
    }),
  })
  try {
    await broken.jobs.runByID({
      id: jobs[0].id,
      silent: true,
      req: await createLocalReq({ context }, broken),
    })
  } finally {
    await broken.destroy()
  }
  const pending = await payload.findByID({ collection: 'payload-jobs', id: jobs[0].id })
  expect(pending.completedAt).toBeFalsy()
  expect(pending.totalTried).toBe(1)
  expect(Date.parse(pending.waitUntil!)).toBeGreaterThan(Date.now())
  expect(
    (await payload.findByID({ collection: 'reservations', id: booking.id, depth: 0 })).emailDelivery
      ?.status,
  ).toBe('retrying')
  await payload.update({
    collection: 'payload-jobs',
    id: pending.id,
    data: { waitUntil: new Date(Date.now() - 1000).toISOString() },
  })
  await payload.jobs.runByID({ id: pending.id, req: await createLocalReq({ context }, payload) })
  expect(await messages(booking.email)).toHaveLength(1)
  expect(
    (await payload.findByID({ collection: 'reservations', id: booking.id, depth: 0 })).emailDelivery
      ?.status,
  ).toBe('sent')
}, 60000)

it('queues optional Form Builder emails instead of delivering during submission', async () => {
  const page = await payload.create({
    collection: 'pages',
    context,
    data: {
      title: 'Mailpit form verification',
      slug: `form-${prefix}`,
      sourceKey: 'home-page',
      layout: [],
      _status: 'published',
    },
  })
  const email = `${prefix}-form@mail.test`
  const form = await payload.create({
    collection: 'forms',
    context,
    data: {
      title: 'Mailpit home form',
      confirmationMessage: title,
      key: `pages:${page.id}:home`,
      purpose: 'home',
      owner: { relationTo: 'pages', value: page.id },
      fields: [
        { blockType: 'text', name: 'name', label: 'Name', required: true },
        { blockType: 'email', name: 'email', label: 'Email', required: true },
      ],
      emails: [
        {
          emailTo: '{{email}}',
          emailFrom: 'careers@alamir.test',
          subject: `Form confirmation ${prefix}`,
          message: {
            root: {
              ...title.root,
              children: [
                {
                  type: 'paragraph',
                  version: 1,
                  children: [
                    {
                      type: 'text',
                      version: 1,
                      text: 'Thank you, {{name}}.',
                      format: 0,
                      detail: 0,
                      mode: 'normal',
                      style: '',
                    },
                  ],
                },
              ],
            },
          },
        },
      ],
    },
  })
  await payload.create({
    collection: 'form-submissions',
    context,
    data: {
      form: form.id,
      locale: 'en',
      key: randomUUID(),
      submissionData: [
        { field: 'name', value: 'Mailpit form recipient' },
        { field: 'email', value: email },
      ],
    },
  })
  expect(await messages(email)).toHaveLength(0)
  const jobs = await payload.find({
    collection: 'payload-jobs',
    where: { queue: { equals: 'emails' } },
    pagination: false,
    depth: 0,
  })
  const job = jobs.docs.find((job) => (job.input as { kind: string }).kind === 'form')!
  expect(job).toBeDefined()
  await payload.jobs.runByID({ id: job.id })
  const sent = await messages(email)
  expect(sent).toHaveLength(1)
  const message = (await (await fetch(`${mailpit}/api/v1/message/${sent[0].ID}`)).json()) as {
    HTML: string
  }
  expect(message.HTML).toContain('Thank you, Mailpit form recipient.')
}, 60000)
