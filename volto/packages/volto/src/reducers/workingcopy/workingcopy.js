/**
 * User session reducer.
 * @module reducers/workingcopy/workingcopy
 */

import {
  APPLY_WORKING_COPY,
  CREATE_WORKING_COPY,
  REMOVE_WORKING_COPY,
} from '@plone/volto/constants/ActionTypes';
import { flattenToAppURL } from '@plone/volto/helpers/Url/Url';

const initialState = {
  info: {},
  apply: {
    loaded: false,
    loading: false,
    error: null,
  },
  create: {
    loaded: false,
    loading: false,
    error: null,
  },
  remove: {
    loaded: false,
    loading: false,
    error: null,
  },
};

/**
 * Get request key
 * @function getRequestKey
 * @param {string} actionType Action type.
 * @returns {string} Request key.
 */
function getRequestKey(actionType) {
  return actionType.split('_')[0].toLowerCase();
}

/**
 * Working copy reducer.
 * @function workingCopy
 * @param {Object} state Current state.
 * @param {Object} action Action to be handled.
 * @returns {Object} New state.
 */
export default function workingCopy(state = initialState, action = {}) {
  switch (action.type) {
    case `${CREATE_WORKING_COPY}_PENDING`:
    case `${APPLY_WORKING_COPY}_PENDING`:
    case `${REMOVE_WORKING_COPY}_PENDING`:
      return {
        ...state,
        info: {},
        [getRequestKey(action.type)]: {
          loading: true,
          loaded: false,
          error: null,
        },
      };
    case `${CREATE_WORKING_COPY}_SUCCESS`:
      return {
        ...state,
        info: {
          ...action.result,
          '@id': flattenToAppURL(action.result['@id']),
          title: action.result.title,
        },
        create: {
          loading: false,
          loaded: true,
          error: null,
        },
      };
    case `${APPLY_WORKING_COPY}_SUCCESS`:
    case `${REMOVE_WORKING_COPY}_SUCCESS`:
      return {
        ...state,
        [getRequestKey(action.type)]: {
          loading: false,
          loaded: true,
          error: null,
        },
      };
    case `${CREATE_WORKING_COPY}_FAIL`:
    case `${APPLY_WORKING_COPY}_FAIL`:
    case `${REMOVE_WORKING_COPY}_FAIL`:
      return {
        ...state,
        info: {},
        [getRequestKey(action.type)]: {
          loading: false,
          loaded: false,
          error: action.error?.response?.error,
        },
      };
    default:
      return state;
  }
}
