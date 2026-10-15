import type { PageDefinition } from '../sectionTypes'

export const definition: PageDefinition = {
  key: 'not-found-page',
  slug: '404',
  label: 'Page not found',
  sections: [
    {
      name: 'hero',
      label: 'Hero',
      fields: [
        {
          name: 'enabled',
          label: 'Enabled',
          type: 'checkbox',
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
    {
      name: 'related',
      label: 'Page recovery links',
      fields: [
        {
          name: 'cards',
          dbName: 'pc_cards_3e69b8',
          label: 'Cards',
          type: 'array',
          fields: [
            {
              name: 'reference',
              label: 'Reference',
              type: 'text',
              admin: {
                hidden: true,
              },
            },
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
          ],
          admin: {
            initCollapsed: false,
          },
        },
        {
          name: 'enabled',
          label: 'Enabled',
          type: 'checkbox',
        },
      ],
    },
  ],
  settings: [
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
    },
  ],
}
