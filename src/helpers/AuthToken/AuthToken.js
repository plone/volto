/**
 * AuthToken helper.
 * @module helpers/AuthToken
 */

import cookie from 'react-cookie';
import jwtDecode from 'jwt-decode';

import { loginRenew } from '@plone/volto/actions';
import { push } from 'connected-react-router';

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

    if (
      module.hot &&
      module.hot.data &&
      module.hot.data.reloaded &&
      previousValue
    ) {
      currentValue = previousValue;
    }

    if (previousValue !== currentValue || initial) {
      if (!currentValue) {
        cookie.remove('auth_token', { path: '/' });
      } else {
        cookie.save('auth_token', currentValue, {
          path: '/',
          expires: new Date(jwtDecode(currentValue).exp * 1000),
        });
        const exp =
          (jwtDecode(store.getState().userSession.token).exp * 1000 -
            new Date().getTime()) *
            0.9 || 3600000;
        setTimeout(() => {
          if (store.getState().userSession.token) {
            if (
              jwtDecode(store.getState().userSession.token).exp * 1000 >
              new Date().getTime()
            ) {
              store.dispatch(loginRenew());
            } else {
              // Logout
              store.dispatch(
                push(
                  `/logout?return_url=${
                    store.getState().router.location.pathname
                  }`,
                ),
              );
            }
          }
        }, exp);
      }
    }
  }

  store.subscribe(handleChange);
  handleChange(true);
}

if (module.hot) {
  module.hot.dispose((data) => {
    data.reloaded = true;
  });
}
