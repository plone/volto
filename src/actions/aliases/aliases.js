/**
 * Aliases actions.
 * @module actions/aliases/aliases
 */

import {
  GET_ALIASES,
  ADD_ALIASES,
  REMOVE_ALIASES,
} from '@plone/volto/constants/ActionTypes';

/**
 * Get aliases function.
 * @function getAliases
 * @param {string} url Content url.
 * @returns {Object} Get aliases action.
 */
export function getAliases(url, query, manual, datetime) {
  return {
    type: GET_ALIASES,
    request: {
      op: 'get',
      path: `${url}/@aliases?q=${query ? query : ''}&manual=${
        manual ? manual : ''
      }&datetime=${datetime !== null ? datetime : ''}`,
    },
  };
}

/**
 * Add alias function.
 * @function addAliases
 * @param {string} url Content url.
 * @param {string} data Alias.
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
 * @param {string} data Alias.
 * @returns {Object} Add alias action.
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
