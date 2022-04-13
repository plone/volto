/**
 * Authenticated user state selectors.
 * @module selectors/userSession/userSession
 */

import jwtDecode from 'jwt-decode';

/**
 * Is a user logged in selector
 * @function loggedIn
 * @param {Object} state Current full Redux store state.
 * @returns {boolean} `true` if a user is currently authenticated, `false` otherwise.
 */
export function loggedIn(state) {
  return !!state.userSession.token;
}

/**
 * Retreive user data for the currently authenticated user
 * @function userData
 * @param {Object} state Current full Redux store state.
 * @returns {Object} An object with properties for each user data
 */
export function userData(state) {
  return {
    userId: state.userSession.token
      ? jwtDecode(state.userSession.token).sub
      : '',
  };
}
