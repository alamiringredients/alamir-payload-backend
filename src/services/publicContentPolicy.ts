export const publicCollections = [
  'pages',
  'products',
  'categories',
  'media',
  'translations',
  'news',
  'news-taxonomies',
  'sustainability',
  'sustainability-goals',
  'jobs',
  'events',
  'meeting-slots',
  'certifications',
  'certification-types',
  'product-applications',
  'product-concentrations',
  'forms',
] as const
export const publicGlobals = ['website-settings', 'navigation'] as const
export const publicResources = [
  ...publicCollections,
  ...publicGlobals.map((slug) => `globals/${slug}`),
]
export const sharedFields: Record<string, string[]> = {
  pages: ['title', 'slug', 'sourceKey', '_status'],
  products: ['name', 'slug', 'sourceId', 'category', 'gallery'],
  categories: ['name', 'slug', 'sourceId', 'icon', 'description', 'page.artwork'],
  media: ['url', 'width', 'height', 'mimeType', 'filename', 'prefix', 'alt'],
  translations: ['key', 'text'],
}
export const sharedResources = [
  ...Object.keys(sharedFields),
  ...publicGlobals.map((slug) => `globals/${slug}`),
]

export const identityResources = ['products', 'categories', 'news', 'sustainability', 'jobs', 'events'] as const
export const searchResources = ['products', 'categories', 'news', 'jobs', 'events', 'sustainability'] as const
export const identityFields = ['id', 'sourceId', 'slug', '_order', 'category', 'availability']
export const searchFields = ['id', 'slug', '_order', 'category', 'name', 'title', 'description', 'availability']

// Stored projections retain relationship IDs. Forms additionally project the
// product selector options from Categories.
export function projectionDependencies(resources: readonly string[]): string[] {
  return [...new Set(resources.flatMap(resource => resource === 'categories' ? [resource, 'forms'] : [resource]))]
}

export function nativeReadDependencies(resource: string, depth: number): string[] {
  return depth > 0 ? publicResources : resource === 'forms' ? [resource, 'categories'] : [resource]
}

export function publicationDependencies(resource: string, operation: 'create' | 'update' | 'delete'): string[] {
  return projectionDependencies([
    resource,
    ...(resource === 'events' ? ['meeting-slots'] : []),
    ...(operation !== 'update' && ['pages', 'jobs', 'events', 'products'].includes(resource) ? ['forms'] : []),
  ])
}
