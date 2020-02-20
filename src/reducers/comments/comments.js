/**
 * Comments reducer.
 * @module reducers/comments/comments
 */

import {
  ADD_COMMENT,
  DELETE_COMMENT,
  UPDATE_COMMENT,
  LIST_COMMENTS,
} from '@plone/volto/constants/ActionTypes';

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
  update: {
    loaded: false,
    loading: false,
    error: null,
  },
  list: {
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
    case `${UPDATE_COMMENT}_PENDING`:
    case `${LIST_COMMENTS}_PENDING`:
      return {
        ...state,
        [getRequestKey(action.type)]: {
          loading: true,
          loaded: false,
          error: null,
        },
      };
    case `${LIST_COMMENTS}_SUCCESS`:
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
    case `${UPDATE_COMMENT}_SUCCESS`:
      return {
        ...state,
        [getRequestKey(action.type)]: {
          loading: false,
          loaded: true,
          error: null,
        },
      };
    case `${ADD_COMMENT}_FAIL`:
    case `${LIST_COMMENTS}_FAIL`:
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
