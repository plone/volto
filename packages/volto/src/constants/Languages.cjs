/**
 * Languages.
 * @module constants/Languages
 */

const languages = {
  ca: 'Català',
  de: 'Deutsch',
  en: 'English',
  es: 'Español',
  eu: 'Euskara',
  fi: 'Suomi',
  fr: 'Français',
  hi: 'Hindi',
  it: 'Italiano',
  nl: 'Nederlands',
  ro: 'Română',
  ja: '日本語',
  pt: 'Português',
  pt_BR: 'Português (Brasil)',
  zh_CN: '中文',
};

// module.exports = languages;
// module.exports = { default: languages };
// TODO: For some reason loading cjs from ESM fails, and this has to export default as ESM :/
export default languages;
