import {revalidateGlobal} from '../hooks/revalidate'
import type { GlobalConfig } from 'payload'
import { authenticated } from '../access'
import { pageFields } from '../fields/pages/WebsiteSettings'

export const WebsiteSettings: GlobalConfig = {
  hooks:{afterChange:[revalidateGlobal]},
  "slug": "website-settings",
  "label": "Site settings",
  "admin": {
    "group": "Website"
  },
  "access": { read: () => true, update: authenticated },
  "fields": [
    ...pageFields
  ]
}
