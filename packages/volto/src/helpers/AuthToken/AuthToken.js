/**
 * AuthToken helper.
 * @module helpers/AuthToken
 */

import Cookies from 'universal-cookie';
import jwtDecode from 'jwt-decode';

import { loginRenew } from '@plone/volto/actions';
import { getCookieOptions } from '@plone/volto/helpers';
import { push } from 'connected-react-router';

/**
 * Get auth token method (does not work in SSR)
 * @method getAuthToken
 * @returns {undefined}
 */
export function getAuthToken() {
  const cookies = new Cookies();
  return cookies.get('auth_token');
}

/**
 * Persist auth token method.
 * @method persistAuthToken
 * @param {object} store Redux store.
 * @returns {undefined}
 */
export function persistAuthToken(store, req) {
  const cookies = new Cookies();
  let currentValue;
  if (req) {
    // We are in SSR
    currentValue = req.universalCookies.get('auth_token');
  } else {
    currentValue = cookies.get('auth_token');
  }

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
        if (previousValue) {
          cookies.remove('auth_token', { path: '/' });
        }
      } else {
        if (previousValue !== currentValue) {
          cookies.set(
            'auth_token',
            currentValue,
            getCookieOptions({
              expires: new Date(jwtDecode(currentValue).exp * 1000),
            }),
          );
        }
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
