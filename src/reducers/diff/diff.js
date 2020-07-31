/**
 * Diff reducer.
 * @module reducers/diff/diff
 */

import { GET_DIFF } from '@plone/volto/constants/ActionTypes';

const initialState = {
  error: null,
  data: [],
  loaded: false,
  loading: false,
};

/**
 * Diff reducer.
 * @function diff
 * @param {Object} state Current state.
 * @param {Object} action Action to be handled.
 * @returns {Object} New state.
 */
export default function diff(state = initialState, action = {}) {
  switch (action.type) {
    case `${GET_DIFF}_PENDING`:
      return {
        ...state,
        error: null,
        loaded: false,
        loading: true,
      };
    case `${GET_DIFF}_SUCCESS`:
      return {
        ...state,
        error: null,
        data: action.result,
        loaded: true,
        loading: false,
      };
    case `${GET_DIFF}_FAIL`:
      return {
        ...state,
        error: action.error,
        data: [],
        loaded: false,
        loading: false,
      };
    default:
      return state;
  }
}
