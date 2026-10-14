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
            "label": "Privacy policy",
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
                        "label": "Controller description",
                        "type": "textarea",
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
                        "label": "Collection introduction",
                        "type": "text",
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
                        "label": "Contact data description",
                        "type": "text",
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
                        "label": "Enquiry data description",
                        "type": "text",
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
                        "label": "Application data description",
                        "type": "text",
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
                        "label": "Analytics data description",
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
                        "label": "Data use description",
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
                        "label": "Retention description",
                        "type": "textarea",
                        "localized": true
                      }
                    ]
                  },
                  {
                    "name": "text19",
                    "label": false,
                    "type": "group",
                    "fields": [
                      {
                        "name": "values",
                        "label": "Rights description",
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
                        "label": "Security description",
                        "type": "textarea",
                        "localized": true
                      }
                    ]
                  },
                  {
                    "name": "text21",
                    "label": false,
                    "type": "group",
                    "fields": [
                      {
                        "name": "values",
                        "label": "Cookies description",
                        "type": "textarea",
                        "localized": true
                      }
                    ]
                  },
                  {
                    "name": "text24",
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
