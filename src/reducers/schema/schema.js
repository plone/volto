/**
 * Schema reducer.
 * @module reducers/schema
 */

import { GET_SCHEMA, GET_SCHEMA_SUCCESS, GET_SCHEMA_FAIL } from '../../constants/ActionTypes';

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
    case GET_SCHEMA:
      return {
        ...state,
        error: null,
        loading: true,
        loaded: false,
        schema: null,
      };
    case GET_SCHEMA_SUCCESS:
      return {
        ...state,
        error: null,
        loading: false,
        loaded: true,
        schema: action.result,
      };
    case GET_SCHEMA_FAIL:
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
