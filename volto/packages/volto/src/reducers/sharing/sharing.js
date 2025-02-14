/**
 * Sharing reducer.
 * @module reducers/sharing/sharing
 */

import {
  UPDATE_SHARING,
  GET_SHARING,
} from '@plone/volto/constants/ActionTypes';

const initialState = {
  update: {
    loaded: false,
    loading: false,
    error: null,
  },
  get: {
    loaded: false,
    loading: false,
    error: null,
  },
  data: {
    available_roles: [],
    entries: [],
    inherit: null,
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
 * Sharing reducer.
 * @function sharing
 * @param {Object} state Current state.
 * @param {Object} action Action to be handled.
 * @returns {Object} New state.
 */
export default function sharing(state = initialState, action = {}) {
  switch (action.type) {
    case `${UPDATE_SHARING}_PENDING`:
    case `${GET_SHARING}_PENDING`:
      return {
        ...state,
        [getRequestKey(action.type)]: {
          loading: true,
          loaded: false,
          error: null,
        },
      };
    case `${UPDATE_SHARING}_SUCCESS`:
      return {
        ...state,
        [getRequestKey(action.type)]: {
          loading: false,
          loaded: true,
          error: null,
        },
      };
    case `${GET_SHARING}_SUCCESS`:
      return {
        ...state,
        data: action.result,
        [getRequestKey(action.type)]: {
          loading: false,
          loaded: true,
          error: null,
        },
      };
    case `${UPDATE_SHARING}_FAIL`:
      return {
        ...state,
        [getRequestKey(action.type)]: {
          loading: false,
          loaded: false,
          error: action.error,
        },
      };
    case `${GET_SHARING}_FAIL`:
      return {
        ...state,
        data: initialState.data,
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
