/**
 * Site reducer.
 * @module reducers/site/site
 */

import { GET_SITE } from '@plone/volto/constants/ActionTypes';

const initialState = {
  error: null,
  loaded: false,
  loading: false,
  data: {},
};

/**
 * Site reducer.
 * @function site
 * @param {Object} state Current state.
 * @param {Object} action Action to be handled.
 * @returns {Object} New state.
 */
export default function site(state = initialState, action = {}) {
  switch (action.type) {
    case `${GET_SITE}_PENDING`:
      return {
        ...state,
        error: null,
        loaded: false,
        loading: true,
        data: {},
      };
    case `${GET_SITE}_SUCCESS`:
      return {
        ...state,
        error: null,
        loaded: true,
        loading: false,
        data: action.result,
      };
    case `${GET_SITE}_FAIL`:
      return {
        ...state,
        error: action.result,
        loaded: false,
        loading: false,
        data: {},
      };
    default:
      return state;
  }
}
