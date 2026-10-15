import type { PageDefinition } from '../sectionTypes'

export const definition: PageDefinition = {
  key: 'quality-page',
  slug: 'quality',
  label: 'Quality',
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
      name: 'credentials',
      label: 'Certifications',
      fields: [
        {
          name: 'ctaHref',
          label: 'Button link',
          type: 'text',
          localized: true,
        },
        {
          name: 'eyebrow',
          label: 'Eyebrow',
          type: 'text',
          localized: true,
        },
        {
          name: 'ctaLabel',
          label: 'Button label',
          type: 'text',
          localized: true,
        },
        {
          name: 'heading',
          label: 'Heading',
          type: 'richText',
          localized: true,
        },
        {
          name: 'body',
          label: 'Body',
          type: 'richText',
          localized: true,
        },
        {
          name: 'certificationPanel',
          label: 'Certification panel',
          type: 'group',
          fields: [
            {
              name: 'holder',
              label: 'Holder',
              type: 'text',
              localized: true,
            },
          ],
        },
        {
          name: 'body2',
          label: 'Body',
          type: 'richText',
          localized: true,
        },
      ],
    },
    {
      name: 'roadmap',
      label: 'Quality roadmap',
      fields: [
        {
          name: 'ctaHref',
          label: 'Button link',
          type: 'text',
          localized: true,
        },
        {
          name: 'eyebrow',
          label: 'Eyebrow',
          type: 'text',
          localized: true,
        },
        {
          name: 'ctaLabel',
          label: 'Button label',
          type: 'text',
          localized: true,
        },
        {
          name: 'heading',
          label: 'Heading',
          type: 'richText',
          localized: true,
        },
        {
          name: 'body',
          label: 'Body',
          type: 'richText',
          localized: true,
        },
        {
          name: 'certificationPanel',
          label: 'Certification panel',
          type: 'group',
          fields: [
            {
              name: 'holder',
              label: 'Holder',
              type: 'text',
              localized: true,
            },
          ],
        },
      ],
    },
    {
      name: 'technology',
      label: 'Technology',
      fields: [
        {
          name: 'ctaHref',
          label: 'Button link',
          type: 'text',
          localized: true,
        },
        {
          name: 'eyebrow',
          label: 'Eyebrow',
          type: 'text',
          localized: true,
        },
        {
          name: 'ctaLabel',
          label: 'Button label',
          type: 'text',
          localized: true,
        },
        {
          name: 'body',
          label: 'Body',
          type: 'richText',
          localized: true,
        },
        {
          name: 'technologies',
          label: 'Technologies',
          type: 'group',
          fields: [
            {
              name: 'items',
              dbName: 'pc_items_ad4859',
              label: 'Content',
              type: 'array',
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
                  localized: true,
                  relationTo: 'media',
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
                  type: 'textarea',
                  localized: true,
                },
              ],
              admin: {
                initCollapsed: false,
              },
            },
          ],
        },
      ],
    },
    {
      name: 'sourcing',
      label: 'Sourcing',
      fields: [
        {
          name: 'ctaHref',
          label: 'Button link',
          type: 'text',
          localized: true,
        },
        {
          name: 'eyebrow',
          label: 'Eyebrow',
          type: 'text',
          localized: true,
        },
        {
          name: 'ctaLabel',
          label: 'Button label',
          type: 'text',
          localized: true,
        },
        {
          name: 'body',
          label: 'Body',
          type: 'richText',
          localized: true,
        },
        {
          name: 'video',
          label: 'Video',
          type: 'group',
          fields: [
            {
              name: 'src',
              label: 'File',
              type: 'text',
              localized: true,
            },
            {
              name: 'label',
              label: 'Label',
              type: 'text',
              localized: true,
            },
            {
              name: 'poster',
              label: 'Poster',
              type: 'upload',
              localized: true,
              relationTo: 'media',
            },
            {
              name: 'caption',
              label: 'Caption',
              type: 'text',
              localized: true,
            },
          ],
        },
        {
          name: 'pillars',
          label: 'Sourcing principles',
          type: 'group',
          fields: [
            {
              name: 'items',
              label: 'Content',
              type: 'group',
              fields: [
                {
                  name: 'item_1',
                  label: 'Sourcing principle',
                  type: 'text',
                  localized: true,
                },
                {
                  name: 'item_2',
                  label: 'Sourcing principle',
                  type: 'text',
                  localized: true,
                },
                {
                  name: 'item_3',
                  label: 'Sourcing principle',
                  type: 'text',
                  localized: true,
                },
                {
                  name: 'item_4',
                  label: 'Sourcing principle',
                  type: 'text',
                  localized: true,
                },
              ],
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
