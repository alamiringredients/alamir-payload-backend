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
            "label": "Sort order",
            "fields": [
              {
                "name": "sort_order",
                "label": "Sort order",
                "type": "number"
              }
            ]
          },
          {
            "label": "Metadata",
            "fields": [
              {
                "name": "metadata",
                "type": "group",
                "label": false,
                "fields": [
                  {
                    "name": "localeTree",
                    "label": "Locale tree",
                    "type": "group",
                    "fields": [
                      {
                        "name": "description",
                        "label": "Description",
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
  }
]
