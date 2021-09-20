/**
 * Search actions.
 * @module actions/search/search
 */

import { LOGIN, LOGIN_RENEW, LOGOUT } from '@plone/volto/constants/ActionTypes';
import cookie from 'react-cookie';

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
  cookie.remove('__ac', { path: '/' });

  return {
    type: LOGOUT,
  };
}
