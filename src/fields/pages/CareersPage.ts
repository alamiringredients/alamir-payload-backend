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
                    "name": "alt",
                    "label": "Alternative text",
                    "type": "text",
                    "localized": true
                  },
                  {
                    "name": "image",
                    "label": "Image",
                    "type": "upload",
                    "relationTo": "media"
                  },
                  {
                    "name": "title",
                    "label": "Title",
                    "type": "richText",
                    "localized": true
                  },
                  {
                    "name": "kicker",
                    "label": "Kicker",
                    "type": "text",
                    "localized": true
                  },
                  {
                    "name": "description",
                    "label": "Description",
                    "type": "richText",
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
                    "name": "empty",
                    "label": "Empty",
                    "type": "text",
                    "localized": true
                  }
                ]
              }
            ]
          },
          {
            "label": "News",
            "fields": [
              {
                "name": "news",
                "type": "group",
                "label": false,
                "fields": [
                  {
                    "name": "articles",
                    "label": "News articles",
                    "type": "relationship",
                    "relationTo": "news",
                    "hasMany": true,
                    "admin": {
                      "isSortable": true
                    }
                  },
                  {
                    "name": "image",
                    "label": "News image",
                    "type": "upload",
                    "relationTo": "media"
                  },
                  {
                    "name": "intro",
                    "label": "News intro",
                    "type": "richText",
                    "localized": true
                  },
                  {
                    "name": "title",
                    "label": "News title",
                    "type": "richText",
                    "localized": true
                  },
                  {
                    "name": "kicker",
                    "label": "News kicker",
                    "type": "text",
                    "localized": true
                  },
                  {
                    "name": "imageAlt",
                    "label": "News image alt",
                    "type": "text",
                    "localized": true
                  }
                ]
              }
            ]
          },
          {
            "label": "Vacancies",
            "fields": [
              {
                "name": "jobs",
                "type": "group",
                "label": false,
                "fields": [
                  {
                    "name": "intro",
                    "label": "Jobs intro",
                    "type": "richText",
                    "localized": true
                  },
                  {
                    "name": "title",
                    "label": "Jobs title",
                    "type": "richText",
                    "localized": true
                  },
                  {
                    "name": "kicker",
                    "label": "Jobs kicker",
                    "type": "text",
                    "localized": true
                  }
                ]
              }
            ]
          },
          {
            "label": "Applications",
            "fields": [
              {
                "name": "apply",
                "type": "group",
                "label": false,
                "fields": [
                  {
                    "name": "intro",
                    "label": "Apply intro",
                    "type": "richText",
                    "localized": true
                  },
                  {
                    "name": "title",
                    "label": "Apply title",
                    "type": "richText",
                    "localized": true
                  },
                  {
                    "name": "kicker",
                    "label": "Apply kicker",
                    "type": "text",
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
                    "name": "news",
                    "label": "News",
                    "type": "checkbox"
                  },
                  {
                    "name": "jobs",
                    "label": "Jobs",
                    "type": "checkbox"
                  },
                  {
                    "name": "apply",
                    "label": "Apply",
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
