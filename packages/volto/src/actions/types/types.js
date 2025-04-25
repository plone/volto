/**
 * Types actions.
 * @module actions/types/types
 */

import { GET_TYPES } from '@plone/volto/constants/ActionTypes';

/**
 * Get types function.
 * @function getTypes
 * @param {string} url Content url.
 * @returns {Object} Get types action.
 */
export function getTypes(url) {
  return (dispatch, getState) => {
    if (getState().userSession.token) {
      dispatch({
        type: GET_TYPES,
        request: {
          op: 'get',
          path: `${url}/@types`,
        },
      });
    }
  };
}
