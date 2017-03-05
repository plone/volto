/**
 * Content reducer.
 * @module reducers/content
 */

import {
  ADD_CONTENT, ADD_CONTENT_SUCCESS, ADD_CONTENT_FAIL,
  DELETE_CONTENT, DELETE_CONTENT_SUCCESS, DELETE_CONTENT_FAIL,
  EDIT_CONTENT, EDIT_CONTENT_SUCCESS, EDIT_CONTENT_FAIL,
  GET_CONTENT, GET_CONTENT_SUCCESS, GET_CONTENT_FAIL,
} from 'constants/ActionTypes';
import config from 'config';

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
  content: null,
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
    case ADD_CONTENT:
    case DELETE_CONTENT:
    case EDIT_CONTENT:
    case GET_CONTENT:
      return {
        ...state,
        [getRequestKey(action.type)]: {
          loading: true,
          loaded: false,
          error: null,
        },
      };
    case ADD_CONTENT_SUCCESS:
    case DELETE_CONTENT_SUCCESS:
    case EDIT_CONTENT_SUCCESS:
    case GET_CONTENT_SUCCESS:
      return {
        ...state,
        content: {
          ...action.result,
          items: action.result && action.result.items && action.result.items.map(item => ({
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
    case ADD_CONTENT_FAIL:
    case DELETE_CONTENT_FAIL:
    case EDIT_CONTENT_FAIL:
    case GET_CONTENT_FAIL:
      return {
        ...state,
        content: null,
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
