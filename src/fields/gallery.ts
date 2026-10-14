import type { Field } from 'payload'

export const galleryField = (name: string, label: string): Field => ({
  name, label, type: 'array',
  labels: { singular: 'Image', plural: 'Images' },
  admin: { initCollapsed: false },
  fields: [
    { name: 'image', type: 'upload', relationTo: 'media', required: true },
    { name: 'caption', type: 'textarea', localized: true },
    { name: 'alt', label: 'Alternative text', type: 'text', localized: true },
  ],
})

export const artworkField:Field={name:'artwork',type:'group',label:'Card artwork',fields:[galleryField('images','Images'),{name:'enabled',type:'checkbox',defaultValue:true}]}
