import type { Block, Field } from 'payload'
import { createHash } from 'node:crypto'
import {
  standardBlocks,
  databaseNames,
  enabledField,
  mediaPositionField,
  columnWidthField,
} from './sharedSections'
import { definition as products } from './records/products'
import { definition as categories } from './records/categories'
import { definition as news } from './records/news'
import { definition as sustainability } from './records/sustainability'
import { definition as jobs } from './records/jobs'
import { definition as events } from './records/events'
import type { ContentCollection } from './sectionTypes'

export type { ContentCollection } from './sectionTypes'
export const recordDefinitions = [products, categories, news, sustainability, jobs, events]
const definitions = new Map(
  recordDefinitions.map((definition) => [definition.collection, definition]),
)

export function recordSettings(collection: ContentCollection): Field[] {
  return definitions.get(collection)!.settings
}
export function recordImageSettings(collection: 'products' | 'categories'): Field[] {
  const fields = recordSettings(collection)
  const artwork = fields.filter((field) => 'name' in field && field.name === 'artwork')
  return [
    {
      type: 'tabs',
      tabs: [
        { label: 'Card images', fields: artwork },
        {
          label: 'Record settings',
          fields: fields.filter((field) => !('name' in field && field.name === 'artwork')),
        },
      ],
    },
  ]
}
function recordBlocks(collection: ContentCollection): Block[] {
  const shared = standardBlocks.map((block) => {
    const key = `${collection}_${block.slug}`
    return {
      ...block,
      dbName: `rb_${createHash('sha1').update(key).digest('hex').slice(0, 12)}`,
      fields: databaseNames(block.fields, key),
    }
  })
  const native = definitions.get(collection)!.sections.map((section): Block => {
    const key = `${collection}_${collection}-detail-${section.name}`
    const fields = [
      ...databaseNames(section.pageFields, `${key}_content_page`),
      ...databaseNames(section.contentFields, `${key}_content`),
    ]
    return {
      slug: section.slug,
      dbName: `rb_${createHash('sha1').update(key).digest('hex').slice(0, 12)}`,
      labels: { singular: section.label, plural: section.label },
      admin: { group: 'Record sections' },
      fields: [
        enabledField,
        columnWidthField,
        ...(fields.length ? [mediaPositionField] : []),
        ...(fields.length ? [{ name: 'data', type: 'group', label: false, fields } as Field] : []),
      ],
    }
  })
  return [...shared, ...native]
}
export function recordLayoutField(collection: ContentCollection): Field {
  return {
    name: 'layout',
    label: 'Sections',
    type: 'blocks',
    blocks: recordBlocks(collection),
    admin: { initCollapsed: true },
  }
}
