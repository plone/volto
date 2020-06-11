/**
 * Document reducer.
 * @module reducers/document/document
 */

import { GET_DOCUMENT_TYPES } from '@plone/volto/constants/ActionTypes';

const initialState = {
  error: null,
  loaded: false,
  loading: false,
  document: null,
};

/**
 * Document reducer.
 * @function document
 * @param {Object} state Current state.
 * @param {Object} action Action to be handled.
 * @returns {Object} New state.
 */
export default function document(state = initialState, action = {}) {
  switch (action.type) {
    case `${GET_DOCUMENT_TYPES}_PENDING`:
      return {
        ...state,
        error: null,
        loading: true,
        loaded: false,
      };
    case `${GET_DOCUMENT_TYPES}_SUCCESS`:
      return {
        ...state,
        error: null,
        loading: false,
        loaded: true,
        document: action,
      };
    case `${GET_DOCUMENT_TYPES}_FAIL`:
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
