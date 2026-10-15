import 'dotenv/config'
import {afterAll,beforeAll,expect,it} from 'vitest'
import {getPayload,type Payload} from 'payload'
import {randomUUID} from 'node:crypto'
import config from '../../src/payload.config'

let payload:Payload
beforeAll(async()=>{payload=await getPayload({config})},60000)
afterAll(async()=>{await payload?.destroy()},60000)
const heading={root:{type:'root',version:1,direction:null,format:'' as const,indent:0,children:[{type:'paragraph',version:1,direction:null,format:'',indent:0,children:[{type:'text',version:1,text:'Editable heading',format:1,detail:0,mode:'normal',style:''}]}]}}
it('publishes formatted record sections, reorders them, and preserves gallery captions across locales',async()=>{
 const {docs:media}=await payload.find({collection:'media',where:{sourceUrl:{exists:true}},limit:1,depth:0})
 const category=await payload.create({collection:'categories',locale:'en',data:{appearance:'muted',title:heading,slug:`editor-verification-${randomUUID()}`,layout:[{blockType:'cat-hero',data:{}},{blockType:'gallery',images:[{image:media[0].id,caption:'English caption'}]}],_status:'published'},context:{disableRevalidate:true}})
 try{
  const [hero,gallery]=category.layout!
  if(hero.blockType!=='cat-hero' || gallery.blockType!=='gallery')throw new Error('Unexpected sections')
  await payload.update({collection:'categories',id:category.id,locale:'ar',data:{slug:`renamed-category-${randomUUID()}`,title:{...heading,root:{...heading.root,children:[{...heading.root.children[0],children:[{...heading.root.children[0].children[0],text:'اختبار المحرر'}]}]}},layout:[{...gallery,images:[{id:gallery.images![0].id,image:media[0].id,caption:'تعليق عربي'}]},{...hero,mediaPosition:'left'}]},context:{disableRevalidate:true}})
  const english=await payload.findByID({collection:'categories',id:category.id,locale:'en',depth:1,overrideAccess:false})
  const arabic=await payload.findByID({collection:'categories',id:category.id,locale:'ar',depth:1,overrideAccess:false})
  expect(english.layout?.map(block=>block.id)).toEqual([gallery.id,hero.id])
  expect(english.layout?.[1]).toMatchObject({blockType:'cat-hero',mediaPosition:'left',data:{}})
  expect(english.layout?.[0]).toMatchObject({images:[{caption:'English caption',image:{id:media[0].id,url:media[0].url}}]})
  expect(arabic.layout?.[0]).toMatchObject({images:[{caption:'تعليق عربي'}]})
  expect(english.appearance).toBe('muted')
  expect(english.slug).toMatch(/^renamed-category-/)
  expect(english.title).toMatchObject(heading)
  expect(arabic.name).toBe('اختبار المحرر')
 }finally{await payload.delete({collection:'categories',id:category.id,context:{disableRevalidate:true}})}
})
it.each(['products','news','sustainability','jobs','events'] as const)('supports reusable sections and draft privacy for %s',async collection=>{
 const {docs:[category]}=await payload.find({collection:'categories',limit:1,depth:0})
 const data={title:heading,slug:`section-check-${randomUUID()}`,kind:'recap' as const,category:category.id,layout:[{blockType:'text' as const,heading},{blockType:'text-media' as const,body:heading,mediaPosition:'right' as const}],_status:'draft' as const}
 const doc=await payload.create({collection,data,context:{disableRevalidate:true}})
 try{
  expect((await payload.find({collection,where:{id:{equals:doc.id}},overrideAccess:false})).docs).toHaveLength(0)
  await expect(payload.update({collection,id:doc.id,data:{name:'Forbidden'},overrideAccess:false})).rejects.toMatchObject({status:403})
  const [first,second]=doc.layout!
  if(first.blockType!=='text' || second.blockType!=='text-media')throw new Error('Unexpected media section')
  await payload.update({collection,id:doc.id,data:{layout:[{...second,mediaPosition:'left'},first],_status:'published'},context:{disableRevalidate:true}})
  const result=await payload.findByID({collection,id:doc.id,overrideAccess:false})
  expect(result.layout?.map(block=>block.id)).toEqual([second.id,first.id])
  expect(result.layout?.[0]).toMatchObject({blockType:'text-media',mediaPosition:'left',body:heading})
 }finally{await payload.delete({collection,id:doc.id,context:{disableRevalidate:true}})}
})

