/**
 * Querystring reducer.
 * @module reducers/querystring/querystring
 */

import { GET_QUERYSTRING } from '@plone/volto/constants/ActionTypes';
import { sortBy } from 'lodash';

const initialState = {
  error: null,
  indexes: {},
  sortable_indexes: {},
  loaded: false,
  loading: false,
};

function rewriteVocabularyValues(indexes) {
  const rewrittenIndexes = {};
  Object.keys(indexes).forEach((indexKey) => {
    const index = indexes[indexKey];
    let items;
    if (Object.keys(index.values)?.length) {
      items = Object.keys(index.values).map((key) => {
        return {
          title: index.values[key].title,
          token: key,
        };
      });
    }
    index.items = sortBy(items, 'title');
    rewrittenIndexes[indexKey] = index;
  });

  return rewrittenIndexes;
}

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
      return {
        ...state,
        error: null,
        indexes: rewriteVocabularyValues(action.result.indexes),
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
