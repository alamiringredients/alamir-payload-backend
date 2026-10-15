import type { Field } from 'payload'
import type { RecordDefinition } from '../sectionTypes'
import { artworkField, galleryField } from '../../fields/gallery'

export const definition: RecordDefinition = {
  collection: 'categories',
  sections: [
    {
      name: 'hero',
      slug: 'cat-hero',
      label: 'Hero',
      pageFields: [
        {
          name: 'hero',
          type: 'group',
          label: false,
          fields: [
            {
              name: 'text4',
              label: false,
              type: 'group',
              fields: [
                {
                  name: 'values',
                  label: 'Introduction',
                  type: 'textarea',
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
              name: 'text5',
              label: false,
              type: 'group',
              fields: [
                {
                  name: 'values',
                  label: 'Image alternative text',
                  type: 'text',
                  localized: true,
                },
              ],
            },
          ],
          admin: {},
        },
      ],
      contentFields: [],
    },
    {
      name: 'range',
      slug: 'cat-range',
      label: 'Product range',
      pageFields: [
        {
          name: 'productRange',
          type: 'group',
          label: false,
          fields: [
            {
              name: 'heading',
              label: 'Heading',
              type: 'richText',
              localized: true,
            },
            {
              name: 'text',
              label: false,
              type: 'group',
              fields: [
                {
                  name: 'values',
                  label: 'Eyebrow',
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
                  label: 'Introduction',
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
                  label: 'No results message',
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
                  label: 'No results guidance',
                  type: 'text',
                  localized: true,
                },
              ],
            },
            {
              name: 'text14',
              label: false,
              type: 'group',
              fields: [
                {
                  name: 'values',
                  label: 'Enquiry link label',
                  type: 'text',
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
                  label: 'Specification guidance',
                  type: 'text',
                  localized: true,
                },
              ],
            },
          ],
          admin: {},
        },
      ],
      contentFields: [],
    },
    {
      name: 'gallery',
      slug: 'cat-gallery',
      label: 'Gallery',
      pageFields: [
        {
          name: 'galleryIntro',
          type: 'group',
          label: false,
          fields: [
            {
              name: 'heading',
              label: 'Heading',
              type: 'richText',
              localized: true,
            },
            {
              name: 'text',
              label: false,
              type: 'group',
              fields: [
                {
                  name: 'values',
                  label: 'Eyebrow',
                  type: 'text',
                  localized: true,
                },
              ],
            },
            {
              name: 'text5',
              label: false,
              type: 'group',
              fields: [
                {
                  name: 'values',
                  label: 'Introduction',
                  type: 'text',
                  localized: true,
                },
              ],
            },
          ],
          admin: {},
        },
      ],
      contentFields: [galleryField('gallery', 'Images')],
    },
    {
      name: 'traceability',
      slug: 'cat-cta',
      label: 'Traceability and enquiry',
      pageFields: [
        {
          name: 'traceability',
          type: 'group',
          label: false,
          fields: [
            {
              name: 'heading',
              label: 'Heading',
              type: 'richText',
              localized: true,
            },
            {
              name: 'text',
              label: false,
              type: 'group',
              fields: [
                {
                  name: 'values',
                  label: 'Eyebrow',
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
                  label: 'Introduction',
                  type: 'textarea',
                  localized: true,
                },
              ],
            },
          ],
          admin: {},
        },
        {
          name: 'allProducts',
          type: 'group',
          label: false,
          fields: [
            {
              name: 'heading',
              label: 'Heading',
              type: 'richText',
              localized: true,
            },
            {
              name: 'text',
              label: false,
              type: 'group',
              fields: [
                {
                  name: 'values',
                  label: 'Eyebrow',
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
                  label: 'No results message',
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
                  label: 'No results guidance',
                  type: 'text',
                  localized: true,
                },
              ],
            },
          ],
          admin: {},
        },
      ],
      contentFields: [],
    },
  ],
  settings: [
    {
      name: 'sort_order',
      label: 'Sort order',
      type: 'number',
      admin: {},
    },
    { ...artworkField, admin: {} } as Field,
  ],
}
