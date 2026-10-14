import { invalidatePublicContent } from '@/services/publicCache'
import { revalidateTag } from 'next/cache'
export async function POST(request: Request) {
  if (!process.env.CMS_REVALIDATION_SECRET || request.headers.get('authorization') !== `Bearer ${process.env.CMS_REVALIDATION_SECRET}`) return new Response(null, { status: 401 })
  const resources=(await request.json().catch(()=>null))?.resources
  if(Array.isArray(resources) && resources.every(resource=>typeof resource==='string'))invalidatePublicContent(resources)
  else revalidateTag('public-content', { expire: 0 })
  return Response.json({ revalidated: true })
}
