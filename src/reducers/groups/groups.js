/**
 * Groups reducer.
 * @module reducers/groups/groups
 */

import {
  CREATE_GROUP,
  DELETE_GROUP,
  GET_GROUP,
  LIST_GROUPS,
  LIST_FILTER_GROUPS,
  UPDATE_GROUP,
} from '@plone/volto/constants/ActionTypes';

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
  get: {
    loaded: false,
    loading: false,
    error: null,
  },
  list: {
    loaded: false,
    loading: false,
    error: null,
  },
  update: {
    loaded: false,
    loading: false,
    error: null,
  },
  groups: [],
  group: {},
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
 * Groups reducer.
 * @function groups
 * @param {Object} state Current state.
 * @param {Object} action Action to be handled.
 * @returns {Object} New state.
 */
export default function groups(state = initialState, action = {}) {
  switch (action.type) {
    case `${CREATE_GROUP}_PENDING`:
    case `${DELETE_GROUP}_PENDING`:
    case `${GET_GROUP}_PENDING`:
    case `${LIST_GROUPS}_PENDING`:
    case `${LIST_FILTER_GROUPS}_PENDING`:
    case `${UPDATE_GROUP}_PENDING`:
      return {
        ...state,
        [getRequestKey(action.type)]: {
          loading: true,
          loaded: false,
          error: null,
        },
      };
    case `${GET_GROUP}_SUCCESS`:
      return {
        ...state,
        group: action.result,
        [getRequestKey(action.type)]: {
          loading: false,
          loaded: true,
          error: null,
        },
      };
    case `${LIST_GROUPS}_SUCCESS`:
      return {
        ...state,
        groups: action.result,
        [getRequestKey(action.type)]: {
          loading: false,
          loaded: true,
          error: null,
        },
      };
    case `${LIST_FILTER_GROUPS}_SUCCESS`:
      return {
        ...state,
        filter_groups: action.result,
        [getRequestKey(action.type)]: {
          loading: false,
          loaded: true,
          error: null,
        },
      };
    case `${CREATE_GROUP}_SUCCESS`:
    case `${DELETE_GROUP}_SUCCESS`:
    case `${UPDATE_GROUP}_SUCCESS`:
      return {
        ...state,
        [getRequestKey(action.type)]: {
          loading: false,
          loaded: true,
          error: null,
        },
      };
    case `${CREATE_GROUP}_FAIL`:
    case `${DELETE_GROUP}_FAIL`:
    case `${UPDATE_GROUP}_FAIL`:
      return {
        ...state,
        [getRequestKey(action.type)]: {
          loading: false,
          loaded: false,
          error: action.error,
        },
      };
    case `${GET_GROUP}_FAIL`:
      return {
        ...state,
        group: {},
        [getRequestKey(action.type)]: {
          loading: false,
          loaded: false,
          error: action.error,
        },
      };
    case `${LIST_GROUPS}_FAIL`:
      return {
        ...state,
        groups: [],
        [getRequestKey(action.type)]: {
          loading: false,
          loaded: false,
          error: action.error,
        },
      };
    case `${LIST_FILTER_GROUPS}_FAIL`:
      return {
        ...state,
        filter_groups: [],
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
