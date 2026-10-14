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
                    "name": "text6",
                    "label": false,
                    "type": "group",
                    "fields": [
                      {
                        "name": "values",
                        "label": "Link label",
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
                    "name": "videos",
                    "label": "Videos",
                    "type": "group",
                    "fields": [
                      {
                        "name": "item_1",
                        "label": "Video clip",
                        "type": "upload",
                        "relationTo": "media"
                      },
                      {
                        "name": "item_2",
                        "label": "Video clip",
                        "type": "upload",
                        "relationTo": "media"
                      },
                      {
                        "name": "item_3",
                        "label": "Video clip",
                        "type": "upload",
                        "relationTo": "media"
                      },
                      {
                        "name": "item_4",
                        "label": "Video clip",
                        "type": "upload",
                        "relationTo": "media"
                      },
                      {
                        "name": "item_5",
                        "label": "Video clip",
                        "type": "upload",
                        "relationTo": "media"
                      },
                      {
                        "name": "item_6",
                        "label": "Video clip",
                        "type": "upload",
                        "relationTo": "media"
                      },
                      {
                        "name": "item_7",
                        "label": "Video clip",
                        "type": "upload",
                        "relationTo": "media"
                      },
                      {
                        "name": "item_8",
                        "label": "Video clip",
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
            "label": "Our story",
            "fields": [
              {
                "name": "story",
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
                        "label": "Our story",
                        "type": "text",
                        "localized": true
                      }
                    ]
                  },
                  {
                    "name": "text7",
                    "label": false,
                    "type": "group",
                    "fields": [
                      {
                        "name": "values",
                        "label": "Alamir Ingredients manufacturing facility in Sadat City",
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
            "label": "Key figures",
            "fields": [
              {
                "name": "figures",
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
                        "label": "Al Amir Group — in figures",
                        "type": "text",
                        "localized": true
                      }
                    ]
                  },
                  {
                    "name": "text3",
                    "label": false,
                    "type": "group",
                    "fields": [
                      {
                        "name": "values",
                        "label": "Key figures",
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
                    "name": "figures",
                    "dbName": "pc_figures_e0dd7c",
                    "label": "Key figures",
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
                        "name": "unit",
                        "label": "Unit",
                        "type": "text"
                      },
                      {
                        "name": "label",
                        "label": "Label",
                        "type": "text",
                        "localized": true
                      },
                      {
                        "name": "value",
                        "label": "Content",
                        "type": "number"
                      },
                      {
                        "name": "unitLabel",
                        "label": "Unit label",
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
                  }
                ]
              }
            ]
          },
          {
            "label": "Products",
            "fields": [
              {
                "name": "products",
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
                        "label": "Our products",
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
            "label": "Certifications",
            "fields": [
              {
                "name": "certifications",
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
                        "label": "Quality & certifications",
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
            "label": "Sourcing",
            "fields": [
              {
                "name": "sourcing",
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
                        "label": "Close to the crop",
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
                        "label": "Egyptian agriculture",
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
                        "label": "Controlled sourcing",
                        "type": "text",
                        "localized": true
                      }
                    ]
                  },
                  {
                    "name": "text6",
                    "label": false,
                    "type": "group",
                    "fields": [
                      {
                        "name": "values",
                        "label": "An Egyptian grower standing among the tomato plants at sunris...",
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
            "label": "Process",
            "fields": [
              {
                "name": "process",
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
                        "label": "From crop to concentrate",
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
                    "name": "body2",
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
                    "name": "body3",
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
                    "name": "body4",
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
                    "name": "body5",
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
            "label": "Quality",
            "fields": [
              {
                "name": "quality",
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
                        "label": "Confidence at scale",
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
                        "label": "240 T",
                        "type": "text",
                        "localized": true
                      }
                    ]
                  },
                  {
                    "name": "text6",
                    "label": false,
                    "type": "group",
                    "fields": [
                      {
                        "name": "values",
                        "label": "Daily tropical fruit processing capacity.",
                        "type": "text",
                        "localized": true
                      }
                    ]
                  },
                  {
                    "name": "text7",
                    "label": false,
                    "type": "group",
                    "fields": [
                      {
                        "name": "values",
                        "label": "CFT",
                        "type": "text",
                        "localized": true
                      }
                    ]
                  },
                  {
                    "name": "text8",
                    "label": false,
                    "type": "group",
                    "fields": [
                      {
                        "name": "values",
                        "label": "Modern Italian processing architecture.",
                        "type": "text",
                        "localized": true
                      }
                    ]
                  },
                  {
                    "name": "text9",
                    "label": false,
                    "type": "group",
                    "fields": [
                      {
                        "name": "values",
                        "label": "Modern stainless steel food processing line",
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
            "label": "Global reach",
            "fields": [
              {
                "name": "reach",
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
                        "label": "Sadat City · Egypt",
                        "type": "text",
                        "localized": true
                      }
                    ]
                  },
                  {
                    "name": "text2",
                    "label": false,
                    "type": "group",
                    "fields": [
                      {
                        "name": "values",
                        "label": "Global presence",
                        "type": "text",
                        "localized": true
                      }
                    ]
                  },
                  {
                    "name": "text7",
                    "label": false,
                    "type": "group",
                    "fields": [
                      {
                        "name": "values",
                        "label": "Europe",
                        "type": "text",
                        "localized": true
                      }
                    ]
                  },
                  {
                    "name": "text8",
                    "label": false,
                    "type": "group",
                    "fields": [
                      {
                        "name": "values",
                        "label": "Ingredient and beverage manufacturers",
                        "type": "text",
                        "localized": true
                      }
                    ]
                  },
                  {
                    "name": "text9",
                    "label": false,
                    "type": "group",
                    "fields": [
                      {
                        "name": "values",
                        "label": "GCC",
                        "type": "text",
                        "localized": true
                      }
                    ]
                  },
                  {
                    "name": "text10",
                    "label": false,
                    "type": "group",
                    "fields": [
                      {
                        "name": "values",
                        "label": "Food processing and retail supply",
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
                        "label": "North Africa",
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
                        "label": "Regional manufacturing",
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
                        "label": "Far East",
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
                        "label": "Bulk ingredient supply",
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
            "label": "Contact and enquiry form",
            "fields": [
              {
                "name": "contact",
                "type": "group",
                "label": false,
                "fields": [
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
                    "name": "body2",
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
