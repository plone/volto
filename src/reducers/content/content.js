/**
 * Content reducer.
 * @module reducers/content/content
 */
import config from '~/config';

import {
  CREATE_CONTENT,
  DELETE_CONTENT,
  UPDATE_CONTENT,
  GET_CONTENT,
  ORDER_CONTENT,
} from '../../constants/ActionTypes';

const initialState = {
  create: {
    loaded: false,
    loading: false,
    error: null,
  },
  delete: {
    loaded: false,
    loading: false,
    error: null,
  },
  update: {
    loaded: false,
    loading: false,
    error: null,
  },
  get: {
    loaded: false,
    loading: false,
    error: null,
  },
  order: {
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
    case `${CREATE_CONTENT}_PENDING`:
    case `${DELETE_CONTENT}_PENDING`:
    case `${UPDATE_CONTENT}_PENDING`:
    case `${GET_CONTENT}_PENDING`:
    case `${ORDER_CONTENT}_PENDING`:
      return {
        ...state,
        [getRequestKey(action.type)]: {
          loading: true,
          loaded: false,
          error: null,
        },
      };
    case `${CREATE_CONTENT}_SUCCESS`:
    case `${GET_CONTENT}_SUCCESS`:
      return {
        ...state,
        data: {
          ...action.result,
          items:
            action.result &&
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
    case `${UPDATE_CONTENT}_SUCCESS`:
    case `${DELETE_CONTENT}_SUCCESS`:
    case `${ORDER_CONTENT}_SUCCESS`:
      return {
        ...state,
        [getRequestKey(action.type)]: {
          loading: false,
          loaded: true,
          error: null,
        },
      };
    case `${CREATE_CONTENT}_FAIL`:
    case `${DELETE_CONTENT}_FAIL`:
    case `${UPDATE_CONTENT}_FAIL`:
    case `${GET_CONTENT}_FAIL`:
    case `${ORDER_CONTENT}_FAIL`:
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
