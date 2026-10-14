import {ownedForms} from '../fields/forms'
import {createOwnerForms,deleteOwnerForms} from '../services/forms'
import {titleFields} from '../fields/title'
import {recordRelationships} from '../fields/relationships'
import type { CollectionConfig } from 'payload'
import { slugField } from 'payload'
import { authenticated, published } from '../access'
import {recordLayoutField,recordImageSettings} from '../blocks/recordSections'
import {revalidatePage,revalidateDeletedPage} from '../hooks/revalidate'

export const Products: CollectionConfig = {
  orderable: true,
  hooks:{afterChange:[createOwnerForms,revalidatePage],beforeDelete:[deleteOwnerForms],afterDelete:[revalidateDeletedPage]},
  "slug": "products",
  "admin": {
    "group": "Products",
    "useAsTitle": "name",
    "defaultColumns": [
      "name",
      "_status",
      "updatedAt"
    ]
  },
  defaultPopulate: { name: true, slug: true, _status:true,sourceId: true },
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
    ...recordRelationships('products'),
    slugField({ useAsSlug: 'name', disableUnique: true }),
    {
      "name": "category",
      "type": "relationship",
      "relationTo": "categories",
      "required": true,
      "admin": {
        "position": "sidebar"
      }
    },
    { type: 'tabs', tabs: [{label:'Forms',fields:[ownedForms]},{"label": "Page content", "fields": [recordLayoutField('products')]}, {"label": "Details", "fields": [{"name": "description", "type": "textarea", "localized": true}, {"name": "tds", "type": "upload", "localized": true, "relationTo": "media"}]}, {label:"Images and settings",fields:[{name:"page",type:"group",label:false,fields:recordImageSettings('products')}]}, {"label": "SEO", "fields": [{"name": "seoTitle", "type": "text", "localized": true}, {"name": "seoDescription", "type": "textarea", "localized": true}]}] }
  ],
  "indexes": [
    {
      "fields": [
        "category",
        "slug"
      ],
      "unique": true
    }
  ]
}
