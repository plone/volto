/**
 * History reducer.
 * @module reducers/history
 */

import { GET_HISTORY } from '../../constants/ActionTypes';

const initialState = {
  error: null,
  entries: [],
  loaded: false,
  loading: false,
};

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
      return {
        ...state,
        error: null,
        loaded: false,
        loading: true,
      };
    case `${GET_HISTORY}_SUCCESS`:
      return {
        ...state,
        error: null,
        entries: action.result,
        loaded: true,
        loading: false,
      };
    case `${GET_HISTORY}_FAIL`:
      return {
        ...state,
        error: action.error,
        entries: [],
        loaded: false,
        loading: false,
      };
    default:
      return state;
  }
}
