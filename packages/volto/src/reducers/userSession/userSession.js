/**
 * User session reducer.
 * @module reducers/userSession/userSession
 */

import {
  LOGIN,
  LOGIN_RENEW,
  LOGOUT,
  RESET_LOGIN_REQUEST,
} from '@plone/volto/constants/ActionTypes';

const initialState = {
  token: null,
  login: {
    loaded: false,
    loading: false,
    error: null,
  },
};

/**
 * User session reducer.
 * @function userSession
 * @param {Object} state Current state.
 * @param {Object} action Action to be handled.
 * @returns {Object} New state.
 */
export default function userSession(state = initialState, action = {}) {
  switch (action.type) {
    case `${LOGIN}_PENDING`:
      return {
        ...state,
        token: null,
        login: {
          loading: true,
          loaded: false,
          error: null,
        },
      };
    case `${LOGIN}_SUCCESS`:
    case `${LOGIN_RENEW}_SUCCESS`:
      return {
        ...state,
        token: action.result.token,
        login: {
          loading: false,
          loaded: true,
          error: null,
        },
      };
    case `${LOGIN}_FAIL`:
    case `${LOGIN_RENEW}_FAIL`:
      return {
        ...state,
        token: null,
        login: {
          loading: false,
          loaded: false,
          error: action.error.response.error,
        },
      };
    case `${LOGOUT}_FAIL`:
    case `${LOGOUT}_SUCCESS`:
      return {
        ...state,
        token: null,
      };
    case `${RESET_LOGIN_REQUEST}`:
      return {
        ...state,
        login: {
          loading: false,
          loaded: false,
          error: null,
        },
      };
    default:
      return state;
  }
}
