/**
 * Navigation actions.
 * @module actions/navigation/navigation
 */

import {
  GET_NAVIGATION, GET_NAVIGATION_SUCCESS, GET_NAVIGATION_FAIL,
} from '../../constants/ActionTypes';

/**
 * Get navigation.
 * @function getNavigation
 * @param {string} url Content url.
 * @returns {Object} Get navigation action.
 */
export default function getNavigation(url) {
  return {
    types: [GET_NAVIGATION, GET_NAVIGATION_SUCCESS, GET_NAVIGATION_FAIL],
    promise: api => api.get(`${url}/@components/navigation`),
  };
}
