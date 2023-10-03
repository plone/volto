/**
 * Relations reducer.
 * @module reducers/relations/relations
 */

import {
  CREATE_RELATIONS,
  DELETE_RELATIONS,
  LIST_RELATIONS,
  STATS_RELATIONS,
  REBUILD_RELATIONS,
} from '@plone/volto/constants/ActionTypes';

const initialState = {
  relations: {
    error: null,
    loaded: false,
    loading: false,
    data: null,
  },
  stats: {
    error: null,
    loaded: false,
    loading: false,
    data: null,
  },
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
    case `${LIST_RELATIONS}_PENDING`:
      return action.subrequest
        ? {
            ...state,
            subrequests: {
              ...state.subrequests,
              [action.subrequest]: {
                data: null,
                loaded: false,
                loading: true,
                error: null,
              },
            },
          }
        : {
            ...state,
            relations: {
              data: null,
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
                data: action.result.relations,
                loading: false,
                loaded: true,
                error: null,
              },
            },
          }
        : {
            ...state,
            relations: {
              data: action.result.relations,
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
                data: null,
                loading: false,
                loaded: false,
                error: action.error,
              },
            },
          }
        : {
            ...state,
            relations: {
              data: null,
              loading: false,
              loaded: false,
              error: action.error,
            },
          };

    case `${STATS_RELATIONS}_PENDING`:
      return {
        ...state,
        [getRequestKey(action.type)]: {
          loading: true,
          loaded: false,
          error: null,
          data: null,
        },
      };
    case `${STATS_RELATIONS}_SUCCESS`:
      return {
        ...state,
        [getRequestKey(action.type)]: {
          loading: false,
          loaded: true,
          error: null,
          data: action.result,
        },
      };
    case `${STATS_RELATIONS}_FAIL`:
      return {
        ...state,
        [getRequestKey(action.type)]: {
          loading: false,
          loaded: false,
          error: action.error,
          data: null,
        },
      };

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
