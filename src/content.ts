import {ProductApplications,ProductConcentrations,SustainabilityGoals} from './collections/ContentOptions'
import {Pages} from './collections/Pages'
import { WebsiteSettings } from './globals/WebsiteSettings'
import { Navigation } from './globals/Navigation'
import { Categories } from './collections/Categories'
import { Products } from './collections/Products'
import { CertificationTypes } from './collections/CertificationTypes'
import { Certifications } from './collections/Certifications'
import { NewsTaxonomies } from './collections/NewsTaxonomies'
import { News } from './collections/News'
import { Sustainability } from './collections/Sustainability'
import { Jobs } from './collections/Jobs'
import { Events } from './collections/Events'
import { Translations } from './collections/Translations'

export const globals = [WebsiteSettings, Navigation]
export const collections = [ProductApplications,ProductConcentrations,SustainabilityGoals,Pages,Categories, Products, CertificationTypes, Certifications, NewsTaxonomies, News, Sustainability, Jobs, Events, Translations]
