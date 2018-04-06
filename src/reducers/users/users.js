/**
 * Users reducer.
 * @module reducers/users
 */

import { startsWith } from 'lodash';

import {
  ADD_USER,
  DELETE_USER,
  GET_USER,
  GET_USERS,
  EDIT_USER,
  EDIT_PASSWORD,
  INITIAL_PASSWORD,
  RESET_PASSWORD,
} from '../../constants/ActionTypes';

const initialState = {
  user: {},
  users: [],
  add: {
    error: null,
    loaded: false,
    loading: false,
  },
  get: {
    error: null,
    loaded: false,
    loading: false,
  },
  get_all: {
    error: null,
    loaded: false,
    loading: false,
  },
  delete: {
    error: null,
    loaded: false,
    loading: false,
  },
  edit: {
    error: null,
    loaded: false,
    loading: false,
  },
  edit_password: {
    error: null,
    loaded: false,
    loading: false,
  },
  password: {
    error: null,
    loaded: false,
    loading: false,
  },
  initial: {
    error: null,
    loaded: false,
    loading: false,
  },
  reset: {
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
  if (startsWith(actionType, 'EDIT_PASSWORD')) {
    return 'edit_password';
  }
  if (startsWith(actionType, 'GET_USERS')) {
    return 'get_all';
  }
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
    case `${ADD_USER}_PENDING`:
    case `${DELETE_USER}_PENDING`:
    case `${GET_USER}_PENDING`:
    case `${GET_USERS}_PENDING`:
    case `${EDIT_USER}_PENDING`:
    case `${EDIT_PASSWORD}_PENDING`:
    case `${INITIAL_PASSWORD}_PENDING`:
    case `${RESET_PASSWORD}_PENDING`:
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
    case `${GET_USERS}_SUCCESS`:
      return {
        ...state,
        users: action.result,
        [getRequestKey(action.type)]: {
          loading: false,
          loaded: true,
          error: null,
        },
      };
    case `${ADD_USER}_SUCCESS`:
    case `${DELETE_USER}_SUCCESS`:
    case `${EDIT_USER}_SUCCESS`:
    case `${EDIT_PASSWORD}_SUCCESS`:
    case `${INITIAL_PASSWORD}_SUCCESS`:
    case `${RESET_PASSWORD}_SUCCESS`:
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
          error: action.error.error,
        },
      };
    case `${GET_USERS}_FAIL`:
      return {
        ...state,
        users: [],
        [getRequestKey(action.type)]: {
          loading: false,
          loaded: false,
          error: action.error.error,
        },
      };
    case `${ADD_USER}_FAIL`:
    case `${DELETE_USER}_FAIL`:
    case `${EDIT_USER}_FAIL`:
    case `${EDIT_PASSWORD}_FAIL`:
    case `${INITIAL_PASSWORD}_FAIL`:
    case `${RESET_PASSWORD}_FAIL`:
      return {
        ...state,
        [getRequestKey(action.type)]: {
          loading: false,
          loaded: false,
          error: action.error.error,
        },
      };
    default:
      return state;
  }
}
