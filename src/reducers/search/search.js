/**
 * Search reducer.
 * @module reducers/search/search
 */

import { map } from 'lodash';

import {
  RESET_SEARCH_CONTENT,
  SEARCH_CONTENT,
} from '../../constants/ActionTypes';
import config from '../../config';

const initialState = {
  error: null,
  items: [],
  total: 0,
  loaded: false,
  loading: false,
  batching: {},
};

/**
 * Search reducer.
 * @function search
 * @param {Object} state Current state.
 * @param {Object} action Action to be handled.
 * @returns {Object} New state.
 */
export default function search(state = initialState, action = {}) {
  switch (action.type) {
    case `${SEARCH_CONTENT}_PENDING`:
      return {
        ...state,
        error: null,
        loading: true,
        loaded: false,
        batching: {},
        total: 0,
      };
    case `${SEARCH_CONTENT}_SUCCESS`:
      return {
        ...state,
        error: null,
        items: map(action.result.items, item => ({
          ...item,
          '@id': item['@id'].replace(config.apiPath, ''),
        })),
        total: action.result.items_total,
        loaded: true,
        loading: false,
        ...action.result.batching,
      };
    case `${SEARCH_CONTENT}_FAIL`:
      return {
        ...state,
        error: action.error,
        items: [],
        total: 0,
        loading: false,
        loaded: false,
        batching: {},
      };
    case RESET_SEARCH_CONTENT:
      return {
        ...state,
        error: null,
        items: [],
        total: 0,
        loading: false,
        loaded: false,
        batching: {},
      };
    default:
      return state;
  }
}
