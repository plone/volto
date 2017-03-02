/**
 * Actions.
 * @module actions
 */

import {
  GET_PAGE, GET_PAGE_SUCCESS, GET_PAGE_FAIL,
} from '../constants/ActionTypes';

/**
 * Get page function.
 * @function getPage
 * @param {string} url Page url.
 * @returns {Object} Register action.
 */
export function getPage(url) {
  return {
    types: [GET_PAGE, GET_PAGE_SUCCESS, GET_PAGE_FAIL],
    promise: api => api.get(url),
  };
}
