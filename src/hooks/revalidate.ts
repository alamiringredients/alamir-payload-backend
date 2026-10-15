import { invalidatePublicContent } from '../services/publicCache'
import { refreshPublicContent } from '../services/publicContent'
import type {
  CollectionAfterChangeHook,
  CollectionAfterDeleteHook,
  GlobalAfterChangeHook,
} from 'payload'
async function refreshWebsite(resources: string[]) {
  invalidatePublicContent(resources)
  if (!process.env.CMS_REVALIDATION_SECRET) return
  const response = await fetch(
    `${process.env.FRONTEND_URL || 'http://localhost:3000'}/api/revalidate`,
    {
      method: 'POST',
      headers: { authorization: `Bearer ${process.env.CMS_REVALIDATION_SECRET}` },
      signal: AbortSignal.timeout(3000),
    },
  )
  if (!response.ok) throw new Error(`Website cache refresh failed (${response.status}).`)
}
export const revalidatePage: CollectionAfterChangeHook = async ({
  doc,
  previousDoc,
  req,
  context,
  collection,
  operation,
}) => {
  if (
    doc._status !== undefined &&
    doc._status !== 'published' &&
    previousDoc?._status !== 'published'
  )
    return doc
  await refreshPublicContent(req.payload, [collection.slug], req)
  if (context.disableRevalidate) return doc
  try {
    await refreshWebsite([
      collection.slug,
      ...(collection.slug === 'events' ? ['meeting-slots'] : []),
      ...(operation === 'create' &&
      ['pages', 'jobs', 'events', 'products'].includes(collection.slug)
        ? ['forms']
        : []),
    ])
  } catch (error) {
    req.payload.logger.warn(error)
  }
  return doc
}
export const revalidateDeletedPage: CollectionAfterDeleteHook = async ({
  doc,
  req,
  context,
  collection,
}) => {
  await refreshPublicContent(req.payload, [collection.slug], req)
  if (!context.disableRevalidate)
    try {
      await refreshWebsite([
        collection.slug,
        ...(collection.slug === 'events' ? ['meeting-slots'] : []),
        ...(['pages', 'jobs', 'events', 'products'].includes(collection.slug) ? ['forms'] : []),
      ])
    } catch (error) {
      req.payload.logger.warn(error)
    }
  return doc
}

export const revalidateGlobal: GlobalAfterChangeHook = async ({ doc, req, context, global }) => {
  await refreshPublicContent(req.payload, [`globals/${global.slug}`], req)
  if (!context.disableRevalidate)
    try {
      await refreshWebsite([`globals/${global.slug}`])
    } catch (error) {
      req.payload.logger.warn(error)
    }
  return doc
}
