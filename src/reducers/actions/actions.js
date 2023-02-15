/**
 * Actions reducer.
 * @module reducers/actions/actions
 */

import { GET_CONTENT, LIST_ACTIONS } from '@plone/volto/constants/ActionTypes';
import {
  flattenToAppURL,
  getBaseUrl,
  hasApiExpander,
} from '@plone/volto/helpers';

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
  let hasExpander;
  switch (action.type) {
    case `${LIST_ACTIONS}_PENDING`:
      return {
        ...state,
        error: null,
        loaded: false,
        loading: true,
      };
    case `${GET_CONTENT}_SUCCESS`:
      hasExpander = hasApiExpander(
        'actions',
        getBaseUrl(flattenToAppURL(action.result['@id'])),
      );
      if (hasExpander) {
        return {
          ...state,
          error: null,
          actions: action.result['@components'].actions,
          loaded: true,
          loading: false,
        };
      }
      return state;
    case `${LIST_ACTIONS}_SUCCESS`:
      hasExpander = hasApiExpander(
        'actions',
        getBaseUrl(flattenToAppURL(action.result['@id'])),
      );
      if (!hasExpander) {
        return {
          ...state,
          error: null,
          actions: action.result,
          loaded: true,
          loading: false,
        };
      }
      return state;
    case `${LIST_ACTIONS}_FAIL`:
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
