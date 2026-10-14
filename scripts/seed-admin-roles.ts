import 'dotenv/config'
import { getPayload } from 'payload'
import config from '../src/payload.config'
import { seedAdminRoles } from '../src/services/adminRoles'

const base = await config
// Add the relationship as nullable, backfill existing users, then enforce it.
// This avoids Payload's schema push proposing a reset of the existing Users table.
const payload = await getPayload({ config: Promise.resolve({ ...base,
  collections: base.collections.map(collection => collection.slug !== 'users' ? collection : {
    ...collection, fields: collection.fields.map(field => 'name' in field && field.name === 'role' ? { ...field, required: false } : field),
    flattenedFields: collection.flattenedFields.map(field => field.name === 'role' ? { ...field, required: false } : field),
  }),
}) })
await seedAdminRoles(payload)
const unassigned = await payload.count({ collection: 'users', where: { role: { exists: false } } })
if (!unassigned.totalDocs) await payload.db.pool.query('ALTER TABLE "users" ALTER COLUMN "role_id" SET NOT NULL')
console.log('Super Admin role ready; existing assigned roles preserved.')
await payload.destroy()
process.exit(0)
