import {ownedForms} from '../fields/forms'
import {createOwnerForms,deleteOwnerForms} from '../services/forms'
import {titleFields} from '../fields/title'
import {recordRelationships} from '../fields/relationships'
import type { CollectionConfig } from 'payload'
import { slugField } from 'payload'
import { authenticated, published } from '../access'
import {recordLayoutField,recordSettings} from '../blocks/recordSections'
import {revalidatePage,revalidateDeletedPage} from '../hooks/revalidate'

export const Jobs: CollectionConfig = {
  orderable: true,
  hooks:{afterChange:[createOwnerForms,revalidatePage],beforeDelete:[deleteOwnerForms],afterDelete:[revalidateDeletedPage]},
  "slug": "jobs",
  labels: { singular: 'Job', plural: 'Jobs' },
  "admin": {
    "group": "Careers",
    "useAsTitle": "name",
    "defaultColumns": [
      "name",
      "_status",
      "updatedAt"
    ]
  },
  defaultPopulate: { name: true, slug: true, sourceId: true, _status:true,availability:true },
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
    ...recordRelationships('jobs'),
    slugField({ useAsSlug: 'name' }),
    {
      "name": "availability",
      "type": "select",
      "options": [
        "open",
        "closed"
      ],
      "defaultValue": "open",
      "admin": {
        "position": "sidebar"
      }
    },
    { type: 'tabs', tabs: [{"label": "Page content", "fields": [recordLayoutField('jobs')]}, {"label": "Details", "fields": [{"name": "department", "type": "text", "localized": true}, {"name": "location", "type": "text", "localized": true}, {"name": "contract", "type": "text", "localized": true}, {"name": "experience", "type": "text", "localized": true}, {"name": "reportsTo", "type": "text", "localized": true}, {"name": "closing", "type": "text", "localized": true}, ]}, {label:'Forms',fields:[ownedForms]}, {label:"Record settings",fields:[{name:"page",type:"group",label:false,fields:recordSettings('jobs')}]}] }
  ],
  "indexes": []
}
