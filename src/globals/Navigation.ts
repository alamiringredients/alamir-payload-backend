import {revalidateGlobal} from '../hooks/revalidate'
import type { GlobalConfig } from 'payload'
import { authenticated } from '../access'
import { pageFields } from '../fields/pages/Navigation'

export const Navigation: GlobalConfig = {
  hooks:{afterChange:[revalidateGlobal]},
  "slug": "navigation",
  "label": "Navigation",
  "admin": {
    "group": "Website"
  },
  "access": { read: () => true, update: authenticated },
  "fields": [
    ...pageFields
  ]
}
