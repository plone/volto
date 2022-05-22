/**
 * Relations reducer.
 * @module reducers/relations/relations
 */

import {
  CREATE_RELATIONS,
  DELETE_RELATIONS,
  LIST_RELATIONS,
} from '@plone/volto/constants/ActionTypes';

const initialState = {
  relations: {},
  stats: {},
  create: {
    error: null,
    loaded: false,
    loading: false,
  },
  delete: {
    error: null,
    loaded: false,
    loading: false,
  },
  list: {
    error: null,
    loaded: false,
    loading: false,
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
 * Relations reducer.
 * @function relations
 * @param {Object} state Current state.
 * @param {Object} action Action to be handled.
 * @returns {Object} New state.
 */
export default function relations(state = initialState, action = {}) {
  switch (action.type) {
    case `${CREATE_RELATIONS}_PENDING`:
    case `${DELETE_RELATIONS}_PENDING`:
    case `${LIST_RELATIONS}_PENDING`:
      return {
        ...state,
        [getRequestKey(action.type)]: {
          loading: true,
          loaded: false,
          error: null,
        },
      };
    case `${LIST_RELATIONS}_SUCCESS`:
      return {
        ...state,
        relations: action.result.items ? action.result : state.relations,
        stats: action.result.relations ? action.result : state.stats,
        [getRequestKey(action.type)]: {
          loading: false,
          loaded: true,
          error: null,
        },
      };
    case `${CREATE_RELATIONS}_SUCCESS`:
    case `${DELETE_RELATIONS}_SUCCESS`:
      return {
        ...state,
        [getRequestKey(action.type)]: {
          loading: false,
          loaded: true,
          error: null,
        },
      };
    case `${LIST_RELATIONS}_FAIL`:
      return {
        ...state,
        relations: [],
        [getRequestKey(action.type)]: {
          loading: false,
          loaded: false,
          error: action.error,
        },
      };
    case `${CREATE_RELATIONS}_FAIL`:
    case `${DELETE_RELATIONS}_FAIL`:
      return {
        ...state,
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
