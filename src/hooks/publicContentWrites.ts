import type { Plugin } from 'payload'
import { lockPublicContent, publicResources } from '../services/publicContent'

const contentWriters = new Set([...publicResources, 'form-submissions', 'reservations'])

// Acquire the publication lock before source writes, including nested form/slot writes.
// Acquiring it only in afterChange can deadlock against a concurrent publication.
export const publicContentWrites: Plugin = (config) => ({
  ...config,
  collections: config.collections?.map((collection) => {
    if (!contentWriters.has(collection.slug)) return collection
    return {
      ...collection,
      hooks: {
        ...collection.hooks,
        beforeOperation: [
          async ({ operation, req }) => {
            if (['create', 'update', 'delete', 'restoreVersion'].includes(operation))
              await lockPublicContent(req)
          },
          ...(collection.hooks?.beforeOperation ?? []),
        ],
      },
    }
  }),
  globals: config.globals?.map((global) => ({
    ...global,
    hooks: {
      ...global.hooks,
      beforeOperation: [
        async ({ operation, req }) => {
          if (operation === 'update' || operation === 'restoreVersion') await lockPublicContent(req)
        },
        ...(global.hooks?.beforeOperation ?? []),
      ],
    },
  })),
})
