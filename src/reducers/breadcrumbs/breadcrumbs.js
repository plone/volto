/**
 * Breadcrumbs reducer.
 * @module reducers/breadcrumbs
 */

import { map } from 'lodash';

import {
  GET_BREADCRUMBS_PENDING,
  GET_BREADCRUMBS_SUCCESS,
  GET_BREADCRUMBS_FAIL,
} from '../../constants/ActionTypes';
import config from '../../config';

const initialState = {
  error: null,
  items: [],
  loaded: false,
  loading: false,
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
    case GET_BREADCRUMBS_PENDING:
      return {
        ...state,
        error: null,
        loaded: false,
        loading: true,
      };
    case GET_BREADCRUMBS_SUCCESS:
      return {
        ...state,
        error: null,
        items: map(action.result[0].items, item => ({
          title: item.title,
          url: item.url.replace(config.apiPath, ''),
        })),
        loaded: true,
        loading: false,
      };
    case GET_BREADCRUMBS_FAIL:
      return {
        ...state,
        error: action.error,
        items: [],
        loaded: false,
        loading: false,
      };
    default:
      return state;
  }
}
