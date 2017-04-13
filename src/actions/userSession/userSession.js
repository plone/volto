/**
 * Search actions.
 * @module actions/search/search
 */

import {
  LOGIN_PENDING,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
} from '../../constants/ActionTypes';

/**
 * Login function.
 * @function login
 * @param {string} username Username.
 * @param {string} password Password.
 * @returns {Object} Login action.
 */
export function login(username, password) {
  return {
    types: [LOGIN_PENDING, LOGIN_SUCCESS, LOGIN_FAIL],
    promise: api => api.post('@login', { data: { login: username, password } }),
  };
}

/**
 * Logout function.
 * @function logout
 * @returns {Object} Logout action.
 */
export function logout() {
  return {
    type: LOGOUT,
  };
}
