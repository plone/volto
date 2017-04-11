/**
 * Types actions.
 * @module actions/types/types
 */

import {
  GET_TYPES, GET_TYPES_SUCCESS, GET_TYPES_FAIL,
} from '../../constants/ActionTypes';

/**
 * Get types function.
 * @function getTypes
 * @param {string} url Content url.
 * @returns {Object} Get types action.
 */
export default function getTypes(url) {
  return {
    types: [GET_TYPES, GET_TYPES_SUCCESS, GET_TYPES_FAIL],
    promise: api => api.get(`${url}/@types`),
  };
}
