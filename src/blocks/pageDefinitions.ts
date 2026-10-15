import { pageFields } from './sharedSections'
import type { Field } from 'payload'
import { pageFields as HomePage } from '../fields/pages/HomePage'
import { pageFields as AboutPage } from '../fields/pages/AboutPage'
import { pageFields as QualityPage } from '../fields/pages/QualityPage'
import { pageFields as ProductsPage } from '../fields/pages/ProductsPage'
import { pageFields as DownloadsPage } from '../fields/pages/DownloadsPage'
import { pageFields as NewsPage } from '../fields/pages/NewsPage'
import { pageFields as SustainabilityPage } from '../fields/pages/SustainabilityPage'
import { pageFields as CareersPage } from '../fields/pages/CareersPage'
import { pageFields as EventsPage } from '../fields/pages/EventsPage'
import { pageFields as BookingPage } from '../fields/pages/BookingPage'
import { pageFields as ContactPage } from '../fields/pages/ContactPage'
import { pageFields as PrivacyPage } from '../fields/pages/PrivacyPage'
import { pageFields as TermsPage } from '../fields/pages/TermsPage'
import { pageFields as CookiesPage } from '../fields/pages/CookiesPage'
import { pageFields as ThankYouPage } from '../fields/pages/ThankYouPage'
import { pageFields as SearchPage } from '../fields/pages/SearchPage'
import { pageFields as NotFoundPage } from '../fields/pages/NotFoundPage'

type PageSection = { name: string; label: string; fields: Field[] }
function definePage(
  key: string,
  slug: string,
  label: string,
  schema: Field[],
  sections: [name: string, label: string, paths?: string[]][],
  settings: (string | [name: string, fields: string[]])[],
) {
  const fields = pageFields(schema)
  function fieldAt(path: string): Field {
    let list = fields
    let field: Field | undefined
    for (const name of path.split('.')) {
      field = list.find((field) => 'name' in field && field.name === name)
      if (!field) throw new Error(`Missing page field: ${key}/${path}`)
      list = 'fields' in field ? field.fields : []
    }
    return field!
  }
  const resolved: PageSection[] = sections.map(([name, label, paths = [name]]) => ({
    name,
    label,
    fields: paths.flatMap((path) => {
      const field = fieldAt(path)
      return !path.includes('.') && field.type === 'group' ? field.fields : [field]
    }),
  }))
  return {
    key,
    slug,
    label,
    sections: resolved,
    settings: settings.map((setting) => {
      if (typeof setting === 'string') return fieldAt(setting)
      const [name, names] = setting
      const field = fieldAt(name)
      if (field.type !== 'group') throw new Error(`Expected settings group: ${key}/${name}`)
      return {
        ...field,
        fields: field.fields.filter((child) => 'name' in child && names.includes(child.name)),
      }
    }),
  }
}

