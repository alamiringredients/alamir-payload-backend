import type { RecordDefinition } from '../sectionTypes'
import { articleContent } from '../../fields/articleContent'
import { introductionStyleField } from './shared'

export const definition: RecordDefinition = {
  collection: 'events',
  sections: [
    {
      name: 'hero',
      slug: 'event-hero',
      label: 'Event hero',
      pageFields: [],
      contentFields: [
        { name: 'eyebrow', type: 'text', localized: true },
        { name: 'summary', type: 'textarea', localized: true },
        { name: 'heroImage', type: 'upload', relationTo: 'media', localized: true },
        { name: 'heroAlt', type: 'text', localized: true },
        { name: 'heroCaption', type: 'text', localized: true },
      ],
    },
    {
      name: 'body',
      slug: 'event-body',
      label: 'Event content',
      pageFields: [],
      contentFields: [
        { ...articleContent, name: 'bodyCopy', label: 'Body' },
        introductionStyleField,
      ],
    },
  ],
  settings: [
    {
      name: 'sort_order',
      label: 'Sort order',
      type: 'number',
      admin: {},
    },
    {
      name: 'seo',
      type: 'group',
      label: false,
      fields: [
        {
          name: 'title',
          label: 'Title',
          type: 'text',
          localized: true,
        },
        {
          name: 'description',
          label: 'Description',
          type: 'text',
          localized: true,
        },
        {
          name: 'socialImage',
          label: 'Social image',
          type: 'upload',
          relationTo: 'media',
        },
        {
          name: 'socialTitle',
          label: 'Social title',
          type: 'text',
          localized: true,
        },
        {
          name: 'socialDescription',
          label: 'Social description',
          type: 'text',
          localized: true,
        },
      ],
      admin: {},
    },
  ],
}
