/**
 * Login reducer.
 * @module reducers/login
 */

import { LOGIN, LOGIN_SUCCESS, LOGIN_FAIL } from 'constants/ActionTypes';

const initialState = {
  loaded: false,
  loading: false,
  token: null,
  error: null,
};

/**
 * Login reducer.
 * @function login
 * @param {Object} state Current state.
 * @param {Object} action Action to be handled.
 * @returns {Object} New state.
 */
export default function login(state = initialState, action = {}) {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        loading: true,
        loaded: false,
        token: null,
        error: null,
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        token: action.result.token,
        error: null,
      };
    case LOGIN_FAIL:
      return {
        ...state,
        loading: false,
        loaded: false,
        token: null,
        error: action.error.error,
      };
    default:
      return state;
  }
}
