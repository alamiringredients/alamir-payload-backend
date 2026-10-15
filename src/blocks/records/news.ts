import type { RecordDefinition } from '../sectionTypes'
import { articleContent } from '../../fields/articleContent'
import { introductionStyleField } from './shared'

export const definition: RecordDefinition = {
  collection: 'news',
  sections: [
    {
      name: 'hero',
      slug: 'news-hero',
      label: 'Article hero',
      pageFields: [],
      contentFields: [
        { name: 'summary', type: 'textarea', localized: true },
        { name: 'cardTitle', label: 'Card title', type: 'richText', localized: true },
        { name: 'cardSummary', type: 'textarea', localized: true },
        { name: 'hero', type: 'upload', relationTo: 'media', localized: true },
        { name: 'heroAlt', type: 'text', localized: true },
        { name: 'heroCaption', type: 'text', localized: true },
      ],
    },
    {
      name: 'body',
      slug: 'news-body',
      label: 'Article content',
      pageFields: [],
      contentFields: [articleContent, introductionStyleField],
    },
    {
      name: 'related',
      slug: 'news-related',
      label: 'Related articles',
      pageFields: [],
      contentFields: [],
    },
    {
      name: 'contact',
      slug: 'news-contact',
      label: 'Contact call to action',
      pageFields: [],
      contentFields: [],
    },
  ],
  settings: [
    {
      name: 'metadata',
      type: 'group',
      label: false,
      fields: [
        {
          name: 'date',
          label: 'Date',
          type: 'text',
        },
        {
          name: 'featured',
          label: 'Featured',
          type: 'checkbox',
        },
      ],
      admin: {},
    },
  ],
}
