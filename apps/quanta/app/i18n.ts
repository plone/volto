import config from '@plone/registry';

export default {
  // This is the list of languages your application supports
  supportedLngs: config.settings.supportedLanguages,
  // This is the language you want to use in case
  // if the user language is not in the supportedLngs
  fallbackLng: config.settings.defaultLanguage,
  // The default namespace of i18next is "translation", but you can customize it here
  defaultNS: 'common',
};
