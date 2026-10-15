import type { PageDefinition } from '../sectionTypes'

export const definition: PageDefinition = {
  key: 'booking-page',
  slug: 'book-a-meeting',
  label: 'Book a meeting',
  sections: [
    {
      name: 'hero',
      label: 'Hero',
      fields: [
        {
          name: 'text',
          label: false,
          type: 'group',
          fields: [
            {
              name: 'values',
              label: 'Breadcrumb label',
              type: 'textarea',
              localized: true,
            },
          ],
        },
        {
          name: 'text2',
          label: false,
          type: 'group',
          fields: [
            {
              name: 'values',
              label: 'Heading introduction',
              type: 'text',
              localized: true,
            },
          ],
        },
        {
          name: 'image',
          label: false,
          type: 'group',
          fields: [
            {
              name: 'value',
              label: 'Image',
              type: 'upload',
              relationTo: 'media',
            },
          ],
        },
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
      name: 'bk_band',
      label: 'Meeting booking and confirmation',
      fields: [
        {
          name: 'text',
          label: false,
          type: 'group',
          fields: [
            {
              name: 'values',
              label: 'Alamir Ingredients',
              type: 'text',
              localized: true,
            },
          ],
        },
        {
          name: 'text3',
          label: false,
          type: 'group',
          fields: [
            {
              name: 'values',
              label: '30 minutes',
              type: 'text',
              localized: true,
            },
          ],
        },
        {
          name: 'text4',
          label: false,
          type: 'group',
          fields: [
            {
              name: 'values',
              label: 'Video call — or on our stand at the show',
              type: 'text',
              localized: true,
            },
          ],
        },
        {
          name: 'text17',
          label: false,
          type: 'group',
          fields: [
            {
              name: 'values',
              label: 'Days with slots left. Weekends and public holidays are closed.',
              type: 'text',
              localized: true,
            },
          ],
        },
        {
          name: 'text29',
          label: false,
          type: 'group',
          fields: [
            {
              name: 'values',
              label: 'Meet the export team — 30 minutes',
              type: 'text',
              localized: true,
            },
          ],
        },
        {
          name: 'text32',
          label: false,
          type: 'group',
          fields: [
            {
              name: 'values',
              label: 'Video call — link in the invite',
              type: 'text',
              localized: true,
            },
          ],
        },
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
        {
          name: 'body2',
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
          name: 'body3',
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
          name: 'body4',
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
          name: 'body5',
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
          name: 'body6',
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
          name: 'body7',
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
          name: 'heading2',
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
          name: 'body8',
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
