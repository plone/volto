/**
 * Search reducer.
 * @module reducers/search
 */

import { map } from 'lodash';

import { SEARCH_CONTENT, SEARCH_CONTENT_SUCCESS, SEARCH_CONTENT_FAIL } from '../constants/ActionTypes';
import config from '../config';

const initialState = {
  loaded: false,
  loading: false,
  items: [],
  error: null,
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
    case SEARCH_CONTENT:
      return {
        ...state,
        loading: true,
        loaded: false,
        error: null,
      };
    case SEARCH_CONTENT_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        items: map(action.result.items,
                   item => ({
                     title: item.title,
                     '@id': item['@id'].replace(config.apiPath, ''),
                   })),
        error: null,
      };
    case SEARCH_CONTENT_FAIL:
      return {
        ...state,
        loading: false,
        loaded: false,
        items: [],
        error: action.error,
      };
    default:
      return state;
  }
}
