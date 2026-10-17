import { ValidationError, type CollectionBeforeOperationHook } from 'payload'

export const validateCVUpload: CollectionBeforeOperationHook = ({ req, operation }) => {
  if (operation !== 'create' && operation !== 'update') return
  const file = req.file
  if (!file) return
  if (file.size > 10 * 1024 * 1024 || !(
    file.data.subarray(0, 5).toString() === '%PDF-' ||
    (file.data.subarray(0, 2).toString() === 'PK' && file.data.includes(Buffer.from('word/')))
  )) throw new ValidationError({
    errors: [{ path: 'cv', message: 'Use a valid PDF or DOCX file up to 10 MB.' }],
  })
}
