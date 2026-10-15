import { publishPublicContent } from '../services/publication'
import { publicationDependencies } from '../services/publicContentPolicy'
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
    publicationDependencies(collection.slug, operation),
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
    publicationDependencies(collection.slug, 'delete'),
  )
  return doc
}

export const revalidateGlobal: GlobalAfterChangeHook = async ({ doc, req, global }) => {
  await publishPublicContent(req, [`globals/${global.slug}`])
  return doc
}
