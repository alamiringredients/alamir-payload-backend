import { createLocalReq, type Payload, type PayloadRequest } from 'payload'
import { fullPermissions } from '../collections/Roles'

export async function ensureSuperAdminRole(req: PayloadRequest) {
  const existing = await req.payload.find({ collection: 'roles', where: { code: { equals: 'super-admin' } }, limit: 1, depth: 0, req })
  if (existing.docs[0]) return existing.docs[0]
  return req.payload.create({ collection: 'roles', req, context: { bootstrapRoles: true },
    data: { name: 'Super Admin', code: 'super-admin', description: 'Full access to every dashboard section and role management.', permissions: fullPermissions } })
}

// Upgrade the original first administrator once; do not reset assigned roles on later seeds.
export async function seedAdminRoles(payload: Payload) {
  const req = await createLocalReq({ context: { bootstrapRoles: true } }, payload)
  const role = await ensureSuperAdminRole(req)
  const first = await payload.find({ collection: 'users', sort: 'createdAt', limit: 1, depth: 0, req })
  if (first.docs[0] && !first.docs[0].role)
    await payload.update({ collection: 'users', id: first.docs[0].id, data: { role: role.id }, req })
}
