/**
 * Workflow reducer.
 * @module reducers/workflow
 */

import {
  TRANSITION_WORKFLOW_PENDING, TRANSITION_WORKFLOW_SUCCESS, TRANSITION_WORKFLOW_FAIL,
  GET_WORKFLOW_PENDING, GET_WORKFLOW_SUCCESS, GET_WORKFLOW_FAIL,
} from '../../constants/ActionTypes';

const initialState = {
  get: {
    loaded: false,
    loading: false,
    error: null,
  },
  transition: {
    loaded: false,
    loading: false,
    error: null,
  },
  history: [],
  transitions: [],
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
 * Content reducer.
 * @function content
 * @param {Object} state Current state.
 * @param {Object} action Action to be handled.
 * @returns {Object} New state.
 */
export default function content(state = initialState, action = {}) {
  switch (action.type) {
    case GET_WORKFLOW_PENDING:
    case TRANSITION_WORKFLOW_PENDING:
      return {
        ...state,
        [getRequestKey(action.type)]: {
          loading: true,
          loaded: false,
          error: null,
        },
      };
    case GET_WORKFLOW_SUCCESS:
    case TRANSITION_WORKFLOW_SUCCESS:
      return {
        ...state,
        history: action.result.history ? action.result.history : state.history,
        transitions: action.result.transitions ? action.result.transitions : state.transitions,
        [getRequestKey(action.type)]: {
          loading: false,
          loaded: true,
          error: null,
        },
      };
    case GET_WORKFLOW_FAIL:
    case TRANSITION_WORKFLOW_FAIL:
      return {
        ...state,
        history: [],
        transitions: [],
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
