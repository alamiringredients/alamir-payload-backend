import type { CollectionConfig } from 'payload'
import {revalidateTranslation,revalidateDeletedPage} from '../hooks/revalidate'
import {mediaURL} from '../storage/mediaURL'
import { authenticated } from '../access'

export const Media: CollectionConfig = {
  slug: 'media',
  hooks:{afterChange:[revalidateTranslation],afterDelete:[revalidateDeletedPage]},
  admin: { group: 'Library', useAsTitle: 'filename', defaultColumns: ['filename','alt','mimeType','filesize'], listSearchableFields: ['filename','alt'], pagination: {defaultLimit:24,limits:[24,48,96]}, components: {views:{list:{Component:'/components/MediaList#MediaList'}}} },
  access: { read: () => true, create: authenticated, update: authenticated, delete: authenticated },
  defaultPopulate: { url: true, alt: true, mimeType: true, width: true, height: true, filename: true, prefix: true, thumbnailURL:true },
  fields: [
    { name: 'alt', type: 'text', localized: true, required: true },
    { name: 'sourceUrl', type: 'text', unique: true, admin: { hidden: true } },
    { name: 'prefix', type: 'text', defaultValue: 'payload/media', admin: { hidden: true, readOnly: true } },
  ],
  upload: {
    disableLocalStorage: true,
    adminThumbnail: ({doc}) => typeof doc.mimeType==='string' && doc.mimeType.startsWith('image/') && typeof doc.filename==='string' ? mediaURL(doc.filename,typeof doc.prefix==='string'?doc.prefix:'') : null,
    // Register existing R2 objects during seeding without uploading their bytes.
    filesRequiredOnCreate: false,
    filenameCompoundIndex: ['filename', 'prefix'],
    mimeTypes: ['image/*', 'video/*', 'application/pdf'],
  },
}
