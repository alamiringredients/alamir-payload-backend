import { revalidateTag } from 'next/cache'
export const contentTag = (resource: string) => `public-content:${resource}`
export function invalidatePublicContent(resources: string[]) {
  for (const resource of resources) revalidateTag(contentTag(resource), { expire: 0 })
}
