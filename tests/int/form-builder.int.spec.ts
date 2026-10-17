import 'dotenv/config'
import { afterAll, beforeAll, beforeEach, describe, expect, it } from 'vitest'
import { createLocalReq, getPayload, handleEndpoints, type Payload, type PayloadRequest } from 'payload'
import { postgresAdapter } from '@payloadcms/db-postgres'
import { randomUUID } from 'node:crypto'
import config from '../../src/payload.config'
import defaults from '../fixtures/forms.json'
import { copyForm } from '../../src/services/forms'

let payload: Payload, req: PayloadRequest
const publications: string[] = []
const schema = `forms_check_${randomUUID().replaceAll('-', '')}`
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
            text: 'Form check',
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
beforeAll(async () => {
  const base = await config
  payload = await getPayload({
    key: schema,
    config: Promise.resolve({
      ...base,
      collections: base.collections.map((collection) =>
        collection.slug === 'public-content'
          ? {
              ...collection,
              hooks: {
                ...collection.hooks,
                afterChange: [
                  ...collection.hooks.afterChange,
                  ({ doc }) => {
                    publications.push(doc.resource)
                    return doc
                  },
                ],
              },
            }
          : collection,
      ),
      db: {
        ...postgresAdapter({ blocksAsJSON:true,
          pool: { connectionString: process.env.DATABASE_URL },
          schemaName: schema,
          push: true,
        }),
        allowIDOnCreate: false,
        name: 'postgres',
      },
    }),
  })
  req = await createLocalReq({ context: { disableRevalidate: true } }, payload)
  for (const template of defaults)
    await copyForm(
      template,
      undefined,
      { key: `default:${template.purpose}`, purpose: template.purpose, title: template.title },
      req,
    )
}, 120000)
beforeEach(() => {
  req.locale = 'en'
  publications.length = 0
})
it('keeps contact and social settings together and accepts only PDF company profiles in every locale', async () => {
  const pdf = await payload.create({ collection: 'media', data: { alt: 'Company profile', filename: 'settings-profile.pdf', mimeType: 'application/pdf', prefix: 'tests/settings' } })
  const image = await payload.create({ collection: 'media', data: { alt: 'Logo', filename: 'settings-logo.png', mimeType: 'image/png', prefix: 'tests/settings' } })
  for (const locale of ['en', 'ar', 'fr'] as const) {
    await payload.updateGlobal({ slug: 'website-settings', locale, context: { disableRevalidate: true }, data: { page: {
      companyProfile: pdf.id, logo: image.id,
      company: { email: 'sales@example.test', exportPhone: '+201005505020', socialLinks: { linkedin: 'https://www.linkedin.com/company/alamir' } },
    } } })
    const settings = await payload.findGlobal({ slug: 'website-settings', locale, depth: 1, overrideAccess: false })
    expect(settings.page?.company?.email).toBe('sales@example.test')
    expect(settings.page?.company?.socialLinks?.linkedin).toBe('https://www.linkedin.com/company/alamir')
    expect(settings.page?.companyProfile).toMatchObject({ id: pdf.id, mimeType: 'application/pdf' })
  }
  await expect(payload.updateGlobal({ slug: 'website-settings', data: { page: { companyProfile: image.id } } })).rejects.toMatchObject({ status: 400 })
})
afterAll(async () => {
  if (!payload) return
  await payload.delete({ collection: 'application-files', where: { id: { exists: true } } })
  await payload.db.pool.query(`DROP SCHEMA "${schema}" CASCADE`)
  await payload.destroy()
}, 60000)
async function event() {
  return payload.create({
    collection: 'events',
    data: { title, slug: randomUUID(), kind: 'event', _status: 'published' },
    req,
  })
}
async function form(id: number) {
  return (
    await payload.find({
      collection: 'forms',
      where: { key: { equals: `events:${id}:reservation` } },
      depth: 0,
    })
  ).docs[0]
}
const values = {
  name: 'Form check',
  company: 'Check',
  email: 'forms@example.invalid',
  country: 'Egypt',
  phone: '123',
  dialCode: '+20',
  topic: 'Tomato concentrates',
  consent: 'true',
  message: '',
}
function submission(formID: number, slotId: number, extra: Record<string, string> = {}) {
  return {
    form: formID,
    slotId,
    locale: 'en' as const,
    key: randomUUID(),
    submissionData: Object.entries({ ...values, ...extra }).map(([field, value]) => ({
      field,
      value,
    })),
  }
}
describe('Owned Payload Form Builder forms', () => {
  it('rejects an invalid enquiry kind with a validation error', async () => {
    await expect(payload.create({
      collection: 'enquiries',
      req,
      data: { name: 'Visitor', email: 'visitor@example.test', locale: 'en', key: randomUUID(), kind: '__proto__' as never, consent: false },
    })).rejects.toMatchObject({ status: 400 })
  })
  it('creates the booking page reservation form and preserves local changes on page saves', async () => {
    const page = await payload.create({
      collection: 'pages',
      req,
      data: { title: 'Book a meeting', slug: randomUUID(), sourceKey: 'booking-page', _status: 'published' },
    })
    const owned = () => payload.find({
      collection: 'forms',
      where: { key: { equals: `pages:${page.id}:reservation` } },
      depth: 0,
      locale: 'all',
      req,
    })
    const original = (await owned()).docs[0]
    expect(original).toMatchObject({ purpose: 'reservation', owner: { relationTo: 'pages', value: page.id } })
    await payload.update({ collection: 'forms', id: original.id, locale: 'en', data: { submitButtonLabel: 'Reserve my meeting' }, req })
    await payload.update({ collection: 'pages', id: page.id, data: { title: 'Book your meeting' }, req })
    const saved = (await owned()).docs
    expect(saved).toHaveLength(1)
    expect(saved[0]).toMatchObject({ id: original.id, submitButtonLabel: { en: 'Reserve my meeting' } })
    for (const locale of ['en', 'ar', 'fr'])
      expect((saved[0].submitButtonLabel as unknown as Record<string, string>)[locale]).toBeTruthy()
    await payload.delete({ collection: 'forms', id: original.id, req })
    await payload.update({ collection: 'pages', id: page.id, data: { title: 'Reserve a time' }, req })
    expect((await owned()).docs).toHaveLength(1)
  })
  it('publishes a new event, its localized owner form and generated slots once per resource', async () => {
    const startsAt = '2099-10-15T09:00:00.000Z'
    const endsAt = '2099-10-15T11:00:00.000Z'
    const doc = await payload.create({
      collection: 'events',
      req,
      data: {
        title,
        slug: randomUUID(),
        kind: 'event',
        _status: 'published',
        meetingSchedule: [{ startsAt, endsAt, duration: 30, gap: 0 }],
      },
    })
    expect(publications.sort()).toEqual(['events', 'forms', 'meeting-slots'])
    const projected = await payload.find({
      collection: 'public-content',
      depth: 0,
      pagination: false,
    })
    const content = (resource: string) =>
      (
        projected.docs.find((row) => row.resource === resource)!.content as {
          docs: Record<string, unknown>[]
        }
      ).docs
    expect(content('events').some((row) => row.id === doc.id)).toBe(true)
    expect(content('meeting-slots').filter((row) => row.event === doc.id)).toHaveLength(4)
    const ownerForm = await form(doc.id)
    const publishedForm = content('forms').find((row) => row.id === ownerForm.id)!
    for (const locale of ['en', 'ar', 'fr'] as const) {
      const native = await payload.findByID({
        collection: 'forms',
        id: ownerForm.id,
        locale,
        depth: 0,
      })
      expect(publishedForm.submitButtonLabel).toMatchObject({ [locale]: native.submitButtonLabel })
    }
    expect(JSON.stringify(publishedForm)).not.toContain('emailTo')
  })
  it('rolls back source content, owner forms and projections together', async () => {
    const transaction = await payload.db.beginTransaction()
    if (!transaction) throw new Error('A transaction is required.')
    const transactionReq = await createLocalReq(
      { req: { transactionID: transaction }, context: { disableRevalidate: true } },
      payload,
    )
    const before = await payload.find({
      collection: 'public-content',
      where: { resource: { in: ['events', 'forms'] } },
      sort: 'resource',
      depth: 0,
    })
    const doc = await payload.create({
      collection: 'events',
      req: transactionReq,
      data: {
        title,
        slug: randomUUID(),
        kind: 'event',
        _status: 'published',
      },
    })
    try {
      const inside = await payload.find({
        collection: 'public-content',
        req: transactionReq,
        where: { resource: { equals: 'events' } },
        depth: 0,
      })
      expect(
        (inside.docs[0].content as { docs: { id: number }[] }).docs.some(
          (row) => row.id === doc.id,
        ),
      ).toBe(true)
    } finally {
      await payload.db.rollbackTransaction(transaction)
    }
    const after = await payload.find({
      collection: 'public-content',
      where: { resource: { in: ['events', 'forms'] } },
      sort: 'resource',
      depth: 0,
    })
    expect(after.docs).toEqual(before.docs)
    expect(
      (await payload.find({ collection: 'events', where: { id: { equals: doc.id } } })).docs,
    ).toHaveLength(0)
    expect(
      (
        await payload.find({
          collection: 'forms',
          where: { key: { equals: `events:${doc.id}:reservation` } },
        })
      ).docs,
    ).toHaveLength(0)
  })
  it('keeps local changes local and copies a chosen default into future events in all locales', async () => {
    const a = await event(),
      b = await event(),
      fa = await form(a.id),
      fb = await form(b.id)
    const fields = fa.fields!.map((field) =>
      'name' in field && field.name === 'phone'
        ? { ...field, visible: false, required: false }
        : field,
    )
    await payload.update({
      collection: 'forms',
      id: fa.id,
      locale: 'en',
      data: {
        fields,
        submitButtonLabel: 'Meet with us',
        ui: { sending: 'Preparing your meeting…' },
      },
      req,
    })
    await payload.update({
      collection: 'forms',
      id: fa.id,
      locale: 'ar',
      data: { submitButtonLabel: 'احجز معنا' },
      req,
    })
    await payload.update({
      collection: 'forms',
      id: fa.id,
      locale: 'fr',
      data: { submitButtonLabel: 'Réservez avec nous', makeDefault: true },
      req,
    })
    expect((await payload.findByID({ collection: 'forms', id: fb.id })).submitButtonLabel).toBe(
      fb.submitButtonLabel,
    )
    const c = await event(),
      fc = await form(c.id)
    expect(fc.submitButtonLabel).toBe('Meet with us')
    expect(fc.ui?.sending).toBe('Preparing your meeting…')
    expect(
      (await payload.findByID({ collection: 'forms', id: fc.id, locale: 'ar' })).submitButtonLabel,
    ).toBe('احجز معنا')
    expect(
      (await payload.findByID({ collection: 'forms', id: fc.id, locale: 'fr' })).submitButtonLabel,
    ).toBe('Réservez avec nous')
    expect(fc.fields?.find((field) => 'name' in field && field.name === 'phone')).toMatchObject({
      visible: false,
    })
    publications.length = 0
    await payload.update({ collection: 'forms', id: fa.id, data: { applyToExisting: true }, req })
    expect(publications).toEqual(['forms'])
    expect((await payload.findByID({ collection: 'forms', id: fb.id })).submitButtonLabel).toBe(
      'Meet with us',
    )
    expect(
      (
        await payload.find({
          collection: 'forms',
          where: { key: { equals: 'default:application' } },
        })
      ).docs[0].submitButtonLabel,
    ).toBe('Send application')
    expect(await payload.findByID({ collection: 'forms', id: fa.id })).toMatchObject({
      makeDefault: false,
      applyToExisting: false,
    })
  })
  it('validates added fields and permits only one reservation under concurrent submissions', async () => {
    const e = await event(),
      f = await form(e.id)
    await payload.update({
      collection: 'forms',
      id: f.id,
      data: {
        fields: [
          ...f.fields!,
          {
            blockType: 'text',
            name: 'reference',
            label: 'Reference',
            required: true,
            visible: true,
          },
        ],
      },
      req,
    })
    const slot = await payload.create({
      collection: 'meeting-slots',
      data: { event: e.id, startsAt: '2030-02-01T09:00:00Z', endsAt: '2030-02-01T09:30:00Z' },
      req,
    })
    await expect(
      payload.create({
        collection: 'form-submissions',
        data: submission(f.id, slot.id),
        overrideAccess: false,
      }),
    ).rejects.toMatchObject({ status: 400 })
    const results = await Promise.allSettled(
      [1, 2].map(() =>
        payload.create({
          collection: 'form-submissions',
          data: submission(f.id, slot.id, { reference: 'Buyer reference' }),
          overrideAccess: false,
        }),
      ),
    )
    const successful = results.filter((result) => result.status === 'fulfilled')
    expect(successful).toHaveLength(1)
    if (successful[0].status === 'fulfilled')
      expect(successful[0].value.bookingReceipt).toMatchObject({
        startsAt: slot.startsAt,
        endsAt: slot.endsAt,
      })
    const saved = (
      await payload.find({
        collection: 'reservations',
        where: { slot: { equals: slot.id } },
        depth: 0,
      })
    ).docs
    expect(saved).toHaveLength(1)
    expect(saved[0]).toMatchObject({ name: values.name, email: values.email })
    const submitted = (
      await payload.find({
        collection: 'form-submissions',
        where: { form: { equals: f.id } },
        depth: 0,
      })
    ).docs
    expect(submitted).toHaveLength(1)
    expect(submitted[0].submissionData).toContainEqual(
      expect.objectContaining({ field: 'reference', value: 'Buyer reference', label: 'Reference' }),
    )
  })
  it('rejects a slot from another event and keeps workflow fields protected', async () => {
    const a = await event(),
      b = await event(),
      f = await form(a.id)
    const slot = await payload.create({
      collection: 'meeting-slots',
      data: { event: b.id, startsAt: '2030-02-02T09:00:00Z', endsAt: '2030-02-02T09:30:00Z' },
      req,
    })
    await expect(
      payload.create({
        collection: 'form-submissions',
        data: submission(f.id, slot.id),
        overrideAccess: false,
      }),
    ).rejects.toMatchObject({ status: 400 })
    await expect(
      payload.update({
        collection: 'forms',
        id: f.id,
        data: { fields: f.fields!.filter((field) => !('name' in field) || field.name !== 'email') },
        req,
      }),
    ).rejects.toMatchObject({ status: 400 })
    for (const [name, blockType] of [['email', 'text'], ['consent', 'text'], ['name', 'email']]) {
      await expect(payload.update({
        collection: 'forms',
        id: f.id,
        data: { fields: f.fields!.map(field => 'name' in field && field.name === name ? { ...field, blockType } : field) as never },
        req,
      })).rejects.toMatchObject({ status: 400 })
    }
  })
  it('creates a form when a draft becomes a bookable event and preserves it through type changes', async () => {
    const draft = await payload.create({
      collection: 'events',
      data: { title, slug: randomUUID(), kind: 'recap', _status: 'draft' },
      req,
    })
    expect(await form(draft.id)).toBeUndefined()
    await payload.update({
      collection: 'events',
      id: draft.id,
      data: { kind: 'event', _status: 'published' },
      req,
    })
    const original = await form(draft.id)
    expect(original).toBeDefined()
    await payload.update({ collection: 'events', id: draft.id, data: { kind: 'recap' }, req })
    await payload.update({ collection: 'events', id: draft.id, data: { kind: 'event' }, req })
    expect((await form(draft.id)).id).toBe(original.id)
    await payload.delete({ collection: 'events', id: draft.id, req })
    expect(await form(draft.id)).toBeUndefined()
  })
  it('loads localized published categories, reflects category edits and validates category submissions', async () => {
    const heading = (text: string) => ({
      ...title,
      root: {
        ...title.root,
        children: [
          {
            type: 'paragraph',
            version: 1,
            children: [
              { type: 'text', version: 1, text, format: 0, detail: 0, mode: 'normal', style: '' },
            ],
          },
        ],
      },
    })
    const category = await payload.create({
      collection: 'categories',
      data: { appearance: 'standard', title: heading('Fresh ingredients'), slug: randomUUID(), _status: 'published' },
    })
    await payload.update({
      collection: 'categories',
      id: category.id,
      locale: 'ar',
      data: { title: heading('مكونات طازجة') },
    })
    await payload.update({
      collection: 'categories',
      id: category.id,
      locale: 'fr',
      data: { title: heading('Ingrédients frais') },
    })
    const draft = await payload.create({
      collection: 'categories',
      data: { appearance: 'standard', title: heading('Unpublished category'), slug: randomUUID(), _status: 'draft' },
    })
    const e = await event(),
      f = await form(e.id)
    await payload.update({
      collection: 'forms',
      id: f.id,
      locale: 'en',
      data: {
        fields: [
          ...f.fields!,
          {
            blockType: 'product-select',
            name: 'product',
            label: 'Product interest',
            required: true,
          },
        ],
      },
    })
    const read = async (locale: 'en' | 'ar' | 'fr') =>
      (await payload.findByID({ collection: 'forms', id: f.id, locale, depth: 0 })).fields?.find(
        (field) => field.blockType === 'product-select',
      )
    expect((await read('en'))?.options).toEqual([
      { value: String(category.id), label: 'Fresh ingredients' },
    ])
    expect((await read('ar'))?.options).toEqual([
      { value: String(category.id), label: 'مكونات طازجة' },
    ])
    expect((await read('fr'))?.options).toEqual([
      { value: String(category.id), label: 'Ingrédients frais' },
    ])
    await payload.update({
      collection: 'categories',
      id: category.id,
      locale: 'en',
      data: { title: heading('Renamed ingredients') },
    })
    expect((await read('en'))?.options).toEqual([
      { value: String(category.id), label: 'Renamed ingredients' },
    ])
    const slot = await payload.create({
      collection: 'meeting-slots',
      data: { event: e.id, startsAt: '2030-02-03T09:00:00Z', endsAt: '2030-02-03T09:30:00Z' },
    })
    for (const product of [String(draft.id), '999999'])
      await expect(
        payload.create({
          collection: 'form-submissions',
          overrideAccess: false,
          data: submission(f.id, slot.id, { product }),
        }),
      ).rejects.toMatchObject({ status: 400 })
    const submitted = await payload.create({
      collection: 'form-submissions',
      overrideAccess: false,
      depth: 0,
      data: submission(f.id, slot.id, { product: String(category.id) }),
    })
    expect(submitted.submissionData).toContainEqual(
      expect.objectContaining({
        field: 'product',
        category: category.id,
        value: 'Renamed ingredients',
      }),
    )
    const contact=await payload.create({collection:'pages',data:{title:'Contact form check',slug:randomUUID(),sourceKey:'contact-page',_status:'published'}})
    const contactForm=(await payload.find({collection:'forms',where:{key:{equals:`pages:${contact.id}:contact`}},depth:0})).docs[0]
    const response=await payload.create({collection:'form-submissions',depth:0,overrideAccess:false,data:submission(contactForm.id,0,{product:String(category.id)})})
    const enquiry=(await payload.find({collection:'enquiries',where:{id:{equals:typeof response.record?.value==='object'?response.record.value.id:response.record?.value}},depth:0})).docs[0]
    expect(enquiry).toMatchObject({category:category.id,product:'Renamed ingredients'})

  })
  it('rejects anonymous applications submitted outside the owning form', async () => {
    const data = Buffer.from('%PDF-1.4\nxref\n%%EOF')
    await expect(payload.create({
      collection: 'applications',
      overrideAccess: false,
      context: { disableRevalidate: true },
      file: { name: `legacy-${randomUUID()}.pdf`, data, mimetype: 'application/pdf', size: data.length },
      data: { name: 'Applicant', email: 'applicant@example.invalid', locale: 'en', key: randomUUID(), consent: true },
    })).rejects.toMatchObject({ status: 403 })
  })
  it('rejects oversized CVs through the legacy upload API too', async () => {
    const data = Buffer.alloc(10 * 1024 * 1024 + 1, ' ')
    data.write('%PDF-1.4\n')
    data.write('xref\n%%EOF', data.length - 10)
    await expect(payload.create({
      collection: 'applications',
      context: { disableRevalidate: true },
      file: { name: `oversized-${randomUUID()}.pdf`, data, mimetype: 'application/pdf', size: data.length },
      data: { name: 'Applicant', email: 'applicant@example.invalid', locale: 'en', key: randomUUID(), consent: true },
    })).rejects.toMatchObject({ status: 400 })
  })
  it('stores a private CV and binds the application to its owning job', async () => {
    const job = await payload.create({
      collection: 'jobs',
      data: { title, slug: randomUUID(), availability: 'open', _status: 'published' },
      req,
    })
    const f = (
      await payload.find({
        collection: 'forms',
        where: { key: { equals: `jobs:${job.id}:application` } },
        depth: 0,
      })
    ).docs[0]
    const file = Buffer.from(
      '%PDF-1.4\n1 0 obj\n<< /Type /Catalog >>\nendobj\nxref\n0 2\n0000000000 65535 f \n0000000009 00000 n \ntrailer\n<< /Size 2 /Root 1 0 R >>\nstartxref\n58\n%%EOF',
    )
    const uploadReq = await createLocalReq({ context: { disableRevalidate: true } }, payload)
    uploadReq.files = {
      cv: { name: 'form-check.pdf', data: file, mimetype: 'application/pdf', size: file.length },
    }
    const doc = await payload.create({
      collection: 'form-submissions',
      req: uploadReq,
      overrideAccess: false,
      data: {
        form: f.id,
        locale: 'en',
        key: randomUUID(),
        submissionData: [
          ...Object.entries({
            name: 'Applicant',
            email: 'applicant@example.invalid',
            phone: '123',
            department: '',
            letter: '',
            consent: 'true',
          }).map(([field, value]) => ({ field, value })),
        ],
      },
    })
    const application = (await payload.find({ collection: 'applications', depth: 0 })).docs[0]
    expect(application.job).toBe(job.id)
    expect(application.cv).toBeDefined()
    const attachment = await payload.findByID({ collection: 'application-files', id: application.cv as number, depth: 0 })
    const download = await handleEndpoints({
      config: payload.config, payloadInstanceCacheKey: schema,
      request: new Request(attachment.url!),
    })
    expect(download.status).toBe(403)
    await expect(
      payload.create({
        collection: 'applications',
        overrideAccess: false,
        data: {
          name: 'Unauthorized reuse',
          email: 'reuse@example.invalid',
          locale: 'en',
          key: randomUUID(),
          consent: true,
          cv: application.cv,
        },
      }),
    ).rejects.toMatchObject({ status: 403 })
    expect(doc.record).toMatchObject({ relationTo: 'applications' })
    await expect(
      payload.find({ collection: 'application-files', overrideAccess: false }),
    ).rejects.toMatchObject({ status: 403 })
    await expect(
      payload.create({
        collection: 'form-submissions',
        overrideAccess: false,
        data: {
          form: f.id,
          locale: 'en',
          key: randomUUID(),
          submissionData: [{ field: 'cv', value: String(application.cv) }],
        },
      }),
    ).rejects.toMatchObject({ status: 400 })
  })
})

