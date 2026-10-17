import type { CollectionConfig } from 'payload'
import { authenticated } from '../access'
import { validateCVUpload } from '../services/cvUpload'
export const ApplicationFiles: CollectionConfig = {
  slug: 'application-files',
  admin: { hidden: true, useAsTitle: 'filename' },
  access: {
    read: authenticated,
    create: authenticated,
    update: authenticated,
    delete: authenticated,
  },
  upload: {
    staticDir: 'private/application-files',
    mimeTypes: [
      'application/pdf',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    ],
  },
  fields: [],
  hooks: { beforeOperation: [validateCVUpload] },
}
