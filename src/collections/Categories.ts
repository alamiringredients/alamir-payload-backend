import {titleFields} from '../fields/title'
import {recordRelationships} from '../fields/relationships'
import type { CollectionConfig } from 'payload'
import { slugField } from 'payload'
import { authenticated, published } from '../access'
import {recordLayoutField,recordImageSettings} from '../blocks/recordSections'
import {revalidatePage,revalidateDeletedPage} from '../hooks/revalidate'

export const Categories: CollectionConfig = {
  orderable: true,
  hooks:{afterChange:[revalidatePage],afterDelete:[revalidateDeletedPage]},
  "slug": "categories",
  "admin": {
    "group": "Products",
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
    ...recordRelationships('categories'),
    slugField({ useAsSlug: 'name' }),
    { type: 'tabs', tabs: [{"label": "Page content", "fields": [recordLayoutField('categories')]}, {"label": "Details", "fields": [{"name": "description", "type": "textarea", "localized": true}]}, {label:"Images and settings",fields:[{name:"icon",label:"Menu thumbnail",type:"upload",relationTo:"media",admin:{description:"Shown beside this category in the Products navigation menu."}},{name:"page",type:"group",label:false,fields:recordImageSettings('categories')}]}, {"label": "SEO", "fields": [{"name": "seoTitle", "type": "text", "localized": true}, {"name": "seoDescription", "type": "textarea", "localized": true}]}] }
  ],
  "indexes": []
}
