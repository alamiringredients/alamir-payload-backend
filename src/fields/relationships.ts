import type {Field,RelationshipField,CollectionSlug} from 'payload'
const relationship=(name:string,label:string,relationTo:CollectionSlug,hasMany=false):RelationshipField=>hasMany?{name,label,type:'relationship',relationTo,hasMany:true,admin:{isSortable:true}}:{name,label,type:'relationship',relationTo}

export function recordRelationships(collection:string):Field[]{
 const fields:Field[]=collection==='news'?[
  {...relationship('category','Category','news-taxonomies'),filterOptions:{kind:{equals:'category'}}},
  {...relationship('tags','Tags','news-taxonomies',true),filterOptions:{kind:{equals:'tag'}}},
  relationship('previousArticle','Previous article','news'),relationship('nextArticle','Next article','news'),relationship('relatedArticles','Related articles','news',true),
 ]:collection==='sustainability'?[
  relationship('goals','Sustainability goals','sustainability-goals',true),relationship('primaryGoal','Primary goal','sustainability-goals'),relationship('relatedArticles','Related articles','sustainability',true),
 ]:collection==='products'?[
  relationship('applications','Applications','product-applications',true),relationship('concentrations','Concentrations','product-concentrations',true),
 ]:[]
 return fields.length?[{name:'relationships',label:'Related content',type:'group',admin:{position:'sidebar'},fields}]:[]
}
export const selectedArticles:Field=relationship('articles','News articles','news',true)
