import {galleryField} from '../fields/gallery'
import {createHash} from 'node:crypto'
import type {Block, Field} from 'payload'
import {pageDefinitions} from './pageDefinitions'

export function pageFields(fields:Field[]):Field[] {
 const page=fields.find(field=>'name' in field && field.name==='page')
 if(!page || !('fields' in page))return []
 return page.fields.flatMap(field=>field.type==='tabs'?field.tabs.flatMap(tab=>tab.fields):[field])
}
const sectionDefinitions=pageDefinitions.flatMap(page=>{
 const fields=pageFields(page.fields)
 if(page.slug==='news'){
  const copy=fields.find((field):field is Extract<Field,{type:'group'}> & {name:string}=>field.type==='group' && 'name' in field && field.name==='copy')!
  const groups=[{name:'hero',label:'Hero',keys:['title','kicker','heroAlt','description']},{name:'articles',label:'Articles',keys:['empty']},{name:'events',label:'Events call to action',keys:['eventsTitle','eventsKicker','eventsDescription']}]
  return groups.map(group=>({slug:`news-${group.name}`,pageKey:page.key,pageSlug:page.slug,name:group.name,sourceName:'copy',label:group.label,fields:[...copy.fields.filter(field=>'name' in field && group.keys.includes(field.name)),...(group.name==='hero'?[fields.find(field=>'name' in field && field.name==='heroImage')!]:[])]}))
 }
 const root=page.fields[0]
 const tabs=root && 'fields' in root ? root.fields.find(field=>field.type==='tabs') : undefined
 return fields.filter((field):field is Extract<Field,{type:'group'}> & {name:string}=>field.type==='group' && 'name' in field && typeof field.name==='string' && !['seo','sectionVisibility','emptyStates','metadata'].includes(field.name)).map(field=>{
  const label=tabs?.type==='tabs'?tabs.tabs.find(tab=>tab.fields.includes(field))?.label:undefined
  return {slug:`${page.slug}-${field.name}`,pageKey:page.key,pageSlug:page.slug,name:field.name,sourceName:field.name,label:typeof label==='string'?label:field.label || field.name,fields:field.fields}
 })
}).sort((a,b)=>{
 if(a.pageKey!==b.pageKey)return 0
 const order=a.pageSlug==='downloads'?['hero','product','company']:a.pageSlug==='home'?['hero','figures','story','products','certifications','sourcing','process','quality','reach','contact']:a.pageSlug==='quality'?['hero','credentials','roadmap','technology','sourcing']:[]
 return order.length?order.indexOf(a.name)-order.indexOf(b.name):0
})
export function databaseNames(fields:Field[],prefix:string):Field[] {
 return fields.map((field,index)=>{
  const name=`${prefix}_${'name' in field?field.name:index}`
  const result={...field}
  if('dbName' in result)result.dbName=`pb_${createHash('sha1').update(name).digest('hex').slice(0,12)}`
  if('fields' in result)result.fields=databaseNames(result.fields,name)
  if(result.type==='tabs')result.tabs=result.tabs.map((tab,index)=>({...tab,fields:databaseNames(tab.fields,`${name}_${index}`)}))
  return result
 })
}
export const mediaPositionField:Field={name:'mediaPosition',label:'Media position',type:'select',options:[{label:'Original design',value:'original'},{label:'Left',value:'left'},{label:'Right',value:'right'}],defaultValue:'original'}
export const columnWidthField:Field={name:'columnWidth',label:'Column widths',type:'select',defaultValue:'original',options:[{label:'Original design',value:'original'},{label:'50 / 50',value:'50-50'},{label:'55 / 45',value:'55-45'},{label:'60 / 40',value:'60-40'},{label:'70 / 30',value:'70-30'},{label:'40 / 60',value:'40-60'},{label:'30 / 70',value:'30-70'}]}
export const enabledField:Field={name:'enabled',label:'Show section',type:'checkbox',defaultValue:true}
const copy:Field[]=[{name:'eyebrow',label:'Eyebrow',type:'text',localized:true},{name:'heading',label:'Heading',type:'richText',localized:true},{name:'body',label:'Content',type:'richText',localized:true}]
const media:Field[]=[{name:'media',label:'Image or video',type:'upload',relationTo:'media'},{name:'poster',label:'Video poster',type:'upload',relationTo:'media'},{name:'caption',label:'Caption',type:'text',localized:true}]
export const standardBlocks:Block[]=[
 {slug:'form',labels:{singular:'Form',plural:'Forms'},admin:{group:'Content'},fields:[enabledField,...copy,{name:'form',type:'relationship',relationTo:'forms',required:true,filterOptions:{purpose:{equals:'custom'}}}]},
 {slug:'hero',labels:{singular:'Hero',plural:'Heroes'},admin:{group:'Content'},fields:[enabledField,mediaPositionField,...copy,...media]},
 {slug:'text',labels:{singular:'Text section',plural:'Text sections'},admin:{group:'Content'},fields:[enabledField,...copy]},
 {slug:'text-media',labels:{singular:'Two columns',plural:'Two columns'},admin:{group:'Content'},fields:[enabledField,{...mediaPositionField,defaultValue:'right'},
  columnWidthField,
  {name:'theme',label:'Background',type:'select',defaultValue:'plain',options:[{label:'Plain',value:'plain'},{label:'Tint',value:'tint'},{label:'Dark',value:'deep'}]},
  ...copy,{name:'rightContent',label:'Second column content',type:'richText',localized:true},...media,{name:'mediaAlt',label:'Alternative text',type:'text',localized:true},
  {name:'articles',label:'Related news articles',type:'relationship',relationTo:'news',hasMany:true,admin:{isSortable:true}},
  {name:'articleLinkLabel',label:'Article link label',type:'text',localized:true}]},
 {slug:'gallery',labels:{singular:'Gallery',plural:'Galleries'},admin:{group:'Content'},fields:[enabledField,...copy,galleryField('images','Images')]},
 {slug:'call-to-action',labels:{singular:'Call to action',plural:'Calls to action'},admin:{group:'Content'},fields:[enabledField,...copy,{name:'actions',type:'array',fields:[{name:'label',type:'text',localized:true,required:true},{name:'href',label:'Link',type:'text',required:true}]}]},
 ]
