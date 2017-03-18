/**
 * Navigation reducer.
 * @module reducers/navigation
 */

import { map } from 'lodash';

import { GET_NAVIGATION, GET_NAVIGATION_SUCCESS, GET_NAVIGATION_FAIL } from '../constants/ActionTypes';
import config from '../config';

const initialState = {
  loaded: false,
  loading: false,
  items: [],
  error: null,
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
        loading: true,
        loaded: false,
        error: null,
      };
    case GET_NAVIGATION_SUCCESS:
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
    case GET_NAVIGATION_FAIL:
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
