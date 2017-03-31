/**
 * Navigation reducer.
 * @module reducers/navigation
 */

import { map } from 'lodash';

import { GET_NAVIGATION, GET_NAVIGATION_SUCCESS, GET_NAVIGATION_FAIL } from '../../constants/ActionTypes';
import config from '../../config';

const initialState = {
  error: null,
  items: [],
  loaded: false,
  loading: false,
};

/**
 * Navigation reducer.
 * @function navigation
 * @param {Object} state Current state.
 * @param {Object} action Action to be handled.
 * @returns {Object} New state.
 */
export default function navigation(state = initialState, action = {}) {
  switch (action.type) {
    case GET_NAVIGATION:
      return {
        ...state,
        error: null,
        loaded: false,
        loading: true,
      };
    case GET_NAVIGATION_SUCCESS:
      return {
        ...state,
        error: null,
        items: map(action.result[0].items,
                   item => ({
                     title: item.title,
                     url: item.url.replace(config.apiPath, ''),
                   })),
        loaded: true,
        loading: false,
      };
    case GET_NAVIGATION_FAIL:
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
