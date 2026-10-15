import type { PayloadRequest, Plugin } from 'payload'
import { batchPublicContent, initializePublications } from '../services/publication'
import { lockPublicContent, publicResources } from '../services/publicContent'

function batchDocumentHooks<Args extends { req: PayloadRequest; doc: unknown }>(
  hooks: ((args: Args) => unknown)[] = [],
) {
  return [
    async (args: Args) =>
      batchPublicContent(args.req, async () => {
        let doc = args.doc
        for (const hook of hooks) doc = (await hook({ ...args, doc })) || doc
        return doc
      }),
  ]
}

const contentWriters = new Set([...publicResources, 'form-submissions', 'reservations'])

// Acquire the publication lock before source writes, including nested form/slot writes.
// Acquiring it only in afterChange can deadlock against a concurrent publication.
export const publicContentWrites: Plugin = (config) => ({
  ...config,
  onInit: async payload => {
    initializePublications(payload)
    await config.onInit?.(payload)
  },
  collections: config.collections?.map((collection) => {
    if (!contentWriters.has(collection.slug)) return collection
    return {
      ...collection,
      hooks: {
        ...collection.hooks,
        afterChange: batchDocumentHooks(collection.hooks?.afterChange),
        afterDelete: batchDocumentHooks(collection.hooks?.afterDelete),
        beforeDelete: [
          async (args) =>
            batchPublicContent(args.req, async () => {
              for (const hook of collection.hooks?.beforeDelete ?? []) await hook(args)
            }),
        ],
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
      afterChange: batchDocumentHooks(global.hooks?.afterChange),
      beforeOperation: [
        async ({ operation, req }) => {
          if (operation === 'update' || operation === 'restoreVersion') await lockPublicContent(req)
        },
        ...(global.hooks?.beforeOperation ?? []),
      ],
    },
  })),
})
