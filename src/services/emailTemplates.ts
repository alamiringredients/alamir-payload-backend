export const escapeHTML = (value: string) =>
  value.replace(
    /[&<>"']/g,
    (character) =>
      ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;' })[character]!,
  )

export function meetingEmail(input: {
  to: string
  name: string
  title: string
  when: string
  timezone?: string
  locale: string
  brandName: string
  copy: Record<string, string>
}) {
  const replace = (value: string) =>
    value.replace(/\{(name|title|when)\}/g, (_, key: 'name' | 'title' | 'when') => input[key])
  const subject = replace(input.copy.subject)
  const greeting = replace(input.copy.greeting)
  const details = replace(input.copy.details) + (input.timezone ? ` (${input.timezone}).` : '.')
  return {
    to: input.to,
    subject,
    text: `${greeting}\n\n${details}\n\n${input.copy.help}`,
    html: `<!doctype html><html lang="${input.locale}"><body style="margin:0;background:#f1f0eb;font-family:Arial,sans-serif;color:#17283a"><table role="presentation" width="100%"><tr><td align="center" style="padding:40px 16px"><table role="presentation" width="600" style="max-width:600px;background:#fff;border-radius:14px;border-top:5px solid #c8402c"><tr><td style="padding:40px"><p style="color:#c8402c;font-weight:700">${escapeHTML(input.brandName)}</p><h1 style="font-family:Georgia,serif">${escapeHTML(subject)}</h1><p>${escapeHTML(greeting)}</p><p>${escapeHTML(input.copy.confirmed)}</p><p style="padding:18px;background:#f4f6f7;border-radius:10px"><strong>${escapeHTML(input.title)}</strong><br>${escapeHTML(input.when)}${input.timezone ? `<br>${escapeHTML(input.timezone)}` : ''}</p><p>${escapeHTML(input.copy.help)}</p></td></tr></table></td></tr></table></body></html>`,
  }
}
