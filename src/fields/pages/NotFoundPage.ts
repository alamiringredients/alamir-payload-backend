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
            "label": "Page recovery links",
            "fields": [
              {
                "name": "related",
                "type": "group",
                "label": false,
                "fields": [
                  {
                    "name": "cards",
                    "dbName": "pc_cards_3e69b8",
                    "label": "Cards",
                    "type": "array",
                    "fields": [
                      {
                        "name": "reference",
                        "label": "Reference",
                        "type": "text",
                        "admin": {
                          "hidden": true
                        }
                      },
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
                      }
                    ],
                    "admin": {
                      "initCollapsed": false
                    }
                  },
                  {
                    "name": "enabled",
                    "label": "Enabled",
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
