/**
 * Schema reducer.
 * @module reducers/schema
 */

import { GET_SCHEMA, GET_SCHEMA_SUCCESS, GET_SCHEMA_FAIL } from 'constants/ActionTypes';

const initialState = {
  loaded: false,
  loading: false,
  schema: null,
  error: null,
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
    case GET_SCHEMA:
      return {
        ...state,
        loading: true,
        loaded: false,
        schema: null,
        error: null,
      };
    case GET_SCHEMA_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        schema: action.result,
        error: null,
      };
    case GET_SCHEMA_FAIL:
      return {
        ...state,
        loading: false,
        loaded: false,
        schema: null,
        error: action.error,
      };
    default:
      return state;
  }
}
