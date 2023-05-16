/**
 * Types actions.
 * @module actions/missingtranslations/missingtranslations
 */

import { GET_MISSING_TRANSLATIONS } from '@plone/volto/constants/ActionTypes';

/**
 * Get types function.
 * @function getTypes
 * @param {string} url Content url.
 * @returns {Object} Get types action.
 */
export function getMissingTranslations(url) {
  return (dispatch, getState) => {
    if (getState().userSession.token) {
      dispatch({
        type: GET_MISSING_TRANSLATIONS,
        request: {
          op: 'get',
          path: `${url}/@missing-translations`,
        },
      });
    }
  };
}
