import {
  ValidationError,
  type CollectionBeforeValidateHook,
  type CollectionBeforeChangeHook,
} from 'payload'
import { productCategories } from '../fields/productSelect'
import type { Form } from '../payload-types'
import { formPolicies } from './formPolicy'
const invalid = (path: string, message: string) =>
  new ValidationError({ errors: [{ path, message }] })
export const validateSubmission: CollectionBeforeValidateHook = async ({
  data,
  req,
  operation,
}) => {
  if (operation !== 'create' || !data) return data
  if (data.trap) throw invalid('trap', 'Invalid submission.')
  if (data.submissionUploads?.length)
    throw invalid('submissionUploads', 'Upload a new file with this form.')
  const locale = ['en', 'ar', 'fr'].includes(data.locale) ? data.locale : 'en'
  const form = await req.payload.findByID({
    collection: 'forms',
    id: typeof data.form === 'object' ? data.form.id : data.form,
    locale,
    depth: 1,
    req,
  })
  if (form.purpose === 'custom') {
    delete data.record
    if (!data.page) throw invalid('page', 'Choose the page containing this form.')
    const page = await req.payload.findByID({
      collection: 'pages',
      id: typeof data.page === 'object' ? data.page.id : data.page,
      depth: 0,
      overrideAccess: false,
      req,
    })
    if (page._status !== 'published' || !page.layout?.some(block =>
      block.blockType === 'form' && block.enabled !== false &&
      (typeof block.form === 'object' ? block.form.id : block.form) === form.id,
    )) throw invalid('form', 'This form is not available on this page.')
    data.page = page.id
  } else {
    if (!form.owner) throw invalid('form', 'Choose a page form.')
    const owner = form.owner.value
    if (typeof owner !== 'object' || !('_status' in owner) || owner._status !== 'published')
      throw invalid('form', 'This form is not available.')
    if (form.owner.relationTo === 'jobs' && 'availability' in owner && owner.availability !== 'open')
      throw invalid('form', 'This job is closed.')
    delete data.page
  }
  const fields = form.fields ?? []
  const values = new Map(
    (data.submissionData ?? []).map((row: { field: string; value: string }) => [
      row.field,
      row.value,
    ]),
  )
  if (values.size !== (data.submissionData ?? []).length)
    throw invalid('submissionData', 'Each field can be submitted only once.')
  const categories = fields.some(
    (field) => field.blockType === 'product-select' && field.visible !== false,
  )
    ? await productCategories(req)
    : []
  const selections = new Map<string, (typeof categories)[number]>()
  const allowed = new Set<string>()
  for (const field of fields) {
    if (!('name' in field) || !field.name || field.visible === false) continue
    allowed.add(field.name)
    if (field.blockType === 'text' && field.includeDialCode) allowed.add('dialCode')
    if (field.blockType === 'upload') {
      if (values.has(field.name) || data.submissionUploads?.length)
        throw invalid(field.name, 'Upload a new file with this form.')
      continue
    }
    const value = String(values.get(field.name) ?? '')
    if (
      field.required &&
      (!value.trim() || (field.blockType === 'checkbox' && !['true', 'on'].includes(value)))
    )
      throw invalid(field.name, 'This field is required.')
    if (value && field.blockType === 'product-select') {
      const category = categories.find((category) => String(category.id) === value)
      if (!category) throw invalid(field.name, 'Choose a published product category.')
      selections.set(field.name, category)
    }
    if (value && field.blockType === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value))
      throw invalid(field.name, 'Enter a valid email address.')
    if (value && field.blockType === 'number' && !Number.isFinite(Number(value)))
      throw invalid(field.name, 'Enter a valid number.')
    if (
      value &&
      (field.blockType === 'select' || field.blockType === 'radio') &&
      !field.options?.some((option) => option.value === value)
    )
      throw invalid(field.name, 'Choose one of the listed options.')
  }
  for (const name of Object.keys(req.files ?? {}))
    if (
      !fields.some(
        (field) => field.blockType === 'upload' && field.name === name && field.visible !== false,
      )
    )
      throw invalid(name, 'This upload field is not available.')
  data.submissionData = (data.submissionData ?? []).filter((row: { field: string }) =>
    allowed.has(row.field),
  )
  data.submissionData = data.submissionData.map((row: { field: string; value: string }) => ({
    field: row.field,
    value: row.value,
    ...(selections.has(row.field)
      ? { category: selections.get(row.field)!.id, value: selections.get(row.field)!.name }
      : {}),
    label:
      fields.flatMap((field) =>
        'name' in field && field.name === row.field && 'label' in field ? [field.label] : [],
      )[0] ?? row.field,
  }))
  req.context.submittedForm = form
  return data
}
export const createSubmissionRecord: CollectionBeforeChangeHook = async ({
  data,
  req,
  operation,
}) => {
  if (operation !== 'create') return data
  const form = req.context.submittedForm as Form | undefined
  if (!form || (form.purpose !== 'custom' && !formPolicies[form.purpose].record))
    throw invalid('form', 'This form cannot accept submissions.')
  if (form.purpose === 'custom') return data
  const values = Object.fromEntries(
    (data.submissionData ?? []).map((row: { field: string; value: string }) => [
      row.field,
      row.value,
    ]),
  )
  const input = {
    ...values,
    locale: data.locale,
    key: data.key,
    consent: ['true', 'on'].includes(values.consent),
  }
  const owner = form.owner?.value
  if (!form.owner || !owner || typeof owner !== 'object') throw invalid('form', 'This form is not available.')
  const collection = formPolicies[form.purpose].record!
  if (collection === 'applications') {
    const cv = data.submissionUploads?.find((upload: { field: string }) => upload.field === 'cv')
      ?.value?.[0]?.value
    if (!cv) throw invalid('cv', 'A CV is required.')
    const doc = await req.payload.create({
      collection,
      req,
      depth: 0,
      data: { ...input, cv, job: form.owner.relationTo === 'jobs' ? owner.id : undefined } as never,
    })
    data.record = { relationTo: 'applications', value: doc.id }
  } else if (collection === 'reservations') {
    const slot = await req.payload.findByID({
      collection: 'meeting-slots',
      id: data.slotId,
      depth: 1,
      req,
    })
    if (
      form.owner.relationTo === 'events' &&
      (typeof slot.event === 'object' ? slot.event.id : slot.event) !== owner.id
    )
      throw invalid('slotId', 'Choose a slot from this event.')
    req.context.submissionSlot = slot
    req.context.bookingReceipt = {
      startsAt: slot.startsAt,
      endsAt: slot.endsAt,
      event: typeof slot.event === 'object' ? slot.event.name : '',
      timezone: process.env.APP_TIMEZONE || undefined,
    }
    const doc = await req.payload.create({
      collection,
      req,
      depth: 1,
      data: { ...input, slot: slot.id } as never,
    })
    data.record = { relationTo: 'reservations', value: doc.id }
  } else {
    const doc = await req.payload.create({
      collection,
      req,
      depth: 0,
      data: {
        ...input,
        kind: form.purpose,
        category: data.submissionData?.find((row: { field: string }) => row.field === 'product')
          ?.category,
      } as never,
    })
    data.record = { relationTo: 'enquiries', value: doc.id }
  }
  return data
}
