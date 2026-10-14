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
                    "name": "alt",
                    "label": "Alternative text",
                    "type": "text",
                    "localized": true
                  },
                  {
                    "name": "image",
                    "label": "Image",
                    "type": "upload",
                    "relationTo": "media"
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
                    "name": "description",
                    "label": "Description",
                    "type": "richText",
                    "localized": true
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
                    "name": "ctaHref",
                    "label": "Button link",
                    "type": "text",
                    "localized": true
                  },
                  {
                    "name": "eyebrow",
                    "label": "Eyebrow",
                    "type": "text",
                    "localized": true
                  },
                  {
                    "name": "ctaLabel",
                    "label": "Button label",
                    "type": "text",
                    "localized": true
                  },
                  {
                    "name": "heading",
                    "label": "Heading",
                    "type": "richText",
                    "localized": true
                  },
                  {
                    "name": "body",
                    "label": "Body",
                    "type": "richText",
                    "localized": true
                  },
                  {
                    "name": "video",
                    "label": "Video",
                    "type": "group",
                    "fields": [
                      {
                        "name": "src",
                        "label": "File",
                        "type": "upload",
                        "localized": true,
                        "relationTo": "media"
                      },
                      {
                        "name": "label",
                        "label": "Label",
                        "type": "text",
                        "localized": true
                      },
                      {
                        "name": "poster",
                        "label": "Poster",
                        "type": "upload",
                        "localized": true,
                        "relationTo": "media"
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
                    "name": "body2",
                    "label": "Body",
                    "type": "richText",
                    "localized": true
                  },
                  {
                    "name": "figures",
                    "label": "Key figures",
                    "type": "group",
                    "fields": [
                      {
                        "name": "items",
                        "dbName": "pc_items_89355b",
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
                      },
                      {
                        "name": "markAlt",
                        "label": "Mark alt",
                        "type": "text",
                        "localized": true
                      },
                      {
                        "name": "markSrc",
                        "label": "Mark src",
                        "type": "text",
                        "localized": true
                      },
                      {
                        "name": "markHref",
                        "label": "Mark href",
                        "type": "text",
                        "localized": true
                      }
                    ]
                  },
                  {
                    "name": "image2",
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
                  }
                ]
              }
            ]
          },
          {
            "label": "Mission and vision",
            "fields": [
              {
                "name": "vision",
                "type": "group",
                "label": false,
                "fields": [
                  {
                    "name": "ctaHref",
                    "label": "Button link",
                    "type": "text",
                    "localized": true
                  },
                  {
                    "name": "eyebrow",
                    "label": "Eyebrow",
                    "type": "text",
                    "localized": true
                  },
                  {
                    "name": "ctaLabel",
                    "label": "Button label",
                    "type": "text",
                    "localized": true
                  },
                  {
                    "name": "body",
                    "label": "Body",
                    "type": "richText",
                    "localized": true
                  },
                  {
                    "name": "profile",
                    "label": "Mission and vision",
                    "type": "group",
                    "fields": [
                      {
                        "name": "alt",
                        "label": "Alternative text",
                        "type": "text",
                        "localized": true
                      },
                      {
                        "name": "image",
                        "label": "Image",
                        "type": "upload",
                        "localized": true,
                        "relationTo": "media"
                      },
                      {
                        "name": "story",
                        "label": "Story",
                        "type": "richText",
                        "localized": true
                      },
                      {
                        "name": "vision",
                        "label": "Vision",
                        "type": "richText",
                        "localized": true
                      },
                      {
                        "name": "mission",
                        "label": "Mission",
                        "type": "richText",
                        "localized": true
                      },
                      {
                        "name": "storyLabel",
                        "label": "Story label",
                        "type": "text",
                        "localized": true
                      },
                      {
                        "name": "visionLabel",
                        "label": "Vision label",
                        "type": "text",
                        "localized": true
                      },
                      {
                        "name": "missionLabel",
                        "label": "Mission label",
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
            "label": "Our values",
            "fields": [
              {
                "name": "values",
                "type": "group",
                "label": false,
                "fields": [
                  {
                    "name": "ctaHref",
                    "label": "Button link",
                    "type": "text",
                    "localized": true
                  },
                  {
                    "name": "eyebrow",
                    "label": "Eyebrow",
                    "type": "text",
                    "localized": true
                  },
                  {
                    "name": "ctaLabel",
                    "label": "Button label",
                    "type": "text",
                    "localized": true
                  },
                  {
                    "name": "heading",
                    "label": "Heading",
                    "type": "richText",
                    "localized": true
                  },
                  {
                    "name": "values",
                    "label": "Content",
                    "type": "group",
                    "fields": [
                      {
                        "name": "items",
                        "dbName": "pc_items_6d46b2",
                        "label": "Content",
                        "type": "array",
                        "fields": [
                          {
                            "name": "alt",
                            "label": "Alternative text",
                            "type": "text",
                            "localized": true
                          },
                          {
                            "name": "image",
                            "label": "Image",
                            "type": "upload",
                            "localized": true,
                            "relationTo": "media"
                          },
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
                          }
                        ],
                        "admin": {
                          "initCollapsed": false
                        }
                      }
                    ]
                  }
                ]
              }
            ]
          },
          {
            "label": "Technology",
            "fields": [
              {
                "name": "technology",
                "type": "group",
                "label": false,
                "fields": [
                  {
                    "name": "ctaHref",
                    "label": "Button link",
                    "type": "text",
                    "localized": true
                  },
                  {
                    "name": "eyebrow",
                    "label": "Eyebrow",
                    "type": "text",
                    "localized": true
                  },
                  {
                    "name": "ctaLabel",
                    "label": "Button label",
                    "type": "text",
                    "localized": true
                  },
                  {
                    "name": "heading",
                    "label": "Heading",
                    "type": "richText",
                    "localized": true
                  },
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
                    "name": "image2",
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
                    "name": "body2",
                    "label": "Body",
                    "type": "richText",
                    "localized": true
                  },
                  {
                    "name": "image3",
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
                    "name": "body3",
                    "label": "Body",
                    "type": "richText",
                    "localized": true
                  },
                  {
                    "name": "actions",
                    "label": "Actions",
                    "type": "group",
                    "fields": [
                      {
                        "name": "items",
                        "dbName": "pc_items_387301",
                        "label": "Content",
                        "type": "array",
                        "fields": [
                          {
                            "name": "href",
                            "label": "Href",
                            "type": "text",
                            "localized": true
                          },
                          {
                            "name": "label",
                            "label": "Label",
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
              }
            ]
          },
          {
            "label": "Facility",
            "fields": [
              {
                "name": "facility",
                "type": "group",
                "label": false,
                "fields": [
                  {
                    "name": "ctaHref",
                    "label": "Button link",
                    "type": "text",
                    "localized": true
                  },
                  {
                    "name": "eyebrow",
                    "label": "Eyebrow",
                    "type": "text",
                    "localized": true
                  },
                  {
                    "name": "ctaLabel",
                    "label": "Button label",
                    "type": "text",
                    "localized": true
                  },
                  {
                    "name": "heading",
                    "label": "Heading",
                    "type": "richText",
                    "localized": true
                  },
                  {
                    "name": "video",
                    "label": "Video",
                    "type": "group",
                    "fields": [
                      {
                        "name": "src",
                        "label": "File",
                        "type": "upload",
                        "localized": true,
                        "relationTo": "media"
                      },
                      {
                        "name": "label",
                        "label": "Label",
                        "type": "text",
                        "localized": true
                      },
                      {
                        "name": "poster",
                        "label": "Poster",
                        "type": "upload",
                        "localized": true,
                        "relationTo": "media"
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
                    "name": "body",
                    "label": "Page content",
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
