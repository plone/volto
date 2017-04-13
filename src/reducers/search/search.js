/**
 * Search reducer.
 * @module reducers/search
 */

import { map } from 'lodash';

import {
  SEARCH_CONTENT_PENDING,
  SEARCH_CONTENT_SUCCESS,
  SEARCH_CONTENT_FAIL,
} from '../../constants/ActionTypes';
import config from '../../config';

const initialState = {
  error: null,
  items: [],
  loaded: false,
  loading: false,
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
    case SEARCH_CONTENT_PENDING:
      return {
        ...state,
        error: null,
        loading: true,
        loaded: false,
      };
    case SEARCH_CONTENT_SUCCESS:
      return {
        ...state,
        error: null,
        items: map(action.result.items, item => ({
          title: item.title,
          '@id': item['@id'].replace(config.apiPath, ''),
        })),
        loaded: true,
        loading: false,
      };
    case SEARCH_CONTENT_FAIL:
      return {
        ...state,
        error: action.error,
        items: [],
        loading: false,
        loaded: false,
      };
    default:
      return state;
  }
}
