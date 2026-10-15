import { AsyncLocalStorage } from 'node:async_hooks'
import type { Payload, PayloadRequest } from 'payload'
import { invalidatePublicContent } from './publicCache'
import { refreshPublicContent } from './publicContent'
import { projectionDependencies } from './publicContentPolicy'

type Publication = {
  transaction: Awaited<PayloadRequest['transactionID']>
  req: PayloadRequest
  resources: Set<string>
  cacheResources: Set<string>
}
const publication = new AsyncLocalStorage<Publication>()
type Notification = { req: PayloadRequest; resources: Set<string> }
const notifications = new WeakMap<Payload['db'], Map<string | number, Notification>>()

// Payload's document hooks (including afterOperation) run before commit.
// Observe transaction completion once, so native and explicit transactions use
// the same ordering and rollback discards pending cache notifications.
export function initializePublications(payload: Payload) {
  const db = payload.db
  if (notifications.has(db)) return
  const pending = new Map<string | number, Notification>()
  notifications.set(db, pending)
  const commit = db.commitTransaction.bind(db)
  const rollback = db.rollbackTransaction.bind(db)
  db.commitTransaction = async id => {
    const transaction = await id
    const notification = pending.get(transaction)
    pending.delete(transaction)
    await commit(transaction)
    if (notification) await notifyWebsite(notification)
  }
  db.rollbackTransaction = async id => {
    const transaction = await id
    pending.delete(transaction)
    await rollback(transaction)
  }
}

async function notifyWebsite({ req, resources }: Notification) {
  try {
    await refreshWebsite([...resources])
  } catch (error) {
    req.payload.logger.warn(error)
  }
}

async function refreshWebsite(resources: string[]) {
  const affected = projectionDependencies(resources)
  invalidatePublicContent(affected)
  if (!process.env.CMS_REVALIDATION_SECRET) return
  const response = await fetch(
    `${process.env.FRONTEND_URL || 'http://localhost:3000'}/api/revalidate`,
    {
      method: 'POST',
      headers: { authorization: `Bearer ${process.env.CMS_REVALIDATION_SECRET}`, 'content-type': 'application/json' },
      body: JSON.stringify({resources: affected}),
      signal: AbortSignal.timeout(3000),
    },
  )
  if (!response.ok) throw new Error(`Website cache refresh failed (${response.status}).`)
}

// Nested writes share publication work, but retain the source transaction and lock.
export async function batchPublicContent<T>(
  req: PayloadRequest,
  write: () => Promise<T>,
): Promise<T> {
  const transaction = await req.transactionID
  const current = publication.getStore()
  if (current?.req.payload === req.payload && current.transaction === transaction) return write()
  const batch: Publication = { transaction, req, resources: new Set(), cacheResources: new Set() }
  return publication.run(batch, async () => {
    const result = await write()
    if (batch.resources.size) await refreshPublicContent(req.payload, [...batch.resources], req)
    if (batch.cacheResources.size) {
      if (transaction) {
        const pending = notifications.get(req.payload.db)!
        const notification = pending.get(transaction) ?? { req, resources: new Set<string>() }
        for (const resource of batch.cacheResources) notification.resources.add(resource)
        pending.set(transaction, notification)
      } else {
        await notifyWebsite({ req, resources: batch.cacheResources })
      }
    }
    return result
  })
}

export async function publishPublicContent(
  req: PayloadRequest,
  resources: string[],
  cacheResources: string[] = resources,
) {
  await batchPublicContent(req, async () => {
    const batch = publication.getStore()!
    if (!req.context.disablePublicProjection)
      for (const resource of resources) batch.resources.add(resource)
    if (!req.context.disableRevalidate)
      for (const resource of cacheResources) batch.cacheResources.add(resource)
  })
}
