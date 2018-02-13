/**
 * Comments reducer.
 * @module reducers/comments
 */

import {
  ADD_COMMENT,
  DELETE_COMMENT,
  EDIT_COMMENT,
  GET_COMMENTS,
} from '../../constants/ActionTypes';

const initialState = {
  add: {
    loaded: false,
    loading: false,
    error: null,
  },
  delete: {
    loaded: false,
    loading: false,
    error: null,
  },
  edit: {
    loaded: false,
    loading: false,
    error: null,
  },
  get: {
    loaded: false,
    loading: false,
    error: null,
  },
  items: [],
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
 * Comments reducer.
 * @function comments
 * @param {Object} state Current state.
 * @param {Object} action Action to be handled.
 * @returns {Object} New state.
 */
export default function comments(state = initialState, action = {}) {
  switch (action.type) {
    case `${ADD_COMMENT}_PENDING`:
    case `${DELETE_COMMENT}_PENDING`:
    case `${EDIT_COMMENT}_PENDING`:
    case `${GET_COMMENTS}_PENDING`:
      return {
        ...state,
        [getRequestKey(action.type)]: {
          loading: true,
          loaded: false,
          error: null,
        },
      };
    case `${GET_COMMENTS}_SUCCESS`:
      return {
        ...state,
        items: action.result.items,
        [getRequestKey(action.type)]: {
          loading: false,
          loaded: true,
          error: null,
        },
      };
    case `${ADD_COMMENT}_SUCCESS`:
    case `${DELETE_COMMENT}_SUCCESS`:
    case `${EDIT_COMMENT}_SUCCESS`:
      return {
        ...state,
        [getRequestKey(action.type)]: {
          loading: false,
          loaded: true,
          error: null,
        },
      };
    case `${ADD_COMMENT}_FAIL`:
    case `${GET_COMMENTS}_FAIL`:
      return {
        ...state,
        items: [],
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
