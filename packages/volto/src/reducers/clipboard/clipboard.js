/**
 * Clipboard reducer.
 * @module reducers/clipboard/clipboard
 */

import {
  COPY,
  CUT,
  COPY_CONTENT,
  MOVE_CONTENT,
} from '@plone/volto/constants/ActionTypes';

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
    case `${COPY_CONTENT}_PENDING`:
    case `${MOVE_CONTENT}_PENDING`:
      return {
        ...state,
        request: {
          loading: true,
          loaded: false,
          error: null,
        },
      };
    case `${COPY_CONTENT}_SUCCESS`:
    case `${MOVE_CONTENT}_SUCCESS`:
      return {
        ...state,
        request: {
          loading: false,
          loaded: true,
          error: null,
        },
      };
    case `${COPY_CONTENT}_FAIL`:
    case `${MOVE_CONTENT}_FAIL`:
      return {
        ...state,
        request: {
          loading: false,
          loaded: false,
          error: action.error,
        },
      };
    default:
      return state;
  }
}
