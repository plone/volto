import {
  GET_ALIASES,
  ADD_ALIAS,
  REMOVE_ALIASES,
} from '@plone/volto/constants/ActionTypes';

/**
 * Get aliases function.
 * @function getAliases
 * @param {string} url Content url.
 * @returns {Object} Get aliases action.
 */
export function getAliases(url) {
  return {
    type: GET_ALIASES,
    request: {
      op: 'get',
      path: `${url}/@aliases`,
    },
  };
}

/**
 * Add alias function.
 * @function addAlias
 * @param {string} url Content url.
 * @param {string} data Alias.
 * @returns {Object} Add alias action.
 */
export function addAlias(url, data) {
  return {
    type: ADD_ALIAS,
    request: {
      op: 'post',
      path: `${url}/@aliases`,
      data,
    },
    added: data.aliases,
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
    removed: data.aliases,
  };
}
