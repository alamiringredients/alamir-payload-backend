import type { PageDefinition } from '../sectionTypes'

export const definition: PageDefinition = {
  key: 'news-page',
  slug: 'news',
  label: 'News',
  sections: [
    {
      name: 'hero',
      label: 'Hero',
      fields: [
        {
          name: 'title',
          label: 'Title',
          type: 'richText',
          localized: true,
        },
        {
          name: 'kicker',
          label: 'Kicker',
          type: 'text',
          localized: true,
        },
        {
          name: 'heroAlt',
          label: 'Hero alt',
          type: 'text',
          localized: true,
        },
        {
          name: 'description',
          label: 'Description',
          type: 'textarea',
          localized: true,
        },
        {
          name: 'heroImage',
          label: 'Hero image',
          type: 'upload',
          relationTo: 'media',
        },
      ],
    },
    {
      name: 'articles',
      label: 'Articles',
      fields: [
        {
          name: 'empty',
          label: 'Empty',
          type: 'text',
          localized: true,
        },
      ],
    },
    {
      name: 'events',
      label: 'Events call to action',
      fields: [
        {
          name: 'eventsTitle',
          label: 'Events title',
          type: 'richText',
          localized: true,
        },
        {
          name: 'eventsKicker',
          label: 'Events kicker',
          type: 'text',
          localized: true,
        },
        {
          name: 'eventsDescription',
          label: 'Events description',
          type: 'textarea',
          localized: true,
        },
      ],
    },
  ],
  settings: [
    {
      name: 'copy',
      type: 'group',
      label: false,
      fields: [
        {
          name: 'seoTitle',
          label: 'Seo title',
          type: 'text',
          localized: true,
        },
        {
          name: 'contactTitle',
          label: 'Contact title',
          type: 'richText',
          localized: true,
        },
        {
          name: 'relatedTitle',
          label: 'Related title',
          type: 'richText',
          localized: true,
        },
        {
          name: 'contactKicker',
          label: 'Contact kicker',
          type: 'text',
          localized: true,
        },
        {
          name: 'relatedKicker',
          label: 'Related kicker',
          type: 'text',
          localized: true,
        },
        {
          name: 'seoDescription',
          label: 'Seo description',
          type: 'text',
          localized: true,
        },
        {
          name: 'contactDescription',
          label: 'Contact description',
          type: 'text',
          localized: true,
        },
      ],
    },
  ],
}
