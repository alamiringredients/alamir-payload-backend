import type { PageDefinition } from '../sectionTypes'

export const definition: PageDefinition = {
  key: 'cookies-page',
  slug: 'cookies',
  label: 'Cookies',
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
      label: 'Cookie policy',
      fields: [
        {
          name: 'text7',
          label: false,
          type: 'group',
          fields: [
            {
              name: 'values',
              label: 'Revision date',
              type: 'text',
              localized: true,
            },
          ],
        },
        {
          name: 'text8',
          label: false,
          type: 'group',
          fields: [
            {
              name: 'values',
              label: 'Cookie use description',
              type: 'textarea',
              localized: true,
            },
          ],
        },
        {
          name: 'text9',
          label: false,
          type: 'group',
          fields: [
            {
              name: 'values',
              label: 'Consent cookie description',
              type: 'text',
              localized: true,
            },
          ],
        },
        {
          name: 'text10',
          label: false,
          type: 'group',
          fields: [
            {
              name: 'values',
              label: 'Session cookie description',
              type: 'text',
              localized: true,
            },
          ],
        },
        {
          name: 'text11',
          label: false,
          type: 'group',
          fields: [
            {
              name: 'values',
              label: 'Essential cookie notice',
              type: 'text',
              localized: true,
            },
          ],
        },
        {
          name: 'text12',
          label: false,
          type: 'group',
          fields: [
            {
              name: 'values',
              label: 'Analytics description',
              type: 'textarea',
              localized: true,
            },
          ],
        },
        {
          name: 'text13',
          label: false,
          type: 'group',
          fields: [
            {
              name: 'values',
              label: 'Preferences description',
              type: 'textarea',
              localized: true,
            },
          ],
        },
        {
          name: 'text15',
          label: false,
          type: 'group',
          fields: [
            {
              name: 'values',
              label: 'Contact introduction',
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
          name: 'heading3',
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
          name: 'heading4',
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
          name: 'heading5',
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
