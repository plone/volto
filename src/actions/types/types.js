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
export default function getTypes(url) {
  return {
    type: GET_TYPES,
    promise: api => api.get(`${url}/@types`),
  };
}
