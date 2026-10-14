import type {Field,FieldHook} from 'payload'
const plain=(node:unknown):string=>{
 if(!node || typeof node!=='object')return ''
 const value=node as {text?:string;children?:unknown[];root?:unknown}
 if(value.root)return plain(value.root)
 return value.text??value.children?.map(plain).join('')??''
}
const titleLabel:FieldHook=({data,value})=>plain(data?.title)||value
export const titleFields:Field[]=[{name:'title',label:'Title',type:'richText',localized:true,required:true},{name:'name',type:'text',localized:true,admin:{hidden:true},hooks:{beforeValidate:[titleLabel]}}]
