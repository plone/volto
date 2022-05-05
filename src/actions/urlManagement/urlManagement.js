import { GET_ALIASES } from '@plone/volto/constants/ActionTypes';

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
