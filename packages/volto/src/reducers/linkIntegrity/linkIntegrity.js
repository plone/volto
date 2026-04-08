/**
 * Linkintegrity reducer.
 * @module reducers/linkIntegrity/linkIntegrity
 */

import { LINK_INTEGRITY_CHECK } from '@plone/volto/constants/ActionTypes';

const initialState = {
  error: null,
  loaded: false,
  loading: false,
  result: null,
};

/**
 * History reducer.
 * @function linkIntegrity
 * @param {Object} state Current state.
 * @param {Object} action Action to be handled.
 * @returns {Object} New state.
 */
export default function linkIntegrity(state = initialState, action = {}) {
  switch (action.type) {
    case `${LINK_INTEGRITY_CHECK}_PENDING`:
      return {
        ...state,
        error: null,
        loaded: false,
        loading: true,
        result: null,
      };
    case `${LINK_INTEGRITY_CHECK}_SUCCESS`:
      return {
        ...state,
        error: null,
        loaded: true,
        loading: false,
        result: action.result,
      };
    case `${LINK_INTEGRITY_CHECK}_FAIL`:
      return {
        ...state,
        error: action.error,
        loaded: true,
        loading: false,
        result: null,
      };
    default:
      return state;
  }
}
