import type { CollectionAfterChangeHook, Field, PayloadRequest, TaskConfig } from 'payload'
import type { Reservation } from '../payload-types'
import { bookingDetails } from './meetingBooking'
import { meetingEmail } from './emailTemplates'
import { replyEmail } from './replyEmail'

export const deliveryFields: Field = {
  name: 'emailDelivery',
  label: 'Email delivery',
  type: 'group',
  admin: { position: 'sidebar', readOnly: true },
  access: { create: () => false, update: () => false },
  fields: [
    { name: 'status', type: 'select', options: ['queued', 'retrying', 'sent', 'failed'] },
    { name: 'messageID', label: 'Message ID', type: 'text' },
    { name: 'sentAt', label: 'Sent at', type: 'date' },
    { name: 'error', label: 'Last delivery error', type: 'textarea' },
  ],
}
type EmailInput = {
  kind: 'reservation' | 'reply' | 'form'
  recordId?: number
  message?: Record<string, unknown>
}
export const queueReplyEmail: CollectionAfterChangeHook = async ({ doc, operation, req }) => {
  if (operation === 'create' && !req.context.disableEmails)
    await req.payload.jobs.queue({
      task: 'send-email',
      queue: 'emails',
      input: { kind: 'reply', recordId: doc.id },
      req,
    })
  return doc
}
async function reservationMessage(reservation: Reservation, req: PayloadRequest) {
  const meeting = await bookingDetails(reservation, req)
  const locale = reservation.locale
  const translations = await req.payload.find({
    collection: 'translations',
    locale,
    depth: 0,
    pagination: false,
    where: {
      key: {
        in: [
          'email.meeting.subject',
          'email.meeting.greeting',
          'email.meeting.details',
          'email.meeting.confirmed',
          'email.meeting.help',
        ],
      },
    },
    req,
  })
  const copy = Object.fromEntries(
    translations.docs.map((row) => [row.key.split('.').at(-1)!, row.text]),
  )
  if (Object.keys(copy).length !== 5 || Object.values(copy).some((value) => !value))
    throw new Error('Meeting email translations are missing. Run the content seeder.')
  const when = new Intl.DateTimeFormat(locale, {
    dateStyle: 'full',
    timeStyle: 'short',
    timeZone: meeting.timezone,
  }).format(new Date(meeting.startsAt))
  const settings = await req.payload.findGlobal({
    slug: 'website-settings',
    locale: 'en',
    depth: 0,
    req,
  })
  if (!settings.page?.siteName || !meeting.event)
    throw new Error('Configure the site name and event title.')
  return meetingEmail({
    brandName: settings.page.siteName,
    to: reservation.email,
    name: reservation.name,
    title: meeting.event,
    when,
    timezone: meeting.timezone,
    locale,
    copy: copy as Record<string, string>,
  })
}
export const sendEmailTask: TaskConfig<{ input: EmailInput; output: { messageID: string } }> = {
  slug: 'send-email',
  label: 'Send email',
  retries: { attempts: 3, backoff: { type: 'exponential', delay: 30000 } },
  inputSchema: [
    { name: 'kind', type: 'select', options: ['reservation', 'reply', 'form'], required: true },
    { name: 'recordId', type: 'number' },
    { name: 'message', type: 'json' },
  ],
  outputSchema: [{ name: 'messageID', type: 'text', required: true }],
  handler: async ({ input, req, job }) => {
    const collection = input.kind === 'reservation' ? 'reservations' : 'email-replies'
    const record =
      input.kind === 'form'
        ? undefined
        : await req.payload.findByID({
            collection,
            id: input.recordId!,
            depth: 0,
            req,
            joins: false as never,
          })
    if (record?.emailDelivery?.status === 'sent')
      return { output: { messageID: record.emailDelivery.messageID! } }
    try {
      if (req.payload.email.name !== 'nodemailer')
        throw new Error('SMTP is not configured. Set MAIL_HOST and MAIL_FROM_ADDRESS.')
      let message: Record<string, unknown>
      if (input.kind === 'reservation') {
        if (!record || !('slot' in record)) throw new Error('Reservation not found.')
        message = await reservationMessage(record, req)
      } else if (input.kind === 'reply') {
        if (!record || !('recipient' in record)) throw new Error('Email reply not found.')
        const reply = record
        if (!reply.recipient) throw new Error('Reply recipient is missing.')
        await req.payload.findByID({
          collection: reply.record.relationTo,
          id: typeof reply.record.value === 'object' ? reply.record.value.id : reply.record.value,
          depth: 0,
          req,
        })
        const settings = await req.payload.findGlobal({
          slug: 'website-settings',
          locale: 'en',
          depth: 1,
          req,
        })
        const logo = settings.page?.logo
        if (!settings.page?.siteName || !logo || typeof logo !== 'object' || !logo.url)
          throw new Error('Configure the site name and logo in Site settings.')
        message = replyEmail({
          to: reply.recipient,
          subject: reply.subject,
          body: reply.body,
          brandName: settings.page.siteName,
          logo: logo.url,
          appUrl: process.env.FRONTEND_URL!,
        })
      } else message = input.message!
      // Stable message IDs help correlate SMTP receipts and retries.
      const messageID = `<alamir-${job.id}@${req.payload.email.defaultFromAddress.split('@')[1]}>`
      const result = (await req.payload.sendEmail({ ...message, messageId: messageID })) as {
        messageId?: string
      }
      const sentID = result.messageId || messageID
      if (record)
        await req.payload.update({
          collection,
          id: record.id,
          data: {
            emailDelivery: {
              status: 'sent',
              messageID: sentID,
              sentAt: new Date().toISOString(),
              error: null,
            },
          },
          req,
        })
      return { output: { messageID: sentID } }
    } catch (error) {
      if (record)
        await req.payload.update({
          collection,
          id: record.id,
          data: {
            emailDelivery: {
              status: (job.totalTried ?? 0) >= 3 ? 'failed' : 'retrying',
              error: error instanceof Error ? error.message : 'Email delivery failed.',
            },
          },
          req,
        })
      throw error
    }
  },
}
