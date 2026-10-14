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
            "label": "Card artwork",
            "fields": [
              artworkField
            ]
          },
          {
            "label": "Product overview",
            "fields": [
              {
                "name": "overview",
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
                    "name": "items",
                    "dbName": "pc_items_e99d88",
                    "label": "Content",
                    "type": "array",
                    "fields": [
                      {
                        "name": "body",
                        "label": "Body",
                        "type": "richText",
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
            "label": "Product description",
            "fields": [
              {
                "name": "description",
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
                    "name": "items",
                    "dbName": "pc_items_f40049",
                    "label": "Content",
                    "type": "array",
                    "fields": [
                      {
                        "name": "body",
                        "label": "Body",
                        "type": "richText",
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
            ],
            "admin": {}
          },
          {
            "label": "Technical specification",
            "fields": [
              {
                "name": "specifications",
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
                    "name": "enabled",
                    "label": "Enabled",
                    "type": "checkbox"
                  },
                  {
                    "name": "pairs",
                    "dbName": "pc_pairs_d1d5bc",
                    "label": "Specifications",
                    "type": "array",
                    "fields": [
                      {
                        "name": "label",
                        "label": "Specification",
                        "type": "text",
                        "localized": true
                      },
                      {
                        "name": "value",
                        "label": "Content",
                        "type": "text",
                        "localized": true
                      }
                    ],
                    "admin": {
                      "initCollapsed": false
                    }
                  }
                ]
              }
            ]
          },
          {
            "label": "Packaging options",
            "fields": [
              {
                "name": "packaging",
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
                    "name": "items",
                    "dbName": "pc_items_3fb687",
                    "label": "Content",
                    "type": "array",
                    "fields": [
                      {
                        "name": "body",
                        "label": "Body",
                        "type": "richText",
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
            "label": "Storage, shelf life and origin",
            "fields": [
              {
                "name": "storage",
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
                    "name": "items",
                    "dbName": "pc_items_86b9fd",
                    "label": "Content",
                    "type": "array",
                    "fields": [
                      {
                        "name": "body",
                        "label": "Body",
                        "type": "richText",
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
            "label": "Documentation and samples",
            "fields": [
              {
                "name": "documents",
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
                    "name": "items",
                    "dbName": "pc_items_fdff31",
                    "label": "Content",
                    "type": "array",
                    "fields": [
                      {
                        "name": "body",
                        "label": "Body",
                        "type": "richText",
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
            "label": "Specification intro",
            "fields": [
              {
                "name": "specificationIntro",
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
                    "name": "enabled",
                    "label": "Enabled",
                    "type": "checkbox"
                  }
                ]
              }
            ]
          },
          {
            "label": "Related products",
            "fields": [
              {
                "name": "relatedProducts",
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
                    "name": "enabled",
                    "label": "Enabled",
                    "type": "checkbox"
                  }
                ]
              }
            ]
          },
          {
            "label": "Enquiry",
            "fields": [
              {
                "name": "enquiry",
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
            ]
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
            ]
          }
        ]
      }
    ]
  }
]
