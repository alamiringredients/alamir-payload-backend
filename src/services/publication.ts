import { AsyncLocalStorage } from 'node:async_hooks'
import type { PayloadRequest } from 'payload'
import { invalidatePublicContent } from './publicCache'
import { refreshPublicContent } from './publicContent'

type Publication = {
  transaction: Awaited<PayloadRequest['transactionID']>
  req: PayloadRequest
  resources: Set<string>
  cacheResources: Set<string>
}
const publication = new AsyncLocalStorage<Publication>()

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
    if (batch.cacheResources.size)
      try {
        await refreshWebsite([...batch.cacheResources])
      } catch (error) {
        req.payload.logger.warn(error)
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
