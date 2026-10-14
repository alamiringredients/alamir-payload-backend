import type { Field } from 'payload'
import { validateMeetingSchedule, validateMeetingGap } from '../services/meetingSlots'

export const meetingSchedule: Field = {
  name: 'meetingSchedule',
  label: 'Meeting schedule',
  type: 'array',
  admin: { description: 'Publish the event to generate missing slots. Existing slots and reservations are kept. Set the gap between meetings for each window.' },
  validate: value => validateMeetingSchedule(value),
  fields: [
    { name: 'startsAt', label: 'Window start', type: 'date', required: true, admin: { date: { pickerAppearance: 'dayAndTime' } } },
    { name: 'endsAt', label: 'Window end', type: 'date', required: true, admin: { date: { pickerAppearance: 'dayAndTime' } } },
    { type: 'row', fields: [
      { name: 'duration', label: 'Meeting duration (minutes)', type: 'number', required: true, min: 10, max: 240, defaultValue: 30 },
      { name: 'gap', label: 'Gap between meetings (minutes)', type: 'number', required: true, min: 0, max: 240, defaultValue: 0, validate: (value: unknown) => validateMeetingGap(value) },
    ] },
  ],
}
