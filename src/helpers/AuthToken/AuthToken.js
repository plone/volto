/**
 * AuthToken helper.
 * @module helpers/AuthToken
 */

import cookie from 'react-cookie';
import jwtDecode from 'jwt-decode';
import { Router } from 'react-router-dom';

import { loginRenew } from '../../actions';

/**
 * Get auth token method.
 * @method getAuthToken
 * @returns {undefined}
 */
export function getAuthToken() {
  return cookie.load('auth_token');
}

/**
 * Persist auth token method.
 * @method persistAuthToken
 * @param {object} store Redux store.
 * @returns {undefined}
 */
export function persistAuthToken(store) {
  let currentValue = getAuthToken();

  /**
   * handleChange method.
   * @method handleChange
   * @param {bool} initial Initial call.
   * @returns {undefined}
   */
  function handleChange(initial) {
    const previousValue = currentValue;
    const state = store.getState();
    currentValue = state.userSession.token;
    if (previousValue !== currentValue || initial) {
      if (!currentValue) {
        cookie.remove('auth_token', { path: '/' });
      } else {
        cookie.save('auth_token', currentValue, {
          path: '/',
          expires: new Date(jwtDecode(currentValue).exp * 1000),
        });
        setTimeout(() => {
          if (store.getState().userSession.token) {
            if (
              jwtDecode(store.getState().userSession.token).exp * 1000 >
              new Date().getTime()
            ) {
              store.dispatch(loginRenew());
            } else {
              // Logout
              Router.push(
                `/logout?return_url=${
                  store.getState().routing.locationBeforeTransitions.pathname
                }`,
              );
            }
          }
        }, (jwtDecode(store.getState().userSession.token).exp * 1000 - new Date().getTime()) * 0.9);
      }
    }
  }

  store.subscribe(handleChange);
  handleChange(true);
}
