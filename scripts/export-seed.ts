import 'dotenv/config'
import { writeFile } from 'node:fs/promises'
import { getPayload } from 'payload'
import config from '../src/payload.config'
import { dashboardSnapshot } from './seed-data'

const payload = await getPayload({ config })
try {
  const snapshot = await dashboardSnapshot(payload)
  await writeFile(
    new URL('../seed/content.json', import.meta.url),
    JSON.stringify(snapshot, null, 2) + '\n',
  )
  console.log('Captured current dashboard defaults in English, Arabic and French.')
  console.log(
    Object.fromEntries(
      Object.entries(snapshot.collections).map(([slug, records]) => [slug, records.length]),
    ),
  )
} finally {
  await payload.destroy()
}

process.exit(0)
