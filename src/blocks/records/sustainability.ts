import type { RecordDefinition } from '../sectionTypes'
import { articleContent } from '../../fields/articleContent'

export const definition: RecordDefinition = {
  collection: 'sustainability',
  sections: [
    {
      name: 'hero',
      slug: 'sus-hero',
      label: 'Article hero',
      pageFields: [],
      contentFields: [
        { name: 'summary', type: 'textarea', localized: true },
        { name: 'kicker', type: 'text', localized: true },
        { name: 'badge', type: 'text', localized: true },
        { name: 'heroImage', type: 'upload', relationTo: 'media', localized: true },
        { name: 'heroAlt', type: 'text', localized: true },
        { name: 'heroCaption', type: 'text', localized: true },
      ],
    },
    {
      name: 'body',
      slug: 'sus-body',
      label: 'Article content',
      pageFields: [],
      contentFields: [
        { name: 'railIntro', type: 'textarea', localized: true },
        { name: 'note', type: 'textarea', localized: true },
        articleContent,
      ],
    },
  ],
  settings: [
    {
      name: 'metadata',
      type: 'group',
      label: false,
      fields: [
        { name: 'date', label: 'Publication date', type: 'text' },
        { name: 'updatedDate', label: 'Updated date', type: 'text' },
        { name: 'featured', type: 'checkbox' },
      ],
      admin: {},
    },
  ],
}
