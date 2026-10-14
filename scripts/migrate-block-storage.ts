import 'dotenv/config'
import {createLocalReq,getPayload} from 'payload'
import {postgresAdapter} from '@payloadcms/db-postgres'
import {up} from '../src/migrations/20261014_blocks_as_json'
import config from '../src/payload.config'

process.umask(0o077)
const base=await config
const payload=await getPayload({key:'blocks-storage-migration',config:Promise.resolve({...base,onInit:()=>{},db:{...postgresAdapter({pool:{connectionString:process.env.DATABASE_URL},blocksAsJSON:true,push:false}),name:'postgres',allowIDOnCreate:false}})})
const req=await createLocalReq({context:{disableRevalidate:true}},payload)
const transaction=await payload.db.beginTransaction()
if(!transaction)throw new Error('Migration transaction could not start.')
req.transactionID=transaction
const session=payload.db.sessions?.[transaction]
if(!session)throw new Error('Migration transaction is unavailable.')
try{
 await up({db:session.db as Parameters<typeof up>[0]['db'],payload,req})
 const applied=await payload.find({collection:'payload-migrations',where:{name:{equals:'20261014_blocks_as_json'}},limit:1,req})
 if(!applied.docs.length)await payload.create({collection:'payload-migrations',data:{name:'20261014_blocks_as_json',batch:1},req})
 await payload.db.commitTransaction(transaction)
 console.log('Payload blocks and versions migrated to native JSON storage.')
}catch(error){await payload.db.rollbackTransaction(transaction);throw error}
process.exit(0)
