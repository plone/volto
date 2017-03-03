/**
 * Actions.
 * @module actions
 */

import {
  GET_PAGE, GET_PAGE_SUCCESS, GET_PAGE_FAIL,
  LOGIN, LOGIN_SUCCESS, LOGIN_FAIL,
} from '../constants/ActionTypes';

/**
 * Get page function.
 * @function getPage
 * @param {string} url Page url.
 * @returns {Object} Get page action.
 */
export function getPage(url) {
  return {
    types: [GET_PAGE, GET_PAGE_SUCCESS, GET_PAGE_FAIL],
    promise: api => api.get(url),
  };
}

/**
 * Login function.
 * @function login
 * @param {string} login Login.
 * @param {string} password Password.
 * @returns {Object} Login action.
 */
export function login(login, password) {
  return {
    types: [LOGIN, LOGIN_SUCCESS, LOGIN_FAIL],
    promise: api => api.post('@login', { data: { login, password }}),
  };
}
