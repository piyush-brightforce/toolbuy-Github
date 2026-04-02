import i18next from 'i18next';
import {initReactI18next} from 'react-i18next';
import hi from './hi.json';
import en from './en.json';
import fr from './fr.json';
import ar from './ar.json';

i18next.use(initReactI18next).init({
  compatibilityJSON: 'v3',
  lng: 'en',
  fallbackLng: 'en',
  resources: {
    hi: hi,
    en: en,
    fr: fr,
    ar: ar,
  },interpolation: {
      escapeValue: false,
    },
});

export default i18next;

