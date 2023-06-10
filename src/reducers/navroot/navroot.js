/**
 * Site reducer.
 * @module reducers/site/site
 */

import { GET_NAVROOT } from '@plone/volto/constants/ActionTypes';

const initialState = {
  error: null,
  navrootData: {},
  loaded: false,
  loading: false,
};

/**
 * Actions reducer.
 * @function site
 * @param {Object} state Current state.
 * @param {Object} site Action to be handled.
 * @returns {Object} New state.
 */
export default function navroot(state = initialState, action = {}) {
  switch (action.type) {
    case `${GET_NAVROOT}_PENDING`:
      return {
        ...state,
        error: null,
        loaded: false,
        loading: true,
      };
    case `${GET_NAVROOT}_SUCCESS`:
      return {
        ...state,
        error: null,
        navroot: action.result,
        loaded: true,
        loading: false,
      };

    case `${GET_NAVROOT}_FAIL`:
      return {
        ...state,
        error: action.error,
        navrootData: {},
        loaded: false,
        loading: false,
      };
    default:
      return state;
  }
}
