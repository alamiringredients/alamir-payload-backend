import {titleFields} from '../fields/title'
import {recordRelationships} from '../fields/relationships'
import type { CollectionConfig } from 'payload'
import { slugField } from 'payload'
import { authenticated, published } from '../access'
import {recordLayoutField,recordSettings} from '../blocks/recordSections'
import {revalidatePage,revalidateDeletedPage} from '../hooks/revalidate'

export const News: CollectionConfig = {
  orderable: true,
  hooks:{afterChange:[revalidatePage],afterDelete:[revalidateDeletedPage]},
  "slug": "news",
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
    ...titleFields,
    ...recordRelationships('news'),
    slugField({ useAsSlug: 'name' }),
    { type: 'tabs', tabs: [{"label": "Page content", "fields": [recordLayoutField('news')]}, {label:"Record settings",fields:[{name:"page",type:"group",label:false,fields:recordSettings('news')}]}, {"label": "SEO", "fields": [{"name": "seoTitle", "type": "text", "localized": true}, {"name": "seoDescription", "type": "textarea", "localized": true}]}] }
  ],
  "indexes": []
}
