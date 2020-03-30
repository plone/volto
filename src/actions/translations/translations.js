/**
 * translations actions.
 * @module actions/translations/translations
 */

import { GET_TRANSLATION_LOCATOR } from '@plone/volto/constants/ActionTypes';

/**
 * Get translations function.
 * @function getTranslationLocator
 * @param {string} url URL type.
 * @returns {Object} Get translations action.
 */
export function getTranslationLocator(url, lang) {
  return {
    type: GET_TRANSLATION_LOCATOR,
    request: {
      op: 'get',
      path: `${url}/@translation-locator?target_language=${lang}`,
    },
  };
}
