/**
 * Schema reducer.
 * @module reducers/schema/schema
 */

import { GET_SCHEMA } from '../../constants/ActionTypes';

const initialState = {
  error: null,
  loaded: false,
  loading: false,
  schema: null,
};

/**
 * Schema reducer.
 * @function schema
 * @param {Object} state Current state.
 * @param {Object} action Action to be handled.
 * @returns {Object} New state.
 */
export default function schema(state = initialState, action = {}) {
  switch (action.type) {
    case `${GET_SCHEMA}_PENDING`:
      return {
        ...state,
        error: null,
        loading: true,
        loaded: false,
      };
    case `${GET_SCHEMA}_SUCCESS`:
      return {
        ...state,
        error: null,
        loading: false,
        loaded: true,
        schema: action.result,
      };
    case `${GET_SCHEMA}_FAIL`:
      return {
        ...state,
        error: action.error,
        loading: false,
        loaded: false,
        schema: null,
      };
    default:
      return state;
  }
}
