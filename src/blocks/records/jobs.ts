import type { RecordDefinition } from '../sectionTypes'
import { articleContent } from '../../fields/articleContent'

export const definition: RecordDefinition = {
  collection: 'jobs',
  sections: [
    {
      name: 'hero',
      slug: 'job-hero',
      label: 'Job hero',
      pageFields: [],
      contentFields: [
        { name: 'summary', type: 'textarea', localized: true },
        { name: 'hero', type: 'upload', relationTo: 'media', localized: true },
        { name: 'heroAlt', type: 'text', localized: true },
      ],
    },
    {
      name: 'body',
      slug: 'job-body',
      label: 'Job description and role summary',
      pageFields: [],
      contentFields: [articleContent],
    },
    {
      name: 'apply',
      slug: 'job-apply',
      label: 'Application form',
      pageFields: [],
      contentFields: [],
    },
    {
      name: 'related',
      slug: 'job-related',
      label: 'Related jobs',
      pageFields: [],
      contentFields: [],
    },
  ],
  settings: [
    {
      name: 'code',
      label: 'Code',
      type: 'text',
      admin: {},
    },
  ],
}
