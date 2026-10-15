import config from '@payload-config'
import { getPayload } from 'payload'
import { parsePublicQuery, readPublicSite } from '@/services/publicContentReads'

export async function GET(request: Request) {
  if (request.headers.has('authorization') || request.headers.has('cookie')) return new Response(null, { status: 400 })
  const query = parsePublicQuery(new URL(request.url).searchParams)
  if (!query) return new Response(null, { status: 400 })
  return Response.json(await readPublicSite(() => getPayload({ config }), query), {
    headers: { 'Cache-Control': 'public, max-age=0, s-maxage=60' },
  })
}
