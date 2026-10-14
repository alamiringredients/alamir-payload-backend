import type { CollectionAfterChangeHook, PayloadRequest } from 'payload'

type Period = { startsAt: string; endsAt: string }
export type MeetingWindow = Period & { duration: number; gap?: number }

export function validateMeetingSchedule(value: unknown): true | string {
  if (value == null) return true
  if (!Array.isArray(value)) return 'Choose valid meeting windows.'
  const windows = value as MeetingWindow[]
  for (const window of windows) {
    const start = Date.parse(window.startsAt), end = Date.parse(window.endsAt)
    if (!Number.isFinite(start) || !Number.isFinite(end) || end <= start) return 'Each window must end after it starts.'
    if (end - start > 86400000) return 'Use a separate meeting window for each day (up to 24 hours).'
    if (!Number.isInteger(window.duration) || window.duration < 10 || window.duration > 240) return 'Meeting duration must be between 10 and 240 whole minutes.'
    const validGap = validateMeetingGap(window.gap ?? 0)
    if (validGap !== true) return validGap
    if (end - start < window.duration * 60000) return 'The window must fit at least one complete meeting.'

  }
  const ordered = [...windows].sort((a, b) => Date.parse(a.startsAt) - Date.parse(b.startsAt))
  if (ordered.some((window, index) => index > 0 && Date.parse(window.startsAt) < Date.parse(ordered[index - 1].endsAt))) return 'Meeting windows must not overlap.'
  return true
}

export function validateMeetingGap(value: unknown): true | string {
  return typeof value === 'number' && Number.isInteger(value) && value >= 0 && value <= 240 || 'The gap must be between 0 and 240 whole minutes.'
}

function planMeetingSlots(windows: MeetingWindow[]): Period[] {
  const planned: Period[] = []
  for (const window of windows) {
    const end = Date.parse(window.endsAt), duration = window.duration * 60000
    for (let start = Date.parse(window.startsAt); start + duration <= end; start += duration + (window.gap ?? 0) * 60000) {
      planned.push({ startsAt: new Date(start).toISOString(), endsAt: new Date(start + duration).toISOString() })
    }
  }
  return planned.sort((a, b) => Date.parse(a.startsAt) - Date.parse(b.startsAt))
}

async function generateMeetingSlots(event: number, windows: MeetingWindow[], req: PayloadRequest) {
  const valid = validateMeetingSchedule(windows)
  if (valid !== true) throw new Error(valid)
  if (!windows.length) return 0
  const existing = await req.payload.find({ collection: 'meeting-slots', where: { event: { equals: event } }, pagination: false, depth: 0, req, select: { startsAt: true, endsAt: true } })
  const occupied = existing.docs.map(slot => ({ start: Date.parse(slot.startsAt), end: Date.parse(slot.endsAt) })).sort((a, b) => a.start - b.start)
  let index = 0, created = 0
  for (const slot of planMeetingSlots(windows)) {
    const start = Date.parse(slot.startsAt), end = Date.parse(slot.endsAt)
    while (index < occupied.length && occupied[index].end <= start) index++
    if (index < occupied.length && occupied[index].start < end) continue
    await req.payload.create({ collection: 'meeting-slots', data: { event, ...slot }, req, depth: 0, select: { startsAt: true } })
    created++
  }
  return created
}

export const generateEventMeetingSlots: CollectionAfterChangeHook = async ({ doc, req }) => {
  if (doc.kind === 'event' && doc._status === 'published' && doc.meetingSchedule?.length && !req.context.disableSlotGeneration) {
    await generateMeetingSlots(doc.id, doc.meetingSchedule, req)
  }
  return doc
}
