import { type MigrateUpArgs, type MigrateDownArgs } from '@payloadcms/db-postgres'
import type { CollectionSlug, PayloadRequest } from 'payload'

type Change = {
  collection: CollectionSlug
  match: Record<string, string | number>
  locale: 'ar' | 'fr'
  path: (string | number)[]
  before: unknown
  after: unknown
}

// Values move into their native localized owner fields. Match only the old defaults
// so this migration preserves editorial changes on existing installations.
const changes: Change[] = [
  {
    collection: 'events',
    match: {
      sourceId: 5,
    },
    locale: 'ar',
    path: ['layout', 0, 'data', 'eyebrow'],
    before: 'Event recap',
    after: 'ملخص الفعالية',
  },
  {
    collection: 'events',
    match: {
      sourceId: 5,
    },
    locale: 'fr',
    path: ['layout', 0, 'data', 'eyebrow'],
    before: 'Event recap',
    after: 'Retour sur l’événement',
  },
  {
    collection: 'events',
    match: {
      sourceId: 6,
    },
    locale: 'ar',
    path: ['layout', 0, 'data', 'eyebrow'],
    before: 'Event recap',
    after: 'ملخص الفعالية',
  },
  {
    collection: 'events',
    match: {
      sourceId: 6,
    },
    locale: 'fr',
    path: ['layout', 0, 'data', 'eyebrow'],
    before: 'Event recap',
    after: 'Retour sur l’événement',
  },
  {
    collection: 'events',
    match: {
      sourceId: 7,
    },
    locale: 'ar',
    path: ['layout', 0, 'data', 'eyebrow'],
    before: 'Event recap',
    after: 'ملخص الفعالية',
  },
  {
    collection: 'events',
    match: {
      sourceId: 7,
    },
    locale: 'fr',
    path: ['layout', 0, 'data', 'eyebrow'],
    before: 'Event recap',
    after: 'Retour sur l’événement',
  },
  {
    collection: 'pages',
    match: {
      sourceKey: 'home-page',
    },
    locale: 'ar',
    path: ['title'],
    before: 'Home',
    after: 'الرئيسية',
  },
  {
    collection: 'pages',
    match: {
      sourceKey: 'home-page',
    },
    locale: 'fr',
    path: ['title'],
    before: 'Home',
    after: 'Sommaire',
  },
  {
    collection: 'pages',
    match: {
      sourceKey: 'about-page',
    },
    locale: 'ar',
    path: ['layout', 2, 'content', 'ctaLabel'],
    before: 'Get in touch',
    after: 'تواصل معنا',
  },
  {
    collection: 'pages',
    match: {
      sourceKey: 'about-page',
    },
    locale: 'fr',
    path: ['layout', 2, 'content', 'ctaLabel'],
    before: 'Get in touch',
    after: 'Contactez-nous',
  },
  {
    collection: 'pages',
    match: {
      sourceKey: 'products-page',
    },
    locale: 'ar',
    path: ['title'],
    before: 'Products',
    after: 'منتجات',
  },
  {
    collection: 'pages',
    match: {
      sourceKey: 'products-page',
    },
    locale: 'fr',
    path: ['title'],
    before: 'Products',
    after: 'Produits',
  },
  {
    collection: 'pages',
    match: {
      sourceKey: 'news-page',
    },
    locale: 'ar',
    path: ['title'],
    before: 'News',
    after: 'أخبار',
  },
  {
    collection: 'pages',
    match: {
      sourceKey: 'news-page',
    },
    locale: 'fr',
    path: ['title'],
    before: 'News',
    after: 'Nouvelles',
  },
  {
    collection: 'pages',
    match: {
      sourceKey: 'careers-page',
    },
    locale: 'ar',
    path: ['title'],
    before: 'Careers',
    after: 'وظائف',
  },
  {
    collection: 'pages',
    match: {
      sourceKey: 'careers-page',
    },
    locale: 'fr',
    path: ['title'],
    before: 'Careers',
    after: 'Carrières',
  },
  {
    collection: 'pages',
    match: {
      sourceKey: 'events-page',
    },
    locale: 'ar',
    path: ['title'],
    before: 'Events',
    after: 'الفعاليات',
  },
  {
    collection: 'pages',
    match: {
      sourceKey: 'events-page',
    },
    locale: 'fr',
    path: ['title'],
    before: 'Events',
    after: 'Événements',
  },
  {
    collection: 'pages',
    match: {
      sourceKey: 'booking-page',
    },
    locale: 'ar',
    path: ['title'],
    before: 'Book a meeting',
    after: 'احجز اجتماعاً',
  },
  {
    collection: 'pages',
    match: {
      sourceKey: 'booking-page',
    },
    locale: 'fr',
    path: ['title'],
    before: 'Book a meeting',
    after: 'Réserver un rendez-vous',
  },
  {
    collection: 'pages',
    match: {
      sourceKey: 'search-page',
    },
    locale: 'ar',
    path: ['title'],
    before: 'Search',
    after: 'بحث',
  },
  {
    collection: 'pages',
    match: {
      sourceKey: 'search-page',
    },
    locale: 'fr',
    path: ['title'],
    before: 'Search',
    after: 'Rechercher',
  },
  {
    collection: 'forms',
    match: {
      key: 'default:reservation',
    },
    locale: 'ar',
    path: ['fields', 5, 'options', 4, 'label'],
    before: 'Private label & contract packing',
    after: 'تسمية خاصة والتعبئة العقد',
  },
  {
    collection: 'forms',
    match: {
      key: 'default:reservation',
    },
    locale: 'ar',
    path: ['fields', 5, 'options', 5, 'label'],
    before: 'Facility visit in Sadat City',
    after: 'زيارة المنشأة بمدينة السادات',
  },
  {
    collection: 'forms',
    match: {
      key: 'default:reservation',
    },
    locale: 'ar',
    path: ['fields', 5, 'options', 6, 'label'],
    before: 'Meet us at an upcoming show',
    after: 'التقينا في العرض القادم',
  },
  {
    collection: 'forms',
    match: {
      key: 'default:reservation',
    },
    locale: 'ar',
    path: ['fields', 5, 'options', 7, 'label'],
    before: 'Something else',
    after: 'شيء آخر',
  },
  {
    collection: 'forms',
    match: {
      key: 'default:reservation',
    },
    locale: 'fr',
    path: ['fields', 5, 'options', 4, 'label'],
    before: 'Private label & contract packing',
    after: 'Étiquette privée & emballage contractuel',
  },
  {
    collection: 'forms',
    match: {
      key: 'default:reservation',
    },
    locale: 'fr',
    path: ['fields', 5, 'options', 5, 'label'],
    before: 'Facility visit in Sadat City',
    after: 'Visite des installations à Sadat City',
  },
  {
    collection: 'forms',
    match: {
      key: 'default:reservation',
    },
    locale: 'fr',
    path: ['fields', 5, 'options', 6, 'label'],
    before: 'Meet us at an upcoming show',
    after: 'Rendez-vous à un prochain spectacle',
  },
  {
    collection: 'forms',
    match: {
      key: 'default:reservation',
    },
    locale: 'fr',
    path: ['fields', 5, 'options', 7, 'label'],
    before: 'Something else',
    after: 'Autre chose',
  },
  {
    collection: 'forms',
    match: {
      key: 'events:1:reservation',
    },
    locale: 'ar',
    path: ['fields', 5, 'options', 4, 'label'],
    before: 'Private label & contract packing',
    after: 'تسمية خاصة والتعبئة العقد',
  },
  {
    collection: 'forms',
    match: {
      key: 'events:1:reservation',
    },
    locale: 'ar',
    path: ['fields', 5, 'options', 5, 'label'],
    before: 'Facility visit in Sadat City',
    after: 'زيارة المنشأة بمدينة السادات',
  },
  {
    collection: 'forms',
    match: {
      key: 'events:1:reservation',
    },
    locale: 'ar',
    path: ['fields', 5, 'options', 6, 'label'],
    before: 'Meet us at an upcoming show',
    after: 'التقينا في العرض القادم',
  },
  {
    collection: 'forms',
    match: {
      key: 'events:1:reservation',
    },
    locale: 'ar',
    path: ['fields', 5, 'options', 7, 'label'],
    before: 'Something else',
    after: 'شيء آخر',
  },
  {
    collection: 'forms',
    match: {
      key: 'events:1:reservation',
    },
    locale: 'fr',
    path: ['fields', 5, 'options', 4, 'label'],
    before: 'Private label & contract packing',
    after: 'Étiquette privée & emballage contractuel',
  },
  {
    collection: 'forms',
    match: {
      key: 'events:1:reservation',
    },
    locale: 'fr',
    path: ['fields', 5, 'options', 5, 'label'],
    before: 'Facility visit in Sadat City',
    after: 'Visite des installations à Sadat City',
  },
  {
    collection: 'forms',
    match: {
      key: 'events:1:reservation',
    },
    locale: 'fr',
    path: ['fields', 5, 'options', 6, 'label'],
    before: 'Meet us at an upcoming show',
    after: 'Rendez-vous à un prochain spectacle',
  },
  {
    collection: 'forms',
    match: {
      key: 'events:1:reservation',
    },
    locale: 'fr',
    path: ['fields', 5, 'options', 7, 'label'],
    before: 'Something else',
    after: 'Autre chose',
  },
  {
    collection: 'forms',
    match: {
      key: 'events:2:reservation',
    },
    locale: 'ar',
    path: ['fields', 5, 'options', 4, 'label'],
    before: 'Private label & contract packing',
    after: 'تسمية خاصة والتعبئة العقد',
  },
  {
    collection: 'forms',
    match: {
      key: 'events:2:reservation',
    },
    locale: 'ar',
    path: ['fields', 5, 'options', 5, 'label'],
    before: 'Facility visit in Sadat City',
    after: 'زيارة المنشأة بمدينة السادات',
  },
  {
    collection: 'forms',
    match: {
      key: 'events:2:reservation',
    },
    locale: 'ar',
    path: ['fields', 5, 'options', 6, 'label'],
    before: 'Meet us at an upcoming show',
    after: 'التقينا في العرض القادم',
  },
  {
    collection: 'forms',
    match: {
      key: 'events:2:reservation',
    },
    locale: 'ar',
    path: ['fields', 5, 'options', 7, 'label'],
    before: 'Something else',
    after: 'شيء آخر',
  },
  {
    collection: 'forms',
    match: {
      key: 'events:2:reservation',
    },
    locale: 'fr',
    path: ['fields', 5, 'options', 4, 'label'],
    before: 'Private label & contract packing',
    after: 'Étiquette privée & emballage contractuel',
  },
  {
    collection: 'forms',
    match: {
      key: 'events:2:reservation',
    },
    locale: 'fr',
    path: ['fields', 5, 'options', 5, 'label'],
    before: 'Facility visit in Sadat City',
    after: 'Visite des installations à Sadat City',
  },
  {
    collection: 'forms',
    match: {
      key: 'events:2:reservation',
    },
    locale: 'fr',
    path: ['fields', 5, 'options', 6, 'label'],
    before: 'Meet us at an upcoming show',
    after: 'Rendez-vous à un prochain spectacle',
  },
  {
    collection: 'forms',
    match: {
      key: 'events:2:reservation',
    },
    locale: 'fr',
    path: ['fields', 5, 'options', 7, 'label'],
    before: 'Something else',
    after: 'Autre chose',
  },
  {
    collection: 'forms',
    match: {
      key: 'events:3:reservation',
    },
    locale: 'ar',
    path: ['fields', 5, 'options', 4, 'label'],
    before: 'Private label & contract packing',
    after: 'تسمية خاصة والتعبئة العقد',
  },
  {
    collection: 'forms',
    match: {
      key: 'events:3:reservation',
    },
    locale: 'ar',
    path: ['fields', 5, 'options', 5, 'label'],
    before: 'Facility visit in Sadat City',
    after: 'زيارة المنشأة بمدينة السادات',
  },
  {
    collection: 'forms',
    match: {
      key: 'events:3:reservation',
    },
    locale: 'ar',
    path: ['fields', 5, 'options', 6, 'label'],
    before: 'Meet us at an upcoming show',
    after: 'التقينا في العرض القادم',
  },
  {
    collection: 'forms',
    match: {
      key: 'events:3:reservation',
    },
    locale: 'ar',
    path: ['fields', 5, 'options', 7, 'label'],
    before: 'Something else',
    after: 'شيء آخر',
  },
  {
    collection: 'forms',
    match: {
      key: 'events:3:reservation',
    },
    locale: 'fr',
    path: ['fields', 5, 'options', 4, 'label'],
    before: 'Private label & contract packing',
    after: 'Étiquette privée & emballage contractuel',
  },
  {
    collection: 'forms',
    match: {
      key: 'events:3:reservation',
    },
    locale: 'fr',
    path: ['fields', 5, 'options', 5, 'label'],
    before: 'Facility visit in Sadat City',
    after: 'Visite des installations à Sadat City',
  },
  {
    collection: 'forms',
    match: {
      key: 'events:3:reservation',
    },
    locale: 'fr',
    path: ['fields', 5, 'options', 6, 'label'],
    before: 'Meet us at an upcoming show',
    after: 'Rendez-vous à un prochain spectacle',
  },
  {
    collection: 'forms',
    match: {
      key: 'events:3:reservation',
    },
    locale: 'fr',
    path: ['fields', 5, 'options', 7, 'label'],
    before: 'Something else',
    after: 'Autre chose',
  },
  {
    collection: 'translations',
    match: {
      sourceId: 176,
    },
    locale: 'ar',
    path: ['text'],
    before: 'Afghanistan',
    after: 'أفغانستان',
  },
  {
    collection: 'translations',
    match: {
      sourceId: 178,
    },
    locale: 'ar',
    path: ['text'],
    before: 'Albania',
    after: 'ألبانيا',
  },
  {
    collection: 'translations',
    match: {
      sourceId: 178,
    },
    locale: 'fr',
    path: ['text'],
    before: 'Albania',
    after: 'Albanie',
  },
  {
    collection: 'translations',
    match: {
      sourceId: 180,
    },
    locale: 'ar',
    path: ['text'],
    before: 'Algeria',
    after: 'الجزائر',
  },
  {
    collection: 'translations',
    match: {
      sourceId: 180,
    },
    locale: 'fr',
    path: ['text'],
    before: 'Algeria',
    after: 'Algérie',
  },
  {
    collection: 'translations',
    match: {
      sourceId: 182,
    },
    locale: 'ar',
    path: ['text'],
    before: 'Andorra',
    after: 'أندورا',
  },
  {
    collection: 'translations',
    match: {
      sourceId: 182,
    },
    locale: 'fr',
    path: ['text'],
    before: 'Andorra',
    after: 'Andorre',
  },
  {
    collection: 'translations',
    match: {
      sourceId: 184,
    },
    locale: 'ar',
    path: ['text'],
    before: 'Angola',
    after: 'أنغولا',
  },
  {
    collection: 'translations',
    match: {
      sourceId: 186,
    },
    locale: 'ar',
    path: ['text'],
    before: 'Antigua and Barbuda',
    after: 'أنتيغوا وبربودا',
  },
  {
    collection: 'translations',
    match: {
      sourceId: 186,
    },
    locale: 'fr',
    path: ['text'],
    before: 'Antigua and Barbuda',
    after: 'Antigua-et-Barbuda',
  },
  {
    collection: 'translations',
    match: {
      sourceId: 188,
    },
    locale: 'ar',
    path: ['text'],
    before: 'Argentina',
    after: 'الأرجنتين',
  },
  {
    collection: 'translations',
    match: {
      sourceId: 188,
    },
    locale: 'fr',
    path: ['text'],
    before: 'Argentina',
    after: 'Argentine',
  },
  {
    collection: 'translations',
    match: {
      sourceId: 190,
    },
    locale: 'ar',
    path: ['text'],
    before: 'Armenia',
    after: 'أرمينيا',
  },
  {
    collection: 'translations',
    match: {
      sourceId: 190,
    },
    locale: 'fr',
    path: ['text'],
    before: 'Armenia',
    after: 'Arménie',
  },
  {
    collection: 'translations',
    match: {
      sourceId: 192,
    },
    locale: 'ar',
    path: ['text'],
    before: 'Australia',
    after: 'أستراليا',
  },
  {
    collection: 'translations',
    match: {
      sourceId: 192,
    },
    locale: 'fr',
    path: ['text'],
    before: 'Australia',
    after: 'Australie',
  },
  {
    collection: 'translations',
    match: {
      sourceId: 194,
    },
    locale: 'ar',
    path: ['text'],
    before: 'Austria',
    after: 'النمسا',
  },
  {
    collection: 'translations',
    match: {
      sourceId: 194,
    },
    locale: 'fr',
    path: ['text'],
    before: 'Austria',
    after: 'Autriche',
  },
  {
    collection: 'translations',
    match: {
      sourceId: 196,
    },
    locale: 'ar',
    path: ['text'],
    before: 'Azerbaijan',
    after: 'أذربيجان',
  },
  {
    collection: 'translations',
    match: {
      sourceId: 196,
    },
    locale: 'fr',
    path: ['text'],
    before: 'Azerbaijan',
    after: 'Azerbaïdjan',
  },
  {
    collection: 'translations',
    match: {
      sourceId: 198,
    },
    locale: 'ar',
    path: ['text'],
    before: 'Bahamas',
    after: 'جزر البهاما',
  },
  {
    collection: 'translations',
    match: {
      sourceId: 200,
    },
    locale: 'ar',
    path: ['text'],
    before: 'Bahrain',
    after: 'البحرين',
  },
  {
    collection: 'translations',
    match: {
      sourceId: 200,
    },
    locale: 'fr',
    path: ['text'],
    before: 'Bahrain',
    after: 'Bahreïn',
  },
  {
    collection: 'translations',
    match: {
      sourceId: 202,
    },
    locale: 'ar',
    path: ['text'],
    before: 'Bangladesh',
    after: 'بنغلاديش',
  },
  {
    collection: 'translations',
    match: {
      sourceId: 204,
    },
    locale: 'ar',
    path: ['text'],
    before: 'Barbados',
    after: 'بربادوس',
  },
  {
    collection: 'translations',
    match: {
      sourceId: 204,
    },
    locale: 'fr',
    path: ['text'],
    before: 'Barbados',
    after: 'Barbade',
  },
  {
    collection: 'translations',
    match: {
      sourceId: 206,
    },
    locale: 'ar',
    path: ['text'],
    before: 'Belarus',
    after: 'بيلاروسيا',
  },
  {
    collection: 'translations',
    match: {
      sourceId: 206,
    },
    locale: 'fr',
    path: ['text'],
    before: 'Belarus',
    after: 'Bélarus',
  },
  {
    collection: 'translations',
    match: {
      sourceId: 208,
    },
    locale: 'ar',
    path: ['text'],
    before: 'Belgium',
    after: 'بلجيكا',
  },
  {
    collection: 'translations',
    match: {
      sourceId: 208,
    },
    locale: 'fr',
    path: ['text'],
    before: 'Belgium',
    after: 'Belgique',
  },
  {
    collection: 'translations',
    match: {
      sourceId: 210,
    },
    locale: 'ar',
    path: ['text'],
    before: 'Belize',
    after: 'بليز',
  },
  {
    collection: 'translations',
    match: {
      sourceId: 212,
    },
    locale: 'ar',
    path: ['text'],
    before: 'Benin',
    after: 'بنين',
  },
  {
    collection: 'translations',
    match: {
      sourceId: 212,
    },
    locale: 'fr',
    path: ['text'],
    before: 'Benin',
    after: 'Bénin',
  },
  {
    collection: 'translations',
    match: {
      sourceId: 214,
    },
    locale: 'ar',
    path: ['text'],
    before: 'Bhutan',
    after: 'بوتان',
  },
  {
    collection: 'translations',
    match: {
      sourceId: 214,
    },
    locale: 'fr',
    path: ['text'],
    before: 'Bhutan',
    after: 'Bhoutan',
  },
  {
    collection: 'translations',
    match: {
      sourceId: 216,
    },
    locale: 'ar',
    path: ['text'],
    before: 'Bolivia',
    after: 'بوليفيا',
  },
  {
    collection: 'translations',
    match: {
      sourceId: 216,
    },
    locale: 'fr',
    path: ['text'],
    before: 'Bolivia',
    after: 'Bolivie',
  },
  {
    collection: 'translations',
    match: {
      sourceId: 218,
    },
    locale: 'ar',
    path: ['text'],
    before: 'Bosnia and Herzegovina',
    after: 'البوسنة والهرسك',
  },
  {
    collection: 'translations',
    match: {
      sourceId: 218,
    },
    locale: 'fr',
    path: ['text'],
    before: 'Bosnia and Herzegovina',
    after: 'Bosnie-Herzégovine',
  },
  {
    collection: 'translations',
    match: {
      sourceId: 220,
    },
    locale: 'ar',
    path: ['text'],
    before: 'Botswana',
    after: 'بوتسوانا',
  },
  {
    collection: 'translations',
    match: {
      sourceId: 222,
    },
    locale: 'ar',
    path: ['text'],
    before: 'Brazil',
    after: 'البرازيل',
  },
  {
    collection: 'translations',
    match: {
      sourceId: 222,
    },
    locale: 'fr',
    path: ['text'],
    before: 'Brazil',
    after: 'Brésil',
  },
  {
    collection: 'translations',
    match: {
      sourceId: 224,
    },
    locale: 'ar',
    path: ['text'],
    before: 'Brunei',
    after: 'بروناي',
  },
  {
    collection: 'translations',
    match: {
      sourceId: 226,
    },
    locale: 'ar',
    path: ['text'],
    before: 'Bulgaria',
    after: 'بلغاريا',
  },
  {
    collection: 'translations',
    match: {
      sourceId: 226,
    },
    locale: 'fr',
    path: ['text'],
    before: 'Bulgaria',
    after: 'Bulgarie',
  },
  {
    collection: 'translations',
    match: {
      sourceId: 228,
    },
    locale: 'ar',
    path: ['text'],
    before: 'Burkina Faso',
    after: 'بوركينا فاسو',
  },
  {
    collection: 'translations',
    match: {
      sourceId: 230,
    },
    locale: 'ar',
    path: ['text'],
    before: 'Burundi',
    after: 'بوروندي',
  },
  {
    collection: 'translations',
    match: {
      sourceId: 232,
    },
    locale: 'ar',
    path: ['text'],
    before: 'Cambodia',
    after: 'كمبوديا',
  },
  {
    collection: 'translations',
    match: {
      sourceId: 232,
    },
    locale: 'fr',
    path: ['text'],
    before: 'Cambodia',
    after: 'Cambodge',
  },
  {
    collection: 'translations',
    match: {
      sourceId: 234,
    },
    locale: 'ar',
    path: ['text'],
    before: 'Cameroon',
    after: 'الكاميرون',
  },
  {
    collection: 'translations',
    match: {
      sourceId: 234,
    },
    locale: 'fr',
    path: ['text'],
    before: 'Cameroon',
    after: 'Cameroun',
  },
  {
    collection: 'translations',
    match: {
      sourceId: 236,
    },
    locale: 'ar',
    path: ['text'],
    before: 'Canada',
    after: 'كندا',
  },
  {
    collection: 'translations',
    match: {
      sourceId: 238,
    },
    locale: 'ar',
    path: ['text'],
    before: 'Cape Verde',
    after: 'الرأس الأخضر',
  },
  {
    collection: 'translations',
    match: {
      sourceId: 238,
    },
    locale: 'fr',
    path: ['text'],
    before: 'Cape Verde',
    after: 'Cap-Vert',
  },
  {
    collection: 'translations',
    match: {
      sourceId: 240,
    },
    locale: 'ar',
    path: ['text'],
    before: 'Central African Republic',
    after: 'جمهورية أفريقيا الوسطى',
  },
  {
    collection: 'translations',
    match: {
      sourceId: 240,
    },
    locale: 'fr',
    path: ['text'],
    before: 'Central African Republic',
    after: 'République centrafricaine',
  },
  {
    collection: 'translations',
    match: {
      sourceId: 242,
    },
    locale: 'ar',
    path: ['text'],
    before: 'Chad',
    after: 'تشاد',
  },
  {
    collection: 'translations',
    match: {
      sourceId: 242,
    },
    locale: 'fr',
    path: ['text'],
    before: 'Chad',
    after: 'Tchad',
  },
  {
    collection: 'translations',
    match: {
      sourceId: 244,
    },
    locale: 'ar',
    path: ['text'],
    before: 'Chile',
    after: 'شيلي',
  },
  {
    collection: 'translations',
    match: {
      sourceId: 244,
    },
    locale: 'fr',
    path: ['text'],
    before: 'Chile',
    after: 'Chili',
  },
  {
    collection: 'translations',
    match: {
      sourceId: 246,
    },
    locale: 'ar',
    path: ['text'],
    before: 'China',
    after: 'الصين',
  },
  {
    collection: 'translations',
    match: {
      sourceId: 246,
    },
    locale: 'fr',
    path: ['text'],
    before: 'China',
    after: 'Chine',
  },
  {
    collection: 'translations',
    match: {
      sourceId: 248,
    },
    locale: 'ar',
    path: ['text'],
    before: 'Colombia',
    after: 'كولومبيا',
  },
  {
    collection: 'translations',
    match: {
      sourceId: 248,
    },
    locale: 'fr',
    path: ['text'],
    before: 'Colombia',
    after: 'Colombie',
  },
  {
    collection: 'translations',
    match: {
      sourceId: 250,
    },
    locale: 'ar',
    path: ['text'],
    before: 'Comoros',
    after: 'جزر القمر',
  },
  {
    collection: 'translations',
    match: {
      sourceId: 250,
    },
    locale: 'fr',
    path: ['text'],
    before: 'Comoros',
    after: 'Comores',
  },
  {
    collection: 'translations',
    match: {
      sourceId: 252,
    },
    locale: 'ar',
    path: ['text'],
    before: 'Congo (Brazzaville)',
    after: 'الكونغو (برازافيل)',
  },
  {
    collection: 'translations',
    match: {
      sourceId: 254,
    },
    locale: 'ar',
    path: ['text'],
    before: 'Congo (Kinshasa)',
    after: 'الكونغو (كينشاسا)',
  },
  {
    collection: 'translations',
    match: {
      sourceId: 256,
    },
    locale: 'ar',
    path: ['text'],
    before: 'Costa Rica',
    after: 'كوستاريكا',
  },
  {
    collection: 'translations',
    match: {
      sourceId: 258,
    },
    locale: 'ar',
    path: ['text'],
    before: "Cote d'Ivoire",
    after: 'ساحل العاج',
  },
  {
    collection: 'translations',
    match: {
      sourceId: 258,
    },
    locale: 'fr',
    path: ['text'],
    before: "Cote d'Ivoire",
    after: "Côte d'Ivoire",
  },
  {
    collection: 'translations',
    match: {
      sourceId: 260,
    },
    locale: 'ar',
    path: ['text'],
    before: 'Croatia',
    after: 'كرواتيا',
  },
  {
    collection: 'translations',
    match: {
      sourceId: 260,
    },
    locale: 'fr',
    path: ['text'],
    before: 'Croatia',
    after: 'Croatie',
  },
  {
    collection: 'translations',
    match: {
      sourceId: 262,
    },
    locale: 'ar',
    path: ['text'],
    before: 'Cuba',
    after: 'كوبا',
  },
  {
    collection: 'translations',
    match: {
      sourceId: 264,
    },
    locale: 'ar',
    path: ['text'],
    before: 'Cyprus',
    after: 'قبرص',
  },
  {
    collection: 'translations',
    match: {
      sourceId: 264,
    },
    locale: 'fr',
    path: ['text'],
    before: 'Cyprus',
    after: 'Chypre',
  },
  {
    collection: 'translations',
    match: {
      sourceId: 266,
    },
    locale: 'ar',
    path: ['text'],
    before: 'Czechia',
    after: 'التشيك',
  },
  {
    collection: 'translations',
    match: {
      sourceId: 266,
    },
    locale: 'fr',
    path: ['text'],
    before: 'Czechia',
    after: 'République tchèque',
  },
  {
    collection: 'translations',
    match: {
      sourceId: 268,
    },
    locale: 'ar',
    path: ['text'],
    before: 'Denmark',
    after: 'الدنمارك',
  },
  {
    collection: 'translations',
    match: {
      sourceId: 268,
    },
    locale: 'fr',
    path: ['text'],
    before: 'Denmark',
    after: 'Danemark',
  },
  {
    collection: 'translations',
    match: {
      sourceId: 270,
    },
    locale: 'ar',
    path: ['text'],
    before: 'Djibouti',
    after: 'جيبوتي',
  },
  {
    collection: 'translations',
    match: {
      sourceId: 272,
    },
    locale: 'ar',
    path: ['text'],
    before: 'Dominica',
    after: 'دومينيكا',
  },
  {
    collection: 'translations',
    match: {
      sourceId: 272,
    },
    locale: 'fr',
    path: ['text'],
    before: 'Dominica',
    after: 'Dominique',
  },
  {
    collection: 'translations',
    match: {
      sourceId: 274,
    },
    locale: 'ar',
    path: ['text'],
    before: 'Dominican Republic',
    after: 'جمهورية الدومينيكان',
  },
  {
    collection: 'translations',
    match: {
      sourceId: 274,
    },
    locale: 'fr',
    path: ['text'],
    before: 'Dominican Republic',
    after: 'République dominicaine',
  },
  {
    collection: 'translations',
    match: {
      sourceId: 276,
    },
    locale: 'ar',
    path: ['text'],
    before: 'Ecuador',
    after: 'الاكوادور',
  },
  {
    collection: 'translations',
    match: {
      sourceId: 276,
    },
    locale: 'fr',
    path: ['text'],
    before: 'Ecuador',
    after: 'Équateur',
  },
  {
    collection: 'translations',
    match: {
      sourceId: 278,
    },
    locale: 'ar',
    path: ['text'],
    before: 'Egypt',
    after: 'مصر',
  },
  {
    collection: 'translations',
    match: {
      sourceId: 278,
    },
    locale: 'fr',
    path: ['text'],
    before: 'Egypt',
    after: 'Égypte',
  },
  {
    collection: 'translations',
    match: {
      sourceId: 280,
    },
    locale: 'ar',
    path: ['text'],
    before: 'El Salvador',
    after: 'السلفادور',
  },
  {
    collection: 'translations',
    match: {
      sourceId: 282,
    },
    locale: 'ar',
    path: ['text'],
    before: 'Equatorial Guinea',
    after: 'غينيا الاستوائية',
  },
  {
    collection: 'translations',
    match: {
      sourceId: 282,
    },
    locale: 'fr',
    path: ['text'],
    before: 'Equatorial Guinea',
    after: 'Guinée équatoriale',
  },
  {
    collection: 'translations',
    match: {
      sourceId: 284,
    },
    locale: 'ar',
    path: ['text'],
    before: 'Eritrea',
    after: 'إريتريا',
  },
  {
    collection: 'translations',
    match: {
      sourceId: 284,
    },
    locale: 'fr',
    path: ['text'],
    before: 'Eritrea',
    after: 'Érythrée',
  },
  {
    collection: 'translations',
    match: {
      sourceId: 286,
    },
    locale: 'ar',
    path: ['text'],
    before: 'Estonia',
    after: 'إستونيا',
  },
  {
    collection: 'translations',
    match: {
      sourceId: 286,
    },
    locale: 'fr',
    path: ['text'],
    before: 'Estonia',
    after: 'Espagne',
  },
  {
    collection: 'translations',
    match: {
      sourceId: 288,
    },
    locale: 'ar',
    path: ['text'],
    before: 'Eswatini',
    after: 'إيسواتيني',
  },
  {
    collection: 'translations',
    match: {
      sourceId: 290,
    },
    locale: 'ar',
    path: ['text'],
    before: 'Ethiopia',
    after: 'أثيوبيا',
  },
  {
    collection: 'translations',
    match: {
      sourceId: 290,
    },
    locale: 'fr',
    path: ['text'],
    before: 'Ethiopia',
    after: 'Éthiopie',
  },
  {
    collection: 'translations',
    match: {
      sourceId: 292,
    },
    locale: 'ar',
    path: ['text'],
    before: 'Fiji',
    after: 'فيجي',
  },
  {
    collection: 'translations',
    match: {
      sourceId: 292,
    },
    locale: 'fr',
    path: ['text'],
    before: 'Fiji',
    after: 'Fidji',
  },
  {
    collection: 'translations',
    match: {
      sourceId: 294,
    },
    locale: 'ar',
    path: ['text'],
    before: 'Finland',
    after: 'فنلندا',
  },
  {
    collection: 'translations',
    match: {
      sourceId: 294,
    },
    locale: 'fr',
    path: ['text'],
    before: 'Finland',
    after: 'Finlande',
  },
  {
    collection: 'translations',
    match: {
      sourceId: 296,
    },
    locale: 'ar',
    path: ['text'],
    before: 'France',
    after: 'فرنسا',
  },
  {
    collection: 'translations',
    match: {
      sourceId: 298,
    },
    locale: 'ar',
    path: ['text'],
    before: 'Gabon',
    after: 'الجابون',
  },
  {
    collection: 'translations',
    match: {
      sourceId: 300,
    },
    locale: 'ar',
    path: ['text'],
    before: 'Gambia',
    after: 'غامبيا',
  },
  {
    collection: 'translations',
    match: {
      sourceId: 300,
    },
    locale: 'fr',
    path: ['text'],
    before: 'Gambia',
    after: 'Gambie',
  },
  {
    collection: 'translations',
    match: {
      sourceId: 302,
    },
    locale: 'ar',
    path: ['text'],
    before: 'Georgia',
    after: 'جورجيا',
  },
  {
    collection: 'translations',
    match: {
      sourceId: 302,
    },
    locale: 'fr',
    path: ['text'],
    before: 'Georgia',
    after: 'Géorgie',
  },
  {
    collection: 'translations',
    match: {
      sourceId: 304,
    },
    locale: 'ar',
    path: ['text'],
    before: 'Germany',
    after: 'ألمانيا',
  },
  {
    collection: 'translations',
    match: {
      sourceId: 304,
    },
    locale: 'fr',
    path: ['text'],
    before: 'Germany',
    after: 'Allemagne',
  },
  {
    collection: 'translations',
    match: {
      sourceId: 306,
    },
    locale: 'ar',
    path: ['text'],
    before: 'Ghana',
    after: 'غانا',
  },
  {
    collection: 'translations',
    match: {
      sourceId: 308,
    },
    locale: 'ar',
    path: ['text'],
    before: 'Greece',
    after: 'اليونان',
  },
  {
    collection: 'translations',
    match: {
      sourceId: 308,
    },
    locale: 'fr',
    path: ['text'],
    before: 'Greece',
    after: 'Grèce',
  },
  {
    collection: 'translations',
    match: {
      sourceId: 310,
    },
    locale: 'ar',
    path: ['text'],
    before: 'Grenada',
    after: 'غرينادا',
  },
  {
    collection: 'translations',
    match: {
      sourceId: 310,
    },
    locale: 'fr',
    path: ['text'],
    before: 'Grenada',
    after: 'Grenade',
  },
  {
    collection: 'translations',
    match: {
      sourceId: 312,
    },
    locale: 'ar',
    path: ['text'],
    before: 'Guatemala',
    after: 'غواتيمالا',
  },
  {
    collection: 'translations',
    match: {
      sourceId: 314,
    },
    locale: 'ar',
    path: ['text'],
    before: 'Guinea',
    after: 'غينيا',
  },
  {
    collection: 'translations',
    match: {
      sourceId: 314,
    },
    locale: 'fr',
    path: ['text'],
    before: 'Guinea',
    after: 'Guinée',
  },
  {
    collection: 'translations',
    match: {
      sourceId: 316,
    },
    locale: 'ar',
    path: ['text'],
    before: 'Guinea-Bissau',
    after: 'غينيا بيساو',
  },
  {
    collection: 'translations',
    match: {
      sourceId: 316,
    },
    locale: 'fr',
    path: ['text'],
    before: 'Guinea-Bissau',
    after: 'Guinée-Bissau',
  },
  {
    collection: 'translations',
    match: {
      sourceId: 318,
    },
    locale: 'ar',
    path: ['text'],
    before: 'Guyana',
    after: 'غيانا',
  },
  {
    collection: 'translations',
    match: {
      sourceId: 320,
    },
    locale: 'ar',
    path: ['text'],
    before: 'Haiti',
    after: 'هايتي',
  },
  {
    collection: 'translations',
    match: {
      sourceId: 320,
    },
    locale: 'fr',
    path: ['text'],
    before: 'Haiti',
    after: 'Haïti',
  },
  {
    collection: 'translations',
    match: {
      sourceId: 322,
    },
    locale: 'ar',
    path: ['text'],
    before: 'Honduras',
    after: 'هندوراس',
  },
  {
    collection: 'translations',
    match: {
      sourceId: 324,
    },
    locale: 'ar',
    path: ['text'],
    before: 'Hong Kong',
    after: 'هونج كونج',
  },
  {
    collection: 'translations',
    match: {
      sourceId: 326,
    },
    locale: 'ar',
    path: ['text'],
    before: 'Hungary',
    after: 'هنغاريا',
  },
  {
    collection: 'translations',
    match: {
      sourceId: 326,
    },
    locale: 'fr',
    path: ['text'],
    before: 'Hungary',
    after: 'Hongrie',
  },
  {
    collection: 'translations',
    match: {
      sourceId: 328,
    },
    locale: 'ar',
    path: ['text'],
    before: 'Iceland',
    after: 'أيسلندا',
  },
  {
    collection: 'translations',
    match: {
      sourceId: 328,
    },
    locale: 'fr',
    path: ['text'],
    before: 'Iceland',
    after: 'Espagne',
  },
  {
    collection: 'translations',
    match: {
      sourceId: 330,
    },
    locale: 'ar',
    path: ['text'],
    before: 'India',
    after: 'الهند',
  },
  {
    collection: 'translations',
    match: {
      sourceId: 330,
    },
    locale: 'fr',
    path: ['text'],
    before: 'India',
    after: 'Inde',
  },
  {
    collection: 'translations',
    match: {
      sourceId: 332,
    },
    locale: 'ar',
    path: ['text'],
    before: 'Indonesia',
    after: 'أندونيسيا',
  },
  {
    collection: 'translations',
    match: {
      sourceId: 332,
    },
    locale: 'fr',
    path: ['text'],
    before: 'Indonesia',
    after: 'Indonésie',
  },
  {
    collection: 'translations',
    match: {
      sourceId: 334,
    },
    locale: 'ar',
    path: ['text'],
    before: 'Iran',
    after: 'إيران',
  },
  {
    collection: 'translations',
    match: {
      sourceId: 336,
    },
    locale: 'ar',
    path: ['text'],
    before: 'Iraq',
    after: 'العراق',
  },
  {
    collection: 'translations',
    match: {
      sourceId: 338,
    },
    locale: 'ar',
    path: ['text'],
    before: 'Ireland',
    after: 'أيرلندا',
  },
  {
    collection: 'translations',
    match: {
      sourceId: 338,
    },
    locale: 'fr',
    path: ['text'],
    before: 'Ireland',
    after: 'Belgique',
  },
  {
    collection: 'translations',
    match: {
      sourceId: 340,
    },
    locale: 'ar',
    path: ['text'],
    before: 'Israel',
    after: 'إسرائيل',
  },
  {
    collection: 'translations',
    match: {
      sourceId: 340,
    },
    locale: 'fr',
    path: ['text'],
    before: 'Israel',
    after: 'Israël',
  },
  {
    collection: 'translations',
    match: {
      sourceId: 342,
    },
    locale: 'ar',
    path: ['text'],
    before: 'Italy',
    after: 'إيطاليا',
  },
  {
    collection: 'translations',
    match: {
      sourceId: 342,
    },
    locale: 'fr',
    path: ['text'],
    before: 'Italy',
    after: 'Italie',
  },
  {
    collection: 'translations',
    match: {
      sourceId: 344,
    },
    locale: 'ar',
    path: ['text'],
    before: 'Jamaica',
    after: 'جامايكا',
  },
  {
    collection: 'translations',
    match: {
      sourceId: 344,
    },
    locale: 'fr',
    path: ['text'],
    before: 'Jamaica',
    after: 'Jamaïque',
  },
  {
    collection: 'translations',
    match: {
      sourceId: 346,
    },
    locale: 'ar',
    path: ['text'],
    before: 'Japan',
    after: 'اليابان',
  },
  {
    collection: 'translations',
    match: {
      sourceId: 346,
    },
    locale: 'fr',
    path: ['text'],
    before: 'Japan',
    after: 'Japon',
  },
  {
    collection: 'translations',
    match: {
      sourceId: 348,
    },
    locale: 'ar',
    path: ['text'],
    before: 'Jordan',
    after: 'الأردن',
  },
  {
    collection: 'translations',
    match: {
      sourceId: 348,
    },
    locale: 'fr',
    path: ['text'],
    before: 'Jordan',
    after: 'Jordanie',
  },
  {
    collection: 'translations',
    match: {
      sourceId: 350,
    },
    locale: 'ar',
    path: ['text'],
    before: 'Kazakhstan',
    after: 'كازاخستان',
  },
  {
    collection: 'translations',
    match: {
      sourceId: 352,
    },
    locale: 'ar',
    path: ['text'],
    before: 'Kenya',
    after: 'كينيا',
  },
  {
    collection: 'translations',
    match: {
      sourceId: 354,
    },
    locale: 'ar',
    path: ['text'],
    before: 'Kiribati',
    after: 'كيريباتي',
  },
  {
    collection: 'translations',
    match: {
      sourceId: 356,
    },
    locale: 'ar',
    path: ['text'],
    before: 'Kuwait',
    after: 'الكويت',
  },
  {
    collection: 'translations',
    match: {
      sourceId: 356,
    },
    locale: 'fr',
    path: ['text'],
    before: 'Kuwait',
    after: 'Koweït',
  },
  {
    collection: 'translations',
    match: {
      sourceId: 358,
    },
    locale: 'ar',
    path: ['text'],
    before: 'Kyrgyzstan',
    after: 'قيرغيزستان',
  },
  {
    collection: 'translations',
    match: {
      sourceId: 358,
    },
    locale: 'fr',
    path: ['text'],
    before: 'Kyrgyzstan',
    after: 'Kirghizistan',
  },
  {
    collection: 'translations',
    match: {
      sourceId: 360,
    },
    locale: 'ar',
    path: ['text'],
    before: 'Laos',
    after: 'لاوس',
  },
  {
    collection: 'translations',
    match: {
      sourceId: 362,
    },
    locale: 'ar',
    path: ['text'],
    before: 'Latvia',
    after: 'لاتفيا',
  },
  {
    collection: 'translations',
    match: {
      sourceId: 362,
    },
    locale: 'fr',
    path: ['text'],
    before: 'Latvia',
    after: 'Lettonie',
  },
  {
    collection: 'translations',
    match: {
      sourceId: 364,
    },
    locale: 'ar',
    path: ['text'],
    before: 'Lebanon',
    after: 'لبنان',
  },
  {
    collection: 'translations',
    match: {
      sourceId: 364,
    },
    locale: 'fr',
    path: ['text'],
    before: 'Lebanon',
    after: 'Liban',
  },
  {
    collection: 'translations',
    match: {
      sourceId: 366,
    },
    locale: 'ar',
    path: ['text'],
    before: 'Lesotho',
    after: 'ليسوتو',
  },
  {
    collection: 'translations',
    match: {
      sourceId: 368,
    },
    locale: 'ar',
    path: ['text'],
    before: 'Liberia',
    after: 'ليبيريا',
  },
  {
    collection: 'translations',
    match: {
      sourceId: 368,
    },
    locale: 'fr',
    path: ['text'],
    before: 'Liberia',
    after: 'Libéria',
  },
  {
    collection: 'translations',
    match: {
      sourceId: 370,
    },
    locale: 'ar',
    path: ['text'],
    before: 'Libya',
    after: 'ليبيا',
  },
  {
    collection: 'translations',
    match: {
      sourceId: 370,
    },
    locale: 'fr',
    path: ['text'],
    before: 'Libya',
    after: 'Libye',
  },
  {
    collection: 'translations',
    match: {
      sourceId: 372,
    },
    locale: 'ar',
    path: ['text'],
    before: 'Liechtenstein',
    after: 'ليختنشتاين',
  },
  {
    collection: 'translations',
    match: {
      sourceId: 374,
    },
    locale: 'ar',
    path: ['text'],
    before: 'Lithuania',
    after: 'ليتوانيا',
  },
  {
    collection: 'translations',
    match: {
      sourceId: 374,
    },
    locale: 'fr',
    path: ['text'],
    before: 'Lithuania',
    after: 'Lituanie',
  },
  {
    collection: 'translations',
    match: {
      sourceId: 376,
    },
    locale: 'ar',
    path: ['text'],
    before: 'Luxembourg',
    after: 'لوكسمبورغ',
  },
  {
    collection: 'translations',
    match: {
      sourceId: 378,
    },
    locale: 'ar',
    path: ['text'],
    before: 'Macao',
    after: 'ماكاو',
  },
  {
    collection: 'translations',
    match: {
      sourceId: 380,
    },
    locale: 'ar',
    path: ['text'],
    before: 'Madagascar',
    after: 'مدغشقر',
  },
  {
    collection: 'translations',
    match: {
      sourceId: 382,
    },
    locale: 'ar',
    path: ['text'],
    before: 'Malawi',
    after: 'ملاوي',
  },
  {
    collection: 'translations',
    match: {
      sourceId: 384,
    },
    locale: 'ar',
    path: ['text'],
    before: 'Malaysia',
    after: 'ماليزيا',
  },
  {
    collection: 'translations',
    match: {
      sourceId: 384,
    },
    locale: 'fr',
    path: ['text'],
    before: 'Malaysia',
    after: 'Malaisie',
  },
  {
    collection: 'translations',
    match: {
      sourceId: 386,
    },
    locale: 'ar',
    path: ['text'],
    before: 'Maldives',
    after: 'جزر المالديف',
  },
  {
    collection: 'translations',
    match: {
      sourceId: 388,
    },
    locale: 'ar',
    path: ['text'],
    before: 'Mali',
    after: 'مالي',
  },
  {
    collection: 'translations',
    match: {
      sourceId: 390,
    },
    locale: 'ar',
    path: ['text'],
    before: 'Malta',
    after: 'مالطا',
  },
  {
    collection: 'translations',
    match: {
      sourceId: 390,
    },
    locale: 'fr',
    path: ['text'],
    before: 'Malta',
    after: 'Malte',
  },
  {
    collection: 'translations',
    match: {
      sourceId: 392,
    },
    locale: 'ar',
    path: ['text'],
    before: 'Marshall Islands',
    after: 'جزر مارشال',
  },
  {
    collection: 'translations',
    match: {
      sourceId: 392,
    },
    locale: 'fr',
    path: ['text'],
    before: 'Marshall Islands',
    after: 'Îles Marshall',
  },
  {
    collection: 'translations',
    match: {
      sourceId: 394,
    },
    locale: 'ar',
    path: ['text'],
    before: 'Mauritania',
    after: 'موريتانيا',
  },
  {
    collection: 'translations',
    match: {
      sourceId: 394,
    },
    locale: 'fr',
    path: ['text'],
    before: 'Mauritania',
    after: 'Mauritanie',
  },
  {
    collection: 'translations',
    match: {
      sourceId: 396,
    },
    locale: 'ar',
    path: ['text'],
    before: 'Mauritius',
    after: 'موريشيوس',
  },
  {
    collection: 'translations',
    match: {
      sourceId: 396,
    },
    locale: 'fr',
    path: ['text'],
    before: 'Mauritius',
    after: 'Maurice',
  },
  {
    collection: 'translations',
    match: {
      sourceId: 398,
    },
    locale: 'ar',
    path: ['text'],
    before: 'Mexico',
    after: 'المكسيك',
  },
  {
    collection: 'translations',
    match: {
      sourceId: 398,
    },
    locale: 'fr',
    path: ['text'],
    before: 'Mexico',
    after: 'Mexique',
  },
  {
    collection: 'translations',
    match: {
      sourceId: 400,
    },
    locale: 'ar',
    path: ['text'],
    before: 'Micronesia',
    after: 'ميكرونيزيا',
  },
  {
    collection: 'translations',
    match: {
      sourceId: 400,
    },
    locale: 'fr',
    path: ['text'],
    before: 'Micronesia',
    after: 'Micronésie',
  },
  {
    collection: 'translations',
    match: {
      sourceId: 402,
    },
    locale: 'ar',
    path: ['text'],
    before: 'Moldova',
    after: 'مولدوفا',
  },
  {
    collection: 'translations',
    match: {
      sourceId: 404,
    },
    locale: 'ar',
    path: ['text'],
    before: 'Monaco',
    after: 'موناكو',
  },
  {
    collection: 'translations',
    match: {
      sourceId: 406,
    },
    locale: 'ar',
    path: ['text'],
    before: 'Mongolia',
    after: 'منغوليا',
  },
  {
    collection: 'translations',
    match: {
      sourceId: 406,
    },
    locale: 'fr',
    path: ['text'],
    before: 'Mongolia',
    after: 'Mongolie',
  },
  {
    collection: 'translations',
    match: {
      sourceId: 408,
    },
    locale: 'ar',
    path: ['text'],
    before: 'Montenegro',
    after: 'الجبل الأسود',
  },
  {
    collection: 'translations',
    match: {
      sourceId: 408,
    },
    locale: 'fr',
    path: ['text'],
    before: 'Montenegro',
    after: 'Monténégro',
  },
  {
    collection: 'translations',
    match: {
      sourceId: 410,
    },
    locale: 'ar',
    path: ['text'],
    before: 'Morocco',
    after: 'المغرب',
  },
  {
    collection: 'translations',
    match: {
      sourceId: 410,
    },
    locale: 'fr',
    path: ['text'],
    before: 'Morocco',
    after: 'Maroc',
  },
  {
    collection: 'translations',
    match: {
      sourceId: 412,
    },
    locale: 'ar',
    path: ['text'],
    before: 'Mozambique',
    after: 'موزمبيق',
  },
  {
    collection: 'translations',
    match: {
      sourceId: 414,
    },
    locale: 'ar',
    path: ['text'],
    before: 'Myanmar',
    after: 'ميانمار',
  },
  {
    collection: 'translations',
    match: {
      sourceId: 416,
    },
    locale: 'ar',
    path: ['text'],
    before: 'Namibia',
    after: 'ناميبيا',
  },
  {
    collection: 'translations',
    match: {
      sourceId: 416,
    },
    locale: 'fr',
    path: ['text'],
    before: 'Namibia',
    after: 'Namibie',
  },
  {
    collection: 'translations',
    match: {
      sourceId: 418,
    },
    locale: 'ar',
    path: ['text'],
    before: 'Nauru',
    after: 'ناورو',
  },
  {
    collection: 'translations',
    match: {
      sourceId: 420,
    },
    locale: 'ar',
    path: ['text'],
    before: 'Nepal',
    after: 'نيبال',
  },
  {
    collection: 'translations',
    match: {
      sourceId: 420,
    },
    locale: 'fr',
    path: ['text'],
    before: 'Nepal',
    after: 'Népal',
  },
  {
    collection: 'translations',
    match: {
      sourceId: 422,
    },
    locale: 'ar',
    path: ['text'],
    before: 'Netherlands',
    after: 'هولندا',
  },
  {
    collection: 'translations',
    match: {
      sourceId: 422,
    },
    locale: 'fr',
    path: ['text'],
    before: 'Netherlands',
    after: 'Belgique',
  },
  {
    collection: 'translations',
    match: {
      sourceId: 424,
    },
    locale: 'ar',
    path: ['text'],
    before: 'New Zealand',
    after: 'نيوزيلندا',
  },
  {
    collection: 'translations',
    match: {
      sourceId: 424,
    },
    locale: 'fr',
    path: ['text'],
    before: 'New Zealand',
    after: 'Nouvelle-Zélande',
  },
  {
    collection: 'translations',
    match: {
      sourceId: 426,
    },
    locale: 'ar',
    path: ['text'],
    before: 'Nicaragua',
    after: 'نيكاراغوا',
  },
  {
    collection: 'translations',
    match: {
      sourceId: 428,
    },
    locale: 'ar',
    path: ['text'],
    before: 'Niger',
    after: 'النيجر',
  },
  {
    collection: 'translations',
    match: {
      sourceId: 430,
    },
    locale: 'ar',
    path: ['text'],
    before: 'Nigeria',
    after: 'نيجيريا',
  },
  {
    collection: 'translations',
    match: {
      sourceId: 430,
    },
    locale: 'fr',
    path: ['text'],
    before: 'Nigeria',
    after: 'Nigéria',
  },
  {
    collection: 'translations',
    match: {
      sourceId: 432,
    },
    locale: 'ar',
    path: ['text'],
    before: 'North Korea',
    after: 'كوريا الشمالية',
  },
  {
    collection: 'translations',
    match: {
      sourceId: 432,
    },
    locale: 'fr',
    path: ['text'],
    before: 'North Korea',
    after: 'Corée du Nord',
  },
  {
    collection: 'translations',
    match: {
      sourceId: 434,
    },
    locale: 'ar',
    path: ['text'],
    before: 'North Macedonia',
    after: 'مقدونيا الشمالية',
  },
  {
    collection: 'translations',
    match: {
      sourceId: 434,
    },
    locale: 'fr',
    path: ['text'],
    before: 'North Macedonia',
    after: 'Macédoine du Nord',
  },
  {
    collection: 'translations',
    match: {
      sourceId: 436,
    },
    locale: 'ar',
    path: ['text'],
    before: 'Norway',
    after: 'النرويج',
  },
  {
    collection: 'translations',
    match: {
      sourceId: 436,
    },
    locale: 'fr',
    path: ['text'],
    before: 'Norway',
    after: 'Norvège',
  },
  {
    collection: 'translations',
    match: {
      sourceId: 438,
    },
    locale: 'ar',
    path: ['text'],
    before: 'Oman',
    after: 'عمان',
  },
  {
    collection: 'translations',
    match: {
      sourceId: 440,
    },
    locale: 'ar',
    path: ['text'],
    before: 'Pakistan',
    after: 'باكستان',
  },
  {
    collection: 'translations',
    match: {
      sourceId: 442,
    },
    locale: 'ar',
    path: ['text'],
    before: 'Palau',
    after: 'بالاو',
  },
  {
    collection: 'translations',
    match: {
      sourceId: 442,
    },
    locale: 'fr',
    path: ['text'],
    before: 'Palau',
    after: 'Palaos',
  },
  {
    collection: 'translations',
    match: {
      sourceId: 444,
    },
    locale: 'ar',
    path: ['text'],
    before: 'Palestine',
    after: 'فلسطين',
  },
  {
    collection: 'translations',
    match: {
      sourceId: 446,
    },
    locale: 'ar',
    path: ['text'],
    before: 'Panama',
    after: 'بنما',
  },
  {
    collection: 'translations',
    match: {
      sourceId: 448,
    },
    locale: 'ar',
    path: ['text'],
    before: 'Papua New Guinea',
    after: 'بابوا غينيا الجديدة',
  },
  {
    collection: 'translations',
    match: {
      sourceId: 448,
    },
    locale: 'fr',
    path: ['text'],
    before: 'Papua New Guinea',
    after: 'Papouasie-Nouvelle-Guinée',
  },
  {
    collection: 'translations',
    match: {
      sourceId: 450,
    },
    locale: 'ar',
    path: ['text'],
    before: 'Paraguay',
    after: 'باراجواي',
  },
  {
    collection: 'translations',
    match: {
      sourceId: 452,
    },
    locale: 'ar',
    path: ['text'],
    before: 'Peru',
    after: 'بيرو',
  },
  {
    collection: 'translations',
    match: {
      sourceId: 452,
    },
    locale: 'fr',
    path: ['text'],
    before: 'Peru',
    after: 'Pérou',
  },
  {
    collection: 'translations',
    match: {
      sourceId: 454,
    },
    locale: 'ar',
    path: ['text'],
    before: 'Philippines',
    after: 'الفلبين',
  },
  {
    collection: 'translations',
    match: {
      sourceId: 454,
    },
    locale: 'fr',
    path: ['text'],
    before: 'Philippines',
    after: 'Espagne',
  },
  {
    collection: 'translations',
    match: {
      sourceId: 456,
    },
    locale: 'ar',
    path: ['text'],
    before: 'Poland',
    after: 'بولندا',
  },
  {
    collection: 'translations',
    match: {
      sourceId: 456,
    },
    locale: 'fr',
    path: ['text'],
    before: 'Poland',
    after: 'Pologne',
  },
  {
    collection: 'translations',
    match: {
      sourceId: 458,
    },
    locale: 'ar',
    path: ['text'],
    before: 'Portugal',
    after: 'البرتغال',
  },
  {
    collection: 'translations',
    match: {
      sourceId: 460,
    },
    locale: 'ar',
    path: ['text'],
    before: 'Qatar',
    after: 'قطر',
  },
  {
    collection: 'translations',
    match: {
      sourceId: 462,
    },
    locale: 'ar',
    path: ['text'],
    before: 'Romania',
    after: 'رومانيا',
  },
  {
    collection: 'translations',
    match: {
      sourceId: 462,
    },
    locale: 'fr',
    path: ['text'],
    before: 'Romania',
    after: 'Roumanie',
  },
  {
    collection: 'translations',
    match: {
      sourceId: 464,
    },
    locale: 'ar',
    path: ['text'],
    before: 'Russia',
    after: 'روسيا',
  },
  {
    collection: 'translations',
    match: {
      sourceId: 464,
    },
    locale: 'fr',
    path: ['text'],
    before: 'Russia',
    after: 'Russie',
  },
  {
    collection: 'translations',
    match: {
      sourceId: 466,
    },
    locale: 'ar',
    path: ['text'],
    before: 'Rwanda',
    after: 'رواندا',
  },
  {
    collection: 'translations',
    match: {
      sourceId: 468,
    },
    locale: 'ar',
    path: ['text'],
    before: 'Saint Kitts and Nevis',
    after: 'سانت كيتس ونيفيس',
  },
  {
    collection: 'translations',
    match: {
      sourceId: 468,
    },
    locale: 'fr',
    path: ['text'],
    before: 'Saint Kitts and Nevis',
    after: 'Saint-Kitts-et-Nevis',
  },
  {
    collection: 'translations',
    match: {
      sourceId: 470,
    },
    locale: 'ar',
    path: ['text'],
    before: 'Saint Lucia',
    after: 'سانت لوسيا',
  },
  {
    collection: 'translations',
    match: {
      sourceId: 470,
    },
    locale: 'fr',
    path: ['text'],
    before: 'Saint Lucia',
    after: 'Sainte-Lucie',
  },
  {
    collection: 'translations',
    match: {
      sourceId: 472,
    },
    locale: 'ar',
    path: ['text'],
    before: 'Saint Vincent and the Grenadines',
    after: 'سانت فنسنت وجزر غرينادين',
  },
  {
    collection: 'translations',
    match: {
      sourceId: 472,
    },
    locale: 'fr',
    path: ['text'],
    before: 'Saint Vincent and the Grenadines',
    after: 'Saint-Vincent-et-les Grenadines',
  },
  {
    collection: 'translations',
    match: {
      sourceId: 474,
    },
    locale: 'ar',
    path: ['text'],
    before: 'Samoa',
    after: 'ساموا',
  },
  {
    collection: 'translations',
    match: {
      sourceId: 476,
    },
    locale: 'ar',
    path: ['text'],
    before: 'San Marino',
    after: 'سان مارينو',
  },
  {
    collection: 'translations',
    match: {
      sourceId: 476,
    },
    locale: 'fr',
    path: ['text'],
    before: 'San Marino',
    after: 'Saint-Marin',
  },
  {
    collection: 'translations',
    match: {
      sourceId: 478,
    },
    locale: 'ar',
    path: ['text'],
    before: 'Sao Tome and Principe',
    after: 'سان تومي وبرينسيبي',
  },
  {
    collection: 'translations',
    match: {
      sourceId: 478,
    },
    locale: 'fr',
    path: ['text'],
    before: 'Sao Tome and Principe',
    after: 'Sao Tomé-et-Principe',
  },
  {
    collection: 'translations',
    match: {
      sourceId: 480,
    },
    locale: 'ar',
    path: ['text'],
    before: 'Saudi Arabia',
    after: 'المملكة العربية السعودية',
  },
  {
    collection: 'translations',
    match: {
      sourceId: 480,
    },
    locale: 'fr',
    path: ['text'],
    before: 'Saudi Arabia',
    after: 'Arabie saoudite',
  },
  {
    collection: 'translations',
    match: {
      sourceId: 482,
    },
    locale: 'ar',
    path: ['text'],
    before: 'Senegal',
    after: 'السنغال',
  },
  {
    collection: 'translations',
    match: {
      sourceId: 482,
    },
    locale: 'fr',
    path: ['text'],
    before: 'Senegal',
    after: 'Sénégal',
  },
  {
    collection: 'translations',
    match: {
      sourceId: 484,
    },
    locale: 'ar',
    path: ['text'],
    before: 'Serbia',
    after: 'صربيا',
  },
  {
    collection: 'translations',
    match: {
      sourceId: 484,
    },
    locale: 'fr',
    path: ['text'],
    before: 'Serbia',
    after: 'Serbie',
  },
  {
    collection: 'translations',
    match: {
      sourceId: 486,
    },
    locale: 'ar',
    path: ['text'],
    before: 'Seychelles',
    after: 'سيشيل',
  },
  {
    collection: 'translations',
    match: {
      sourceId: 488,
    },
    locale: 'ar',
    path: ['text'],
    before: 'Sierra Leone',
    after: 'سيراليون',
  },
  {
    collection: 'translations',
    match: {
      sourceId: 490,
    },
    locale: 'ar',
    path: ['text'],
    before: 'Singapore',
    after: 'سنغافورة',
  },
  {
    collection: 'translations',
    match: {
      sourceId: 490,
    },
    locale: 'fr',
    path: ['text'],
    before: 'Singapore',
    after: 'Singapour',
  },
  {
    collection: 'translations',
    match: {
      sourceId: 492,
    },
    locale: 'ar',
    path: ['text'],
    before: 'Slovakia',
    after: 'سلوفاكيا',
  },
  {
    collection: 'translations',
    match: {
      sourceId: 492,
    },
    locale: 'fr',
    path: ['text'],
    before: 'Slovakia',
    after: 'Slovaquie',
  },
  {
    collection: 'translations',
    match: {
      sourceId: 494,
    },
    locale: 'ar',
    path: ['text'],
    before: 'Slovenia',
    after: 'سلوفينيا',
  },
  {
    collection: 'translations',
    match: {
      sourceId: 494,
    },
    locale: 'fr',
    path: ['text'],
    before: 'Slovenia',
    after: 'Slovénie',
  },
  {
    collection: 'translations',
    match: {
      sourceId: 496,
    },
    locale: 'ar',
    path: ['text'],
    before: 'Solomon Islands',
    after: 'جزر سليمان',
  },
  {
    collection: 'translations',
    match: {
      sourceId: 496,
    },
    locale: 'fr',
    path: ['text'],
    before: 'Solomon Islands',
    after: 'Îles Salomon',
  },
  {
    collection: 'translations',
    match: {
      sourceId: 498,
    },
    locale: 'ar',
    path: ['text'],
    before: 'Somalia',
    after: 'الصومال',
  },
  {
    collection: 'translations',
    match: {
      sourceId: 498,
    },
    locale: 'fr',
    path: ['text'],
    before: 'Somalia',
    after: 'Somalie',
  },
  {
    collection: 'translations',
    match: {
      sourceId: 500,
    },
    locale: 'ar',
    path: ['text'],
    before: 'South Africa',
    after: 'جنوب أفريقيا',
  },
  {
    collection: 'translations',
    match: {
      sourceId: 500,
    },
    locale: 'fr',
    path: ['text'],
    before: 'South Africa',
    after: 'Afrique du Sud',
  },
  {
    collection: 'translations',
    match: {
      sourceId: 502,
    },
    locale: 'ar',
    path: ['text'],
    before: 'South Korea',
    after: 'كوريا الجنوبية',
  },
  {
    collection: 'translations',
    match: {
      sourceId: 502,
    },
    locale: 'fr',
    path: ['text'],
    before: 'South Korea',
    after: 'Corée du Sud',
  },
  {
    collection: 'translations',
    match: {
      sourceId: 504,
    },
    locale: 'ar',
    path: ['text'],
    before: 'South Sudan',
    after: 'جنوب السودان',
  },
  {
    collection: 'translations',
    match: {
      sourceId: 504,
    },
    locale: 'fr',
    path: ['text'],
    before: 'South Sudan',
    after: 'Soudan du Sud',
  },
  {
    collection: 'translations',
    match: {
      sourceId: 506,
    },
    locale: 'ar',
    path: ['text'],
    before: 'Spain',
    after: 'إسبانيا',
  },
  {
    collection: 'translations',
    match: {
      sourceId: 506,
    },
    locale: 'fr',
    path: ['text'],
    before: 'Spain',
    after: 'Espagne',
  },
  {
    collection: 'translations',
    match: {
      sourceId: 508,
    },
    locale: 'ar',
    path: ['text'],
    before: 'Sri Lanka',
    after: 'سريلانكا',
  },
  {
    collection: 'translations',
    match: {
      sourceId: 510,
    },
    locale: 'ar',
    path: ['text'],
    before: 'Sudan',
    after: 'السودان',
  },
  {
    collection: 'translations',
    match: {
      sourceId: 510,
    },
    locale: 'fr',
    path: ['text'],
    before: 'Sudan',
    after: 'Soudan',
  },
  {
    collection: 'translations',
    match: {
      sourceId: 512,
    },
    locale: 'ar',
    path: ['text'],
    before: 'Suriname',
    after: 'سورينام',
  },
  {
    collection: 'translations',
    match: {
      sourceId: 514,
    },
    locale: 'ar',
    path: ['text'],
    before: 'Sweden',
    after: 'السويد',
  },
  {
    collection: 'translations',
    match: {
      sourceId: 514,
    },
    locale: 'fr',
    path: ['text'],
    before: 'Sweden',
    after: 'Suède',
  },
  {
    collection: 'translations',
    match: {
      sourceId: 516,
    },
    locale: 'ar',
    path: ['text'],
    before: 'Switzerland',
    after: 'سويسرا',
  },
  {
    collection: 'translations',
    match: {
      sourceId: 516,
    },
    locale: 'fr',
    path: ['text'],
    before: 'Switzerland',
    after: 'Suisse',
  },
  {
    collection: 'translations',
    match: {
      sourceId: 518,
    },
    locale: 'ar',
    path: ['text'],
    before: 'Syria',
    after: 'سوريا',
  },
  {
    collection: 'translations',
    match: {
      sourceId: 518,
    },
    locale: 'fr',
    path: ['text'],
    before: 'Syria',
    after: 'Syrie',
  },
  {
    collection: 'translations',
    match: {
      sourceId: 520,
    },
    locale: 'ar',
    path: ['text'],
    before: 'Taiwan',
    after: 'تايوان',
  },
  {
    collection: 'translations',
    match: {
      sourceId: 520,
    },
    locale: 'fr',
    path: ['text'],
    before: 'Taiwan',
    after: 'Taïwan',
  },
  {
    collection: 'translations',
    match: {
      sourceId: 522,
    },
    locale: 'ar',
    path: ['text'],
    before: 'Tajikistan',
    after: 'طاجيكستان',
  },
  {
    collection: 'translations',
    match: {
      sourceId: 522,
    },
    locale: 'fr',
    path: ['text'],
    before: 'Tajikistan',
    after: 'Tadjikistan',
  },
  {
    collection: 'translations',
    match: {
      sourceId: 524,
    },
    locale: 'ar',
    path: ['text'],
    before: 'Tanzania',
    after: 'تنزانيا',
  },
  {
    collection: 'translations',
    match: {
      sourceId: 524,
    },
    locale: 'fr',
    path: ['text'],
    before: 'Tanzania',
    after: 'Tanzanie',
  },
  {
    collection: 'translations',
    match: {
      sourceId: 526,
    },
    locale: 'ar',
    path: ['text'],
    before: 'Thailand',
    after: 'تايلاند',
  },
  {
    collection: 'translations',
    match: {
      sourceId: 526,
    },
    locale: 'fr',
    path: ['text'],
    before: 'Thailand',
    after: 'Thaïlande',
  },
  {
    collection: 'translations',
    match: {
      sourceId: 528,
    },
    locale: 'ar',
    path: ['text'],
    before: 'Timor-Leste',
    after: 'تيمور الشرقية',
  },
  {
    collection: 'translations',
    match: {
      sourceId: 530,
    },
    locale: 'ar',
    path: ['text'],
    before: 'Togo',
    after: 'توغو',
  },
  {
    collection: 'translations',
    match: {
      sourceId: 532,
    },
    locale: 'ar',
    path: ['text'],
    before: 'Tonga',
    after: 'تونغا',
  },
  {
    collection: 'translations',
    match: {
      sourceId: 532,
    },
    locale: 'fr',
    path: ['text'],
    before: 'Tonga',
    after: 'États-Unis',
  },
  {
    collection: 'translations',
    match: {
      sourceId: 534,
    },
    locale: 'ar',
    path: ['text'],
    before: 'Trinidad and Tobago',
    after: 'ترينيداد وتوباغو',
  },
  {
    collection: 'translations',
    match: {
      sourceId: 534,
    },
    locale: 'fr',
    path: ['text'],
    before: 'Trinidad and Tobago',
    after: 'Trinité-et-Tobago',
  },
  {
    collection: 'translations',
    match: {
      sourceId: 536,
    },
    locale: 'ar',
    path: ['text'],
    before: 'Tunisia',
    after: 'تونس',
  },
  {
    collection: 'translations',
    match: {
      sourceId: 536,
    },
    locale: 'fr',
    path: ['text'],
    before: 'Tunisia',
    after: 'Tunisie',
  },
  {
    collection: 'translations',
    match: {
      sourceId: 538,
    },
    locale: 'ar',
    path: ['text'],
    before: 'Turkey',
    after: 'تركيا',
  },
  {
    collection: 'translations',
    match: {
      sourceId: 538,
    },
    locale: 'fr',
    path: ['text'],
    before: 'Turkey',
    after: 'Turquie',
  },
  {
    collection: 'translations',
    match: {
      sourceId: 540,
    },
    locale: 'ar',
    path: ['text'],
    before: 'Turkmenistan',
    after: 'تركمانستان',
  },
  {
    collection: 'translations',
    match: {
      sourceId: 540,
    },
    locale: 'fr',
    path: ['text'],
    before: 'Turkmenistan',
    after: 'Turkménistan',
  },
  {
    collection: 'translations',
    match: {
      sourceId: 542,
    },
    locale: 'ar',
    path: ['text'],
    before: 'Tuvalu',
    after: 'توفالو',
  },
  {
    collection: 'translations',
    match: {
      sourceId: 544,
    },
    locale: 'ar',
    path: ['text'],
    before: 'Uganda',
    after: 'أوغندا',
  },
  {
    collection: 'translations',
    match: {
      sourceId: 544,
    },
    locale: 'fr',
    path: ['text'],
    before: 'Uganda',
    after: 'Ouganda',
  },
  {
    collection: 'translations',
    match: {
      sourceId: 546,
    },
    locale: 'ar',
    path: ['text'],
    before: 'Ukraine',
    after: 'أوكرانيا',
  },
  {
    collection: 'translations',
    match: {
      sourceId: 548,
    },
    locale: 'ar',
    path: ['text'],
    before: 'United Arab Emirates',
    after: 'الإمارات العربية المتحدة',
  },
  {
    collection: 'translations',
    match: {
      sourceId: 548,
    },
    locale: 'fr',
    path: ['text'],
    before: 'United Arab Emirates',
    after: 'Émirats arabes unis',
  },
  {
    collection: 'translations',
    match: {
      sourceId: 550,
    },
    locale: 'ar',
    path: ['text'],
    before: 'United Kingdom',
    after: 'المملكة المتحدة',
  },
  {
    collection: 'translations',
    match: {
      sourceId: 550,
    },
    locale: 'fr',
    path: ['text'],
    before: 'United Kingdom',
    after: 'Royaume-Uni',
  },
  {
    collection: 'translations',
    match: {
      sourceId: 552,
    },
    locale: 'ar',
    path: ['text'],
    before: 'United States',
    after: 'الولايات المتحدة',
  },
  {
    collection: 'translations',
    match: {
      sourceId: 552,
    },
    locale: 'fr',
    path: ['text'],
    before: 'United States',
    after: 'États-Unis',
  },
  {
    collection: 'translations',
    match: {
      sourceId: 554,
    },
    locale: 'ar',
    path: ['text'],
    before: 'Uruguay',
    after: 'أوروغواي',
  },
  {
    collection: 'translations',
    match: {
      sourceId: 556,
    },
    locale: 'ar',
    path: ['text'],
    before: 'Uzbekistan',
    after: 'أوزبكستان',
  },
  {
    collection: 'translations',
    match: {
      sourceId: 556,
    },
    locale: 'fr',
    path: ['text'],
    before: 'Uzbekistan',
    after: 'Ouzbékistan',
  },
  {
    collection: 'translations',
    match: {
      sourceId: 558,
    },
    locale: 'ar',
    path: ['text'],
    before: 'Vanuatu',
    after: 'فانواتو',
  },
  {
    collection: 'translations',
    match: {
      sourceId: 560,
    },
    locale: 'ar',
    path: ['text'],
    before: 'Vatican City',
    after: 'مدينة الفاتيكان',
  },
  {
    collection: 'translations',
    match: {
      sourceId: 560,
    },
    locale: 'fr',
    path: ['text'],
    before: 'Vatican City',
    after: 'Cité du Vatican',
  },
  {
    collection: 'translations',
    match: {
      sourceId: 562,
    },
    locale: 'ar',
    path: ['text'],
    before: 'Venezuela',
    after: 'فنزويلا',
  },
  {
    collection: 'translations',
    match: {
      sourceId: 564,
    },
    locale: 'ar',
    path: ['text'],
    before: 'Vietnam',
    after: 'فيتنام',
  },
  {
    collection: 'translations',
    match: {
      sourceId: 566,
    },
    locale: 'ar',
    path: ['text'],
    before: 'Yemen',
    after: 'اليمن',
  },
  {
    collection: 'translations',
    match: {
      sourceId: 566,
    },
    locale: 'fr',
    path: ['text'],
    before: 'Yemen',
    after: 'Yémen',
  },
  {
    collection: 'translations',
    match: {
      sourceId: 568,
    },
    locale: 'ar',
    path: ['text'],
    before: 'Zambia',
    after: 'زامبيا',
  },
  {
    collection: 'translations',
    match: {
      sourceId: 568,
    },
    locale: 'fr',
    path: ['text'],
    before: 'Zambia',
    after: 'Zambie',
  },
  {
    collection: 'translations',
    match: {
      sourceId: 570,
    },
    locale: 'ar',
    path: ['text'],
    before: 'Zimbabwe',
    after: 'زيمبابوي',
  },
  {
    collection: 'forms',
    match: {
      key: 'default:home',
    },
    locale: 'ar',
    path: ['submitButtonLabel'],
    before: 'Send enquiry',
    after: 'إرسال الاستفسار',
  },
  {
    collection: 'forms',
    match: {
      key: 'default:home',
    },
    locale: 'fr',
    path: ['submitButtonLabel'],
    before: 'Send enquiry',
    after: 'Envoyer la demande',
  },
  {
    collection: 'forms',
    match: {
      key: 'pages:1:home',
    },
    locale: 'ar',
    path: ['submitButtonLabel'],
    before: 'Send enquiry',
    after: 'إرسال الاستفسار',
  },
  {
    collection: 'forms',
    match: {
      key: 'pages:1:home',
    },
    locale: 'fr',
    path: ['submitButtonLabel'],
    before: 'Send enquiry',
    after: 'Envoyer la demande',
  },
]

