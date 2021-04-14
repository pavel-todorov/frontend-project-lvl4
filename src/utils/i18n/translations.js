/* eslint functional/no-let: ["off"] */
import i18next from 'i18next';
import ruTranslation from './ru';

const i18n = i18next.default || i18next;

export let i18nextInstance;

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
