import type { Category } from '../payload-types'
const normalize = (value: unknown) =>
  String(value ?? '')
    .toLowerCase()
    .replace(/[^\p{Letter}\p{Number}]+/gu, '-')
    .replace(/^-|-$/g, '')
const categoryName = (value: unknown) =>
  value && typeof value === 'object' ? (value as { en?: string }).en : value
export function migrateProductSelect(
  fields: unknown,
  categories: Category[],
): Record<string, unknown>[] | undefined {
  if (!Array.isArray(fields)) return
  let changed = false
  const migrated = fields.map((field) => {
    if (field.name !== 'product' || !['select', 'text'].includes(field.blockType)) return field
    changed = true
    const { options: _, inputType: __, defaultValue, ...data } = field
    const value = defaultValue && typeof defaultValue === 'object' ? defaultValue.en : defaultValue
    const category = categories.find(
      (category) =>
        String(category.id) === String(value) ||
        normalize(category.slug) === normalize(value) ||
        normalize(categoryName(category.name)) === normalize(value),
    )
    return { ...data, blockType: 'product-select', defaultValue: category?.id ?? null }
  })
  return changed ? migrated : undefined
}
