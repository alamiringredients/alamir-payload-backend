import { ValidationError, type CollectionConfig, type Field } from 'payload'
import { permissionSections, superAdmin } from '../access/permissions'

export const fullPermissions = Object.fromEntries(permissionSections.map(([slug]) =>
  [slug, { view: true, create: true, edit: true, delete: true }]))

export const Roles: CollectionConfig = {
  slug: 'roles',
  admin: { group: 'Administration', useAsTitle: 'name', defaultColumns: ['name', 'description'] },
  access: { admin: superAdmin, read: async ({ req }) => {
    if (!req.user) return false
    return await superAdmin({ req }) ? true : { code: { not_equals: 'super-admin' } }
  }, create: superAdmin, update: superAdmin, delete: superAdmin },
  fields: [
    { name: 'name', type: 'text', required: true, unique: true },
    { name: 'description', type: 'textarea' },
    { name: 'code', type: 'text', unique: true, admin: { hidden: true },
      access: { create: () => false, update: () => false } },
    { name: 'permissions', type: 'group', label: 'Section permissions',
      admin: { description: 'Unchecked abilities are denied. Page-owned forms follow the permissions of their page, product, job or event. Shared form defaults control changes applied across records. Site settings and Navigation use View and Edit.' },
      fields: [{ type: 'tabs', tabs: [...new Set(permissionSections.map(([, , group]) => group))].map(group => ({
        label: group,
        fields: permissionSections.filter(([, , sectionGroup]) => sectionGroup === group).map(([slug, label]) => ({
          name: slug, label, type: 'group', fields: [{ type: 'row', fields:
            (['view', 'create', 'edit', 'delete'] as const).filter(ability =>
              !['navigation', 'website-settings'].includes(slug) || ['view', 'edit'].includes(ability)).map(ability => ({
              name: ability, label: ability[0].toUpperCase() + ability.slice(1), type: 'checkbox', defaultValue: false,
              admin: { width: '25%' },
            })),
          }],
        } as Field)),
      })) }],
    },
  ],
  hooks: {
    beforeValidate: [({ data, originalDoc, req }) => {
      if (!data) return data
      if (data.code && data.code !== originalDoc?.code && !req.context.bootstrapRoles)
        throw new ValidationError({ errors: [{ path: 'code', message: 'System role identities cannot be changed.' }] })
      if (originalDoc?.code === 'super-admin' || data.code === 'super-admin') {
        data.name = 'Super Admin'
        data.code = 'super-admin'
        data.permissions = fullPermissions
      }
      return data
    }],
    beforeDelete: [async ({ id, req }) => {
      const role = await req.payload.findByID({ collection: 'roles', id, depth: 0, req })
      if (role.code === 'super-admin') throw new Error('The Super Admin role cannot be deleted.')
      const assigned = await req.payload.count({ collection: 'users', where: { role: { equals: id } }, req })
      if (assigned.totalDocs) throw new Error('Assign another role to these users before deleting their role.')
    }],
  },
}
