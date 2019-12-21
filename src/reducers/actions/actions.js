/**
 * Actions reducer.
 * @module reducers/actions/actions
 */

import { LIST_ACTIONS, GET_CONTENT } from '../../constants/ActionTypes';
import { settings } from '~/config';

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
      return {
        ...state,
        error: null,
        loaded: false,
        loading: true,
      };
    case `${GET_CONTENT}_PENDING`:
      return !action.subrequest && settings.minimizeNetworkFetch
        ? {
            ...state,
            error: null,
            loaded: false,
            loading: true,
          }
        : state;
    case `${LIST_ACTIONS}_SUCCESS`:
      return {
        ...state,
        error: null,
        actions: action.result,
        loaded: true,
        loading: false,
      };
    case `${GET_CONTENT}_SUCCESS`:
      return !action.subrequest && settings.minimizeNetworkFetch
        ? {
            ...state,
            error: null,
            actions: action.result['@components'].actions,
            loaded: true,
            loading: false,
          }
        : state;
    case `${LIST_ACTIONS}_FAIL`:
      return {
        ...state,
        error: action.error,
        actions: {},
        loaded: false,
        loading: false,
      };
    case `${GET_CONTENT}_FAIL`:
      return !action.subrequest && settings.minimizeNetworkFetch
        ? {
            ...state,
            error: action.error,
            actions: {},
            loaded: false,
            loading: false,
          }
        : state;
    default:
      return state;
  }
}
