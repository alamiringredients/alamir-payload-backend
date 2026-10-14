import type { Field } from 'payload'
export const ownedForms: Field = {
  name: 'forms',
  label: 'Forms',
  type: 'join',
  collection: 'forms',
  on: 'owner',
  access: { read: ({ req }) => Boolean(req.user) },
  admin: { allowCreate: false, defaultColumns: ['title', 'purpose'] },
}
