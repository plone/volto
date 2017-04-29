/**
 * Users reducer.
 * @module reducers/users
 */

import {
  GET_USER,
  EDIT_USER,
  EDIT_PASSWORD,
} from '../../constants/ActionTypes';

const initialState = {
  user: {},
  get: {
    error: null,
    loaded: false,
    loading: false,
  },
  edit: {
    error: null,
    loaded: false,
    loading: false,
  },
  password: {
    error: null,
    loaded: false,
    loading: false,
  },
};

/**
 * Get request key
 * @function getRequestKey
 * @param {string} actionType Action type.
 * @returns {string} Request key.
 */
function getRequestKey(actionType) {
  return actionType.split('_')[0].toLowerCase();
}

/**
 * Users reducer.
 * @function users
 * @param {Object} state Current state.
 * @param {Object} action Action to be handled.
 * @returns {Object} New state.
 */
export default function users(state = initialState, action = {}) {
  switch (action.type) {
    case `${GET_USER}_PENDING`:
    case `${EDIT_USER}_PENDING`:
    case `${EDIT_PASSWORD}_PENDING`:
      return {
        ...state,
        [getRequestKey(action.type)]: {
          loading: true,
          loaded: false,
          error: null,
        },
      };
    case `${GET_USER}_SUCCESS`:
      return {
        ...state,
        user: action.result,
        [getRequestKey(action.type)]: {
          loading: false,
          loaded: true,
          error: null,
        },
      };
    case `${EDIT_USER}_SUCCESS`:
    case `${EDIT_PASSWORD}_SUCCESS`:
      return {
        ...state,
        [getRequestKey(action.type)]: {
          loading: false,
          loaded: true,
          error: null,
        },
      };
    case `${GET_USER}_FAIL`:
      return {
        ...state,
        user: {},
        [getRequestKey(action.type)]: {
          loading: false,
          loaded: false,
          error: action.error,
        },
      };
    case `${EDIT_USER}_FAIL`:
    case `${EDIT_PASSWORD}_FAIL`:
      return {
        ...state,
        [getRequestKey(action.type)]: {
          loading: false,
          loaded: false,
          error: action.error,
        },
      };
    default:
      return state;
  }
}
