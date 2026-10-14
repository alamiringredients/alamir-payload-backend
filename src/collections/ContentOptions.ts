import {slugField,type CollectionConfig} from 'payload'
import {authenticated,published} from '../access'
import {revalidatePage,revalidateDeletedPage} from '../hooks/revalidate'
const options=(slug:string,label:string,group:string,extra:CollectionConfig['fields']):CollectionConfig=>({
 slug,labels:{singular:label,plural:label+'s'},orderable:true,admin:{group,useAsTitle:'name',defaultColumns:['name','_status']},
 defaultPopulate:{name:true,key:true,reference:true,color:true,image:true,alt:true},
 access:{read:published,create:authenticated,update:authenticated,delete:authenticated},versions:{drafts:true},hooks:{afterChange:[revalidatePage],afterDelete:[revalidateDeletedPage]},
 fields:[{name:'sourceId',type:'number',unique:true,admin:{hidden:true}},{name:'name',type:'text',localized:true,required:true},...extra],
})
export const ProductApplications=options('product-applications','Product application','Products',[slugField({name:'key',useAsSlug:'name'})])
export const ProductConcentrations=options('product-concentrations','Concentration range','Products',[slugField({name:'key',useAsSlug:'name'})])
export const SustainabilityGoals=options('sustainability-goals','Sustainability goal','Sustainability',[{name:'reference',label:'SDG number',type:'number',required:true,unique:true,min:1,max:17},{name:'color',type:'text',validate:(value:unknown)=>!value || typeof value==='string' && /^#[0-9a-f]{6}$/i.test(value) || 'Choose a valid color.',admin:{components:{Field:'/components/ColorField#ColorField'}}},{name:'image',type:'upload',relationTo:'media'},{name:'alt',type:'text',localized:true}])
