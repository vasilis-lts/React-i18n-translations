import { initReactI18next } from 'react-i18next'
import i18n from 'i18next';

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    ns: ['namespace1'],
    resources: {},
    lng: "nl",
  });



export default i18n;
