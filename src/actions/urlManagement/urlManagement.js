import { GET_ALIASES, ADD_ALIAS } from '@plone/volto/constants/ActionTypes';

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
 * @param {string} alias Alias.
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
