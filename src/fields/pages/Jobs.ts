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
            "label": "Code",
            "fields": [
              {
                "name": "code",
                "label": "Code",
                "type": "text"
              }
            ]
          }
        ]
      }
    ]
  }
]
