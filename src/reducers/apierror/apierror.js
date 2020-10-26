/**
 * Breadcrumbs reducer.
 * @module reducers/apierror/apierror
 */

import {
  RESET_APIERROR,
  SET_APIERROR,
} from '@plone/volto/constants/ActionTypes';
import { flattenToAppURL } from '@plone/volto/helpers';

const initialState = {
  error: null,
  statusCode: null,
  connectionRefused: false,
  message: null,
};

/**
 * apierror reducer.
 * @function apierror
 * @param {Object} state Current state.
 * @param {Object} action Action to be handled.
 * @returns {Object} New state.
 */
export default function apierror(state = initialState, action = {}) {
  switch (action.type) {
    case SET_APIERROR:
      return {
        ...state,
        error: action.error,
        statusCode: action.statusCode,
        message: action.message,
        connectionRefused: action.connectionRefused,
      };
    case '@@router/LOCATION_CHANGE':
      return state.error
        ? action.payload?.location?.pathname ===
          flattenToAppURL(state.error.response.req.url).split('?', 1)[0]
          ? {
              ...state,
              error: action.error,
              statusCode: action.statusCode,
              message: action.message,
              connectionRefused: action.connectionRefused,
            }
          : {
              ...state,
              error: null,
              statusCode: null,
              message: null,
              connectionRefused: false,
            }
        : {
            ...state,
            error: null,
            statusCode: null,
            message: null,
            connectionRefused: false,
          };
    case RESET_APIERROR:
      return {
        ...state,
        error: null,
        statusCode: null,
        message: null,
        connectionRefused: false,
      };
    default:
      return state;
  }
}
