import {publicResources,sharedResources} from '@/services/publicContent'
import {contentTag} from '@/services/publicCache'
import {publicReadContext} from '@/services/queryProfile'
import config from '@payload-config'
import {getPayload} from 'payload'
import {unstable_cache} from 'next/cache'
import {sql} from '@payloadcms/db-postgres'
import {inArray} from '@payloadcms/db-postgres/drizzle'

const identityResources=['products','categories','news','sustainability','jobs','events']

const readSite=unstable_cache(async(scope:string,resources:string,locale:string,owner:string,ownerId:string,purpose:string)=>{
 const payload=await getPayload({config})
 const keys=resources.split(',')
 return publicReadContext.run('site',async()=>{
  const table=payload.db.tables.public_content
  const column=scope==='shared'?table.localizedSummary:table.localizedContent
  const data=scope==='identities'?sql`case when ${table.content} is null then null else jsonb_build_object('docs', coalesce((
   select jsonb_agg((select jsonb_object_agg(key, value) from jsonb_each(doc)
    where key in ('id', 'sourceId', 'slug', '_order', 'category', 'availability')) order by position)
   from jsonb_array_elements(${table.content} -> 'docs') with ordinality as records(doc, position)
  ), '[]'::jsonb)) end`:locale==='all'?(scope==='shared'?table.summary:table.content):sql`${column} -> ${locale}`
  const docs=await payload.db.drizzle.select({resource:table.resource,data}).from(table).where(inArray(table.resource,keys))
  const result=Object.fromEntries(docs.map(doc=>{
   let content=doc.data as Record<string,unknown>
   if(!content)throw new Error('Run the public content refresh before serving the website.')
   if(doc.resource==='forms'&&(owner||purpose))content={...content,docs:(content.docs as {owner?:{relationTo:string;value:number};purpose:string}[]).filter(form=>(!owner||form.owner?.relationTo===owner)&&(!ownerId||String(form.owner?.value)===ownerId)&&(!purpose||form.purpose===purpose))}
   return [String(doc.resource),content]
  }))
  if(keys.some(key=>!(key in result)))throw new Error('Public content projection is incomplete.')
  return result
 })
},['public-site-v4'],{tags:['public-content',...publicResources.map(contentTag)],revalidate:300})

export async function GET(request:Request){
 if(request.headers.has('authorization')||request.headers.has('cookie'))return new Response(null,{status:400})
 const params=new URL(request.url).searchParams,scope=params.get('scope')??'content'
 const allowedResources=scope==='identities'?identityResources:publicResources
 const resources=scope==='shared'?sharedResources:(params.get('resources')??allowedResources.join(',')).split(',')
 const locale=params.get('locale')??'all'
 if(!['shared','content','identities'].includes(scope)||!['en','ar','fr','all'].includes(locale)||resources.some(resource=>!allowedResources.includes(resource)))return new Response(null,{status:400})
 return Response.json(await readSite(scope,[...new Set(resources)].sort().join(','),locale,params.get('owner')??'',params.get('ownerId')??'',params.get('purpose')??''),{headers:{'Cache-Control':'public, max-age=0, s-maxage=60'}})
}
