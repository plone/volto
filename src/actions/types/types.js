/**
 * Types actions.
 * @module actions/types/types
 */

import { GET_TYPES } from '../../constants/ActionTypes';

/**
 * Get types function.
 * @function getTypes
 * @param {string} url Content url.
 * @returns {Object} Get types action.
 */
export function getTypes(url) {
  return {
    type: GET_TYPES,
    request: {
      op: 'get',
      path: `${url}/@types`,
    },
  };
}
