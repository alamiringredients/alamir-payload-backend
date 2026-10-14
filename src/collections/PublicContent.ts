import type {CollectionConfig} from 'payload'

// Derived public documents. Editors continue to use the source collections and globals.
export const PublicContent:CollectionConfig={
 slug:'public-content',
 admin:{hidden:true},
 access:{read:()=>true,create:()=>false,update:()=>false,delete:()=>false},
 fields:[
  {name:'resource',type:'text',required:true,unique:true,index:true},
  {name:'content',type:'json',required:true},
  {name:'summary',type:'json'},
  {name:'localizedContent',type:'json'},
  {name:'localizedSummary',type:'json'},
 ],
}
