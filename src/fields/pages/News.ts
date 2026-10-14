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
            "label": "Metadata",
            "fields": [
              {
                "name": "metadata",
                "type": "group",
                "label": false,
                "fields": [
                  {
                    "name": "date",
                    "label": "Date",
                    "type": "text"
                  },
                  {
                    "name": "featured",
                    "label": "Featured",
                    "type": "checkbox"
                  }
                ]
              }
            ]
          },
          {
            "label": "Article",
            "fields": [
              {
                "name": "article",
                "type": "group",
                "label": false,
                "fields": [
                  {
                    "name": "body",
                    "label": "Page content",
                    "type": "group",
                    "fields": [
                      {
                        "name": "body",
                        "label": "Body",
                        "type": "richText",
                        "localized": true
                      },
                      {
                        "name": "gallery",
                        "label": "Gallery",
                        "type": "group",
                        "fields": [
                          {
                            "name": "images",
                            "dbName": "pc_images_f5a9c2",
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
                      },
                      {
                        "name": "body2",
                        "label": "Body",
                        "type": "richText",
                        "localized": true
                      },
                      {
                        "name": "facts",
                        "label": "Facts",
                        "type": "group",
                        "fields": [
                          {
                            "name": "items",
                            "dbName": "pc_items_5438fb",
                            "label": "Content",
                            "type": "array",
                            "fields": [
                              {
                                "name": "label",
                                "label": "Label",
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
                          },
                          {
                            "name": "label",
                            "label": "Label",
                            "type": "text",
                            "localized": true
                          }
                        ]
                      },
                      {
                        "name": "body3",
                        "label": "Body",
                        "type": "richText",
                        "localized": true
                      }
                    ]
                  }
                ]
              }
            ],
            "admin": {}
          }
        ]
      }
    ]
  }
]
