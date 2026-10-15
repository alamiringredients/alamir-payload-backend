import type { PageDefinition } from '../sectionTypes'

export const definition: PageDefinition = {
  key: 'sustainability-page',
  slug: 'sustainability',
  label: 'Sustainability',
  sections: [
    {
      name: 'hero',
      label: 'Hero',
      fields: [
        {
          name: 'heading',
          label: 'Heading',
          type: 'group',
          fields: [
            {
              name: 'values',
              label: 'Content',
              type: 'richText',
              localized: true,
            },
          ],
        },
        {
          name: 'body',
          label: 'Body',
          type: 'group',
          fields: [
            {
              name: 'values',
              label: 'Content',
              type: 'richText',
              localized: true,
            },
          ],
        },
        {
          name: 'icons',
          label: 'Goal icons',
          type: 'upload',
          relationTo: 'media',
          hasMany: true,
        },
      ],
    },
    {
      name: 'content',
      label: 'Articles',
      fields: [
        {
          name: 'text',
          label: false,
          type: 'group',
          fields: [
            {
              name: 'values',
              label: 'Articles',
              type: 'text',
              localized: true,
            },
          ],
        },
        {
          name: 'heading',
          label: 'Heading',
          type: 'group',
          fields: [
            {
              name: 'values',
              label: 'Content',
              type: 'richText',
              localized: true,
            },
          ],
        },
      ],
    },
    {
      name: 'related',
      label: 'Contact',
      fields: [
        {
          name: 'text',
          label: false,
          type: 'group',
          fields: [
            {
              name: 'values',
              label: 'Ask us anything on this page',
              type: 'text',
              localized: true,
            },
          ],
        },
        {
          name: 'heading',
          label: 'Heading',
          type: 'group',
          fields: [
            {
              name: 'values',
              label: 'Content',
              type: 'richText',
              localized: true,
            },
          ],
        },
        {
          name: 'body',
          label: 'Body',
          type: 'group',
          fields: [
            {
              name: 'values',
              label: 'Content',
              type: 'richText',
              localized: true,
            },
          ],
        },
      ],
    },
  ],
  settings: [
    {
      name: 'relatedTitle',
      label: 'Related title',
      type: 'richText',
      localized: true,
    },
    {
      name: 'relatedKicker',
      label: 'Related kicker',
      type: 'text',
      localized: true,
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
          type: 'textarea',
          localized: true,
        },
      ],
    },
  ],
}
