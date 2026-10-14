import 'dotenv/config'
import {afterAll,beforeAll,describe,expect,it} from 'vitest'
import {getPayload,type Payload} from 'payload'
import config from '../../src/payload.config'
import {randomUUID} from 'node:crypto'

const title=(text:string)=>({root:{type:'root',version:1,direction:null,format:'' as const,indent:0,children:[{type:'paragraph',version:1,direction:null,format:'',indent:0,children:[{type:'text',version:1,text,format:0,detail:0,mode:'normal',style:''}]}]}})
let payload:Payload
const created:{collection:string;id:number}[]=[]
beforeAll(async()=>{payload=await getPayload({config})},60000)
afterAll(async()=>{
  for(const record of created.reverse())await payload.delete({collection:record.collection as 'news',id:record.id})
  await payload.destroy()
},60000)

describe('Public content and submissions',()=>{
  it('keeps a draft article private and exposes it after publication',async()=>{
    const doc=await payload.create({collection:'news',data:{title:title('Temporary publication check'),slug:`test-${randomUUID()}`,_status:'draft'}})
    created.push({collection:'news',id:doc.id})
    const draft=await payload.find({collection:'news',where:{id:{equals:doc.id}},overrideAccess:false})
    expect(draft.docs).toHaveLength(0)
    await payload.update({collection:'news',id:doc.id,data:{_status:'published'}})
    const published=await payload.find({collection:'news',where:{id:{equals:doc.id}},overrideAccess:false})
    expect(published.docs[0].name).toBe('Temporary publication check')
  })
  it('denies anonymous content changes and private inbox reads',async()=>{
    await expect(payload.create({collection:'news',data:{title:title('Unauthorized'),slug:`test-${randomUUID()}`},overrideAccess:false})).rejects.toMatchObject({status:403})
    await expect(payload.find({collection:'applications',overrideAccess:false})).rejects.toMatchObject({status:403})
    await expect(payload.find({collection:'enquiries',overrideAccess:false})).rejects.toMatchObject({status:403})
  })
  it('validates submissions and saves a valid enquiry in the private inbox',async()=>{
    await expect(payload.create({collection:'enquiries',overrideAccess:false,data:{kind:'contact',name:'Test',email:'invalid',phone:'123',locale:'en',key:randomUUID(),consent:false}})).rejects.toMatchObject({status:400})
    const doc=await payload.create({collection:'enquiries',overrideAccess:false,data:{kind:'quote',name:'Test buyer',email:'payload-test@example.invalid',company:'Test company',country:'Egypt',locale:'en',key:randomUUID(),consent:true}})
    created.push({collection:'enquiries',id:doc.id})
    expect(doc.kind).toBe('quote')
    expect(doc.status).toBe('new')
  })
  it('shows only the meeting slots belonging to each event',async()=>{
    const events=await Promise.all([1,2].map(i=>payload.create({collection:'events',data:{title:title(`Temporary event ${i}`),slug:`test-${randomUUID()}`,kind:'event',_status:'published'}})))
    for(const event of events)created.push({collection:'events',id:event.id})
    const slots=await Promise.all(events.map(event=>payload.create({collection:'meeting-slots',data:{event:event.id,startsAt:new Date(Date.now()+86400000).toISOString(),endsAt:new Date(Date.now()+88200000).toISOString()}})))
    for(const slot of slots)created.push({collection:'meeting-slots',id:slot.id})
    const joined=await payload.find({collection:'events',where:{id:{in:events.map(event=>event.id)}},depth:1})
    for(const event of joined.docs){
      expect(event.meetingSlots?.docs?.map(slot=>typeof slot==='object'?slot.id:slot)).toEqual(slots.filter(slot=>(typeof slot.event==='object'?slot.event.id:slot.event)===event.id).map(slot=>slot.id))
    }
  })
  it('allows only one reservation for a slot under simultaneous requests',async()=>{
    const event=await payload.create({collection:'events',data:{title:title('Temporary booking check'),slug:`test-${randomUUID()}`,kind:'event',timezone:'Africa/Cairo',_status:'published'}})
    created.push({collection:'events',id:event.id})
    const startsAt=new Date(Date.now()+86400000).toISOString()
    const endsAt=new Date(Date.now()+88200000).toISOString()
    const slot=await payload.create({collection:'meeting-slots',data:{event:event.id,startsAt,endsAt}})
    created.push({collection:'meeting-slots',id:slot.id})
    const responses=await Promise.allSettled([1,2].map(i=>payload.create({collection:'reservations',context:{disableEmails:true},overrideAccess:false,data:{slot:slot.id,name:`Test buyer ${i}`,email:'payload-test@example.invalid',company:'Test company',phone:'123',locale:'en',key:randomUUID(),consent:true,topic:'Tomato'}})))
    const successful=responses.filter(response=>response.status==='fulfilled')
    for(const response of successful)if(response.status==='fulfilled')created.push({collection:'reservations',id:response.value.id})
    expect(successful).toHaveLength(1)
    const reserved=await payload.findByID({collection:'meeting-slots',id:slot.id})
    expect(reserved.reserved).toBe(true)
    const eventWithSlots=await payload.findByID({collection:'events',id:event.id,depth:1})
    expect(eventWithSlots.meetingSlots?.docs?.map(slot=>typeof slot==='object'?slot.id:slot)).toEqual([slot.id])
    const slotWithReservation=await payload.findByID({collection:'meeting-slots',id:slot.id,depth:1})
    expect(slotWithReservation.reservation?.docs).toHaveLength(1)

  })
})
