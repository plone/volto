/**
 * Content reducer.
 * @module reducers/content
 */

import {
  ADD_CONTENT,
  DELETE_CONTENT,
  EDIT_CONTENT,
  GET_CONTENT,
} from '../../constants/ActionTypes';
import config from '../../config';

const initialState = {
  add: {
    loaded: false,
    loading: false,
    error: null,
  },
  delete: {
    loaded: false,
    loading: false,
    error: null,
  },
  edit: {
    loaded: false,
    loading: false,
    error: null,
  },
  get: {
    loaded: false,
    loading: false,
    error: null,
  },
  data: null,
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
 * Content reducer.
 * @function content
 * @param {Object} state Current state.
 * @param {Object} action Action to be handled.
 * @returns {Object} New state.
 */
export default function content(state = initialState, action = {}) {
  switch (action.type) {
    case `${ADD_CONTENT}_PENDING`:
    case `${DELETE_CONTENT}_PENDING`:
    case `${EDIT_CONTENT}_PENDING`:
    case `${GET_CONTENT}_PENDING`:
      return {
        ...state,
        [getRequestKey(action.type)]: {
          loading: true,
          loaded: false,
          error: null,
        },
      };
    case `${GET_CONTENT}_SUCCESS`:
      return {
        ...state,
        data: {
          ...action.result,
          items: action.result &&
            action.result.items &&
            action.result.items.map(item => ({
              ...item,
              url: item['@id'].replace(config.apiPath, ''),
            })),
        },
        [getRequestKey(action.type)]: {
          loading: false,
          loaded: true,
          error: null,
        },
      };
    case `${ADD_CONTENT}_SUCCESS`:
    case `${EDIT_CONTENT}_SUCCESS`:
    case `${DELETE_CONTENT}_SUCCESS`:
      return {
        ...state,
        [getRequestKey(action.type)]: {
          loading: false,
          loaded: true,
          error: null,
        },
      };
    case `${ADD_CONTENT}_FAIL`:
    case `${DELETE_CONTENT}_FAIL`:
    case `${EDIT_CONTENT}_FAIL`:
    case `${GET_CONTENT}_FAIL`:
      return {
        ...state,
        data: null,
        [getRequestKey(action.type)]: {
          loading: false,
          loaded: false,
          error: action.error,
        },
      };
    default:
      return state;
  }
}
