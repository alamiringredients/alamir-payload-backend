import {deliveryFields,queueReservationEmail} from '../services/emails'
import {revalidateTranslation,revalidateDeletedPage} from '../hooks/revalidate'
import type { CollectionConfig, Field, CollectionBeforeValidateHook } from 'payload'
import { ValidationError } from 'payload'
import { authenticated } from '../access'

const submissionAccess: CollectionConfig['access'] = {
  create: () => true,
  read: authenticated,
  update: authenticated,
  delete: authenticated,
}
const consent: Field = { name: 'consent', type: 'checkbox', required: true, validate: value => value === true || 'Consent is required.' }
const contactFields: Field[] = [
  { name: 'name', type: 'text', required: true, maxLength: 150 },
  { name: 'email', type: 'email', required: true },
  { name: 'phone', type: 'text', maxLength: 50 },
  { name: 'company', type: 'text' },
  { name: 'country', type: 'text' },
  { name: 'dialCode', type: 'text' },
  { name: 'locale', type: 'select', options: ['en', 'ar', 'fr'], required: true },
  { name: 'key', type: 'text', required: true, unique: true, admin: { hidden: true } },
  consent,
]
const formSubmission: Field = {name:'formSubmission',label:'Form submission and additional answers',type:'join',collection:'form-submissions',on:'record',access:{read:({req})=>Boolean(req.user)},admin:{allowCreate:false,defaultColumns:['form','createdAt']}}
const replies: Field = {name:'replies',label:'Email replies',type:'join',collection:'email-replies',on:'record',admin:{allowCreate:true,defaultColumns:['subject','emailDelivery.status','createdAt']}}
const workflow: Field = {
  name: 'status', type: 'select', options: ['new', 'in-progress', 'resolved'], defaultValue: 'new',
  access: { create: ({ req }) => Boolean(req.user), update: ({ req }) => Boolean(req.user) },
  admin: { position: 'sidebar' },
}

export const Enquiries: CollectionConfig = {
  slug: 'enquiries', access: submissionAccess,
  admin: { group: 'Inbox', useAsTitle: 'name', defaultColumns: ['name', 'kind', 'email', 'status', 'createdAt'] },
  fields: [
    ...contactFields.filter(field => !('name' in field) || !['phone', 'consent'].includes(field.name)),
    { name: 'phone', type: 'text', maxLength: 50 },
    { name: 'consent', type: 'checkbox', validate: (value, { siblingData }) => (siblingData as {kind?:string}).kind === 'home' || value === true || 'Consent is required.' },
    { name: 'kind', type: 'select', options: ['contact', 'quote', 'home'], required: true },
    { name: 'jobTitle', type: 'text' },
    { name: 'website', type: 'text' },
    { name: 'industry', type: 'text' },
    {name:'category',label:'Product category',type:'relationship',relationTo:'categories',admin:{position:'sidebar'}},
    { name: 'product', type: 'text',admin:{condition:data=>!data.category} },
    { name: 'volume', type: 'text' },
    { name: 'channel', type: 'select', options: ['WhatsApp', 'Email', 'Call'] },
    { name: 'message', type: 'textarea', maxLength: 10000 },
    { name: 'brix', type: 'text' },
    { name: 'destination', type: 'text' },
    workflow,
    replies,
    formSubmission,
    { name: 'notes', type: 'textarea', access: { create: ({ req }) => Boolean(req.user), update: ({ req }) => Boolean(req.user) } },
  ],
}