export const pageDefinitions = [
  definePage(
    'home-page',
    'home',
    'Home',
    HomePage,
    [
      ['hero', 'Hero'],
      ['figures', 'Key figures'],
      ['story', 'Our story'],
      ['products', 'Products'],
      ['certifications', 'Certifications'],
      ['sourcing', 'Sourcing'],
      ['process', 'Process'],
      ['quality', 'Quality'],
      ['reach', 'Global reach'],
      ['contact', 'Contact and enquiry form'],
    ],
    ['seo'],
  ),
  definePage(
    'about-page',
    'about',
    'About us',
    AboutPage,
    [
      ['hero', 'Hero'],
      ['story', 'Our story'],
      ['vision', 'Mission and vision'],
      ['values', 'Our values'],
      ['technology', 'Technology'],
      ['facility', 'Facility'],
    ],
    ['seo'],
  ),
  definePage(
    'quality-page',
    'quality',
    'Quality',
    QualityPage,
    [
      ['hero', 'Hero'],
      ['credentials', 'Certifications'],
      ['roadmap', 'Quality roadmap'],
      ['technology', 'Technology'],
      ['sourcing', 'Sourcing'],
    ],
    ['seo'],
  ),
  definePage(
    'products-page',
    'products',
    'Products',
    ProductsPage,
    [
      ['hero', 'Hero'],
      ['collection', 'Product catalogue'],
      ['deep', 'Certifications and documentation'],
    ],
    ['seo'],
  ),
  definePage(
    'downloads-page',
    'downloads',
    'Downloads',
    DownloadsPage,
    [
      ['hero', 'Hero'],
      ['product', 'Product downloads'],
      ['company', 'Company downloads'],
    ],
    ['emptyStates', 'seo'],
  ),
  definePage(
    'news-page',
    'news',
    'News',
    NewsPage,
    [
      [
        'hero',
        'Hero',
        ['copy.title', 'copy.kicker', 'copy.heroAlt', 'copy.description', 'heroImage'],
      ],
      ['articles', 'Articles', ['copy.empty']],
      [
        'events',
        'Events call to action',
        ['copy.eventsTitle', 'copy.eventsKicker', 'copy.eventsDescription'],
      ],
    ],
    [
      [
        'copy',
        [
          'seoTitle',
          'contactTitle',
          'relatedTitle',
          'contactKicker',
          'relatedKicker',
          'seoDescription',
          'contactDescription',
        ],
      ],
    ],
  ),
  definePage(
    'sustainability-page',
    'sustainability',
    'Sustainability',
    SustainabilityPage,
    [
      ['hero', 'Hero'],
      ['content', 'Articles'],
      ['related', 'Contact'],
    ],
    ['relatedTitle', 'relatedKicker', 'seo'],
  ),
  definePage(
    'careers-page',
    'careers',
    'Careers',
    CareersPage,
    [
      ['hero', 'Hero'],
      ['jobs', 'Vacancies'],
      ['apply', 'Applications'],
    ],
    ['emptyStates', 'seo'],
  ),
  definePage(
    'events-page',
    'events',
    'Events',
    EventsPage,
    [
      ['hero', 'Hero'],
      ['related', 'Upcoming events'],
      ['enquiry', 'Past events'],
      ['more', 'Event gallery'],
    ],
    ['seo'],
  ),
  definePage(
    'booking-page',
    'book-a-meeting',
    'Book a meeting',
    BookingPage,
    [
      ['hero', 'Hero'],
      ['bk_band', 'Meeting booking and confirmation'],
    ],
    ['seo'],
  ),
  definePage(
    'contact-page',
    'contact',
    'Contact',
    ContactPage,
    [
      ['hero', 'Hero'],
      ['related', 'Contact details and enquiry form'],
    ],
    ['seo'],
  ),
  definePage(
    'privacy-page',
    'privacy',
    'Privacy',
    PrivacyPage,
    [
      ['hero', 'Hero'],
      ['related', 'Privacy policy'],
    ],
    ['seo'],
  ),
  definePage(
    'terms-page',
    'terms',
    'Terms',
    TermsPage,
    [
      ['hero', 'Hero'],
      ['related', 'Terms and conditions'],
    ],
    ['seo'],
  ),
  definePage(
    'cookies-page',
    'cookies',
    'Cookies',
    CookiesPage,
    [
      ['hero', 'Hero'],
      ['related', 'Cookie policy'],
    ],
    ['seo'],
  ),
  definePage(
    'thank-you-page',
    'thank-you',
    'Thank you',
    ThankYouPage,
    [
      ['hero', 'Hero'],
      ['related', 'Recommended next steps'],
    ],
    ['seo'],
  ),
  definePage(
    'search-page',
    'search',
    'Search',
    SearchPage,
    [
      ['hero', 'Hero'],
      ['related', 'Search results'],
    ],
    ['seo'],
  ),
  definePage(
    'not-found-page',
    '404',
    'Page not found',
    NotFoundPage,
    [
      ['hero', 'Hero'],
      ['related', 'Page recovery links'],
    ],
    ['seo'],
  ),
]