export const contentBlocks:Block[]=[...standardBlocks,
 ...sectionDefinitions.map((section):Block=>({slug:section.slug,dbName:`pb_${createHash('sha1').update(section.slug).digest('hex').slice(0,12)}`,labels:{singular:String(section.label),plural:String(section.label)},admin:{group:pageDefinitions.find(page=>page.key===section.pageKey)!.label},fields:[enabledField,mediaPositionField,columnWidthField,{name:'content',type:'group',label:false,fields:databaseNames(section.fields.filter(field=>!('name' in field && field.name==='enabled')),section.slug)}]})),
]
export const pageSettings:Field[]=[]
const newsCopy=pageFields(pageDefinitions.find(page=>page.slug==='news')!.fields).find(field=>'name' in field && field.name==='copy')
if(newsCopy?.type==='group')pageSettings.push({...newsCopy,fields:newsCopy.fields.filter(field=>'name' in field && !sectionDefinitions.filter(section=>section.pageSlug==='news').some(section=>section.fields.some(used=>'name' in used && used.name===field.name))),admin:{condition:data=>data.sourceKey==='news-page'}})
for(const definition of pageDefinitions){
 for(const field of pageFields(definition.fields).filter(field=>!('name' in field && field.name==='goals'))){
  if('name' in field && !sectionDefinitions.some(section=>section.pageKey===definition.key && section.sourceName===field.name) && field.name!=='sectionVisibility' && !(definition.slug==='news' && field.name==='heroImage')){
   const existing=pageSettings.find(existing=>'name' in existing && existing.name===field.name)
   if(existing){
    if(existing.type==='group' && field.type==='group'){
     existing.fields.push(...databaseNames(field.fields,'page_settings').filter(child=>!existing.fields.some(saved=>'name' in saved && 'name' in child && saved.name===child.name)))
     existing.admin={...existing.admin,condition:undefined}
    }
    continue
   }
   pageSettings.push({...databaseNames([field],'page_settings')[0],admin:{...field.admin,hidden:field.name==='goals',condition:field.name==='seo'?undefined:(_data:Record<string,unknown>)=>_data.sourceKey===definition.key}} as Field)
  }
 }
}

for(const field of pageSettings){
 if(field.type!=='group' || !('name' in field) || !['copy','emptyStates'].includes(field.name))continue
 const owners=pageDefinitions.filter(definition=>pageFields(definition.fields).some(original=>'name' in original && original.name===field.name))
 field.admin={...field.admin,condition:data=>owners.some(owner=>owner.key===data.sourceKey)}
 for(const child of field.fields){
  if(!('name' in child))continue
  const keys=owners.filter(owner=>pageFields(owner.fields).some(original=>original.type==='group' && 'name' in original && original.name===field.name && original.fields.some(item=>'name' in item && item.name===child.name))).map(owner=>owner.key)
  child.admin={...child.admin,condition:data=>keys.includes(data.sourceKey)}
 }
}
