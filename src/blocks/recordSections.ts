import {articleContent} from '../fields/articleContent'
import type {Block,Field} from 'payload'
import {createHash} from 'node:crypto'
import {pageFields as flatten,standardBlocks,databaseNames,enabledField,mediaPositionField} from './pageSections'
import {pageFields as products} from '../fields/pages/Products'
import {pageFields as categories} from '../fields/pages/Categories'
import {pageFields as news} from '../fields/pages/News'
import {pageFields as sustainability} from '../fields/pages/Sustainability'
import {pageFields as jobs} from '../fields/pages/Jobs'
import {pageFields as events} from '../fields/pages/Events'

const schemas={products,categories,news,sustainability,jobs,events}
export type ContentCollection=keyof typeof schemas
const definitions:Record<ContentCollection,{name:string;label:string;page:string[];root?:Record<string,string>}[]>={
 products:[
  {name:'hero',label:'Hero',page:['hero']},
  {name:'overview',label:'Product overview and specifications',page:['overview','description','specifications','packaging','storage','documents','specificationIntro']},
  {name:'gallery',label:'Gallery',page:['galleryIntro'],root:{gallery:'gallery'}},
  {name:'related',label:'Related products',page:['relatedProducts']},
  {name:'enquiry',label:'Enquiry',page:['enquiry','allProducts']},
 ],
 categories:[
  {name:'hero',label:'Hero',page:['hero']},
  {name:'range',label:'Product range',page:['productRange']},
  {name:'gallery',label:'Gallery',page:['galleryIntro'],root:{gallery:'gallery'}},
  {name:'traceability',label:'Traceability and enquiry',page:['traceability','allProducts']},
 ],
 news:[
  {name:'hero',label:'Article hero',page:[],root:{summary:'textarea',hero:'upload',heroAlt:'text',heroCaption:'text'}},
  {name:'body',label:'Article content',page:[],root:{body:'richText'}},
  {name:'related',label:'Related articles',page:[]},
  {name:'contact',label:'Contact call to action',page:[]},
 ],
 sustainability:[
  {name:'hero',label:'Article hero',page:[],root:{summary:'textarea',kicker:'text',badge:'text',heroImage:'upload',heroAlt:'text',heroCaption:'text'}},
  {name:'body',label:'Article content',page:[],root:{railIntro:'textarea',note:'textarea'}},
 ],
 jobs:[
  {name:'hero',label:'Job hero',page:[],root:{summary:'textarea',hero:'upload',heroAlt:'text'}},
  {name:'body',label:'Job description and role summary',page:[],root:{body:'richText'}},
  {name:'apply',label:'Application form',page:[]},
  {name:'related',label:'Related jobs',page:[]},
 ],
 events:[
  {name:'hero',label:'Event hero',page:[],root:{eyebrow:'text',summary:'textarea',heroImage:'upload',heroAlt:'text',heroCaption:'text'}},
  {name:'body',label:'Event content',page:[],root:{body:'richText'}},
 ],
}
import {galleryField} from '../fields/gallery'
const recordSections=Object.entries(definitions).flatMap(([collection,sections])=>sections.map(section=>({...section,collection:collection as ContentCollection,slug:`${({products:'prd',categories:'cat',news:'news',sustainability:'sus',jobs:'job',events:'event'} as Record<string,string>)[collection]}-${section.name==='overview'?'info':section.name==='traceability'?'cta':section.name}`})))
export function recordSettings(collection:ContentCollection):Field[]{
 const owned=recordSections.filter(section=>section.collection===collection).flatMap(section=>section.page)
 return flatten(schemas[collection]).filter(field=>'name' in field && !owned.includes(field.name) && !(collection==='news'&&field.name==='article') && !(collection==='events'&&field.name==='body')).map(field=>({...field,admin:{...field.admin,condition:undefined}} as Field))
}
export function recordImageSettings(collection:'products'|'categories'):Field[]{
 const fields=recordSettings(collection)
 const artwork=fields.filter(field=>'name' in field && field.name==='artwork')
 return [{type:'tabs',tabs:[{label:'Card images',fields:artwork},{label:'Record settings',fields:fields.filter(field=>!('name' in field && field.name==='artwork'))}]}]
}
function recordBlocks(collection:ContentCollection):Block[]{
 const shared=standardBlocks.map(block=>{
  const key=`${collection}_${block.slug}`
  return {...block,dbName:`rb_${createHash('sha1').update(key).digest('hex').slice(0,12)}`,fields:databaseNames(block.fields,key)}
 })
 const native=recordSections.filter(section=>section.collection===collection).map((section):Block=>{
  const key=`${collection}_${collection}-detail-${section.name}`
  const fields=flatten(schemas[collection]).filter(field=>'name' in field && section.page.includes(field.name)).map(field=>({...field,...(field.type==='group'?{fields:field.fields.filter(child=>!('name' in child && child.name==='enabled'))}:{}),admin:{...field.admin,condition:undefined}} as Field))
  const root=Object.entries(section.root??{}).map(([name,type]):Field=>type==='gallery'?galleryField(name,'Images'):type==='upload'?{name,type:'upload',relationTo:'media',localized:true}:type==='richText'?{...articleContent,name}:type==='textarea'?{name,type:'textarea',localized:true}:{name,type:'text',localized:true})
  for(const field of fields)if(section.name==='hero' && field.type==='group' && 'name' in field && field.name==='hero')field.fields=field.fields.filter(child=>!('name' in child && child.name==='heading'))
  const rootFields=databaseNames([...root,...(collection==='sustainability' && section.name==='body'?[articleContent]:[])],`${key}_content`).map(field=>collection==='events' && 'name' in field && field.name==='body'?{...field,name:'bodyCopy',label:'Body'} as Field:field)
  return {slug:section.slug,dbName:`rb_${createHash('sha1').update(key).digest('hex').slice(0,12)}`,labels:{singular:section.label,plural:section.label},admin:{group:'Record sections'},fields:[enabledField,...(fields.length||root.length?[mediaPositionField]:[]),...(fields.length||rootFields.length?[{name:'data',type:'group',label:false,fields:[...databaseNames(fields,`${key}_content_page`),...rootFields]} as Field]:[])]}
 })
 return [...shared,...native]
}
export function recordLayoutField(collection:ContentCollection):Field{return {name:'layout',label:'Sections',type:'blocks',blocks:recordBlocks(collection),admin:{initCollapsed:true}}}
