/**
 * Global state reducer.
 * @module reducers/global/global
 */

import { map } from 'lodash';
import { settings } from '~/config';

import { GET_GLOBAL_STATE } from '../../constants/ActionTypes';

const initialState = {
  error: null,
  loaded: false,
  loading: false,
};

/**
 * Global state reducer.
 * @function globalState
 * @param {Object} state Current state.
 * @param {Object} action Action to be handled.
 * @returns {Object} New state.
 */
export default function globalState(state = initialState, action = {}) {
  switch (action.type) {
    case `${GET_GLOBAL_STATE}_PENDING`:
      return {
        ...state,
        error: null,
        loaded: false,
        loading: true,
      };
    case `${GET_GLOBAL_STATE}_SUCCESS`:
      return {
        ...state,
        ...action.result,
        error: null,
        loaded: true,
        loading: false,
      };
    case `${GET_GLOBAL_STATE}_FAIL`:
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
