import { ValidationError, type Access, type CollectionConfig } from 'payload'
import { can } from '../access/permissions'
import { deliveryFields, queueReplyEmail } from '../services/emails'

const readReplies: Access = async ({ req }) => {
  const allowed = await Promise.all(
    ['enquiries', 'applications'].map(async (section) =>
      (await can(req, section, 'view')) ? section : null,
    ),
  )
  const sections = allowed.filter(Boolean)
  return sections.length
    ? { or: sections.map((section) => ({ 'record.relationTo': { equals: section } })) }
    : false
}
export const EmailReplies: CollectionConfig = {
  slug: 'email-replies',
  labels: { singular: 'Email reply', plural: 'Email replies' },
  admin: {
    group: 'Inbox',
    description:
      'Saving a new reply queues email delivery. The recipient comes from the selected enquiry or application.',
    useAsTitle: 'subject',
    defaultColumns: ['subject', 'recipient', 'emailDelivery.status', 'createdAt'],
  },
  access: {
    read: readReplies,
    create: ({ req, data }) =>
      ['enquiries', 'applications'].includes(data?.record?.relationTo)
        ? can(req, data!.record.relationTo, 'edit')
        : false,
    update: () => false,
    delete: () => false,
    admin: async ({ req }) => Boolean(await readReplies({ req })),
  },
  fields: [
    {
      name: 'record',
      label: 'Reply to',
      type: 'relationship',
      relationTo: ['enquiries', 'applications'],
      required: true,
      admin: { position: 'sidebar' },
    },
    { name: 'subject', type: 'text', required: true, maxLength: 250 },
    { name: 'body', label: 'Message', type: 'textarea', required: true, maxLength: 10000 },
    {
      name: 'recipient',
      type: 'email',
      admin: { readOnly: true, position: 'sidebar' },
      access: { create: () => false, update: () => false },
    },
    deliveryFields,
  ],
  hooks: {
    beforeValidate: [
      async ({ data, operation, req }) => {
        if (!data || operation !== 'create') return data
        const record = data.record
        if (!record || !['enquiries', 'applications'].includes(record.relationTo))
          throw new ValidationError({
            errors: [{ path: 'record', message: 'Select an enquiry or application.' }],
          })
        const target = await req.payload.findByID({
          collection: record.relationTo,
          id: record.value,
          depth: 0,
          req,
        })
        data.recipient = target.email
        data.emailDelivery = { status: 'queued' }
        return data
      },
    ],
    afterChange: [queueReplyEmail],
  },
}
