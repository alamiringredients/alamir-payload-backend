import type { MigrateUpArgs, MigrateDownArgs } from '@payloadcms/db-postgres'
import { refreshPublicContent } from '../services/publicContent'

const labels = {
  en: ['Send application', 'Submit application'],
  ar: ['إرسال الطلب', 'تقديم الطلب'],
  fr: ['Envoyer la candidature', 'Soumettre la demande'],
} as const

async function apply({ payload, req }: MigrateUpArgs, reverse = false): Promise<void> {
  const request = {
    ...req,
    context: {
      ...req.context,
      disableRevalidate: true,
      disablePublicProjection: true,
      propagatingForms: true,
    },
  }
  for (const locale of ['en', 'ar', 'fr'] as const) {
    const { docs } = await payload.find({
      collection: 'forms',
      locale,
      fallbackLocale: false,
      depth: 0,
      pagination: false,
      where: { purpose: { equals: 'application' } },
      req: request,
    })
    for (const form of docs) {
      const [before, after] = reverse ? [...labels[locale]].reverse() : labels[locale]
      const fields = form.fields?.map((field) =>
        field.blockType === 'select' &&
        field.name === 'department' &&
        (reverse ? field.placeholder === 'Select a department' : !field.placeholder)
          ? { ...field, placeholder: reverse ? '' : 'Select a department' }
          : field,
      )
      const changedFields = fields?.some((field, index) => field !== form.fields?.[index])
      if (form.submitButtonLabel !== before && !changedFields) continue
      await payload.update({
        collection: 'forms',
        id: form.id,
        locale,
        depth: 0,
        data: {
          ...(changedFields ? { fields } : {}),
          ...(form.submitButtonLabel === before ? { submitButtonLabel: after } : {}),
        },
        req: request,
      })
    }
  }
  await refreshPublicContent(payload, ['forms'], req)
}

export async function up(args: MigrateUpArgs): Promise<void> {
  await apply(args)
}

export async function down(args: MigrateDownArgs): Promise<void> {
  await apply(args, true)
}
