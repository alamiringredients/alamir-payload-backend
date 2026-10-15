import 'dotenv/config'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { getPayload, type Payload } from 'payload'
import { randomUUID } from 'node:crypto'
import config from '../../src/payload.config'

let payload: Payload
const events: number[] = [], reservations: number[] = []
const title = {root:{type:'root',version:1,direction:null,format:'' as const,indent:0,children:[{type:'paragraph',version:1,children:[{type:'text',version:1,text:'Schedule integration check',format:0,detail:0,mode:'normal',style:''}]}]}}
const at = (time: string) => `2030-01-15T${time}:00.000Z`
const window = {startsAt:at('09:00'),endsAt:at('12:00'),duration:30,gap:15}
beforeAll(async () => { payload = await getPayload({config}) },60000)
afterAll(async () => {
  for(const id of reservations)await payload.delete({collection:'reservations',id})
  for(const id of events){
    await payload.delete({collection:'meeting-slots',where:{event:{equals:id}}})
    await payload.delete({collection:'events',id})
  }
  await payload.destroy()
},60000)

async function event() {
  const doc=await payload.create({collection:'events',data:{title,slug:`schedule-${randomUUID()}`,kind:'event',_status:'published'}})
  events.push(doc.id)
  return doc
}

describe('Event meeting schedule',()=>{
  it('generates complete meetings with a gap between meetings, without duplicates on repeated saves',async()=>{
    const doc=await event()
    await payload.update({collection:'events',id:doc.id,data:{meetingSchedule:[window]}})
    await payload.update({collection:'events',id:doc.id,data:{meetingSchedule:[window]}})
    const slots=await payload.find({collection:'meeting-slots',where:{event:{equals:doc.id}},sort:'startsAt',pagination:false,depth:0})
    expect(slots.docs.map(({startsAt,endsAt})=>({startsAt,endsAt}))).toEqual([
      {startsAt:at('09:00'),endsAt:at('09:30')},
      {startsAt:at('09:45'),endsAt:at('10:15')},
      {startsAt:at('10:30'),endsAt:at('11:00')},
      {startsAt:at('11:15'),endsAt:at('11:45')},
    ])
    await expect(payload.create({collection:'meeting-slots',data:{event:doc.id,startsAt:at('09:00'),endsAt:at('09:30')}})).rejects.toBeDefined()
  })
  it('applies a 15-minute gap across a 9 AM to 5 PM timeline',async()=>{
    const doc=await event()
    await payload.update({collection:'events',id:doc.id,data:{meetingSchedule:[{...window,endsAt:at('17:00')}]}})
    const slots=await payload.find({collection:'meeting-slots',where:{event:{equals:doc.id}},sort:'startsAt',pagination:false,depth:0})
    expect(slots.docs).toHaveLength(11)
    expect(slots.docs[0]).toMatchObject({startsAt:at('09:00'),endsAt:at('09:30')})
    expect(slots.docs[1]).toMatchObject({startsAt:at('09:45'),endsAt:at('10:15')})
    expect(slots.docs.at(-1)).toMatchObject({startsAt:at('16:30'),endsAt:at('17:00')})
  })
  it('preserves booked slots and their reservations and skips overlapping generated times',async()=>{
    const doc=await event()
    const booked=await payload.create({collection:'meeting-slots',data:{event:doc.id,startsAt:at('09:10'),endsAt:at('09:50')}})
    const reservation=await payload.create({collection:'reservations',context:{disableEmails:true},data:{slot:booked.id,name:'Schedule check',email:'schedule@example.invalid',phone:'123',locale:'en',consent:true,key:randomUUID(),topic:'Meeting'}})
    reservations.push(reservation.id)
    await payload.update({collection:'events',id:doc.id,data:{meetingSchedule:[window]}})
    const unchanged=await payload.findByID({collection:'meeting-slots',id:booked.id,depth:0})
    expect(unchanged).toMatchObject({startsAt:booked.startsAt,endsAt:booked.endsAt,reserved:true})
    expect((await payload.findByID({collection:'reservations',id:reservation.id,depth:0})).slot).toBe(booked.id)
    const slots=await payload.find({collection:'meeting-slots',where:{event:{equals:doc.id}},sort:'startsAt',pagination:false,depth:0})
    expect(slots.docs.map(slot=>slot.startsAt)).toEqual([at('09:10'),at('10:30'),at('11:15')])
  })
  it('moves a reservation between slots and releases the slot after deletion', async () => {
    const doc = await event()
    const slots = await Promise.all(['09:00', '10:00'].map(time =>
      payload.create({ collection: 'meeting-slots', data: {
        event: doc.id, startsAt: at(time), endsAt: at(time.replace(':00', ':30')),
      } }),
    ))
    const booking = await payload.create({ collection: 'reservations', context: { disableEmails: true }, data: {
      slot: slots[0].id, name: 'Moving guest', email: 'move@example.invalid', locale: 'en', consent: true, key: randomUUID(),
    } })
    reservations.push(booking.id)
    await payload.update({ collection: 'reservations', id: booking.id, data: { slot: slots[1].id } })
    const availability = async () => (await payload.find({ collection: 'meeting-slots', where: {
      event: { equals: doc.id },
    }, sort: 'startsAt', depth: 0 })).docs.map(slot => slot.reserved)
    expect(await availability()).toEqual([false, true])
    expect((await payload.findByID({ collection: 'reservations', id: booking.id, depth: 0 })).slot).toBe(slots[1].id)
    await payload.delete({ collection: 'reservations', id: booking.id })
    reservations.splice(reservations.indexOf(booking.id), 1)
    expect(await availability()).toEqual([false, false])
    const replacement = await payload.create({ collection: 'reservations', context: { disableEmails: true }, data: {
      slot: slots[1].id, name: 'Next guest', email: 'next@example.invalid', locale: 'en', consent: true, key: randomUUID(),
    } })
    reservations.push(replacement.id)
    expect(await availability()).toEqual([false, true])
  })
  it('rejects invalid windows, overlapping windows and invalid gap durations',async()=>{
    const doc=await event()
    for(const meetingSchedule of [
      [{...window,endsAt:at('08:00')}],
      [{...window,duration:10.5}],
      [window,{...window,startsAt:at('11:00')}],
    ])await expect(payload.update({collection:'events',id:doc.id,data:{meetingSchedule}})).rejects.toMatchObject({status:400})
    for(const gap of [-1,1.5,241])await expect(payload.update({collection:'events',id:doc.id,data:{meetingSchedule:[{...window,gap}]}})).rejects.toMatchObject({status:400})
    expect((await payload.find({collection:'meeting-slots',where:{event:{equals:doc.id}}})).docs).toHaveLength(0)
  })
})
