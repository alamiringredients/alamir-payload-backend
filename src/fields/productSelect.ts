import type { Block, PayloadRequest } from 'payload'
import type { Category } from '../payload-types'

export function productCategories(req: PayloadRequest) {
  const key = `productCategories:${req.locale ?? 'en'}`
  const cached = req.context[key] as Promise<Category[]> | undefined
  if (cached) return cached
  const pending = req.payload
    .find({
      collection: 'categories',
      locale: req.locale,
      where: { _status: { equals: 'published' } },
      sort: '_order',
      depth: 0,
      pagination: false,
      select: { name: true, slug: true },
      req,
    })
    .then((result) => result.docs)
  req.context[key] = pending
  return pending
}
export const productSelect: Block = {
  slug: 'product-select',
  labels: { singular: 'Product select', plural: 'Product selects' },
  fields: [
    { name: 'name', label: 'Field name', type: 'text', required: true, defaultValue: 'product' },
    { name: 'label', type: 'text', localized: true, required: true },
    { name: 'width', label: 'Field width (%)', type: 'number', min: 0, max: 100, defaultValue: 50 },
    { name: 'required', type: 'checkbox' },
    {
      name: 'defaultValue',
      label: 'Default category',
      type: 'relationship',
      relationTo: 'categories',
      filterOptions: { _status: { equals: 'published' } },
    },
    {
      name: 'options',
      type: 'json',
      virtual: true,
      admin: { hidden: true },
      hooks: {
        afterRead: [
          async ({ req }) =>
            (await productCategories(req)).map((category) => ({
              value: String(category.id),
              label: category.name,
            })),
        ],
      },
    },
  ],
}
