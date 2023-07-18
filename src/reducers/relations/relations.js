/**
 * Relations reducer.
 * @module reducers/relations/relations
 */

import {
  CREATE_RELATIONS,
  DELETE_RELATIONS,
  LIST_RELATIONS,
  REBUILD_RELATIONS,
} from '@plone/volto/constants/ActionTypes';

const initialState = {
  relations: null,
  stats: null,
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
  rebuild: {
    error: null,
    loaded: false,
    loading: false,
  },
  subrequests: {},
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
    case `${REBUILD_RELATIONS}_PENDING`:
      return {
        ...state,
        [getRequestKey(action.type)]: {
          loading: true,
          loaded: false,
          error: null,
        },
      };
    case `${LIST_RELATIONS}_PENDING`:
      return action.subrequest
        ? {
            ...state,
            subrequests: {
              ...state.subrequests,
              [action.subrequest]: {
                ...(state.subrequests[action.subrequest] || {
                  relations: null,
                  stats: null,
                }),
                loaded: false,
                loading: true,
                error: null,
              },
            },
          }
        : {
            ...state,
            [getRequestKey(action.type)]: {
              loading: true,
              loaded: false,
              error: null,
            },
          };
    case `${LIST_RELATIONS}_SUCCESS`:
      return action.subrequest
        ? {
            ...state,
            subrequests: {
              ...state.subrequests,
              [action.subrequest]: {
                loading: false,
                loaded: true,
                error: null,
                relations: action.result.relations
                  ? action.result.relations
                  : state.relations,
                stats: null,
              },
            },
          }
        : {
            ...state,
            relations: action.result.relations
              ? action.result.relations
              : state.relations,
            stats: action.result.stats ? action.result : state.stats,
            [getRequestKey(action.type)]: {
              loading: false,
              loaded: true,
              error: null,
            },
          };
    case `${CREATE_RELATIONS}_SUCCESS`:
    case `${DELETE_RELATIONS}_SUCCESS`:
    case `${REBUILD_RELATIONS}_SUCCESS`:
      return {
        ...state,
        [getRequestKey(action.type)]: {
          loading: false,
          loaded: true,
          error: null,
        },
      };
    case `${LIST_RELATIONS}_FAIL`:
      return action.subrequest
        ? {
            ...state,
            subrequests: {
              ...state.subrequests,
              [action.subrequest]: {
                relations: null,
                stats: null,
                loading: false,
                loaded: false,
                error: action.error,
              },
            },
          }
        : {
            ...state,
            relations: null,
            stats: null,
            [getRequestKey(action.type)]: {
              loading: false,
              loaded: false,
              error: action.error,
            },
          };
    case `${CREATE_RELATIONS}_FAIL`:
    case `${DELETE_RELATIONS}_FAIL`:
    case `${REBUILD_RELATIONS}_FAIL`:
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
