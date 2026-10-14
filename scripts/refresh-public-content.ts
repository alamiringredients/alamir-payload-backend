import 'dotenv/config'
import {getPayload} from 'payload'
import config from '../src/payload.config'
import {refreshPublicContent} from '../src/services/publicContent'

const payload=await getPayload({config})
await refreshPublicContent(payload)
console.log('Published public content projections refreshed without changing source documents.')
process.exit(0)
