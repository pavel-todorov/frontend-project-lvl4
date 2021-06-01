/* eslint no-var: ["off"] */
/* eslint import/no-mutable-exports: ["off"] */
import i18next from 'i18next';
import ruTranslation from './ru.js';

const i18n = i18next.default || i18next;

export var i18nextInstance;

export const initTranslations = async () => {
  i18nextInstance = i18n.createInstance();
  return i18nextInstance.init({
    lng: 'ru',
    debug: true,
    resources: {
      ru: {
        translation: ruTranslation,
      },
    },
  });
};
