import type { CollectionConfig } from 'payload'
import {revalidatePage,revalidateDeletedPage} from '../hooks/revalidate'
import { authenticated, published } from '../access'
import { pageFields } from '../fields/pages/Certifications'

export const Certifications: CollectionConfig = {
  hooks:{afterChange:[revalidatePage],afterDelete:[revalidateDeletedPage]},
  "slug": "certifications",
  "admin": {
    "group": "Certifications",
    "useAsTitle": "name",
    "defaultColumns": [
      "name",
      "certificationType",
      "holder",
      "standing"
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
    {
      "name": "certificationType",
      "type": "relationship",
      "relationTo": "certification-types",
      "required": true,
      "admin": {
        "position": "sidebar"
      }
    },
    { type: 'tabs', tabs: [{"label": "Details", "fields": [{"name": "holder", "type": "select", admin:{position:'sidebar'}, "options": [{label:'Al Amir Group',value:'group'},{label:'Sadat City',value:'sadat-city'}]}, {"name": "standing", "type": "select", admin:{position:'sidebar'}, "options": [{label:'Planned',value:'planned'},{label:'In progress',value:'in-progress'},{label:'Held',value:'held'},{label:'Suspended',value:'suspended'},{label:'Expired',value:'expired'}]}, {"name": "scope", "type": "textarea", "localized": true}, {"name": "targetDate", "type": "text"}, {"name": "issueDate", "type": "text"}, {"name": "expiryDate", "type": "text"}, {"name": "certificateNumber", "type": "text"}, {"name": "document", "type": "upload", "localized": true, "relationTo": "media"}]}, {"label": "Page content", "fields": pageFields}] }
  ],
  "indexes": []
}
