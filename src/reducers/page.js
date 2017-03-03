/**
 * Page reducer.
 * @module reducers/page
 */

import { GET_PAGE, GET_PAGE_SUCCESS, GET_PAGE_FAIL } from 'constants/ActionTypes';
import config from 'config';

const initialState = {
  loaded: false,
  loading: false,
  page: null,
  error: null,
};

/**
 * Page reducer.
 * @function page
 * @param {Object} state Current state.
 * @param {Object} action Action to be handled.
 * @returns {Object} New state.
 */
export default function page(state = initialState, action = {}) {
  switch (action.type) {
    case GET_PAGE:
      return {
        ...state,
        loading: true,
        loaded: false,
        page: null,
        error: null,
      };
    case GET_PAGE_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        page: {
          ...action.result,
          items: action.result.items && action.result.items.map(item => ({
            ...item,
            url: item['@id'].replace(config.apiPath, ''),
          })),
        },
        error: null,
      };
    case GET_PAGE_FAIL:
      return {
        ...state,
        loading: false,
        loaded: false,
        page: null,
        error: action.error,
      };
    default:
      return state;
  }
}
