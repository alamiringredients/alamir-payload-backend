import type {Block,RichTextField} from 'payload'
import {lexicalEditor,BlocksFeature,EXPERIMENTAL_TableFeature,UploadFeature} from '@payloadcms/richtext-lexical'
import {standardBlocks} from '../blocks/sharedSections'

const figures:Block={slug:'figures',labels:{singular:'Figures',plural:'Figures'},fields:[{name:'items',type:'array',fields:[{name:'value',type:'text',required:true},{name:'label',type:'text',required:true}]}]}
const facts:Block={slug:'facts',labels:{singular:'Facts',plural:'Facts'},fields:[{name:'heading',label:'Heading',type:'richText'},{name:'items',label:'Facts',type:'array',fields:[{name:'label',label:'Fact',type:'text',required:true},{name:'value',label:'Value',type:'text',required:true}]}]}
const callout:Block={slug:'callout',labels:{singular:'Callout',plural:'Callouts'},fields:[{name:'body',label:'Content',type:'richText',required:true}]}
export const articleContent:RichTextField={
 name:'body',label:'Article content',type:'richText',localized:true,
 editor:lexicalEditor({features:({defaultFeatures})=>[
  ...defaultFeatures,
  BlocksFeature({blocks:[figures,facts,callout,...standardBlocks.filter(block=>block.slug!=='hero')]}),
  EXPERIMENTAL_TableFeature(),
  UploadFeature({collections:{media:{fields:[{name:'alt',label:'Alternative text',type:'text'},{name:'caption',type:'text'},{name:'captionLabel',label:'Caption label',type:'text'}]}}}),
 ]}),
}
