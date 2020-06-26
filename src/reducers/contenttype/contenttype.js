/**
 * Content type reducer.
 * @module reducers/contenttype/contenttype
 */

import { GET_CONTENT_TYPE_TYPES, UPDATE_CONTENT_TYPE_TYPES } from '@plone/volto/constants/ActionTypes';

const initialState = {
  error: null,
  loaded: false,
  loading: false,
  contenttype: null,
};

/**
 * Content type reducer.
 * @function contenttype
 * @param {Object} state Current state.
 * @param {Object} action Action to be handled.
 * @returns {Object} New state.
 */
export default function contenttype(state = initialState, action = {}) {
  switch (action.type) {
    case `${GET_CONTENT_TYPE_TYPES}_PENDING`:
    case `${UPDATE_CONTENT_TYPE_TYPES}_PENDING`:
      return {
        ...state,
        error: null,
        loading: true,
        loaded: false,
      };
    case `${GET_CONTENT_TYPE_TYPES}_SUCCESS`:
      return {
        ...state,
        error: null,
        loading: false,
        loaded: true,
        document: action,
      };
    case `${UPDATE_CONTENT_TYPE_TYPES}_SUCCESS`:
      return {
        ...state,
        error: null,
        loading: false,
        loaded: true,
        document: action,
      };
    case `${GET_CONTENT_TYPE_TYPES}_FAIL`:
      return {
        ...state,
        error: action.error,
        loading: false,
        loaded: false,
        document: null,
      };
    default:
      return state;
  }
}
