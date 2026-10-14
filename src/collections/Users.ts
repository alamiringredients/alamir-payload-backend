import { ValidationError, type Access, type AccessResult, type CollectionConfig, type PayloadRequest } from 'payload'
import { can, currentRole, permission } from '../access/permissions'
import { ensureSuperAdminRole } from '../services/adminRoles'

const userAccess = (ability: 'view' | 'edit' | 'delete'): Access => async ({ req, id }): Promise<AccessResult> => {
  if (!req.user) return false
  if ((await currentRole(req))?.code === 'super-admin') return true
  if (!await can(req, 'users', ability)) {
    if (ability === 'delete' || (ability === 'view' && id !== req.user.id)) return false
    return { id: { equals: req.user.id } }
  }
  const role = await req.payload.find({ collection: 'roles', where: { code: { equals: 'super-admin' } }, limit: 1, depth: 0, req })
  return { role: { not_equals: role.docs[0]?.id } }
}
async function preserveLastAdmin(id: string | number, role: number, req: PayloadRequest) {
  const others = await req.payload.count({ collection: 'users', where: { and: [{ role: { equals: role } }, { id: { not_equals: id } }] }, req })
  if (!others.totalDocs) throw new ValidationError({ errors: [{ path: 'role', message: 'Keep at least one Super Admin account.' }] })
}

export const Users: CollectionConfig = {
  slug: 'users',
  admin: { useAsTitle: 'email', group: 'Administration' },
  auth: true,
  access: {
    admin: async ({ req }) => Boolean(await currentRole(req)),
    read: userAccess('view'), create: permission('users', 'create'), update: userAccess('edit'), delete: userAccess('delete'),
    unlock: permission('users', 'edit'),
  },
  fields: [{ name: 'name', type: 'text', required: true },
    { name: 'role', type: 'relationship', relationTo: 'roles', required: true,
      defaultValue: async ({ req }) => !req.user ? (await ensureSuperAdminRole(req)).id : undefined,
      admin: { position: 'sidebar', condition: (_data, _siblings, { user }) => Boolean(user) },
      access: {
        create: async ({ req }) => !req.user || await can(req, 'users', 'create'),
        update: async ({ req, id }) => (await currentRole(req))?.code === 'super-admin' || (req.user?.id !== id && await can(req, 'users', 'edit')),
      },
    }],
  hooks: {
    beforeValidate: [async ({ data, operation, req, originalDoc }) => {
      if (!data) return data
      if (operation === 'create' && !(await req.payload.count({ collection: 'users', req })).totalDocs) {
        data.role = (await ensureSuperAdminRole(req)).id
      }
      if (data.role && req.user && (await currentRole(req))?.code !== 'super-admin') {
        const role = await req.payload.findByID({ collection: 'roles', id: typeof data.role === 'object' ? data.role.id : data.role, depth: 0, req })
        if (role.code === 'super-admin' && data.role !== originalDoc?.role)
          throw new ValidationError({ errors: [{ path: 'role', message: 'Only a Super Admin can assign this role.' }] })
        if (originalDoc?.id === req.user.id && data.role !== originalDoc.role)
          throw new ValidationError({ errors: [{ path: 'role', message: 'You cannot change your own role.' }] })
      }
      return data
    }],
    beforeChange: [async ({ data, originalDoc, req }) => {
      if (originalDoc?.role && data.role !== undefined && data.role !== originalDoc.role) {
        const role = await req.payload.findByID({ collection: 'roles', id: typeof originalDoc.role === 'object' ? originalDoc.role.id : originalDoc.role, req, depth: 0 })
        if (role.code === 'super-admin') await preserveLastAdmin(originalDoc.id, role.id, req)
      }
      return data
    }],
    beforeDelete: [async ({ id, req }) => {
      const user = await req.payload.findByID({ collection: 'users', id, depth: 1, req })
      if (typeof user.role === 'object' && user.role?.code === 'super-admin') await preserveLastAdmin(id, user.role.id, req)
    }],
  },
}
