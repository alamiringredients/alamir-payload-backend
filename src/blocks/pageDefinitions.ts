import type {Field} from 'payload'
import {pageFields as HomePage} from '../fields/pages/HomePage'
import {pageFields as AboutPage} from '../fields/pages/AboutPage'
import {pageFields as QualityPage} from '../fields/pages/QualityPage'
import {pageFields as ProductsPage} from '../fields/pages/ProductsPage'
import {pageFields as DownloadsPage} from '../fields/pages/DownloadsPage'
import {pageFields as NewsPage} from '../fields/pages/NewsPage'
import {pageFields as SustainabilityPage} from '../fields/pages/SustainabilityPage'
import {pageFields as CareersPage} from '../fields/pages/CareersPage'
import {pageFields as EventsPage} from '../fields/pages/EventsPage'
import {pageFields as BookingPage} from '../fields/pages/BookingPage'
import {pageFields as ContactPage} from '../fields/pages/ContactPage'
import {pageFields as PrivacyPage} from '../fields/pages/PrivacyPage'
import {pageFields as TermsPage} from '../fields/pages/TermsPage'
import {pageFields as CookiesPage} from '../fields/pages/CookiesPage'
import {pageFields as ThankYouPage} from '../fields/pages/ThankYouPage'
import {pageFields as SearchPage} from '../fields/pages/SearchPage'
import {pageFields as NotFoundPage} from '../fields/pages/NotFoundPage'

export const pageDefinitions: {key:string;slug:string;label:string;fields:Field[]}[] = [
  {key:'home-page',slug:'home',label:'Home',fields:HomePage},
  {key:'about-page',slug:'about',label:'About us',fields:AboutPage},
  {key:'quality-page',slug:'quality',label:'Quality',fields:QualityPage},
  {key:'products-page',slug:'products',label:'Products',fields:ProductsPage},
  {key:'downloads-page',slug:'downloads',label:'Downloads',fields:DownloadsPage},
  {key:'news-page',slug:'news',label:'News',fields:NewsPage},
  {key:'sustainability-page',slug:'sustainability',label:'Sustainability',fields:SustainabilityPage},
  {key:'careers-page',slug:'careers',label:'Careers',fields:CareersPage},
  {key:'events-page',slug:'events',label:'Events',fields:EventsPage},
  {key:'booking-page',slug:'book-a-meeting',label:'Book a meeting',fields:BookingPage},
  {key:'contact-page',slug:'contact',label:'Contact',fields:ContactPage},
  {key:'privacy-page',slug:'privacy',label:'Privacy',fields:PrivacyPage},
  {key:'terms-page',slug:'terms',label:'Terms',fields:TermsPage},
  {key:'cookies-page',slug:'cookies',label:'Cookies',fields:CookiesPage},
  {key:'thank-you-page',slug:'thank-you',label:'Thank you',fields:ThankYouPage},
  {key:'search-page',slug:'search',label:'Search',fields:SearchPage},
  {key:'not-found-page',slug:'404',label:'Page not found',fields:NotFoundPage},
]
