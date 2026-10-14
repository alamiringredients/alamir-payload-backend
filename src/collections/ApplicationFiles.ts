import type { CollectionConfig } from 'payload'
import { ValidationError } from 'payload'
import { authenticated } from '../access'
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
  hooks: {
    beforeChange: [
      ({ req }) => {
        const file = req.file
        if (
          file &&
          (file.size > 10 * 1024 * 1024 ||
            !(
              file.data.subarray(0, 5).toString() === '%PDF-' ||
              (file.data.subarray(0, 2).toString() === 'PK' &&
                file.data.includes(Buffer.from('word/')))
            ))
        )
          throw new ValidationError({
            errors: [{ path: 'cv', message: 'Use a valid PDF or DOCX file up to 10 MB.' }],
          })
      },
    ],
  },
}
