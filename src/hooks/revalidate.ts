import { publishPublicContent } from '../services/publication'
import type {
  CollectionAfterChangeHook,
  CollectionAfterDeleteHook,
  GlobalAfterChangeHook,
} from 'payload'
export const revalidatePage: CollectionAfterChangeHook = async ({
  doc,
  previousDoc,
  req,
  collection,
  operation,
}) => {
  if (
    doc._status !== undefined &&
    doc._status !== 'published' &&
    previousDoc?._status !== 'published'
  )
    return doc
  await publishPublicContent(
    req,
    [collection.slug],
    [
      collection.slug,
      ...(collection.slug === 'events' ? ['meeting-slots'] : []),
      ...(operation === 'create' &&
      ['pages', 'jobs', 'events', 'products'].includes(collection.slug)
        ? ['forms']
        : []),
    ],
  )
  return doc
}
export const revalidateDeletedPage: CollectionAfterDeleteHook = async ({
  doc,
  req,
  collection,
}) => {
  await publishPublicContent(
    req,
    [collection.slug],
    [
      collection.slug,
      ...(collection.slug === 'events' ? ['meeting-slots'] : []),
      ...(['pages', 'jobs', 'events', 'products'].includes(collection.slug) ? ['forms'] : []),
    ],
  )
  return doc
}

export const revalidateGlobal: GlobalAfterChangeHook = async ({ doc, req, global }) => {
  await publishPublicContent(req, [`globals/${global.slug}`])
  return doc
}
