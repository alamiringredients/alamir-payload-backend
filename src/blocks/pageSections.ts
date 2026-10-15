import { createHash } from 'node:crypto'
import type { Block, Field } from 'payload'
import { pageDefinitions } from './pageDefinitions'
import {
  standardBlocks,
  databaseNames,
  enabledField,
  mediaPositionField,
  columnWidthField,
} from './sharedSections'

const sectionDefinitions = pageDefinitions.flatMap((page) =>
  page.sections.map((section) => ({
    ...section,
    slug: `${page.slug}-${section.name}`,
    group: page.label,
  })),
)
export const contentBlocks: Block[] = [
  ...standardBlocks,
  ...sectionDefinitions.map((section): Block => ({
    slug: section.slug,
    dbName: `pb_${createHash('sha1').update(section.slug).digest('hex').slice(0, 12)}`,
    labels: { singular: section.label, plural: section.label },
    admin: { group: section.group },
    fields: [
      enabledField,
      mediaPositionField,
      columnWidthField,
      {
        name: 'content',
        type: 'group',
        label: false,
        fields: databaseNames(
          section.fields.filter((field) => !('name' in field && field.name === 'enabled')),
          section.slug,
        ),
      },
    ],
  })),
]
// News copy predates the merged settings and retains its original stored names.
export const pageSettings: Field[] = pageDefinitions
  .find((page) => page.key === 'news-page')!
  .settings.map(
    (field) =>
      ({
        ...field,
        admin: { condition: (data: Record<string, unknown>) => data.sourceKey === 'news-page' },
      }) as Field,
  )
for (const definition of pageDefinitions) {
  if (definition.key === 'news-page') continue
  for (const field of definition.settings) {
    if ('name' in field) {
      const existing = pageSettings.find(
        (existing) => 'name' in existing && existing.name === field.name,
      )
      if (existing) {
        if (existing.type === 'group' && field.type === 'group') {
          existing.fields.push(
            ...databaseNames(field.fields, 'page_settings').filter(
              (child) =>
                !existing.fields.some(
                  (saved) => 'name' in saved && 'name' in child && saved.name === child.name,
                ),
            ),
          )
          existing.admin = { ...existing.admin, condition: undefined }
        }
        continue
      }
      pageSettings.push({
        ...databaseNames([field], 'page_settings')[0],
        admin: {
          ...field.admin,
          hidden: field.name === 'goals',
          condition:
            field.name === 'seo'
              ? undefined
              : (_data: Record<string, unknown>) => _data.sourceKey === definition.key,
        },
      } as Field)
    }
  }
}

for (const field of pageSettings) {
  if (field.type !== 'group' || !('name' in field) || !['copy', 'emptyStates'].includes(field.name))
    continue
  const owners = pageDefinitions.filter((definition) =>
    definition.settings.some((original) => 'name' in original && original.name === field.name),
  )
  field.admin = {
    ...field.admin,
    condition: (data) => owners.some((owner) => owner.key === data.sourceKey),
  }
  for (const child of field.fields) {
    if (!('name' in child)) continue
    const keys = owners
      .filter((owner) =>
        owner.settings.some(
          (original) =>
            original.type === 'group' &&
            'name' in original &&
            original.name === field.name &&
            original.fields.some((item) => 'name' in item && item.name === child.name),
        ),
      )
      .map((owner) => owner.key)
    child.admin = { ...child.admin, condition: (data) => keys.includes(data.sourceKey) }
  }
}
