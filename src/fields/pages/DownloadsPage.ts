import type { Field } from 'payload'

export const pageFields: Field[] = [
  {
    "name": "page",
    "type": "group",
    "label": false,
    "fields": [
      {
        "type": "tabs",
        "tabs": [
          {
            "label": "Hero",
            "fields": [
              {
                "name": "hero",
                "type": "group",
                "label": false,
                "fields": [
                  {
                    "name": "image",
                    "label": "Hero image",
                    "type": "upload",
                    "relationTo": "media"
                  },
                  {
                    "name": "eyebrow",
                    "label": "Hero eyebrow",
                    "type": "text",
                    "localized": true
                  },
                  {
                    "name": "heading",
                    "label": "Hero heading",
                    "type": "richText",
                    "localized": true
                  },
                  {
                    "name": "imageAlt",
                    "label": "Hero image alt",
                    "type": "text",
                    "localized": true
                  },
                  {
                    "name": "description",
                    "label": "Hero description",
                    "type": "text",
                    "localized": true
                  }
                ]
              }
            ]
          },
          {
            "label": "Empty states",
            "fields": [
              {
                "name": "emptyStates",
                "type": "group",
                "label": false,
                "fields": [
                  {
                    "name": "noTds",
                    "label": "No tds",
                    "type": "text",
                    "localized": true
                  },
                  {
                    "name": "noCompany",
                    "label": "No company",
                    "type": "text",
                    "localized": true
                  }
                ]
              }
            ]
          },
          {
            "label": "Company downloads",
            "fields": [
              {
                "name": "company",
                "type": "group",
                "label": false,
                "fields": [
                  {
                    "name": "profileLabel",
                    "label": "Profile label",
                    "type": "text",
                    "localized": true
                  },
                  {
                    "name": "eyebrow",
                    "label": "Company eyebrow",
                    "type": "text",
                    "localized": true
                  },
                  {
                    "name": "heading",
                    "label": "Company heading",
                    "type": "richText",
                    "localized": true
                  }
                ]
              }
            ]
          },
          {
            "label": "Product downloads",
            "fields": [
              {
                "name": "product",
                "type": "group",
                "label": false,
                "fields": [
                  {
                    "name": "eyebrow",
                    "label": "Product eyebrow",
                    "type": "text",
                    "localized": true
                  },
                  {
                    "name": "heading",
                    "label": "Product heading",
                    "type": "richText",
                    "localized": true
                  }
                ]
              }
            ]
          },
          {
            "label": "Visibility",
            "fields": [
              {
                "name": "sectionVisibility",
                "type": "group",
                "label": false,
                "fields": [
                  {
                    "name": "hero",
                    "label": "Hero",
                    "type": "checkbox"
                  },
                  {
                    "name": "company",
                    "label": "Company",
                    "type": "checkbox"
                  },
                  {
                    "name": "products",
                    "label": "Products",
                    "type": "checkbox"
                  }
                ]
              }
            ]
          },
          {
            "label": "SEO",
            "fields": [
              {
                "name": "seo",
                "type": "group",
                "label": false,
                "fields": [
                  {
                    "name": "title",
                    "label": "Title",
                    "type": "text",
                    "localized": true
                  },
                  {
                    "name": "description",
                    "label": "Description",
                    "type": "text",
                    "localized": true
                  },
                  {
                    "name": "socialImage",
                    "label": "Social image",
                    "type": "upload",
                    "relationTo": "media"
                  },
                  {
                    "name": "socialTitle",
                    "label": "Social title",
                    "type": "text",
                    "localized": true
                  },
                  {
                    "name": "socialDescription",
                    "label": "Social description",
                    "type": "text",
                    "localized": true
                  }
                ]
              }
            ]
          }
        ]
      }
    ]
  }
]
