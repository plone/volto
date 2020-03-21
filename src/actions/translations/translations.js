/**
 * translations actions.
 * @module actions/translations/translations
 */

import { ADD_TRANSLATION } from '@plone/volto/constants/ActionTypes';

/**
 * Get translations function.
 * @function addTranslation
 * @param {string} url URL type.
 * @returns {Object} Get translations action.
 */
export function addTranslation(url, lang) {
  return {
    type: ADD_TRANSLATION,
    request: {
      op: 'post',
      path: `${url}/@translations`,
    },
  };
}
