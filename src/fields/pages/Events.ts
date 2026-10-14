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
            "label": "Page content",
            "fields": [
              {
                "name": "body",
                "type": "group",
                "label": false,
                "fields": [
                  {
                    "name": "body",
                    "label": "Body",
                    "type": "richText",
                    "localized": true
                  },
                  {
                    "name": "image",
                    "label": false,
                    "type": "group",
                    "fields": [
                      {
                        "name": "alt",
                        "label": "Alternative text",
                        "type": "text",
                        "localized": true
                      },
                      {
                        "name": "src",
                        "label": "Image",
                        "type": "upload",
                        "localized": true,
                        "relationTo": "media"
                      },
                      {
                        "name": "caption",
                        "label": "Caption",
                        "type": "text",
                        "localized": true
                      },
                      {
                        "name": "captionLabel",
                        "label": "Caption label",
                        "type": "text",
                        "localized": true
                      }
                    ]
                  },
                  {
                    "name": "gallery",
                    "label": "Gallery",
                    "type": "group",
                    "fields": [
                      {
                        "name": "images",
                        "dbName": "pc_images_64d514",
                        "label": "Images",
                        "type": "array",
                        "fields": [
                          {
                            "name": "alt",
                            "label": "Alternative text",
                            "type": "text",
                            "localized": true
                          },
                          {
                            "name": "src",
                            "label": "File",
                            "type": "upload",
                            "localized": true,
                            "relationTo": "media"
                          }
                        ],
                        "admin": {
                          "initCollapsed": false
                        }
                      },
                      {
                        "name": "caption",
                        "label": "Caption",
                        "type": "text",
                        "localized": true
                      }
                    ]
                  }
                ]
              }
            ],
            "admin": {}
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
