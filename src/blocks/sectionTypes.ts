import type { Field } from 'payload'

export type PageDefinition = {
  key: string
  slug: string
  label: string
  sections: { name: string; label: string; fields: Field[] }[]
  settings: Field[]
}

export type ContentCollection =
  'products' | 'categories' | 'news' | 'sustainability' | 'jobs' | 'events'

export type RecordDefinition = {
  collection: ContentCollection
  sections: {
    name: string
    slug: string
    label: string
    pageFields: Field[]
    contentFields: Field[]
  }[]
  settings: Field[]
}