export const Applications: CollectionConfig = {
  slug: 'applications', access: submissionAccess,
  admin: { group: 'Careers', useAsTitle: 'name', defaultColumns: ['name', 'job', 'department', 'status', 'createdAt'] },
  hooks:{beforeValidate:[({data,operation,req})=>{
    if(operation==='create' && !req.file && !(data?.cv && (req.user || req.context.submittedForm)))throw new ValidationError({errors:[{path:'cv',message:'A CV is required.'}]})
    return data
  }]},
  // Existing CV uploads remain available; Form Builder stores new attachments privately.
  upload: { staticDir: 'private/cv', mimeTypes: ['application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'], filesRequiredOnCreate: false },
  fields: [
    ...contactFields,
    {name:'cv',label:'CV attachment',type:'upload',relationTo:'application-files'},
    { name: 'job', admin:{position:'sidebar'}, type: 'relationship', relationTo: 'jobs', filterOptions: { _status: { equals: 'published' }, availability: { equals: 'open' } } },
    { name: 'department', type: 'text' },
    { name: 'letter', type: 'textarea', maxLength: 5000 },
    workflow,
    replies,
    formSubmission,
  ],
}

export const MeetingSlots: CollectionConfig = {
  slug: 'meeting-slots',
  hooks:{afterChange:[revalidateTranslation],afterDelete:[revalidateDeletedPage]},
  indexes: [{fields:['event','startsAt'],unique:true}],
  admin: { hidden: true, group: 'Events', useAsTitle: 'startsAt', defaultColumns: ['event', 'startsAt', 'endsAt'] },
  access: { read: () => true, create: authenticated, update: authenticated, delete: authenticated },
  fields: [
    { name: 'event', admin:{position:'sidebar'}, type: 'relationship', relationTo: 'events', required: true, index: true },
    { name: 'startsAt', type: 'date', required: true },
    { name: 'endsAt', type: 'date', required: true },
    { name: 'reserved', type: 'checkbox', defaultValue: false, admin: { readOnly: true } },
    { name: 'reservation', type: 'join', collection: 'reservations', on: 'slot', access: { read: ({ req }) => Boolean(req.user) } },
  ],
}

const validateSlot: CollectionBeforeValidateHook = async ({ data, req }) => {
  if (!data?.slot) return data
  const slot = req.context.submissionSlot as import('../payload-types').MeetingSlot | undefined ?? await req.payload.findByID({ collection: 'meeting-slots', id: data.slot, depth: 1, req })
  const event = slot.event
  if (new Date(slot.startsAt) <= new Date() || typeof event !== 'object' || event._status !== 'published' || event.kind !== 'event') {
    throw new ValidationError({ errors: [{ path: 'slot', message: 'This meeting slot is not available.' }] })
  }
  return data
}
export const Reservations: CollectionConfig = {
  slug: 'reservations', access: submissionAccess,
  admin: { group: 'Events', useAsTitle: 'name', defaultColumns: ['name', 'slot', 'email', 'createdAt'] },
  hooks: {
    beforeValidate: [validateSlot,({data,operation})=>{if(data && operation==='create')data.emailDelivery={status:'queued'};return data}],
    afterChange: [queueReservationEmail, async ({ doc, req, operation, previousDoc }) => {
      const slotID=typeof doc.slot==='object'?doc.slot.id:doc.slot
      const previousSlot=typeof previousDoc?.slot==='object'?previousDoc.slot.id:previousDoc?.slot
      if(operation!=='create' && slotID===previousSlot)return doc
      if(previousSlot && previousSlot!==slotID)await req.payload.update({collection:'meeting-slots',id:previousSlot,data:{reserved:false},req})
      await req.payload.update({ collection: 'meeting-slots', id: typeof doc.slot === 'object' ? doc.slot.id : doc.slot, data: { reserved: true }, req })
      return doc
    }],
    afterDelete: [async ({ doc, req }) => {
      await req.payload.update({ collection: 'meeting-slots', id: typeof doc.slot === 'object' ? doc.slot.id : doc.slot, data: { reserved: false }, req })
      return doc
    }],
  },
  fields: [
    ...contactFields,
    deliveryFields,
    // The unique constraint reserves the slot atomically, including simultaneous requests.
    { name: 'slot', admin:{position:'sidebar'}, type: 'relationship', relationTo: 'meeting-slots', required: true, unique: true },
    formSubmission,
    { name: 'topic', type: 'text' },
    { name: 'message', type: 'textarea', maxLength: 5000 },
  ],
}
