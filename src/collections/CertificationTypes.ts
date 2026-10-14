import type { CollectionConfig } from 'payload'
import {revalidatePage,revalidateDeletedPage} from '../hooks/revalidate'
import { slugField } from 'payload'
import { authenticated, published } from '../access'

export const CertificationTypes: CollectionConfig = {
  hooks:{afterChange:[revalidatePage],afterDelete:[revalidateDeletedPage]},
  "slug": "certification-types",
  "admin": {
    "group": "Certifications",
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
    { type: 'tabs', tabs: [{"label": "Details", "fields": [{"name": "description", "type": "textarea", "localized": true}, {"name": "logo", "type": "upload", "localized": true, "relationTo": "media"}, {"name": "badge", "type": "text", "localized": true}, {"name": "kind", "type": "select", "localized": true, "options": ["certification", "registration", "membership", "audit"]}]}] }
  ],
  "indexes": []
}
