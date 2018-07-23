/**
 * Breadcrumbs reducer.
 * @module reducers/breadcrumbs/breadcrumbs
 */

import { map } from 'lodash';
import config from '~/config';

import { GET_BREADCRUMBS } from '../../constants/ActionTypes';

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
    case `${GET_BREADCRUMBS}_PENDING`:
      return {
        ...state,
        error: null,
        loaded: false,
        loading: true,
      };
    case `${GET_BREADCRUMBS}_SUCCESS`:
      return {
        ...state,
        error: null,
        items: map(action.result.items, item => ({
          title: item.title,
          url: item['@id'].replace(config.apiPath, ''),
        })),
        loaded: true,
        loading: false,
      };
    case `${GET_BREADCRUMBS}_FAIL`:
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
