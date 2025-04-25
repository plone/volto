/**
 * Navigation actions.
 * @module actions/navigation/navigation
 */

import { GET_NAVIGATION } from '@plone/volto/constants/ActionTypes';

/**
 * Get navigation.
 * @function getNavigation
 * @param {string} url Content url.
 * @param {number} depth Depth of the navigation tree.
 * @returns {Object} Get navigation action.
 */
export function getNavigation(url, depth) {
  // Note: Depth can't be 0 in plone.restapi
  return {
    type: GET_NAVIGATION,
    request: {
      op: 'get',
      path: `${url}/@navigation${
        depth ? `?expand.navigation.depth=${depth}` : ''
      }`,
    },
  };
}
