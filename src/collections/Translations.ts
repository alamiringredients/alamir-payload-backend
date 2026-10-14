import {revalidateTranslation,revalidateDeletedPage} from '../hooks/revalidate'
import type { CollectionConfig } from 'payload'
import { authenticated } from '../access'

export const Translations: CollectionConfig = {
  slug: 'translations',
  labels: { singular: 'Translation', plural: 'Shared translations' },
  admin: { group: 'Website', useAsTitle: 'text', listSearchableFields:['text','key'], defaultColumns: ['text','key','group'] },
  hooks:{afterChange:[revalidateTranslation],afterDelete:[revalidateDeletedPage]},
  access: { read: () => true, create: authenticated, update: authenticated, delete: authenticated },
  fields: [
    { name: 'sourceId', type: 'number', unique: true, admin: { hidden: true } },
    { name: 'key', type: 'text', required: true, unique: true, admin: { position:'sidebar',readOnly: true } },
    { name: 'group', type: 'text', required: true, admin: { position: 'sidebar', readOnly: true } },
    { name: 'text', label: 'Translation', type: 'textarea', localized: true },
  ],
}
