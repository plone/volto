/**
 * Querystring reducer.
 * @module reducers/querystring/querystring
 */

import { GET_QUERYSTRING } from '@plone/volto/constants/ActionTypes';

const initialState = {
  error: null,
  indexes: {},
  sortable_indexes: {},
  loaded: false,
  loading: false,
};

/**
 * Querystring reducer.
 * @function querystring
 * @param {Object} state Current state.
 * @param {Object} action Action to be handled.
 * @returns {Object} New state.
 */
export default function querystring(state = initialState, action = {}) {
  switch (action.type) {
    case `${GET_QUERYSTRING}_PENDING`:
      return {
        ...state,
        error: null,
        loaded: false,
        loading: true,
      };
    case `${GET_QUERYSTRING}_SUCCESS`:
      // Safe normalization: Handles both legacy Object and new List formats
      const normalize = (data) => {
        if (Array.isArray(data)) {
          return Object.fromEntries(
            data
              .filter((item) => item && item.id) // Avoid crashing on empty items
              .map((item) => [item.id, item]),
          );
        }
        return data;
      };

      let indexes = normalize(action.result.indexes);
      let sortable_indexes = normalize(action.result.sortable_indexes);

      return {
        ...state,
        error: null,
        //remove path operation, to remove unhandled 'Navigation path' option from QueryWidget
        indexes: Object.fromEntries(
          Object.entries(indexes).filter(([key]) => key !== 'path'),
        ),
        sortable_indexes: sortable_indexes,
        loaded: true,
        loading: false,
      };
    case `${GET_QUERYSTRING}_FAIL`:
      return {
        ...state,
        error: action.error,
        indexes: {},
        sortable_indexes: {},
        loaded: false,
        loading: false,
      };
    default:
      return state;
  }
}
