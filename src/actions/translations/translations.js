/**
 * translations actions.
 * @module actions/translations/translations
 */

import {
  GET_TRANSLATION_LOCATOR,
  LINK_TRANSLATION,
} from '@plone/volto/constants/ActionTypes';

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

/**
 * Link translations function.
 * @function linkTranslation
 * @param {string} url URL type.
 * @returns {Object} Get translations action.
 */
export function linkTranslation(url, target) {
  return {
    type: LINK_TRANSLATION,
    request: {
      op: 'post',
      path: `${url}/@translations`,
      data: {
        id: target,
      },
    },
  };
}
