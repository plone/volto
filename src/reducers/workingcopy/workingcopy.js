/**
 * User session reducer.
 * @module reducers/workingcopy/workingcopy
 */

import { CREATE_WORKING_COPY } from '@plone/volto/constants/ActionTypes';
import { flattenToAppURL } from '@plone/volto/helpers';

const initialState = {
  info: {},
  create: {
    loaded: false,
    loading: false,
    error: null,
  },
};

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
      return {
        ...state,
        info: {},
        create: {
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
        },
        create: {
          loading: false,
          loaded: true,
          error: null,
        },
      };
    case `${CREATE_WORKING_COPY}_FAIL`:
      return {
        ...state,
        info: {},
        create: {
          loading: false,
          loaded: false,
          error: action.error.response.error,
        },
      };
    default:
      return state;
  }
}
