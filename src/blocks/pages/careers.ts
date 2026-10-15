import type { PageDefinition } from '../sectionTypes'

export const definition: PageDefinition = {
  key: 'careers-page',
  slug: 'careers',
  label: 'Careers',
  sections: [
    {
      name: 'hero',
      label: 'Hero',
      fields: [
        {
          name: 'alt',
          label: 'Alternative text',
          type: 'text',
          localized: true,
        },
        {
          name: 'image',
          label: 'Image',
          type: 'upload',
          relationTo: 'media',
        },
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
          name: 'description',
          label: 'Description',
          type: 'richText',
          localized: true,
        },
      ],
    },
    {
      name: 'jobs',
      label: 'Vacancies',
      fields: [
        {
          name: 'intro',
          label: 'Jobs intro',
          type: 'richText',
          localized: true,
        },
        {
          name: 'title',
          label: 'Jobs title',
          type: 'richText',
          localized: true,
        },
        {
          name: 'kicker',
          label: 'Jobs kicker',
          type: 'text',
          localized: true,
        },
      ],
    },
    {
      name: 'apply',
      label: 'Applications',
      fields: [
        {
          name: 'intro',
          label: 'Apply intro',
          type: 'richText',
          localized: true,
        },
        {
          name: 'title',
          label: 'Apply title',
          type: 'richText',
          localized: true,
        },
        {
          name: 'kicker',
          label: 'Apply kicker',
          type: 'text',
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
          name: 'empty',
          label: 'Empty',
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
