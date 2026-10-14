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
                  },
                  {
                    "name": "icons",
                    "label": "Goal icons",
                    "type": "upload",
                    "relationTo": "media",
                    "hasMany": true
                  }
                ]
              }
            ]
          },
          {
            "label": "Articles",
            "fields": [
              {
                "name": "content",
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
                        "label": "Articles",
                        "type": "text",
                        "localized": true
                      }
                    ]
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
                  }
                ]
              }
            ]
          },
          {
            "label": "Contact",
            "fields": [
              {
                "name": "related",
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
                        "label": "Ask us anything on this page",
                        "type": "text",
                        "localized": true
                      }
                    ]
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
            "label": "Related title",
            "fields": [
              {
                "name": "relatedTitle",
                "label": "Related title",
                "type": "richText",
                "localized": true
              }
            ]
          },
          {
            "label": "Related kicker",
            "fields": [
              {
                "name": "relatedKicker",
                "label": "Related kicker",
                "type": "text",
                "localized": true
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
                    "name": "related",
                    "label": "Related",
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
                    "type": "textarea",
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
