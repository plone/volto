/**
 * History reducer.
 * @module reducers/history/history
 */

import {
  GET_HISTORY,
  REVERT_HISTORY,
} from '@plone/volto/constants/ActionTypes';

const initialState = {
  entries: [],
  get: {
    error: null,
    loaded: false,
    loading: false,
  },
  revert: {
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
 * History reducer.
 * @function history
 * @param {Object} state Current state.
 * @param {Object} action Action to be handled.
 * @returns {Object} New state.
 */
export default function history(state = initialState, action = {}) {
  switch (action.type) {
    case `${GET_HISTORY}_PENDING`:
    case `${REVERT_HISTORY}_PENDING`:
      return {
        ...state,
        entries: [],
        [getRequestKey(action.type)]: {
          loading: true,
          loaded: false,
          error: null,
        },
      };
    case `${GET_HISTORY}_SUCCESS`:
      return {
        ...state,
        entries: action.result,
        [getRequestKey(action.type)]: {
          loading: false,
          loaded: true,
          error: null,
        },
      };
    case `${REVERT_HISTORY}_SUCCESS`:
      return {
        ...state,
        [getRequestKey(action.type)]: {
          loading: false,
          loaded: true,
          error: null,
        },
      };
    case `${GET_HISTORY}_FAIL`:
    case `${REVERT_HISTORY}_FAIL`:
      return {
        ...state,
        entries: [],
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
