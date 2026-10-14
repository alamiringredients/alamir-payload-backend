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
                    "name": "text",
                    "label": false,
                    "type": "group",
                    "fields": [
                      {
                        "name": "values",
                        "label": "Breadcrumb label",
                        "type": "text",
                        "localized": true
                      }
                    ]
                  },
                  {
                    "name": "enabled",
                    "label": "Enabled",
                    "type": "checkbox"
                  },
                  {
                    "name": "heading",
                    "label": "Heading",
                    "type": "group",
                    "fields": [
                      {
                        "name": "values",
                        "label": "Content",
                        "type": "richText",
                        "localized": true
                      }
                    ]
                  },
                  {
                    "name": "body",
                    "label": "Body",
                    "type": "group",
                    "fields": [
                      {
                        "name": "values",
                        "label": "Content",
                        "type": "richText",
                        "localized": true
                      }
                    ]
                  }
                ]
              }
            ]
          },
          {
            "label": "Terms and conditions",
            "fields": [
              {
                "name": "related",
                "type": "group",
                "label": false,
                "fields": [
                  {
                    "name": "text10",
                    "label": false,
                    "type": "group",
                    "fields": [
                      {
                        "name": "values",
                        "label": "Revision date",
                        "type": "text",
                        "localized": true
                      }
                    ]
                  },
                  {
                    "name": "text11",
                    "label": false,
                    "type": "group",
                    "fields": [
                      {
                        "name": "values",
                        "label": "Acceptance description",
                        "type": "text",
                        "localized": true
                      }
                    ]
                  },
                  {
                    "name": "text12",
                    "label": false,
                    "type": "group",
                    "fields": [
                      {
                        "name": "values",
                        "label": "Product information description",
                        "type": "textarea",
                        "localized": true
                      }
                    ]
                  },
                  {
                    "name": "text13",
                    "label": false,
                    "type": "group",
                    "fields": [
                      {
                        "name": "values",
                        "label": "Certification information description",
                        "type": "textarea",
                        "localized": true
                      }
                    ]
                  },
                  {
                    "name": "text14",
                    "label": false,
                    "type": "group",
                    "fields": [
                      {
                        "name": "values",
                        "label": "Ownership description",
                        "type": "textarea",
                        "localized": true
                      }
                    ]
                  },
                  {
                    "name": "text15",
                    "label": false,
                    "type": "group",
                    "fields": [
                      {
                        "name": "values",
                        "label": "Downloads description",
                        "type": "textarea",
                        "localized": true
                      }
                    ]
                  },
                  {
                    "name": "text16",
                    "label": false,
                    "type": "group",
                    "fields": [
                      {
                        "name": "values",
                        "label": "External links description",
                        "type": "textarea",
                        "localized": true
                      }
                    ]
                  },
                  {
                    "name": "text17",
                    "label": false,
                    "type": "group",
                    "fields": [
                      {
                        "name": "values",
                        "label": "Liability description",
                        "type": "textarea",
                        "localized": true
                      }
                    ]
                  },
                  {
                    "name": "text18",
                    "label": false,
                    "type": "group",
                    "fields": [
                      {
                        "name": "values",
                        "label": "Jurisdiction description",
                        "type": "textarea",
                        "localized": true
                      }
                    ]
                  },
                  {
                    "name": "text20",
                    "label": false,
                    "type": "group",
                    "fields": [
                      {
                        "name": "values",
                        "label": "Contact introduction",
                        "type": "text",
                        "localized": true
                      }
                    ]
                  },
                  {
                    "name": "enabled",
                    "label": "Enabled",
                    "type": "checkbox"
                  },
                  {
                    "name": "heading",
                    "label": "Heading",
                    "type": "group",
                    "fields": [
                      {
                        "name": "values",
                        "label": "Content",
                        "type": "richText",
                        "localized": true
                      }
                    ]
                  },
                  {
                    "name": "heading2",
                    "label": "Heading",
                    "type": "group",
                    "fields": [
                      {
                        "name": "values",
                        "label": "Content",
                        "type": "richText",
                        "localized": true
                      }
                    ]
                  },
                  {
                    "name": "heading3",
                    "label": "Heading",
                    "type": "group",
                    "fields": [
                      {
                        "name": "values",
                        "label": "Content",
                        "type": "richText",
                        "localized": true
                      }
                    ]
                  },
                  {
                    "name": "heading4",
                    "label": "Heading",
                    "type": "group",
                    "fields": [
                      {
                        "name": "values",
                        "label": "Content",
                        "type": "richText",
                        "localized": true
                      }
                    ]
                  },
                  {
                    "name": "heading5",
                    "label": "Heading",
                    "type": "group",
                    "fields": [
                      {
                        "name": "values",
                        "label": "Content",
                        "type": "richText",
                        "localized": true
                      }
                    ]
                  },
                  {
                    "name": "heading6",
                    "label": "Heading",
                    "type": "group",
                    "fields": [
                      {
                        "name": "values",
                        "label": "Content",
                        "type": "richText",
                        "localized": true
                      }
                    ]
                  },
                  {
                    "name": "heading7",
                    "label": "Heading",
                    "type": "group",
                    "fields": [
                      {
                        "name": "values",
                        "label": "Content",
                        "type": "richText",
                        "localized": true
                      }
                    ]
                  },
                  {
                    "name": "heading8",
                    "label": "Heading",
                    "type": "group",
                    "fields": [
                      {
                        "name": "values",
                        "label": "Content",
                        "type": "richText",
                        "localized": true
                      }
                    ]
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
