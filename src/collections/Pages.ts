import {ownedForms} from '../fields/forms'
import {createOwnerForms,deleteOwnerForms} from '../services/forms'
import {revalidatePage,revalidateDeletedPage} from '../hooks/revalidate'
import type {CollectionConfig} from 'payload'
import {slugField} from 'payload'
import {authenticated,published} from '../access'
import {contentBlocks,pageSettings} from '../blocks/pageSections'

export const Pages:CollectionConfig={
 slug:'pages',
 labels:{singular:'Website page',plural:'Website pages'},
 admin:{group:'Website',useAsTitle:'title',defaultColumns:['title','slug','_status','updatedAt'],preview:(doc,{locale})=>`${process.env.FRONTEND_URL || 'http://localhost:3000'}/${locale || 'en'}/preview/${doc.id}`},
 defaultPopulate:{title:true,slug:true,sourceKey:true,_status:true},
 access:{read:published,create:authenticated,update:authenticated,delete:authenticated},
 hooks:{afterChange:[createOwnerForms,revalidatePage],beforeDelete:[deleteOwnerForms],afterDelete:[revalidateDeletedPage]},
 versions:{drafts:{autosave:true}},
 orderable:true,
 fields:[
  {name:'relationships',label:'Related content',type:'group',admin:{position:'sidebar',condition:data=>data.sourceKey==='sustainability-page'},fields:[{name:'goals',label:'Sustainability goals',type:'relationship',relationTo:'sustainability-goals',hasMany:true,admin:{isSortable:true}}]},
  {name:'title',type:'text',required:true,localized:true},
  slugField({useAsSlug:'title'}),
  {name:'sourceKey',type:'text',unique:true,admin:{hidden:true}},
  {type:'tabs',tabs:[
   {label:'Page content',fields:[{name:'layout',label:'Sections',type:'blocks',blocks:contentBlocks,admin:{initCollapsed:true}}]},
   {label:'Forms',fields:[ownedForms]},
   {label:'Page settings',fields:[{name:'page',label:false,type:'group',fields:pageSettings}]},
  ]},
 ],
}
