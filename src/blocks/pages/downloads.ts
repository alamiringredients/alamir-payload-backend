import type { PageDefinition } from '../sectionTypes'

export const definition: PageDefinition = {
  key: 'downloads-page',
  slug: 'downloads',
  label: 'Downloads',
  sections: [
    {
      name: 'hero',
      label: 'Hero',
      fields: [
        {
          name: 'image',
          label: 'Hero image',
          type: 'upload',
          relationTo: 'media',
        },
        {
          name: 'eyebrow',
          label: 'Hero eyebrow',
          type: 'text',
          localized: true,
        },
        {
          name: 'heading',
          label: 'Hero heading',
          type: 'richText',
          localized: true,
        },
        {
          name: 'imageAlt',
          label: 'Hero image alt',
          type: 'text',
          localized: true,
        },
        {
          name: 'description',
          label: 'Hero description',
          type: 'text',
          localized: true,
        },
      ],
    },
    {
      name: 'product',
      label: 'Product downloads',
      fields: [
        {
          name: 'eyebrow',
          label: 'Product eyebrow',
          type: 'text',
          localized: true,
        },
        {
          name: 'heading',
          label: 'Product heading',
          type: 'richText',
          localized: true,
        },
      ],
    },
    {
      name: 'company',
      label: 'Company downloads',
      fields: [
        {
          name: 'profileLabel',
          label: 'Profile label',
          type: 'text',
          localized: true,
        },
        {
          name: 'eyebrow',
          label: 'Company eyebrow',
          type: 'text',
          localized: true,
        },
        {
          name: 'heading',
          label: 'Company heading',
          type: 'richText',
          localized: true,
        },
      ],
    },
  ],
  settings: [
    {
      name: 'emptyStates',
      type: 'group',
      label: false,
      fields: [
        {
          name: 'noTds',
          label: 'No tds',
          type: 'text',
          localized: true,
        },
        {
          name: 'noCompany',
          label: 'No company',
          type: 'text',
          localized: true,
        },
      ],
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
