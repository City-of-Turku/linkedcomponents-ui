import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import en from '../domain/app/i18n/en.json';
import fi from '../domain/app/i18n/fi.json';
import sv from '../domain/app/i18n/sv.json';

i18n.use(initReactI18next).init({
  lng: 'fi',
  fallbackLng: 'fi',
  resources: {
    en: {
      translation: en,
    },
    fi: {
      translation: fi,
    },
    sv: {
      translation: sv,
    },
  },
});

export default i18n;
