import type { Field } from 'payload'
import {artworkField} from '../gallery'

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
                    "type": "richText",
                    "localized": true
                  },
                  {
                    "name": "text4",
                    "label": false,
                    "type": "group",
                    "fields": [
                      {
                        "name": "values",
                        "label": "Introduction",
                        "type": "textarea",
                        "localized": true
                      }
                    ]
                  },
                  {
                    "name": "image",
                    "label": false,
                    "type": "group",
                    "fields": [
                      {
                        "name": "value",
                        "label": "Image",
                        "type": "upload",
                        "relationTo": "media"
                      }
                    ]
                  },
                  {
                    "name": "enabled",
                    "label": "Enabled",
                    "type": "checkbox"
                  },
                  {
                    "name": "text5",
                    "label": false,
                    "type": "group",
                    "fields": [
                      {
                        "name": "values",
                        "label": "Image alternative text",
                        "type": "text",
                        "localized": true
                      }
                    ]
                  }
                ]
              }
            ]
          },
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
            "label": "Product range",
            "fields": [
              {
                "name": "productRange",
                "type": "group",
                "label": false,
                "fields": [
                  {
                    "name": "heading",
                    "label": "Heading",
                    "type": "richText",
                    "localized": true
                  },
                  {
                    "name": "text",
                    "label": false,
                    "type": "group",
                    "fields": [
                      {
                        "name": "values",
                        "label": "Eyebrow",
                        "type": "text",
                        "localized": true
                      }
                    ]
                  },
                  {
                    "name": "text4",
                    "label": false,
                    "type": "group",
                    "fields": [
                      {
                        "name": "values",
                        "label": "Introduction",
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
                        "label": "No results message",
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
                        "label": "No results guidance",
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
                        "label": "Enquiry link label",
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
                        "label": "Specification guidance",
                        "type": "text",
                        "localized": true
                      }
                    ]
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
            "label": "Gallery intro",
            "fields": [
              {
                "name": "galleryIntro",
                "type": "group",
                "label": false,
                "fields": [
                  {
                    "name": "heading",
                    "label": "Heading",
                    "type": "richText",
                    "localized": true
                  },
                  {
                    "name": "text",
                    "label": false,
                    "type": "group",
                    "fields": [
                      {
                        "name": "values",
                        "label": "Eyebrow",
                        "type": "text",
                        "localized": true
                      }
                    ]
                  },
                  {
                    "name": "text5",
                    "label": false,
                    "type": "group",
                    "fields": [
                      {
                        "name": "values",
                        "label": "Introduction",
                        "type": "text",
                        "localized": true
                      }
                    ]
                  },
                  {
                    "name": "enabled",
                    "label": "Enabled",
                    "type": "checkbox"
                  }
                ]
              }
            ],
            "admin": {}
          },
          {
            "label": "Traceability",
            "fields": [
              {
                "name": "traceability",
                "type": "group",
                "label": false,
                "fields": [
                  {
                    "name": "heading",
                    "label": "Heading",
                    "type": "richText",
                    "localized": true
                  },
                  {
                    "name": "text",
                    "label": false,
                    "type": "group",
                    "fields": [
                      {
                        "name": "values",
                        "label": "Eyebrow",
                        "type": "text",
                        "localized": true
                      }
                    ]
                  },
                  {
                    "name": "text4",
                    "label": false,
                    "type": "group",
                    "fields": [
                      {
                        "name": "values",
                        "label": "Introduction",
                        "type": "textarea",
                        "localized": true
                      }
                    ]
                  },
                  {
                    "name": "enabled",
                    "label": "Enabled",
                    "type": "checkbox"
                  }
                ]
              }
            ],
            "admin": {}
          },
          {
            "label": "All products",
            "fields": [
              {
                "name": "allProducts",
                "type": "group",
                "label": false,
                "fields": [
                  {
                    "name": "heading",
                    "label": "Heading",
                    "type": "richText",
                    "localized": true
                  },
                  {
                    "name": "text",
                    "label": false,
                    "type": "group",
                    "fields": [
                      {
                        "name": "values",
                        "label": "Eyebrow",
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
                        "label": "No results message",
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
                        "label": "No results guidance",
                        "type": "text",
                        "localized": true
                      }
                    ]
                  },
                  {
                    "name": "enabled",
                    "label": "Enabled",
                    "type": "checkbox"
                  }
                ]
              }
            ],
            "admin": {}
          },
          {
            "label": "Card artwork",
            "fields": [
              artworkField
            ]
          }
        ]
      }
    ]
  }
]
