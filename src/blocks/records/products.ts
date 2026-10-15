import type { Field } from 'payload'
import type { RecordDefinition } from '../sectionTypes'
import { artworkField, galleryField } from '../../fields/gallery'

export const definition: RecordDefinition = {
  collection: 'products',
  sections: [
    {
      name: 'hero',
      slug: 'prd-hero',
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
          ],
          admin: {},
        },
      ],
      contentFields: [],
    },
    {
      name: 'overview',
      slug: 'prd-info',
      label: 'Product overview and specifications',
      pageFields: [
        {
          name: 'overview',
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
              name: 'items',
              dbName: 'pc_items_e99d88',
              label: 'Content',
              type: 'array',
              fields: [
                {
                  name: 'body',
                  label: 'Body',
                  type: 'richText',
                  localized: true,
                },
              ],
              admin: {
                initCollapsed: false,
              },
            },
          ],
          admin: {},
        },
        {
          name: 'description',
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
              name: 'items',
              dbName: 'pc_items_f40049',
              label: 'Content',
              type: 'array',
              fields: [
                {
                  name: 'body',
                  label: 'Body',
                  type: 'richText',
                  localized: true,
                },
              ],
              admin: {
                initCollapsed: false,
              },
            },
          ],
          admin: {},
        },
        {
          name: 'specifications',
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
              name: 'pairs',
              dbName: 'pc_pairs_d1d5bc',
              label: 'Specifications',
              type: 'array',
              fields: [
                {
                  name: 'label',
                  label: 'Specification',
                  type: 'text',
                  localized: true,
                },
                {
                  name: 'value',
                  label: 'Content',
                  type: 'text',
                  localized: true,
                },
              ],
              admin: {
                initCollapsed: false,
              },
            },
          ],
          admin: {},
        },
        {
          name: 'packaging',
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
              name: 'items',
              dbName: 'pc_items_3fb687',
              label: 'Content',
              type: 'array',
              fields: [
                {
                  name: 'body',
                  label: 'Body',
                  type: 'richText',
                  localized: true,
                },
              ],
              admin: {
                initCollapsed: false,
              },
            },
          ],
          admin: {},
        },
        {
          name: 'storage',
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
              name: 'items',
              dbName: 'pc_items_86b9fd',
              label: 'Content',
              type: 'array',
              fields: [
                {
                  name: 'body',
                  label: 'Body',
                  type: 'richText',
                  localized: true,
                },
              ],
              admin: {
                initCollapsed: false,
              },
            },
          ],
          admin: {},
        },
        {
          name: 'documents',
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
              name: 'items',
              dbName: 'pc_items_fdff31',
              label: 'Content',
              type: 'array',
              fields: [
                {
                  name: 'body',
                  label: 'Body',
                  type: 'richText',
                  localized: true,
                },
              ],
              admin: {
                initCollapsed: false,
              },
            },
          ],
          admin: {},
        },
        {
          name: 'specificationIntro',
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
          ],
          admin: {},
        },
      ],
      contentFields: [],
    },
    {
      name: 'gallery',
      slug: 'prd-gallery',
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
          ],
          admin: {},
        },
      ],
      contentFields: [galleryField('gallery', 'Images')],
    },
    {
      name: 'related',
      slug: 'prd-related',
      label: 'Related products',
      pageFields: [
        {
          name: 'relatedProducts',
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
          ],
          admin: {},
        },
      ],
      contentFields: [],
    },
    {
      name: 'enquiry',
      slug: 'prd-enquiry',
      label: 'Enquiry',
      pageFields: [
        {
          name: 'enquiry',
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
