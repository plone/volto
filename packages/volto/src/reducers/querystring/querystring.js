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
      let indexes = action.result.indexes;
      if (indexes?.path?.operations) {
        //remove path operation, to remove unhandled 'Navigation path' option from QueryWidget
        indexes.path.operations = indexes.path.operations.filter(
          (o) => o !== 'plone.app.querystring.operation.string.path',
        );
      }
      return {
        ...state,
        error: null,
        indexes: indexes,
        sortable_indexes: action.result.sortable_indexes,
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
