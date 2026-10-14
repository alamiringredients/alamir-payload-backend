import type {Field} from 'payload'
export const navigationLinkFields:Field[]=[
 {name:'label',type:'text',localized:true},
 {name:'linkType',label:'Link to',type:'select',options:[{label:'Website page',value:'page'},{label:'Custom URL',value:'url'}],defaultValue:'page',required:true},
 {name:'page',type:'relationship',relationTo:'pages',validate:(value:unknown,{siblingData}:{siblingData:Record<string,unknown>})=>siblingData.linkType==='page' && !value?'Select a website page.':true,admin:{condition:(_data,sibling)=>sibling.linkType!=='url'}},
 {name:'url',label:'URL',type:'text',validate:(value:unknown,{siblingData}:{siblingData:Record<string,unknown>})=>siblingData.linkType==='url' && !value?'Enter a URL.':true,admin:{condition:(_data,sibling)=>sibling.linkType==='url'}},
]
export const navigationMenus:Field[]=[
 {name:'headerLeft',label:'Links before the logo',type:'array',fields:navigationLinkFields},
 {name:'headerRight',label:'Links after the logo',type:'array',fields:navigationLinkFields},
]

export const footerMenus:Field[]=[
 {name:'footerExplore',label:'Explore links',type:'array',fields:navigationLinkFields},
 {name:'footerCompany',label:'Company links',type:'array',fields:navigationLinkFields},
 {name:'footerLegal',label:'Legal links',type:'array',fields:navigationLinkFields},
]
