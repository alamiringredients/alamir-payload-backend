import type { Field, UploadField } from 'payload'

const companyProfile: UploadField = {
  name: 'companyProfile', label: 'Company profile PDF', type: 'upload', relationTo: 'media', localized: true,
  filterOptions: { mimeType: { equals: 'application/pdf' } },
  admin: { description: 'Upload or choose a PDF from Media. This file appears on product pages and in Downloads. Select the locale to provide a translated PDF.' },
  validate: async (value, { req }) => {
    if (!value) return true
    const id = typeof value === 'object' ? (value as { id: string | number }).id : value
    if (typeof id !== 'string' && typeof id !== 'number') return 'Choose a PDF file for the company profile.'
    const key = `companyProfilePDF:${id}`
    let pending = req.context[key] as Promise<boolean> | undefined
    if (!pending) {
      pending = req.payload.findByID({ collection: 'media', id, depth: 0, req, select: { mimeType: true }, disableErrors: true })
        .then(file => file?.mimeType === 'application/pdf')
      req.context[key] = pending
    }
    return await pending || 'Choose a PDF file for the company profile.'
  },
}

export const pageFields: Field[] = [{
  name: 'page', type: 'group', label: false,
  fields: [{ type: 'tabs', tabs: [
    { label: 'Branding', fields: [
      { name: 'siteName', label: 'Site name', type: 'text', localized: true },
      { name: 'icon', label: 'Site icon', type: 'upload', relationTo: 'media' },
      { name: 'logo', label: 'Alamir Ingredients logo', type: 'upload', relationTo: 'media' },
      { name: 'groupLogo', label: 'Alamir Group logo', type: 'upload', relationTo: 'media' },
      { name: 'socialImage', label: 'Social sharing image', type: 'upload', relationTo: 'media' },
    ] },
    { label: 'Contact & sales', fields: [{ name: 'company', type: 'group', label: false, fields: [
      { name: 'email', label: 'Sales email', type: 'email' },
      { name: 'phone', label: 'Main phone number', type: 'text' },
      { name: 'exportPhone', label: 'Export sales phone number', type: 'text' },
      { name: 'secondaryPhone', label: 'Additional sales phone number', type: 'text' },
      { name: 'salesWhatsapp', label: 'Sales WhatsApp link', type: 'text' },
      { name: 'address', label: 'Company address', type: 'textarea', localized: true },
      { name: 'website', label: 'Company website', type: 'text' },
      { name: 'socialLinks', label: 'Social media links', type: 'group', fields:
        Object.entries({ facebook: 'Facebook', instagram: 'Instagram', linkedin: 'LinkedIn', youtube: 'YouTube', whatsapp: 'WhatsApp' })
          .map(([name, label]) => ({ name, label, type: 'text' })),
      },
    ] }] },
    { label: 'Documents', fields: [companyProfile] },
    { label: 'SEO', fields: [
      { name: 'defaultSeoTitle', label: 'Default SEO title', type: 'text', localized: true },
      { name: 'defaultSeoDescription', label: 'Default SEO description', type: 'textarea', localized: true },
    ] },
  ] }],
}]
