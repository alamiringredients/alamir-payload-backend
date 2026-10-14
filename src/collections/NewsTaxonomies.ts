import type { CollectionConfig } from 'payload'
import {revalidatePage,revalidateDeletedPage} from '../hooks/revalidate'
import { slugField } from 'payload'
import { authenticated, published } from '../access'
import { pageFields } from '../fields/pages/NewsTaxonomies'

export const NewsTaxonomies: CollectionConfig = {
  hooks:{afterChange:[revalidatePage],afterDelete:[revalidateDeletedPage]},
  "slug": "news-taxonomies",
  labels: { singular: 'Topics and tag', plural: 'Topics and tags' },
  "admin": {
    "group": "News",
    "useAsTitle": "name",
    "defaultColumns": [
      "name",
      "_status",
      "updatedAt"
    ]
  },
  defaultPopulate: { name: true, slug: true, sourceId: true },
  "versions": {
    "drafts": true
  },
  "access": { read: published, create: authenticated, update: authenticated, delete: authenticated },
  "fields": [
    {
      "name": "sourceId",
      "type": "number",
      "unique": true,
      "admin": {
        "hidden": true
      }
    },
    {
      "name": "name",
      "type": "text",
      "required": true,
      "localized": true
    },
    slugField({ useAsSlug: 'name' }),
    { name: 'kind', type: 'select', options: ['category', 'tag'], required: true, defaultValue: 'tag', admin: { position: 'sidebar' } },
    ...pageFields
  ],
  "indexes": []
}
