import 'dotenv/config'
import {afterAll,beforeAll,expect,it} from 'vitest'
import {getPayload,type Payload} from 'payload'
import {randomUUID} from 'node:crypto'
import {access} from 'node:fs/promises'
import path from 'node:path'
import sharp from 'sharp'
import config from '../../src/payload.config'
import content from '../../seed/content.json'

const mediaDefaults=content.collections.media.map(record=>record.data.en)
let payload:Payload
beforeAll(async()=>{payload=await getPayload({config})},60000)
afterAll(async()=>{await payload?.destroy()},60000)

it('resolves the seeded media records to their existing R2 objects',async()=>{
  const {docs}=await payload.find({collection:'media',pagination:false,depth:0})
  const bySource=new Map(docs.map(doc=>[doc.sourceUrl,doc]))
  for(const source of mediaDefaults){
    const doc=bySource.get(source.sourceUrl)
    expect(doc,source.sourceUrl).toBeDefined()
    expect(doc?.url).toBe(source.sourceUrl)
    expect(doc?.filename).toBe(source.filename)
    expect(doc?.prefix).toBe(source.prefix)
    if(source.mimeType.startsWith('image/'))expect(doc?.thumbnailURL).toBe(source.sourceUrl)
  }
  const images=mediaDefaults.filter(source=>source.mimeType.startsWith('image/'))
  for(let index=0;index<images.length;index+=8)
    await Promise.all(images.slice(index,index+8).map(async source=>{
      const response=await fetch(source.sourceUrl,{cache:'no-store',signal:AbortSignal.timeout(15000)})
      expect(response.status,source.sourceUrl).toBe(200)
      expect(response.headers.get('content-type')?.split(';')[0],source.sourceUrl).toBe(source.mimeType)
      const bytes=Buffer.from(await response.arrayBuffer())
      const image=await sharp(bytes).metadata()
      expect(image.format,source.sourceUrl).toBe(source.mimeType==='image/svg+xml'?'svg':source.mimeType.slice(6))
      expect(image.width,source.sourceUrl).toBe(source.width)
      expect(image.height,source.sourceUrl).toBe(source.height)
    }))
},60000)

it('uploads and replaces an image in R2, serves its bytes, and removes it on deletion',async()=>{
  const bytes=await sharp({create:{width:2,height:3,channels:4,background:'#c7422d'}}).png().toBuffer()
  const filename=`r2-verification-${randomUUID()}.png`
  let doc=await payload.create({
    collection:'media',
    data:{alt:'Temporary R2 storage verification'},
    file:{data:bytes,name:filename,mimetype:'image/png',size:bytes.length},
  })
  try {
    expect(doc.prefix).toBe('payload/media')
    expect(new URL(doc.url!).origin).toBe(new URL(process.env.R2_PUBLIC_URL!).origin)
    expect(doc.width).toBe(2)
    expect(doc.height).toBe(3)
    await expect(access(path.resolve('media',doc.filename!))).rejects.toMatchObject({code:'ENOENT'})
    const response=await fetch(doc.url!)
    expect(response.status).toBe(200)
    expect(Buffer.from(await response.arrayBuffer()).equals(bytes)).toBe(true)
    const previousURL=doc.url!
    const replacement=await sharp({create:{width:3,height:2,channels:4,background:'#15293d'}}).png().toBuffer()
    doc=await payload.update({
      collection:'media',id:doc.id,data:{alt:'Temporary replacement verification'},
      file:{data:replacement,name:`r2-replacement-${randomUUID()}.png`,mimetype:'image/png',size:replacement.length},
    })
    expect(doc.prefix).toBe('payload/media')
    expect(doc.width).toBe(3)
    expect(doc.height).toBe(2)
    expect(doc.thumbnailURL).toBe(doc.url)
    const replaced=await fetch(doc.url!)
    expect(replaced.status).toBe(200)
    expect(Buffer.from(await replaced.arrayBuffer()).equals(replacement)).toBe(true)
    expect((await fetch(previousURL,{method:'HEAD',cache:'no-store'})).status).toBe(404)
  } finally {
    await payload.delete({collection:'media',id:doc.id})
  }
  const deleted=await fetch(doc.url!,{method:'HEAD',cache:'no-store'})
  expect(deleted.status).toBe(404)
})
