/**
 * Sharing actions.
 * @module actions/sharing/sharing
 */

import { EDIT_SHARING, GET_SHARING } from '../../constants/ActionTypes';

/**
 * Edit sharing function.
 * @function editSharing
 * @param {string} url Content url.
 * @param {Object} sharing Sharing data.
 * @returns {Object} Edit sharing action.
 */
export function editSharing(url, sharing) {
  return {
    type: EDIT_SHARING,
    promise: api => api.post(`${url}/@sharing`, { data: sharing }),
  };
}

/**
 * Get sharing function.
 * @function getSharing
 * @param {string} url Content url.
 * @param {string} search Search value.
 * @returns {Object} Get sharing action.
 */
export function getSharing(url, search = '') {
  return {
    type: GET_SHARING,
    promise: api =>
      api.get(`${url}/@sharing${search !== '' ? `?search=${search}` : ''}`),
  };
}
