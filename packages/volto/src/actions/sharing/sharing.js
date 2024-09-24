/**
 * Sharing actions.
 * @module actions/sharing/sharing
 */

import {
  UPDATE_SHARING,
  GET_SHARING,
} from '@plone/volto/constants/ActionTypes';

/**
 * Update sharing function.
 * @function updateSharing
 * @param {string} url Content url.
 * @param {Object} sharing Sharing data.
 * @returns {Object} Update sharing action.
 */
export function updateSharing(url, sharing) {
  return {
    type: UPDATE_SHARING,
    request: {
      op: 'post',
      path: `${url}/@sharing`,
      data: sharing,
    },
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
    request: {
      op: 'get',
      path: `${url}/@sharing${search !== '' ? `?search=${search}` : ''}`,
    },
  };
}