function withoutIDs(value: unknown): unknown {
  if (Array.isArray(value)) return value.map(withoutIDs)
  if (!value || typeof value !== 'object') return value
  return Object.fromEntries(
    Object.entries(value)
      .filter(([key]) => key !== 'id')
      .map(([key, child]) => [key, withoutIDs(child)]),
  )
}

async function apply({ payload, req }: MigrateUpArgs, reverse = false): Promise<void> {
  const request = {
    ...req,
    context: {
      ...req.context,
      disableEmails: true,
      disableRevalidate: true,
      disablePublicProjection: true,
      disableOwnerForms: true,
      disableSlotGeneration: true,
      propagatingForms: true,
    },
  } as PayloadRequest
  const groups = new Map<string, Change[]>()
  for (const change of changes) {
    const key = JSON.stringify([change.collection, change.match, change.locale])
    const group = groups.get(key) ?? []
    group.push(change)
    groups.set(key, group)
  }
  for (const group of groups.values()) {
    const { collection, match, locale } = group[0]
    const { docs } = await payload.find({
      collection,
      locale,
      fallbackLocale: false,
      depth: 0,
      joins: false as never,
      limit: 1,
      where: { and: Object.entries(match).map(([key, value]) => ({ [key]: { equals: value } })) },
      req: request,
    })
    if (!docs[0]) continue
    const doc = structuredClone(docs[0]) as unknown as Record<string, unknown>
    const data: Record<string, unknown> = {}
    for (const change of group) {
      let parent: unknown = doc
      for (const key of change.path.slice(0, -1))
        parent =
          parent && typeof parent === 'object'
            ? (parent as Record<string | number, unknown>)[key]
            : undefined
      if (!parent || typeof parent !== 'object') continue
      const row = parent as Record<string | number, unknown>
      const key = change.path.at(-1)!
      const before = reverse ? change.after : change.before
      if (JSON.stringify(withoutIDs(row[key])) !== JSON.stringify(withoutIDs(before))) continue
      row[key] = reverse ? change.before : change.after
      const field = String(change.path[0])
      data[field] = doc[field]
    }
    if (Object.keys(data).length)
      await payload.update({ collection, id: docs[0].id, locale, depth: 0, data, req: request })
  }
}

export async function up(args: MigrateUpArgs): Promise<void> {
  await apply(args)
}
export async function down(args: MigrateDownArgs): Promise<void> {
  await apply(args, true)
}
