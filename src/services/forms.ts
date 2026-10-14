import type { CollectionAfterChangeHook, CollectionBeforeDeleteHook, PayloadRequest } from 'payload'
import type { Form } from '../payload-types'
export const formPurposes = [
  'home',
  'contact',
  'quote',
  'application',
  'reservation',
  'search',
] as const
export type FormPurpose = (typeof formPurposes)[number]
type FormData = Record<string, unknown>
export function localized(value: unknown, locale: string, previous?: unknown): unknown {
  if (Array.isArray(value))
    return value.map((item, index) =>
      localized(item, locale, Array.isArray(previous) ? previous[index] : undefined),
    )
  if (value && typeof value === 'object') {
    const record = value as FormData
    if ('en' in record) return record[locale] ?? record.en
    const saved = previous as FormData | undefined
    return Object.fromEntries(
      Object.entries(record)
        .filter(([key]) => key !== 'id')
        .map(([key, item]) => [key, localized(item, locale, saved?.[key])])
        .concat(saved?.id ? [['id', saved.id]] : []),
    )
  }
  return value
}
export async function copyForm(
  source: {
    ui?: unknown
    fields?: unknown
    submitButtonLabel?: unknown
    confirmationType?: unknown
    confirmationMessage?: unknown
    redirect?: unknown
    emails?: unknown
  },
  target: Form | undefined,
  metadata: FormData,
  req: PayloadRequest,
) {
  const locale = req.locale
  const fallbackLocale = req.fallbackLocale
  const context = req.context
  req.context = { ...context, propagatingForms: true, disableRevalidate: true }
  let saved = target
  try {
    for (const locale of ['en', 'ar', 'fr'] as const) {
      const data = {
        ...(localized(
          {
            ui:source.ui,
            fields: source.fields,
            submitButtonLabel: source.submitButtonLabel,
            confirmationType: source.confirmationType,
            confirmationMessage: source.confirmationMessage,
            redirect: source.redirect,
            emails: source.emails,
          },
          locale,
          saved,
        ) as FormData),
        ...metadata,
      }
      saved = saved
        ? await req.payload.update({
            collection: 'forms',
            id: saved.id as number,
            locale,
            data: data as never,
            req,
            context: { propagatingForms: true, disableRevalidate: true },
          })
        : await req.payload.create({
            collection: 'forms',
            locale,
            data: data as never,
            req,
            context: { propagatingForms: true, disableRevalidate: true },
          })
    }
    return saved!
  } finally {
    req.context = context
    req.locale = locale
    req.fallbackLocale = fallbackLocale
  }
}
export function purposes(
  collection: string,
  doc: { id: number; kind?: unknown; sourceKey?: unknown },
): FormPurpose[] {
  if (collection === 'jobs') return ['application']
  if (collection === 'events') return doc.kind === 'event' ? ['reservation'] : []
  if (collection === 'products') return ['quote']
  const keys: Record<string, FormPurpose[]> = {
    'home-page': ['home'],
    'contact-page': ['contact', 'quote'],
    'careers-page': ['application'],
    'book-a-meeting-page': ['reservation'],
    'search-page': ['search'],
  }
  return keys[String(doc.sourceKey)] ?? []
}
export const createOwnerForms: CollectionAfterChangeHook = async ({
  doc,
  req,
  collection,
  operation,
  previousDoc,
}) => {
  if (
    req.context.disableOwnerForms ||
    (operation !== 'create' && !(collection.slug === 'events' && previousDoc.kind !== doc.kind))
  )
    return doc
  const types = purposes(collection.slug, doc)
  if (!types.length) return doc
  const locale = req.locale
  const fallbackLocale = req.fallbackLocale
  try {
    const defaults = await req.payload.find({
      collection: 'forms',
      where: {
        key: {
          in: types.flatMap((type) => [`default:${type}`, `${collection.slug}:${doc.id}:${type}`]),
        },
      },
      locale: 'all',
      depth: 0,
      pagination: false,
      req,
    })
    for (const purpose of types) {
      if (defaults.docs.some((form) => form.key === `${collection.slug}:${doc.id}:${purpose}`))
        continue
      const template = defaults.docs.find((form) => form.key === `default:${purpose}`)
      if (template)
        await copyForm(
          template,
          undefined,
          {
            key: `${collection.slug}:${doc.id}:${purpose}`,
            purpose,
            title: `${doc.name ?? doc.title} — ${purpose} form`,
            owner: { relationTo: collection.slug, value: doc.id },
          },
          req,
        )
    }
    return doc
  } finally {
    req.locale = locale
    req.fallbackLocale = fallbackLocale
  }
}
export const applyFormDefaults: CollectionAfterChangeHook = async ({ doc, req }) => {
  if (doc.purpose === 'custom' || req.context.propagatingForms || (!doc.makeDefault && !doc.applyToExisting)) return doc
  const locale = req.locale
  const fallbackLocale = req.fallbackLocale
  const context = req.context
  req.context = { ...context, propagatingForms: true }
  try {
    const source = await req.payload.findByID({
      collection: 'forms',
      id: doc.id,
      locale: 'all',
      depth: 0,
      req,
    })
    const targets = await req.payload.find({
      collection: 'forms',
      where: { purpose: { equals: doc.purpose } },
      locale: 'all',
      depth: 0,
      pagination: false,
      req,
    })
    for (const target of targets.docs) {
      if (target.id === doc.id) continue
      if (target.key === `default:${doc.purpose}` ? doc.makeDefault : doc.applyToExisting)
        await copyForm(source, target, {}, req)
    }
    await req.payload.update({
      collection: 'forms',
      id: doc.id,
      data: { makeDefault: false, applyToExisting: false },
      locale: locale === 'all' ? 'en' : locale,
      req,
      context: { propagatingForms: true, disableRevalidate: true },
    })
    return { ...doc, makeDefault: false, applyToExisting: false }
  } finally {
    req.context = context
    req.locale = locale
    req.fallbackLocale = fallbackLocale
  }
}

export const deleteOwnerForms: CollectionBeforeDeleteHook = async ({ id, collection, req }) => {
  await req.payload.delete({
    collection: 'forms',
    where: {
      and: [{ 'owner.relationTo': { equals: collection.slug } }, { 'owner.value': { equals: id } }],
    },
    req,
  })
}
