import {navigationMenus,footerMenus} from '../navigationMenus'
import type {Field} from 'payload'

export const pageFields:Field[]=[
  {
    "name": "page",
    "type": "group",
    "label": false,
    "fields": [
      {
        "type": "tabs",
        "tabs": [
          {
            "label": "Header and navigation",
            "fields": [
              ...navigationMenus,
              {
                "name": "header",
                "label": false,
                "type": "group",
                "fields": [
                  {
                    "name": "enabled",
                    "label": "Show header",
                    "type": "checkbox",
                    "defaultValue": true
                  }
                ]
              }
            ]
          },
          {
            "label": "Footer",
            "fields": [
              ...footerMenus,
              {
                "name": "footer",
                "type": "group",
                "label": false,
                "fields": [
                  {
                    "name": "text2",
                    "label": false,
                    "type": "group",
                    "fields": [
                      {
                        "name": "values",
                        "label": "Group affiliation prefix",
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
                        "label": "Group website link",
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
                        "label": "Explore menu heading",
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
                        "label": "Company menu heading",
                        "type": "text",
                        "localized": true
                      }
                    ]
                  },
                  {
                    "name": "text16",
                    "label": false,
                    "type": "group",
                    "fields": [
                      {
                        "name": "values",
                        "label": "Export contacts heading",
                        "type": "text",
                        "localized": true
                      }
                    ]
                  },
                  {
                    "name": "text17",
                    "label": false,
                    "type": "group",
                    "fields": [
                      {
                        "name": "values",
                        "label": "Copyright notice",
                        "type": "text",
                        "localized": true
                      }
                    ]
                  },
                  {
                    "name": "text18",
                    "label": false,
                    "type": "group",
                    "fields": [
                      {
                        "name": "values",
                        "label": "Brand tagline",
                        "type": "text",
                        "localized": true
                      }
                    ]
                  },
                  {
                    "name": "text23",
                    "label": false,
                    "type": "group",
                    "fields": [
                      {
                        "name": "values",
                        "label": "Ingredients logo alternative text",
                        "type": "text",
                        "localized": true
                      }
                    ]
                  },
                  {
                    "name": "text24",
                    "label": false,
                    "type": "group",
                    "fields": [
                      {
                        "name": "values",
                        "label": "Group logo alternative text",
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
                    "name": "body",
                    "label": "Footer description",
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
          }
        ]
      }
    ]
  }
]
