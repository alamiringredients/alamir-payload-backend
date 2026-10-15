import type { PageDefinition } from '../sectionTypes'

export const definition: PageDefinition = {
  key: 'products-page',
  slug: 'products',
  label: 'Products',
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
      name: 'collection',
      label: 'Product catalogue',
      fields: [
        {
          name: 'text',
          label: false,
          type: 'group',
          fields: [
            {
              name: 'values',
              label: 'Our products',
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
              label: 'No product matches those filters.',
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
              label: 'Clear a filter, or',
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
              label: 'tell the export team what you need',
              type: 'text',
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
              label: 'Collection description',
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
      ],
    },
    {
      name: 'deep',
      label: 'Certifications and documentation',
      fields: [
        {
          name: 'text',
          label: false,
          type: 'group',
          fields: [
            {
              name: 'values',
              label: 'Certification verification',
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
