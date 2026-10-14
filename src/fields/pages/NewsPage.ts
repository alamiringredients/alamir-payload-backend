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
            "label": "Copy",
            "fields": [
              {
                "name": "copy",
                "type": "group",
                "label": false,
                "fields": [
                  {
                    "name": "empty",
                    "label": "Empty",
                    "type": "text",
                    "localized": true
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
                    "name": "heroAlt",
                    "label": "Hero alt",
                    "type": "text",
                    "localized": true
                  },
                  {
                    "name": "seoTitle",
                    "label": "Seo title",
                    "type": "text",
                    "localized": true
                  },
                  {
                    "name": "description",
                    "label": "Description",
                    "type": "textarea",
                    "localized": true
                  },
                  {
                    "name": "eventsTitle",
                    "label": "Events title",
                    "type": "richText",
                    "localized": true
                  },
                  {
                    "name": "contactTitle",
                    "label": "Contact title",
                    "type": "richText",
                    "localized": true
                  },
                  {
                    "name": "eventsKicker",
                    "label": "Events kicker",
                    "type": "text",
                    "localized": true
                  },
                  {
                    "name": "relatedTitle",
                    "label": "Related title",
                    "type": "richText",
                    "localized": true
                  },
                  {
                    "name": "contactKicker",
                    "label": "Contact kicker",
                    "type": "text",
                    "localized": true
                  },
                  {
                    "name": "relatedKicker",
                    "label": "Related kicker",
                    "type": "text",
                    "localized": true
                  },
                  {
                    "name": "seoDescription",
                    "label": "Seo description",
                    "type": "text",
                    "localized": true
                  },
                  {
                    "name": "eventsDescription",
                    "label": "Events description",
                    "type": "textarea",
                    "localized": true
                  },
                  {
                    "name": "contactDescription",
                    "label": "Contact description",
                    "type": "text",
                    "localized": true
                  }
                ]
              }
            ]
          },
          {
            "label": "Hero image",
            "fields": [
              {
                "name": "heroImage",
                "label": "Hero image",
                "type": "upload",
                "relationTo": "media"
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
                    "name": "related",
                    "label": "Related",
                    "type": "checkbox"
                  },
                  {
                    "name": "contact",
                    "label": "Contact details",
                    "type": "checkbox"
                  },
                  {
                    "name": "events",
                    "label": "Events",
                    "type": "checkbox"
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
