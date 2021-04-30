import cookie from 'react-cookie';
import { updateIntl } from 'react-intl-redux';

export function changeLanguageCookies(language) {
  cookie.save('lang', language, {
    expires: new Date((2 ** 31 - 1) * 1000),
    path: '/',
  });
  cookie.save('I18N_LANGUAGE', language || '', {
    expires: new Date((2 ** 31 - 1) * 1000),
    path: '/',
  });
}

/**
 * Changes current language using react-intl-redux action and setting the cookie.
 * @function changeLanguage
 * @param {string} language target language.
 * @param {number} locale set of locales corresponding the target language.
 * @returns {Object} Change the target language action.
 */
export function changeLanguage(language, locale) {
  changeLanguageCookies(language);

  return updateIntl({
    locale: language,
    messages: locale,
  });
}
