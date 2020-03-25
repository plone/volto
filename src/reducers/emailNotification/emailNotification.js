/**
 * emailNotification reducer.
 * @module reducers/emailNotification/emailNotification
 */

import { EMAIL_NOTIFICATION } from '@plone/volto/constants/ActionTypes';

const initialState = {
  error: null,
  loaded: false,
  loading: false,
};

/**
 * emailNotification reducer.
 * @function emailNotification
 * @param {Object} state Current state.
 * @param {Object} action Action to be handled.
 * @returns {Object} New state.
 */
export default function emailNotification(state = initialState, action = {}) {
  switch (action.type) {
    case `${EMAIL_NOTIFICATION}_PENDING`:
      return {
        ...state,
        error: null,
        loaded: false,
        loading: true,
      };
    case `${EMAIL_NOTIFICATION}_SUCCESS`:
      return {
        ...state,
        error: null,
        loaded: true,
        loading: false,
      };
    case `${EMAIL_NOTIFICATION}_FAIL`:
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
