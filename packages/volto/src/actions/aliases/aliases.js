/**
 * Aliases actions.
 * @module actions/aliases/aliases
 */

import {
  GET_ALIASES,
  ADD_ALIASES,
  REMOVE_ALIASES,
  UPLOAD_ALIASES,
} from '@plone/volto/constants/ActionTypes';

const isEmpty = (value) =>
  value === undefined || value === null || value === '';

/**
 * Get aliases function.
 * Empty options (undefined, null or empty string) are not sent to the backend.
 * @function getAliases
 * @param {string} url Content url.
 * @param {Object} options Options data.
 * @returns {Object} Get aliases action.
 */
export function getAliases(url, options = {}) {
  const { query, batchSize, batchStart, ...rest } = options;
  const params = new URLSearchParams();
  Object.entries({
    q: query,
    b_start: isEmpty(batchStart) ? 0 : batchStart,
    b_size: isEmpty(batchSize) ? 99999999999 : batchSize,
    ...rest,
  }).forEach(([key, value]) => {
    if (!isEmpty(value)) {
      params.append(key, value);
    }
  });
  return {
    type: GET_ALIASES,
    request: {
      op: 'get',
      path: `${url}/@aliases?${params.toString()}`,
    },
  };
}

/**
 * Add alias function.
 * @function addAliases
 * @param {string} url Content url.
 * @param {Object} data Aliases to add data object.
 * @returns {Object} Add alias action.
 */
export function addAliases(url, data) {
  return {
    type: ADD_ALIASES,
    request: {
      op: 'post',
      path: `${url}/@aliases`,
      data,
    },
  };
}

/**
 * Remove aliases function.
 * @function removeAliases
 * @param {string} url Content url.
 * @param {Object} data Aliases to remove data object.
 * @returns {Object} Remove alias action.
 */
export function removeAliases(url, data) {
  return {
    type: REMOVE_ALIASES,
    request: {
      op: 'del',
      path: `${url}/@aliases`,
      data,
    },
  };
}

/**
 * Upload aliases function.
 * @function uploadAliases
 * @param {Object} file CSV file.
 * @returns {Object} Upload aliases action.
 */
export function uploadAliases(file) {
  return {
    type: UPLOAD_ALIASES,
    request: {
      op: 'post',
      path: '/@aliases',
      attach: [['file', file]],
    },
  };
}
