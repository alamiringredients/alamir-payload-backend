import {ownedForms} from '../fields/forms'
import {createOwnerForms,deleteOwnerForms} from '../services/forms'
import {meetingSchedule} from '../fields/meetingSchedule'
import {generateEventMeetingSlots} from '../services/meetingSlots'
import {titleFields} from '../fields/title'
import {recordRelationships} from '../fields/relationships'
import type { CollectionConfig } from 'payload'
import { slugField } from 'payload'
import { authenticated, published } from '../access'
import {recordLayoutField,recordSettings} from '../blocks/recordSections'
import {revalidatePage,revalidateDeletedPage} from '../hooks/revalidate'

export const Events: CollectionConfig = {
  orderable: true,
  hooks:{afterChange:[createOwnerForms,generateEventMeetingSlots,revalidatePage],beforeDelete:[deleteOwnerForms],afterDelete:[revalidateDeletedPage]},
  "slug": "events",
  "admin": {
    "group": "Events",
    "useAsTitle": "name",
    "defaultColumns": [
      "name",
      "_status",
      "updatedAt"
    ]
  },
  defaultPopulate: { name: true, slug: true, sourceId: true, kind: true, timezone: true, _status: true },
  "versions": {
    "drafts": true
  },
  "access": { read: published, create: authenticated, update: authenticated, delete: authenticated },
  "fields": [
    {
      "name": "sourceId",
      "type": "number",
      "unique": true,
      "admin": {
        "hidden": true
      }
    },
    ...titleFields,
    ...recordRelationships('events'),
    slugField({ useAsSlug: 'name' }),
    {
      "name": "kind",
      label: "Meeting type",
      admin: { position: "sidebar" },
      "type": "select",
      "options": [
        "event",
        "recap"
      ],
      "required": true
    },
    {
      "name": "timezone",
      "type": "text",
      virtual: true,
      admin: { hidden: true },
      hooks: { afterRead: [() => process.env.APP_TIMEZONE || undefined] }
    },
    { type: 'tabs', tabs: [{"label": "Page content", "fields": [recordLayoutField('events')]}, {"label": "Details", "fields": [{"name": "location", "type": "text", "localized": true}, {"name": "venue", "type": "text", "localized": true}, {"name": "stand", "type": "text", "localized": true}, {"name": "startsAt", "type": "date"}, {"name": "endsAt", "type": "date"}]}, {label:'Meeting slots',fields:[meetingSchedule,{name:'meetingSlots',label:'Meeting slots',type:'join',collection:'meeting-slots',on:'event',defaultSort:'startsAt',access:{read:({req})=>Boolean(req.user)},admin:{defaultColumns:['startsAt','endsAt','reserved']}}]}, {label:'Forms',fields:[ownedForms]}, {label:"Record settings",fields:[{name:"page",type:"group",label:false,fields:recordSettings('events')}]}] }
  ],
  "indexes": []
}
