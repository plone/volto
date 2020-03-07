/**
 * Types reducer.
 * @module reducers/types/types
 */

import { GET_TYPES } from '@plone/volto/constants/ActionTypes';

const initialState = {
  error: null,
  loaded: false,
  loading: false,
  types: [],
};

/**
 * Types reducer.
 * @function types
 * @param {Object} state Current state.
 * @param {Object} action Action to be handled.
 * @returns {Object} New state.
 */
export default function types(state = initialState, action = {}) {
  switch (action.type) {
    case `${GET_TYPES}_PENDING`:
      return {
        ...state,
        error: null,
        loading: true,
        loaded: false,
      };
    case `${GET_TYPES}_SUCCESS`:
      return {
        ...state,
        error: null,
        loading: false,
        loaded: true,
        types: action.result,
      };
    case `${GET_TYPES}_FAIL`:
      return {
        ...state,
        error: action.error,
        loading: false,
        loaded: false,
        types: [],
      };
    default:
      return state;
  }
}