it('keeps named news relationships linked when a title or URL changes and rejects tags as categories',async()=>{
 const {docs:[category]}=await payload.find({collection:'news-taxonomies',where:{kind:{equals:'category'}},limit:1,depth:0})
 const {docs:tags}=await payload.find({collection:'news-taxonomies',where:{kind:{equals:'tag'}},limit:2,depth:0})
 const target=await payload.create({collection:'news',data:{title:heading,slug:`relationship-target-${randomUUID()}`,_status:'published'},context:{disableRevalidate:true}})
 let article:Awaited<ReturnType<typeof payload.create>>|undefined
 try{
  article=await payload.create({collection:'news',data:{title:heading,slug:`relationship-source-${randomUUID()}`,_status:'published',relationships:{category:category.id,tags:tags.map(tag=>tag.id),nextArticle:target.id}},context:{disableRevalidate:true}})
  const title=structuredClone(heading)
  title.root.children[0].children[0].text='Renamed article'
  const slug=`renamed-${randomUUID()}`
  await payload.update({collection:'news',id:target.id,data:{title,slug,generateSlug:false},context:{disableRevalidate:true}})
  const result=await payload.findByID({collection:'news',id:article.id,depth:1,overrideAccess:false})
  expect(result.relationships?.category).toMatchObject({id:category.id,name:category.name})
  expect(result.relationships?.tags).toMatchObject(tags.map(tag=>({id:tag.id,name:tag.name})))
  expect(result.relationships?.nextArticle).toMatchObject({id:target.id,name:'Renamed article',slug})
  await expect(payload.update({collection:'news',id:article.id,data:{relationships:{category:tags[0].id}},context:{disableRevalidate:true}})).rejects.toMatchObject({status:400})
 }finally{
  if(article)await payload.delete({collection:'news',id:article.id,context:{disableRevalidate:true}})
  await payload.delete({collection:'news',id:target.id,context:{disableRevalidate:true}})
 }
})

it('selects, orders, and clears related Sustainability articles by their named relationships',async()=>{
 const {docs:targets}=await payload.find({collection:'sustainability',limit:2,depth:0,sort:'_order'})
 const doc=await payload.create({collection:'sustainability',data:{title:heading,slug:`related-selection-${randomUUID()}`,_status:'published',relationships:{relatedArticles:targets.map(target=>target.id)}},context:{disableRevalidate:true}})
 try{
  await payload.update({collection:'sustainability',id:doc.id,data:{relationships:{relatedArticles:targets.map(target=>target.id).reverse()}},context:{disableRevalidate:true}})
  const selected=await payload.findByID({collection:'sustainability',id:doc.id,depth:1,overrideAccess:false})
  expect(selected.relationships?.relatedArticles).toMatchObject(targets.map(target=>({id:target.id,name:target.name})).reverse())
  await payload.update({collection:'sustainability',id:doc.id,data:{relationships:{relatedArticles:[]}},context:{disableRevalidate:true}})
  expect((await payload.findByID({collection:'sustainability',id:doc.id,depth:1,overrideAccess:false})).relationships?.relatedArticles).toEqual([])
 }finally{await payload.delete({collection:'sustainability',id:doc.id,context:{disableRevalidate:true}})}
})

it('finds translations by their visible text in each locale without knowing the key',async()=>{
 const key=`search-verification-${randomUUID()}`
 const translations={en:'Find this visible English phrase',ar:'ابحث عن هذه العبارة العربية',fr:'Retrouver cette phrase française'}
 const record=await payload.create({collection:'translations',locale:'en',data:{key,group:'Verification',text:translations.en},context:{disableRevalidate:true}})
 try{
  for(const locale of ['ar','fr'] as const)await payload.update({collection:'translations',id:record.id,locale,data:{text:translations[locale]},context:{disableRevalidate:true}})
  for(const locale of ['en','ar','fr'] as const){
   const results=await payload.find({collection:'translations',locale,where:{text:{contains:translations[locale]}},overrideAccess:false})
   expect(results.docs).toMatchObject([{id:record.id,key,text:translations[locale]}])
  }
 }finally{await payload.delete({collection:'translations',id:record.id,context:{disableRevalidate:true}})}
})
