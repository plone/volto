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
      if (hasExpander && !action.subrequest) {
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
      // Even if the expander is set or not, if the LIST_ACTIONS is
      // called, we want it to store the data if the actions data is
      // not set in the expander data (['@components']) but in the "normal"
      // action result (we look for the object property returned by the endpoint)
      // Unfortunately, this endpoint returns all the actions in a plain object
      // with no structure :(
      if (action.result.object) {
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
