/**
 * Types actions.
 * @module actions/missingtranslations/missingtranslations
 */

import { GET_MISSING_TRANSLATIONS } from '@plone/volto/constants/ActionTypes';

/**
 * Get types function.
 * @function getMissingTranslations
 * @param {string} url Content url.
 * @returns {Object} Get missingtranslations action.
 */
export function getMissingTranslations(url) {
  return {
    type: GET_MISSING_TRANSLATIONS,
    request: {
      op: 'get',
      path: `${url}/@missing-translations`,
    },
  };
}
