/**
 * emailSend reducer.
 * @module reducers/emailSend/emailSend
 */

import { EMAIL_SEND } from '@plone/volto/constants/ActionTypes';

const initialState = {
  error: null,
  loaded: false,
  loading: false,
};

/**
 * emailSend reducer.
 * @function emailSend
 * @param {Object} state Current state.
 * @param {Object} action Action to be handled.
 * @returns {Object} New state.
 */
export default function emailSend(state = initialState, action = {}) {
  switch (action.type) {
    case `${EMAIL_SEND}_PENDING`:
      return {
        ...state,
        error: null,
        loaded: false,
        loading: true,
      };
    case `${EMAIL_SEND}_SUCCESS`:
      return {
        ...state,
        error: null,
        loaded: true,
        loading: false,
      };
    case `${EMAIL_SEND}_FAIL`:
      return {
        ...state,
        error: action.error,
        loaded: false,
        loading: false,
      };
    default:
      return state;
  }
}
