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
export default function getNavigation(url) {
  return {
    type: GET_NAVIGATION,
    promise: api => api.get(`${url}/@navigation`),
  };
}
