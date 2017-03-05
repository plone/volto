/**
 * Breadcrumbs reducer.
 * @module reducers/breadcrumbs
 */

import { map } from 'lodash';

import { GET_BREADCRUMBS, GET_BREADCRUMBS_SUCCESS, GET_BREADCRUMBS_FAIL } from 'constants/ActionTypes';
import config from 'config';

const initialState = {
  loaded: false,
  loading: false,
  items: [],
  error: null,
};

/**
 * Breadcrumbs reducer.
 * @function breadcrumbs
 * @param {Object} state Current state.
 * @param {Object} action Action to be handled.
 * @returns {Object} New state.
 */
export default function breadcrumbs(state = initialState, action = {}) {
  switch (action.type) {
    case GET_BREADCRUMBS:
      return {
        ...state,
        loading: true,
        loaded: false,
        error: null,
      };
    case GET_BREADCRUMBS_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        items: map(action.result[0].items,
                   item => ({
                     title: item.title,
                     url: item.url.replace(config.apiPath, ''),
                   })),
        error: null,
      };
    case GET_BREADCRUMBS_FAIL:
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
