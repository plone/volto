/**
 * Search actions.
 * @module actions/search/search
 */

import {
  LOGIN,
  LOGIN_RENEW,
  LOGOUT,
  RESET_LOGIN_REQUEST,
} from '@plone/volto/constants/ActionTypes';

/**
 * Login function.
 * @function login
 * @param {string} username Username.
 * @param {string} password Password.
 * @returns {Object} Login action.
 */
export function login(username, password) {
  return {
    type: LOGIN,
    request: {
      op: 'post',
      path: '@login',
      data: { login: username, password },
    },
  };
}

/**
 * Login renew function.
 * @function loginRenew
 * @returns {Object} Login renew action.
 */
export function loginRenew() {
  return {
    type: LOGIN_RENEW,
    request: {
      op: 'post',
      path: '@login-renew',
    },
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
    request: {
      op: 'post',
      path: '@logout',
    },
  };
}

/**
 * Reset login request data function
 * @function resetLoginRequest
 * @returns {Object} Get content action
 */
export function resetLoginRequest() {
  return {
    type: RESET_LOGIN_REQUEST,
  };
}
