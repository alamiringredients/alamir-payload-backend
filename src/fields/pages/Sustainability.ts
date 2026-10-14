import type {Field} from 'payload'

export const pageFields:Field[]=[{name:'page',type:'group',label:false,fields:[{name:'metadata',type:'group',label:false,fields:[{name:'date',label:'Publication date',type:'text'},{name:'updatedDate',label:'Updated date',type:'text'},{name:'featured',type:'checkbox'}]}]}]
