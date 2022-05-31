import { GET_RULES } from '@plone/volto/constants/ActionTypes';

/**
 * Get rules function.
 * @function getRules
 * @param {string} url Content url.
 * @returns {Object} Get rules action.
 */
export function getRules(url) {
  return {
    type: GET_RULES,
    request: {
      op: 'get',
      path: `${url}/@rules`,
    },
  };
}
