import { ValidationError, type Field, type Block } from 'payload'
import { formBuilderPlugin } from '@payloadcms/plugin-form-builder'
import { productSelect } from '../fields/productSelect'
import { authenticated } from '../access'
import { can } from '../access/permissions'
import { bookingReceiptField } from '../services/meetingBooking'
import { applyFormDefaults } from '../services/forms'
import { formPolicies, type FormPurpose } from '../services/formPolicy'
import { revalidatePage, revalidateDeletedPage } from '../hooks/revalidate'
import { validateSubmission, createSubmissionRecord } from '../services/formSubmissions'

function formFields(fields: Field[]): Field[] {
  return fields.map((field) => {
    if ('name' in field && ['label', 'placeholder', 'helpText'].includes(field.name))
      return { ...field, localized: true } as Field
    if ('fields' in field) return { ...field, fields: formFields(field.fields) } as Field
    if (field.type === 'blocks')
      return {
        ...field,
        blocks: field.blocks.map((block) =>
          typeof block === 'string' ? block : { ...block, fields: extendBlock(block) },
        ),
      }
    return field
  })
}
function extendBlock(block: Block): Field[] {
  const fields = formFields(block.fields)
  const hasField = (list: Field[], name: string): boolean =>
    list.some(
      (field) =>
        ('name' in field && field.name === name) ||
        ('fields' in field && hasField(field.fields, name)),
    )
  const has = (name: string) => hasField(fields, name)
  return [
    ...fields,
    { name: 'visible', label: 'Show field', type: 'checkbox', defaultValue: true },
    ...(!has('placeholder')
      ? [{ name: 'placeholder', type: 'text', localized: true } as Field]
      : []),
    { name: 'helpText', label: 'Help text', type: 'text', localized: true },
    ...(block.slug === 'text'
      ? [
          {
            name: 'inputType',
            label: 'Input type',
            type: 'select',
            defaultValue: 'text',
            options: ['text', 'tel', 'url'],
          } as Field,
          {
            name: 'includeDialCode',
            label: 'Include country dialling code',
            type: 'checkbox',
            admin: { condition: (_data, sibling) => sibling.name === 'phone' },
          } as Field,
          {
            name: 'dialCodePlaceholder',
            label: 'Dialling code placeholder',
            type: 'text',
            localized: true,
            admin: { condition: (_data, sibling) => sibling.includeDialCode },
          } as Field,
        ]
      : []),
    ...(block.slug === 'checkbox'
      ? [
          {
            name: 'privacyLabel',
            label: 'Privacy link label',
            type: 'text',
            localized: true,
          } as Field,
        ]
      : []),
  ]
}
export const formsPlugin = formBuilderPlugin({
  beforeEmail: async (emails, {req}) => {
    if (!req.context.disableEmails) for (const message of emails)
      await req.payload.jobs.queue({task:'send-email',queue:'emails',input:{kind:'form',message:{...message}},req})
    return []
  },
  fields: {
    payment: false,
    state: false,
    radio: true,
    date: true,
    upload: true,
    'product-select': productSelect,
  },
  uploadCollections: ['application-files'],
  formOverrides: {
    admin: { group: 'Website', useAsTitle: 'title', defaultColumns: ['title', 'purpose', 'updatedAt'] },
    access: {
      read: () => true,
      create: authenticated,
      update: authenticated,
      delete: authenticated,
    },
    hooks: {
      beforeValidate: [
        ({ data, originalDoc }) => {
          if (!data?.fields) return data
          const names = new Set<string>()
          for (const field of data.fields) {
            if (!field.blockName) field.blockName = field.label || field.name
            if (!field.name) continue
            if (
              !/^[a-zA-Z][a-zA-Z0-9_]*$/.test(field.name) ||
              names.has(field.name) ||
              ['form', 'key', 'locale', 'slotId', 'trap', 'record', 'status'].includes(field.name)
            )
              throw new ValidationError({
                errors: [
                  {
                    path: 'fields',
                    message: 'Use unique field names without spaces or reserved system names.',
                  },
                ],
              })
            names.add(field.name)
            if (field.visible === false) field.required = false
          }
          const purpose = data.purpose ?? originalDoc?.purpose ?? 'custom'
          for (const { name, type, required } of formPolicies[purpose as FormPurpose]?.fields ?? []) {
            const field = data.fields.find(
              (field: { name: string; visible: boolean; required: boolean; blockType: string }) =>
                field.name === name,
            )
            if (!field || field.visible === false)
              throw new ValidationError({
                errors: [
                  {
                    path: 'fields',
                    message: `${name} is required by this form's submission workflow and must stay visible.`,
                  },
                ],
              })
            if (field.blockType !== type)
              throw new ValidationError({
                errors: [
                  {
                    path: 'fields',
                    message: `${name} must remain a ${type} field for this workflow.`,
                  },
                ],
              })
            if (required) field.required = true
          }
          return data
        },
      ],
      afterChange: [applyFormDefaults, revalidatePage],
      afterDelete: [revalidateDeletedPage],
    },
    fields: ({ defaultFields }) => [
      ...formFields(defaultFields).map((field) =>
        'name' in field && field.name === 'emails'
          ? ({
              ...field,
              access: { read: ({ req }: { req: { user: unknown } }) => Boolean(req.user) },
            } as Field)
          : field,
      ),
      {
        name: 'ui',
        label: 'Messages and actions',
        type: 'group',
        admin: { condition: (data) => data.purpose !== 'search' },
        fields: [
          ...['sending', 'invalid', 'failure'].map(
            (name) =>
              ({
                name,
                label: {
                  sending: 'Sending label',
                  invalid: 'Validation message',
                  failure: 'Submission failure message',
                }[name],
                type: 'text',
                localized: true,
                defaultValue: { sending: 'Sending…', invalid: 'Please check this field.', failure: 'Unable to submit. Please try again.' }[name],
              }) as Field,
          ),
          ...Object.entries({
            cancel: ['Cancel button', 'quote'],
            loadingFailure: ['Form loading failure message', 'quote'],
            whatsappSales: ['WhatsApp button', 'contact'],
            positionLabel: ['Position label', 'application'],
            pickAnotherSlot: ['Choose another time button', 'reservation'],
          }).map(
            ([name, [label, purpose]]) =>
              ({
                name,
                label,
                type: 'text',
                localized: true,
                admin: { condition: (data) => data.purpose === purpose },
              }) as Field,
          ),
        ],
      },
      { name: 'key', type: 'text', unique: true, admin: { hidden: true }, access: { update: () => false } },
      {
        name: 'purpose',
        type: 'select',
        options: Object.keys(formPolicies),
        defaultValue: 'custom',
        required: true,
        admin: { position: 'sidebar', readOnly: true },
        access: { update: () => false },
      },
      {
        name: 'owner',
        type: 'relationship',
        relationTo: ['pages', 'jobs', 'events', 'products'],
        admin: { position: 'sidebar', readOnly: true, condition: data => data.purpose !== 'custom' },
        access: { update: () => false },
      },
      {
        name: 'makeDefault',
        label: 'Use this as the default for future records of this type',
        type: 'checkbox',
        defaultValue: false,
        access: { create: ({ req }) => can(req, 'forms', 'edit'), update: ({ req }) => can(req, 'forms', 'edit') },
        admin: { position: 'sidebar', condition: data => data.purpose !== 'custom' },
      },
      {
        name: 'applyToExisting',
        label: 'Apply this form to all existing forms of this type',
        type: 'checkbox',
        defaultValue: false,
        access: { create: ({ req }) => can(req, 'forms', 'edit'), update: ({ req }) => can(req, 'forms', 'edit') },
        admin: {
          position: 'sidebar',
          condition: data => data.purpose !== 'custom',
          description:
            'Replaces their fields and labels. Leave unchecked to keep individual changes.',
        },
      },
    ],
  },
  formSubmissionOverrides: {
    admin: { group: 'Inbox', defaultColumns: ['form', 'page', 'createdAt'] },
    access: {
      create: () => true,
      read: authenticated,
      update: authenticated,
      delete: authenticated,
    },
    fields: ({ defaultFields }) => [
      ...defaultFields.map((field) =>
        'name' in field && field.name === 'submissionData' && field.type === 'array'
          ? ({
              ...field,
              fields: [
                ...field.fields.map((item) =>
                  'name' in item && item.name === 'field'
                    ? { ...item, admin: { ...item.admin, hidden: true } }
                    : item,
                ),
                { name: 'label', label: 'Field', type: 'text', admin: { readOnly: true } },
                {
                  name: 'category',
                  label: 'Selected category',
                  type: 'relationship',
                  relationTo: 'categories',
                  admin: {
                    readOnly: true,
                    condition: (_data, sibling) => Boolean(sibling.category),
                  },
                },
              ],
            } as Field)
          : field,
      ),
      { name: 'page', type: 'relationship', relationTo: 'pages', admin: { readOnly: true }, access: { update: () => false } },
      { name: 'locale', type: 'select', options: ['en', 'ar', 'fr'], required: true },
      { name: 'key', type: 'text', unique: true, required: true },
      { name: 'slotId', type: 'number', admin: { hidden: true } },
      bookingReceiptField,
      {
        name: 'record',
        type: 'relationship',
        relationTo: ['enquiries', 'applications', 'reservations'],
        admin: { readOnly: true },
        access: { update: () => false },
      },
    ],
    hooks: { beforeValidate: [validateSubmission], beforeChange: [createSubmissionRecord] },
  },
})
