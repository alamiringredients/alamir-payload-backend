import type { Form } from '../payload-types'

export type FormPurpose = Form['purpose']
export type OwnerFormPurpose = Exclude<FormPurpose, 'custom'>
type OwnerCollection = NonNullable<Form['owner']>['relationTo']
type Requirement = {
  name: string
  type: 'text' | 'email' | 'checkbox' | 'upload'
  required: boolean
}
type FormPolicy = {
  page?: string
  collection?: OwnerCollection
  fields: readonly Requirement[]
  record?: 'enquiries' | 'applications' | 'reservations'
}
const contact: Requirement[] = [
  { name: 'name', type: 'text', required: true },
  { name: 'email', type: 'email', required: true },
]
const consent: Requirement = { name: 'consent', type: 'checkbox', required: true }

export const formPolicies: Record<FormPurpose, FormPolicy> = {
  custom: { fields: [] },
  home: { page: 'home-page', fields: contact, record: 'enquiries' },
  contact: { page: 'contact-page', fields: [...contact, consent], record: 'enquiries' },
  quote: {
    page: 'contact-page',
    collection: 'products',
    fields: [...contact, consent],
    record: 'enquiries',
  },
  application: {
    page: 'careers-page',
    collection: 'jobs',
    record: 'applications',
    fields: [...contact, consent, { name: 'cv', type: 'upload', required: true }],
  },
  reservation: {
    page: 'booking-page',
    collection: 'events',
    fields: [...contact, consent],
    record: 'reservations',
  },
  search: { page: 'search-page', fields: [{ name: 'q', type: 'text', required: false }] },
}

export function ownerFormPurposes(
  collection: string,
  doc: { kind?: unknown; sourceKey?: unknown },
): OwnerFormPurpose[] {
  return (Object.keys(formPolicies) as FormPurpose[]).filter(
    (purpose): purpose is OwnerFormPurpose =>
      purpose !== 'custom' &&
      (collection === 'pages'
        ? formPolicies[purpose].page === doc.sourceKey
        : formPolicies[purpose].collection === collection &&
          (collection !== 'events' || doc.kind === 'event')),
  )
}

export function requiresConsent(purpose: FormPurpose) {
  return (
    !Object.hasOwn(formPolicies, purpose) ||
    formPolicies[purpose].fields.some((field) => field.name === 'consent' && field.required)
  )
}
