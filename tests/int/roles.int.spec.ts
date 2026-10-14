import 'dotenv/config'
import { randomUUID } from 'node:crypto'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { createLocalReq, getPayload, type Payload } from 'payload'
import { postgresAdapter } from '@payloadcms/db-postgres'
import config from '../../src/payload.config'
import { seedAdminRoles } from '../../src/services/adminRoles'
import type { Role, User } from '../../src/payload-types'
import { copyForm } from '../../src/services/forms'
import formDefaults from '../fixtures/forms.json'

const schema = `roles_check_${randomUUID().replaceAll('-', '')}`
let payload: Payload, admin: User, editor: User, role: Role
const context = { disableRevalidate: true }
beforeAll(async () => {
  const base = await config
  payload = await getPayload({ key: schema, config: Promise.resolve({ ...base,
    db: { ...postgresAdapter({ blocksAsJSON:true, pool: { connectionString: process.env.DATABASE_URL }, schemaName: schema, push: true }), allowIDOnCreate: false, name: 'postgres' },
  }) })
  admin = await payload.create({ collection: 'users', depth: 0, data: { name: 'First administrator', email: 'admin@roles.test', password: 'roles-test-password-123', role: 0 } })
  role = await payload.create({ collection: 'roles', user: admin, overrideAccess: false,
    data: { name: 'Editor', permissions: { 'product-applications': { view: true, create: true, edit: true, delete: false } } } })
  editor = await payload.create({ collection: 'users', depth: 0, user: admin, overrideAccess: false,
    data: { name: 'Editor', email: 'editor@roles.test', password: 'roles-test-password-123', role: role.id } })
}, 120000)
afterAll(async () => {
  if (!payload) return
  await payload.db.pool.query(`DROP SCHEMA "${schema}" CASCADE`)
  await payload.destroy()
})

