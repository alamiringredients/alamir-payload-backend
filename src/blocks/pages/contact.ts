import type { PageDefinition } from '../sectionTypes'

export const definition: PageDefinition = {
  key: 'contact-page',
  slug: 'contact',
  label: 'Contact',
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
              type: 'text',
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
      name: 'related',
      label: 'Contact details and enquiry form',
      fields: [
        {
          name: 'text',
          label: false,
          type: 'group',
          fields: [
            {
              name: 'values',
              label: 'Contact details',
              type: 'text',
              localized: true,
            },
          ],
        },
        {
          name: 'text7',
          label: false,
          type: 'group',
          fields: [
            {
              name: 'values',
              label: 'Enquiry form',
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
