import 'dotenv/config'
import {afterAll,beforeAll,describe,expect,it} from 'vitest'
import {getPayload,type Payload} from 'payload'
import {randomUUID} from 'node:crypto'
import config from '../../src/payload.config'

let payload:Payload
const ids:number[]=[]
const formIDs:number[]=[]
const taxonomyIDs:number[]=[]
const context={disableRevalidate:true,disableOwnerForms:true}
beforeAll(async()=>{payload=await getPayload({config})},60000)
afterAll(async()=>{
 for(const id of taxonomyIDs)await payload.delete({collection:'news-taxonomies',id,context})
 for(const id of formIDs)await payload.delete({collection:'forms',id,context})
 for(const id of ids)await payload.delete({collection:'pages',id,context})
 await payload.destroy()
},60000)
async function publishedPages(){
 const result=await payload.find({collection:'public-content',where:{resource:{equals:'pages'}},overrideAccess:false,depth:0})
 return (result.docs[0].content as {docs:Record<string,unknown>[]}).docs
}
describe('Published public read model',()=>{
 it('refreshes shared taxonomy names after publication and edits',async()=>{
  const taxonomy=await payload.create({collection:'news-taxonomies',locale:'en',context,data:{name:'Temporary topic',kind:'tag',slug:`projection-${randomUUID()}`,_status:'published'}})
  taxonomyIDs.push(taxonomy.id)
  await payload.update({collection:'news-taxonomies',id:taxonomy.id,locale:'en',context,data:{name:'Updated topic'}})
  const result=await payload.find({collection:'public-content',where:{resource:{equals:'news-taxonomies'}},depth:0,overrideAccess:false})
  expect((result.docs[0].content as {docs:Record<string,unknown>[]}).docs.find(doc=>doc.id===taxonomy.id)?.name).toMatchObject({en:'Updated topic'})
 })
 it('excludes drafts, retains the native document on publication, refreshes edits and removes deleted pages',async()=>{
  const page=await payload.create({collection:'pages',locale:'en',context,data:{title:'Temporary projection check',slug:`projection-${randomUUID()}`,layout:[],_status:'draft'}})
  ids.push(page.id)
  expect((await publishedPages()).some(doc=>doc.id===page.id)).toBe(false)
  await payload.update({collection:'pages',id:page.id,context,data:{_status:'published'}})
  const native=await payload.findByID({collection:'pages',id:page.id,depth:0,locale:'all',overrideAccess:false,joins:false as never})
  expect((await publishedPages()).find(doc=>doc.id===page.id)).toEqual(JSON.parse(JSON.stringify(native)))
  await payload.update({collection:'pages',id:page.id,locale:'fr',context,data:{title:'Publication française'}})
  expect((await publishedPages()).find(doc=>doc.id===page.id)?.title).toMatchObject({en:'Temporary projection check',fr:'Publication française'})
  await payload.delete({collection:'pages',id:page.id,context})
  ids.splice(ids.indexOf(page.id),1)
  expect((await publishedPages()).some(doc=>doc.id===page.id)).toBe(false)
 })
 it('does not expose private form recipients or allow anonymous projection changes',async()=>{
  const {docs}=await payload.find({collection:'forms',locale:'en',depth:0,limit:1})
  const {id,key,createdAt,updatedAt,...copy}=docs[0]
  const recipient='private-projection-recipient@example.invalid'
  const form=await payload.create({collection:'forms',locale:'en',context,data:{...copy,key:`projection-${randomUUID()}`,title:'Temporary private recipient check',makeDefault:false,applyToExisting:false,emails:[{emailTo:recipient,subject:'Private recipient'}]}})
  formIDs.push(form.id)
  expect(form.emails?.[0].emailTo).toBe(recipient)
  const result=await payload.find({collection:'public-content',where:{resource:{equals:'forms'}},overrideAccess:false,depth:0})
  expect((result.docs[0].content as {docs:Record<string,unknown>[]}).docs.some(doc=>doc.id===form.id)).toBe(true)
  expect(JSON.stringify(result.docs[0].content)).not.toContain(recipient)
  await expect(payload.create({collection:'public-content',overrideAccess:false,data:{resource:'private',content:{}}})).rejects.toMatchObject({status:403})
 })
})