describe('dashboard roles and permissions', () => {
  it('assigns the first user Super Admin and keeps that assignment on reseeding', async () => {
    const user = await payload.findByID({ collection: 'users', id: admin.id, depth: 1 })
    expect((user.role as Role).name).toBe('Super Admin')
    await seedAdminRoles(payload)
    expect((await payload.findByID({ collection: 'users', id: editor.id, depth: 0 })).role).toBe(role.id)
  })
  it('enforces separate view, create, edit and delete abilities through the API', async () => {
    const doc = await payload.create({ collection: 'product-applications', user: editor, overrideAccess: false, context, data: { name: 'Sauces', key: 'sauces' } })
    expect((await payload.findByID({ collection: 'product-applications', id: doc.id, user: editor, overrideAccess: false })).name).toBe('Sauces')
    await payload.update({ collection: 'product-applications', id: doc.id, user: editor, overrideAccess: false, context, data: { name: 'Beverages' } })
    await expect(payload.delete({ collection: 'product-applications', id: doc.id, user: editor, overrideAccess: false, context })).rejects.toThrow()
    await payload.delete({ collection: 'product-applications', id: doc.id, user: admin, overrideAccess: false, context })
  })
  it('takes role changes into effect for an already logged-in user', async () => {
    await payload.update({ collection: 'roles', id: role.id, user: admin, overrideAccess: false, data: { permissions: { 'product-applications': { view: true, create: false, edit: false, delete: false } } } })
    await expect(payload.create({ collection: 'product-applications', user: editor, overrideAccess: false, context, data: { name: 'Disallowed', key: 'disallowed' } })).rejects.toThrow()
  })
  it('checks current permissions and assignments for a real JWT session', async () => {
    const login = await payload.login({ collection: 'users', data: { email: editor.email, password: 'roles-test-password-123' } })
    const headers = new Headers({ Authorization: `JWT ${login.token}` })
    let auth = await payload.auth({ headers })
    expect(auth.user).toMatchObject({ _strategy: 'local-jwt' })
    await expect(payload.create({ collection: 'product-applications', user: auth.user, overrideAccess: false, context, data: { name: 'Denied', key: 'jwt-denied' } })).rejects.toThrow()
    const replacement = await payload.create({ collection: 'roles', data: { name: 'Viewer', permissions: { 'product-applications': { view: true } } } })
    await payload.update({ collection: 'users', id: editor.id, data: { role: replacement.id } })
    auth = await payload.auth({ headers })
    expect(typeof auth.user?.role === 'object' ? auth.user.role?.id : auth.user?.role).toBe(replacement.id)
    expect(await payload.find({ collection: 'product-applications', user: auth.user, overrideAccess: false })).toBeDefined()
    await payload.update({ collection: 'users', id: editor.id, data: { role: role.id } })
  })
  it('protects private inbox data and global editing while preserving public reads', async () => {
    await expect(payload.find({ collection: 'users', user: editor, overrideAccess: false })).rejects.toThrow()
    expect((await payload.findByID({ collection: 'users', id: editor.id, user: editor, overrideAccess: false })).id).toBe(editor.id)
    await expect(payload.find({ collection: 'applications', user: editor, overrideAccess: false })).rejects.toThrow()
    await expect(payload.updateGlobal({ slug: 'navigation', user: editor, overrideAccess: false, context, data: {} })).rejects.toThrow()
    expect(await payload.findGlobal({ slug: 'navigation', overrideAccess: false })).toBeDefined()
  })
  it('blocks registration, self-promotion, role management and editing a Super Admin', async () => {
    await expect(payload.create({ collection: 'users', overrideAccess: false, data: { name: 'Stranger', email: 'stranger@roles.test', password: 'roles-test-password-123', role: admin.role } })).rejects.toThrow()
    await payload.update({ collection: 'users', id: editor.id, user: editor, overrideAccess: false, data: { role: admin.role } })
    expect((await payload.findByID({ collection: 'users', id: editor.id, depth: 0 })).role).toBe(role.id)
    await expect(payload.update({ collection: 'roles', id: role.id, user: editor, overrideAccess: false, data: { permissions: { users: { view: true, create: true, edit: true, delete: true } } } })).rejects.toThrow()
    await expect(payload.update({ collection: 'users', id: admin.id, user: editor, overrideAccess: false, data: { name: 'Hijacked' } })).rejects.toThrow()
  })
  it('prevents removing the last Super Admin or deleting an assigned role', async () => {
    await expect(payload.delete({ collection: 'users', id: admin.id, user: admin, overrideAccess: false })).rejects.toThrow()
    await expect(payload.update({ collection: 'users', id: admin.id, user: admin, overrideAccess: false, data: { role: role.id } })).rejects.toThrow()
    await expect(payload.delete({ collection: 'roles', id: admin.role as number, user: admin, overrideAccess: false })).rejects.toThrow('cannot be deleted')
    await expect(payload.delete({ collection: 'roles', id: role.id, user: admin, overrideAccess: false })).rejects.toThrow('Assign another role')
  })
  it('lets an event editor edit its form and slots without granting access to unrelated forms or shared defaults', async () => {
    await payload.update({ collection: 'roles', id: role.id, data: { permissions: { events: { view: true, create: true, edit: true, delete: false } } } })
    const req = await createLocalReq({ context }, payload)
    const title = { root: { type: 'root', version: 1, direction: null, format: '' as const, indent: 0, children: [{ type: 'paragraph', version: 1, children: [{ type: 'text', version: 1, text: 'Event', format: 0, detail: 0, mode: 'normal', style: '' }] }] } }
    const event = await payload.create({ collection: 'events', context, data: { title, slug: 'event', kind: 'event' } })
    const job = await payload.create({ collection: 'jobs', context, data: { title, slug: 'job' } })
    const template = formDefaults.find(form => form.purpose === 'reservation')!
    const eventForm = await copyForm(template, undefined, { title: 'Event booking', key: 'event:form', purpose: 'reservation', owner: { relationTo: 'events', value: event.id } }, req)
    const jobForm = await copyForm(formDefaults.find(form => form.purpose === 'application')!, undefined, { title: 'Job application', key: 'job:form', purpose: 'application', owner: { relationTo: 'jobs', value: job.id } }, req)
    await payload.update({ collection: 'forms', id: eventForm.id, user: editor, overrideAccess: false, context, data: { submitButtonLabel: 'Reserve time', makeDefault: true, applyToExisting: true, owner: { relationTo: 'jobs', value: job.id } } })
    const saved = await payload.findByID({ collection: 'forms', id: eventForm.id, depth: 0 })
    expect(saved.submitButtonLabel).toBe('Reserve time')
    expect(saved.owner?.relationTo).toBe('events')
    expect(saved.makeDefault).toBe(false)
    expect(saved.applyToExisting).toBe(false)
    await expect(payload.update({ collection: 'forms', id: jobForm.id, user: editor, overrideAccess: false, context, data: { submitButtonLabel: 'Disallowed' } })).rejects.toThrow()
    const slot = await payload.create({ collection: 'meeting-slots', user: editor, overrideAccess: false, data: { event: event.id, startsAt: '2027-01-01T09:00:00Z', endsAt: '2027-01-01T09:30:00Z' } })
    await payload.update({ collection: 'meeting-slots', id: slot.id, user: editor, overrideAccess: false, data: { endsAt: '2027-01-01T09:45:00Z' } })
    await expect(payload.delete({ collection: 'meeting-slots', id: slot.id, user: editor, overrideAccess: false })).rejects.toThrow()
  })
  it('allows delegated user management without exposing Super Admin accounts or granting role management', async () => {
    await payload.update({ collection: 'roles', id: role.id, data: { permissions: { users: { view: true, create: true, edit: true, delete: true }, enquiries: { view: true } } } })
    const roles = await payload.find({ collection: 'roles', user: editor, overrideAccess: false })
    expect(roles.docs.map(doc => doc.name)).toContain('Editor')
    expect(roles.docs.map(doc => doc.name)).not.toContain('Super Admin')
    const users = await payload.find({ collection: 'users', user: editor, overrideAccess: false })
    expect(users.docs.map(doc => doc.id)).not.toContain(admin.id)
    await expect(payload.update({ collection: 'users', id: admin.id, user: editor, overrideAccess: false, data: { password: 'disallowed-test-password' } })).rejects.toThrow()
    await expect(payload.create({ collection: 'users', user: editor, overrideAccess: false, data: { name: 'Attempt', email: 'attempt@roles.test', password: 'roles-test-password-123', role: admin.role } })).rejects.toThrow()
    expect((await payload.find({ collection: 'form-submissions', user: editor, overrideAccess: false })).docs).toEqual([])
  })
})
