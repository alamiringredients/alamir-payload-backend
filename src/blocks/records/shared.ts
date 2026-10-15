import type { Field } from 'payload'

export const introductionStyleField: Field = {
  name: 'introStyle',
  label: 'Introduction style',
  type: 'select',
  required: true,
  defaultValue: 'body',
  options: [
    { label: 'Body text', value: 'body' },
    { label: 'Lead paragraph', value: 'lead' },
  ],
}
