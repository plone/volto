/**
 * Navigation actions.
 * @module actions/navigation/navigation
 */

import { GET_NAVIGATION } from '../../constants/ActionTypes';

/**
 * Get navigation.
 * @function getNavigation
 * @param {string} url Content url.
 * @returns {Object} Get navigation action.
 */
export function getNavigation(url) {
  return {
    type: GET_NAVIGATION,
    request: {
      op: 'get',
      path: `${url}/@navigation`,
    },
  };
}
