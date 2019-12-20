/**
 * Actions reducer.
 * @module reducers/actions/actions
 */

import { LIST_ACTIONS, GET_CONTENT } from '../../constants/ActionTypes';

const initialState = {
  error: null,
  actions: {
    object: [],
    object_buttons: [],
    site_actions: [],
    user: [],
    document_actions: [],
    portal_tabs: [],
  },
  loaded: false,
  loading: false,
};

/**
 * Actions reducer.
 * @function actions
 * @param {Object} state Current state.
 * @param {Object} action Action to be handled.
 * @returns {Object} New state.
 */
export default function actions(state = initialState, action = {}) {
  switch (action.type) {
    case `${LIST_ACTIONS}_PENDING`:
    case `${GET_CONTENT}_PENDING`:
      return {
        ...state,
        error: null,
        loaded: false,
        loading: true,
      };
    case `${LIST_ACTIONS}_SUCCESS`:
    case `${GET_CONTENT}_SUCCESS`:
      const result = action.result['@components']?.actions || action.result;
      return {
        ...state,
        error: null,
        actions: result,
        loaded: true,
        loading: false,
      };
    case `${LIST_ACTIONS}_FAIL`:
    case `${GET_CONTENT}_FAIL`:
      return {
        ...state,
        error: action.error,
        actions: {},
        loaded: false,
        loading: false,
      };
    default:
      return state;
  }
}
