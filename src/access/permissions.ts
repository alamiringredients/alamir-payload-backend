import type { Access, PayloadRequest, Plugin, Where } from 'payload'
import type { Role } from '../payload-types'

export const permissionSections = [
  ['media', 'Media', 'Library'],
  ['pages', 'Website pages', 'Website'],
  ['translations', 'Shared translations', 'Website'],
  ['website-settings', 'Site settings', 'Website'],
  ['navigation', 'Navigation', 'Website'],
  ['forms', 'Forms and shared defaults', 'Website'],
  ['categories', 'Categories', 'Products'],
  ['products', 'Products', 'Products'],
  ['product-applications', 'Product applications', 'Products'],
  ['product-concentrations', 'Concentration ranges', 'Products'],
  ['certification-types', 'Certification types', 'Certifications'],
  ['certifications', 'Certifications', 'Certifications'],
  ['news-taxonomies', 'Topics and tags', 'News'],
  ['news', 'News', 'News'],
  ['sustainability-goals', 'Sustainability goals', 'Sustainability'],
  ['sustainability', 'Sustainability articles', 'Sustainability'],
  ['jobs', 'Jobs', 'Careers'],
  ['applications', 'Applications', 'Careers'],
  ['events', 'Events and meeting slots', 'Events'],
  ['reservations', 'Reservations', 'Events'],
  ['enquiries', 'Enquiries', 'Inbox'],
  ['users', 'Users', 'Administration'],
] as const
export type Ability = 'view' | 'create' | 'edit' | 'delete'
type Permissions = Record<string, Partial<Record<Ability, boolean>> | undefined>

// Load current assignments once per request: role changes take effect without a new login.
export function currentRole(req: PayloadRequest): Promise<Role | null> {
  const key = `adminRole:${req.user?.id}`
  const cached = req.context[key] as Promise<Role | null> | undefined
  if (cached) return cached
  // Payload's JWT strategy has already loaded the current user from the database.
  // Local API callers can pass stale user objects, so those still need a fresh lookup.
  const jwtRole = req.user && '_strategy' in req.user && req.user._strategy === 'local-jwt' ? req.user.role : undefined
  const roleID = jwtRole && typeof jwtRole === 'object' ? jwtRole.id : jwtRole
  const pending = req.user?.collection === 'users' && roleID
    ? req.payload.findByID({ collection: 'roles', id: roleID, depth: 0, req, overrideAccess: true, disableErrors: true })
    : req.user?.collection === 'users'
    ? req.payload.findByID({ collection: 'users', id: req.user.id, depth: 1, req,
        overrideAccess: true, select: { role: true }, disableErrors: true })
        .then(user => user?.role && typeof user.role === 'object' ? user.role : null)
    : Promise.resolve(null)
  req.context[key] = pending
  return pending
}
export async function can(req: PayloadRequest, section: string, ability: Ability): Promise<boolean> {
  const role = await currentRole(req)
  return role?.code === 'super-admin' || Boolean((role?.permissions as Permissions | undefined)?.[section]?.[ability])
}
export const superAdmin = async ({ req }: { req: PayloadRequest }): Promise<boolean> => (await currentRole(req))?.code === 'super-admin'
export const permission = (section: string, ability: Ability): Access => ({ req }) => can(req, section, ability)

async function formAccess(req: PayloadRequest, ability: Ability): Promise<boolean | Where> {
  if (await can(req, 'forms', ability)) return true
  const owners = await Promise.all(['pages', 'jobs', 'events', 'products'].map(async section =>
    await can(req, section, ability) ? section : null))
  const allowed = owners.filter((owner): owner is string => Boolean(owner))
  return allowed.length ? { or: allowed.map(owner => ({ 'owner.relationTo': { equals: owner } })) } : false
}
async function submissionAccess(req: PayloadRequest, ability: Ability): Promise<boolean | Where> {
  const sections = await Promise.all(['enquiries', 'applications', 'reservations'].map(async section =>
    await can(req, section, ability) ? section : null))
  const allowed = sections.filter((section): section is string => Boolean(section))
  const conditions: Where[] = allowed.map(section => ({ 'record.relationTo': { equals: section } }))
  if (await can(req, 'forms', ability)) conditions.push({ 'form.purpose': { equals: 'custom' } })
  return conditions.length ? { or: conditions } : false
}

// Apply Payload's native access controls to all dashboard resources, including plugin collections.
export const dashboardPermissions: Plugin = config => {
  config.collections = config.collections?.map(collection => {
    if (['users', 'roles', 'email-replies', 'payload-jobs'].includes(collection.slug)) return collection
    const section = collection.slug === 'meeting-slots' ? 'events'
      : collection.slug === 'application-files' ? 'applications' : collection.slug
    const access = collection.access ?? {}
    const allowed = (ability: Ability): Access => async args => {
      if (!args.req.user) return ability === 'view' ? (access.read?.(args) ?? false)
        : ability === 'create' ? (access.create?.(args) ?? false) : false
      if (section === 'forms') {
        if (ability === 'create') return can(args.req, args.data?.owner?.relationTo ?? 'forms', ability)
        return formAccess(args.req, ability)
      }
      if (section === 'form-submissions') return submissionAccess(args.req, ability)
      return can(args.req, section, ability)
    }
    return { ...collection, access: { ...access,
      admin: async ({ req }) => Boolean(req.user) && Boolean(await allowed('view')({ req })),
      read: allowed('view'), create: allowed('create'), update: allowed('edit'), delete: allowed('delete'),
      readVersions: allowed('view'), unlock: permission(section, 'edit'),
    } }
  })
  config.globals = config.globals?.map(global => ({ ...global,
    access: { ...global.access,
      read: args => args.req.user ? can(args.req, global.slug, 'view') : (global.access?.read?.(args) ?? false),
      update: permission(global.slug, 'edit'), readVersions: permission(global.slug, 'view'),
    },
  }))
  return config
}
