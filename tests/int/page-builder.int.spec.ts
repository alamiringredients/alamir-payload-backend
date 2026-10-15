import 'dotenv/config'
import {afterAll,beforeAll,expect,it} from 'vitest'
import {getPayload,type Payload} from 'payload'
import {randomUUID} from 'node:crypto'
import config from '../../src/payload.config'
let payload:Payload
const ids:number[]=[]
beforeAll(async()=>{payload=await getPayload({config})},60000)
afterAll(async()=>{for(const id of ids)await payload.delete({collection:'pages',id,context:{disableRevalidate:true}});await payload.destroy()},60000)
const copy=(text:string)=>({root:{type:'root',version:1,direction:null,format:'' as const,indent:0,children:[{type:'paragraph',version:1,direction:null,format:'',indent:0,children:[{type:'text',version:1,text,format:1,detail:0,mode:'normal',style:''}]}]}})
it('keeps a new page private until it is published and prevents anonymous changes',async()=>{
 const slug=`page-builder-${randomUUID()}`
 const page=await payload.create({collection:'pages',data:{title:'New website page',slug,layout:[{blockType:'text',heading:copy('New section'),body:copy('Editable content')}],_status:'draft'},context:{disableRevalidate:true}})
 ids.push(page.id)
 expect((await payload.find({collection:'pages',where:{slug:{equals:slug}},overrideAccess:false})).docs).toHaveLength(0)
 await expect(payload.update({collection:'pages',id:page.id,data:{title:'Unauthorized'},overrideAccess:false})).rejects.toMatchObject({status:403})
 await payload.update({collection:'pages',id:page.id,data:{_status:'published'},context:{disableRevalidate:true}})
 const {docs:[published]}=await payload.find({collection:'pages',where:{slug:{equals:slug}},overrideAccess:false})
 expect(published.slug).toBe(slug)
 expect(published.layout?.[0]).toMatchObject({blockType:'text',heading:copy('New section')})
})
it('reorders sections, changes media placement, and preserves each locale without uploading existing assets',async()=>{
 const media=await payload.find({collection:'media',where:{sourceUrl:{exists:true}},limit:1,depth:0})
 const page=await payload.create({collection:'pages',locale:'en',data:{title:'Reorder check',slug:`page-builder-${randomUUID()}`,layout:[{blockType:'text-media',heading:copy('Media section'),body:copy('English content'),media:media.docs[0].id,mediaPosition:'right',columnWidth:'70-30'},{blockType:'text',heading:copy('Second section')}],_status:'published'},context:{disableRevalidate:true}})
 ids.push(page.id)
 const [first,second]=page.layout!
 if(first.blockType!=='text-media' || second.blockType!=='text')throw new Error('Unexpected page sections')
 await payload.update({collection:'pages',id:page.id,locale:'ar',data:{title:'اختبار ترتيب الأقسام',layout:[{...second,heading:copy('القسم الثاني')},{...first,body:copy('محتوى عربي'),mediaPosition:'left',columnWidth:'40-60'}]},context:{disableRevalidate:true}})
 const english=await payload.findByID({collection:'pages',id:page.id,locale:'en',depth:1,overrideAccess:false})
 const arabic=await payload.findByID({collection:'pages',id:page.id,locale:'ar',depth:1,overrideAccess:false})
 expect(english.layout?.map(block=>block.id)).toEqual([second.id,first.id])
 expect(english.layout?.[1]).toMatchObject({blockType:'text-media',body:copy('English content'),mediaPosition:'left',columnWidth:'40-60',media:{id:media.docs[0].id,url:media.docs[0].url}})
 expect(arabic.layout?.[1]).toMatchObject({body:copy('محتوى عربي'),columnWidth:'40-60'})
 expect((await payload.find({collection:'media',where:{sourceUrl:{exists:true}},limit:1,depth:0})).totalDocs).toBe(media.totalDocs)
})