describe('Custom page forms', () => {
  it('accepts arbitrary fields from enabled forms on published pages and stores native submissions', async () => {
    const custom = await payload.create({collection: 'forms', req, data: {
      title: 'Marketing survey', purpose: 'custom', submitButtonLabel: 'Send feedback',
      confirmationMessage: title,
      fields: [{blockType: 'text', name: 'campaign', label: 'Campaign', required: true}],
    }})
    expect(custom.purpose).toBe('custom')
    const page = await payload.create({collection: 'pages', req, data: {
      title: 'Campaign', slug: randomUUID(), _status: 'draft',
      layout: [{blockType: 'form', form: custom.id, heading: title}],
    }})
    const submit = (pageID = page.id, campaign = 'Summer campaign') => payload.create({
      collection: 'form-submissions', overrideAccess: false, depth: 0,
      data: {form: custom.id, page: pageID, record: {relationTo: 'enquiries', value: 999999}, locale: 'en', key: randomUUID(),
        submissionData: [{field: 'campaign', value: campaign}, {field: 'unknown', value: 'Ignored'}]},
    })
    await expect(submit()).rejects.toMatchObject({status: 404})
    await payload.update({collection: 'pages', id: page.id, req, data: {_status: 'published'}})
    await expect(submit(page.id, '')).rejects.toMatchObject({status: 400})
    const saved = await submit()
    expect(saved.page).toBe(page.id)
    expect(saved.record).toBeUndefined()
    expect(saved.submissionData).toEqual([expect.objectContaining({field: 'campaign', label: 'Campaign', value: 'Summer campaign'})])
    await expect(payload.find({collection: 'form-submissions', overrideAccess: false})).rejects.toMatchObject({status: 403})
    await payload.create({collection: 'users', data: {name: 'Admin', email: 'admin@custom.test', password: 'test-password-123', role: 0}})
    const role = await payload.create({collection: 'roles', data: {name: 'Form editor', permissions: {forms: {view: true, create: true, edit: true}}}})
    const editor = await payload.create({collection: 'users', data: {name: 'Editor', email: 'editor@custom.test', password: 'test-password-123', role: role.id}})
    const created = await payload.create({collection: 'forms', user: editor, overrideAccess: false, context: {disableRevalidate: true}, data: {title: 'Another survey', purpose: 'custom', fields: [{blockType: 'text', name: 'feedback', label: 'Feedback'}], confirmationMessage: title}})
    expect(created.purpose).toBe('custom')
    const visible = await payload.find({collection: 'form-submissions', user: editor, overrideAccess: false, depth: 0})
    expect(visible.docs.map(doc => doc.id)).toEqual([saved.id])
    await payload.update({collection: 'forms', id: custom.id, user: editor, overrideAccess: false, context: {disableRevalidate: true}, data: {submitButtonLabel: 'Updated survey'}})
    await payload.update({collection: 'roles', id: role.id, data: {permissions: {forms: {view: false}}}})
    await expect(payload.find({collection: 'form-submissions', user: editor, overrideAccess: false})).rejects.toMatchObject({status: 403})
    const disabled = await payload.update({collection: 'pages', id: page.id, req,
      data: {layout: [{blockType: 'form', form: custom.id, enabled: false}]}})
    await expect(submit()).rejects.toMatchObject({status: 400})
    const second = await payload.create({collection: 'pages', req, data: {
      title: 'Another campaign', slug: randomUUID(), _status: 'published',
      layout: [{blockType: 'form', form: custom.id}],
    }})
    expect((await submit(second.id)).page).toBe(second.id)
    await payload.update({collection: 'pages', id: disabled.id, req, data: {layout: []}})
    await expect(submit()).rejects.toMatchObject({status: 400})
    await payload.delete({collection: 'pages', id: page.id, req})
    expect((await payload.findByID({collection: 'forms', id: custom.id})).id).toBe(custom.id)
  })
})
