import {
  ValidationError,
  type CollectionAfterChangeHook,
  type CollectionAfterDeleteHook,
  type CollectionBeforeValidateHook,
  type CollectionConfig,
  type Field,
  type PayloadRequest,
} from 'payload'
import type { Form, MeetingSlot, Reservation } from '../payload-types'

const slotID = (slot: Reservation['slot']) => (typeof slot === 'object' ? slot.id : slot)

export const bookingReceiptField: Field = {
  name: 'bookingReceipt',
  type: 'json',
  virtual: true,
  admin: { hidden: true },
  hooks: { afterRead: [({ req }) => req.context.bookingReceipt] },
}

const validateBooking: CollectionBeforeValidateHook<Reservation> = async ({
  data,
  req,
  operation,
}) => {
  if (!data) return data
  if (data.slot) {
    const cached = req.context.bookingSlot as MeetingSlot | undefined
    const slot =
      cached?.id === slotID(data.slot)
        ? cached
        : await req.payload.findByID({
            collection: 'meeting-slots',
            id: slotID(data.slot),
            depth: 1,
            req,
          })
    const event = slot.event
    if (
      new Date(slot.startsAt) <= new Date() ||
      typeof event !== 'object' ||
      event._status !== 'published' ||
      event.kind !== 'event'
    )
      throw new ValidationError({
        errors: [{ path: 'slot', message: 'This meeting slot is not available.' }],
      })
  }
  if (operation === 'create') data.emailDelivery = { status: 'queued' }
  return data
}

const updateBookingSlots: CollectionAfterChangeHook<Reservation> = async ({
  doc,
  previousDoc,
  operation,
  req,
}) => {
  const current = slotID(doc.slot)
  const previous = previousDoc?.slot ? slotID(previousDoc.slot) : undefined
  if (operation !== 'create' && current === previous) return doc
  if (previous && previous !== current)
    await req.payload.update({
      collection: 'meeting-slots',
      id: previous,
      data: { reserved: false },
      req,
    })
  await req.payload.update({
    collection: 'meeting-slots',
    id: current,
    data: { reserved: true },
    req,
  })
  return doc
}

const releaseBookingSlot: CollectionAfterDeleteHook<Reservation> = async ({ doc, req }) => {
  await req.payload.update({
    collection: 'meeting-slots',
    id: slotID(doc.slot),
    data: { reserved: false },
    req,
  })
  return doc
}

export const bookingHooks: CollectionConfig['hooks'] = {
  beforeValidate: [validateBooking],
  afterChange: [
    async ({ doc, operation, req }) => {
      if (operation === 'create' && !req.context.disableEmails)
        await req.payload.jobs.queue({
          task: 'send-email',
          queue: 'emails',
          input: { kind: 'reservation', recordId: doc.id },
          req,
        })
      return doc
    },
    updateBookingSlots,
  ],
  afterDelete: [releaseBookingSlot],
}

export async function createOwnerBooking(
  form: Form,
  slot: number,
  input: Record<string, unknown>,
  req: PayloadRequest,
) {
  const selected = await req.payload.findByID({
    collection: 'meeting-slots',
    id: slot,
    depth: 1,
    req,
  })
  if (
    form.owner?.relationTo === 'events' &&
    (typeof selected.event === 'object' ? selected.event.id : selected.event) !==
      (typeof form.owner.value === 'object' ? form.owner.value.id : form.owner.value)
  )
    throw new ValidationError({
      errors: [{ path: 'slotId', message: 'Choose a slot from this event.' }],
    })
  const previous = req.context.bookingSlot
  req.context.bookingSlot = selected
  try {
    const reservation = await req.payload.create({
      collection: 'reservations',
      req,
      depth: 1,
      data: { ...input, slot: selected.id } as never,
    })
    req.context.bookingReceipt = meetingDetails(selected)
    return reservation
  } finally {
    req.context.bookingSlot = previous
  }
}

function meetingDetails(slot: MeetingSlot) {
  return {
    startsAt: slot.startsAt,
    endsAt: slot.endsAt,
    event: typeof slot.event === 'object' ? slot.event.name : '',
    timezone: process.env.APP_TIMEZONE || undefined,
  }
}

export async function bookingDetails(reservation: Reservation, req: PayloadRequest) {
  const slot =
    typeof reservation.slot === 'object'
      ? reservation.slot
      : await req.payload.findByID({
          collection: 'meeting-slots',
          id: reservation.slot,
          depth: 0,
          joins: false as never,
          req,
        })
  const event = await req.payload.findByID({
    collection: 'events',
    id: typeof slot.event === 'object' ? slot.event.id : slot.event,
    locale: reservation.locale,
    depth: 0,
    req,
  })
  return meetingDetails({ ...slot, event })
}
