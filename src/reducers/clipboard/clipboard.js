/**
 * Clipboard reducer.
 * @module reducers/clipboard
 */

import {
  COPY, CUT,
  COPY_PENDING, COPY_SUCCESS, COPY_FAIL,
  MOVE_PENDING, MOVE_SUCCESS, MOVE_FAIL,
} from '../../constants/ActionTypes';

const initialState = {
  action: null,
  source: null,
  request: {
    loaded: false,
    loading: false,
    error: null,
  },
};

/**
 * Clipboard reducer.
 * @function clipboard
 * @param {Object} state Current state.
 * @param {Object} action Action to be handled.
 * @returns {Object} New state.
 */
export default function clipboard(state = initialState, action = {}) {
  switch (action.type) {
    case COPY:
      return {
        ...state,
        action: 'copy',
        source: action.source,
      };
    case CUT:
      return {
        ...state,
        action: 'cut',
        source: action.source,
      };
    case COPY_PENDING:
    case MOVE_PENDING:
      return {
        ...state,
        request: {
          loading: true,
          loaded: false,
          error: null,
        },
      };
    case COPY_SUCCESS:
    case MOVE_SUCCESS:
      return {
        ...state,
        request: {
          loading: false,
          loaded: true,
          error: null,
        },
      };
    case COPY_FAIL:
    case MOVE_FAIL:
      return {
        ...state,
        request: {
          loading: false,
          loaded: false,
          error: action.error.error,
        },
      };
    default:
      return state;
  }
}
