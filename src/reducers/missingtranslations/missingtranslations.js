/**
 * Types reducer.
 * @module reducers/types/types
 */

import { GET_MISSING_TRANSLATIONS } from '@plone/volto/constants/ActionTypes';
import { flattenToAppURL, getBaseUrl, hasApiExpander } from '@plone/volto/helpers';

const initialState = {
  error: null,
  loaded: false,
  loading: false,
  missingtranslations: [],
};

/**
 * Types reducer.
 * @function types
 * @param {Object} state Current state.
 * @param {Object} action Action to be handled.
 * @returns {Object} New state.
 */
export default function missingtranslations(state = initialState, action = {}) {
  let hasExpander;
  switch (action.type) {
    case `${GET_MISSING_TRANSLATIONS}_PENDING`:
      return {
        ...state,
        error: null,
        loading: true,
        loaded: false,
        missingtranslations: [],
      };
    case `${GET_MISSING_TRANSLATIONS}_SUCCESS`:
      hasExpander = hasApiExpander('types', getBaseUrl(flattenToAppURL(action.result['@id'])));
      if (hasExpander && !action.subrequest) {
        return {
          ...state,
          error: null,
          loading: false,
          loaded: true,
          missingtranslations: action.result,
        };
      }
      return state;
    case `${GET_TYPES}_FAIL`:
      return {
        ...state,
        error: action.error,
        loading: false,
        loaded: false,
        missingtranslations: [],
      };
    default:
      return state;
  }
}
