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
          }
        ]
      }
    ]
  }
]
