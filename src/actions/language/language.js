import { updateIntl } from 'react-intl-redux';
import { normalizeLanguageName } from '@plone/volto/helpers';
import Cookies from 'universal-cookie';
import config from '@plone/volto/registry';

export function changeLanguageCookies(language) {
  const cookies = new Cookies();

  cookies.set('lang', normalizeLanguageName(language), {
    expires: new Date(
      new Date().getTime() + config.settings.cookieExpires * 1000,
    ),
    path: '/',
  });
  cookies.set('I18N_LANGUAGE', normalizeLanguageName(language) || '', {
    expires: new Date(
      new Date().getTime() + config.settings.cookieExpires * 1000,
    ),
    path: '/',
  });
}

/**
 * Changes current language using react-intl-redux action and setting the cookie
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
