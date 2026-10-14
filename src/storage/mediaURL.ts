export function mediaURL(filename: string, prefix = '') {
  const key = prefix ? `${prefix}/${filename}` : filename
  return `${process.env.R2_PUBLIC_URL!.replace(/\/$/, '')}/${key.split('/').map(encodeURIComponent).join('/')}`
}
