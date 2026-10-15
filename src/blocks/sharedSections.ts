import { galleryField } from '../fields/gallery'
import { createHash } from 'node:crypto'
import type { Block, Field } from 'payload'

export function pageFields(schema: Field[]): Field[] {
  const page = schema.find((field) => 'name' in field && field.name === 'page')
  if (!page || !('fields' in page)) return []
  return page.fields.flatMap((field) =>
    field.type === 'tabs' ? field.tabs.flatMap((tab) => tab.fields) : [field],
  )
}

export function databaseNames(fields: Field[], prefix: string): Field[] {
  return fields.map((field, index) => {
    const name = `${prefix}_${'name' in field ? field.name : index}`
    const result = { ...field }
    if ('dbName' in result)
      result.dbName = `pb_${createHash('sha1').update(name).digest('hex').slice(0, 12)}`
    if ('fields' in result) result.fields = databaseNames(result.fields, name)
    if (result.type === 'tabs')
      result.tabs = result.tabs.map((tab, index) => ({
        ...tab,
        fields: databaseNames(tab.fields, `${name}_${index}`),
      }))
    return result
  })
}
export const mediaPositionField: Field = {
  name: 'mediaPosition',
  label: 'Media position',
  type: 'select',
  options: [
    { label: 'Original design', value: 'original' },
    { label: 'Left', value: 'left' },
    { label: 'Right', value: 'right' },
  ],
  defaultValue: 'original',
}
export const columnWidthField: Field = {
  name: 'columnWidth',
  label: 'Column widths',
  type: 'select',
  defaultValue: 'original',
  options: [
    { label: 'Original design', value: 'original' },
    { label: '50 / 50', value: '50-50' },
    { label: '55 / 45', value: '55-45' },
    { label: '60 / 40', value: '60-40' },
    { label: '70 / 30', value: '70-30' },
    { label: '40 / 60', value: '40-60' },
    { label: '30 / 70', value: '30-70' },
  ],
}
export const enabledField: Field = {
  name: 'enabled',
  label: 'Show section',
  type: 'checkbox',
  defaultValue: true,
}
const copy: Field[] = [
  { name: 'eyebrow', label: 'Eyebrow', type: 'text', localized: true },
  { name: 'heading', label: 'Heading', type: 'richText', localized: true },
  { name: 'body', label: 'Content', type: 'richText', localized: true },
]
const media: Field[] = [
  { name: 'media', label: 'Image or video', type: 'upload', relationTo: 'media' },
  { name: 'poster', label: 'Video poster', type: 'upload', relationTo: 'media' },
  { name: 'caption', label: 'Caption', type: 'text', localized: true },
]
export const standardBlocks: Block[] = [
  {
    slug: 'form',
    labels: { singular: 'Form', plural: 'Forms' },
    admin: { group: 'Content' },
    fields: [
      enabledField,
      ...copy,
      {
        name: 'form',
        type: 'relationship',
        relationTo: 'forms',
        required: true,
        filterOptions: { purpose: { equals: 'custom' } },
      },
    ],
  },
  {
    slug: 'hero',
    labels: { singular: 'Hero', plural: 'Heroes' },
    admin: { group: 'Content' },
    fields: [enabledField, mediaPositionField, ...copy, ...media],
  },
  {
    slug: 'text',
    labels: { singular: 'Text section', plural: 'Text sections' },
    admin: { group: 'Content' },
    fields: [enabledField, ...copy],
  },
  {
    slug: 'text-media',
    labels: { singular: 'Two columns', plural: 'Two columns' },
    admin: { group: 'Content' },
    fields: [
      enabledField,
      { ...mediaPositionField, defaultValue: 'right' },
      columnWidthField,
      {
        name: 'theme',
        label: 'Background',
        type: 'select',
        defaultValue: 'plain',
        options: [
          { label: 'Plain', value: 'plain' },
          { label: 'Tint', value: 'tint' },
          { label: 'Dark', value: 'deep' },
        ],
      },
      ...copy,
      { name: 'rightContent', label: 'Second column content', type: 'richText', localized: true },
      ...media,
      { name: 'mediaAlt', label: 'Alternative text', type: 'text', localized: true },
      {
        name: 'articles',
        label: 'Related news articles',
        type: 'relationship',
        relationTo: 'news',
        hasMany: true,
        admin: { isSortable: true },
      },
      { name: 'articleLinkLabel', label: 'Article link label', type: 'text', localized: true },
    ],
  },
  {
    slug: 'gallery',
    labels: { singular: 'Gallery', plural: 'Galleries' },
    admin: { group: 'Content' },
    fields: [enabledField, ...copy, galleryField('images', 'Images')],
  },
  {
    slug: 'call-to-action',
    labels: { singular: 'Call to action', plural: 'Calls to action' },
    admin: { group: 'Content' },
    fields: [
      enabledField,
      ...copy,
      {
        name: 'actions',
        type: 'array',
        fields: [
          { name: 'label', type: 'text', localized: true, required: true },
          { name: 'href', label: 'Link', type: 'text', required: true },
        ],
      },
    ],
  },
]
