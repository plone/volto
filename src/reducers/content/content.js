/**
 * Content reducer.
 * @module reducers/content/content
 */

import { map, mapKeys, omit } from 'lodash';

import { flattenToAppURL } from '@plone/volto/helpers';

import {
  CREATE_CONTENT,
  DELETE_CONTENT,
  GET_CONTENT,
  LOCK_CONTENT,
  UNLOCK_CONTENT,
  ORDER_CONTENT,
  RESET_CONTENT,
  UPDATE_CONTENT,
  UPDATECOLUMNS_CONTENT,
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
  order: {
    loaded: false,
    loading: false,
    error: null,
  },
  update: {
    loaded: false,
    loading: false,
    error: null,
  },
  updatecolumns: {
    loaded: false,
    loading: false,
    error: null,
  },
  lock: {
    loaded: false,
    loading: false,
    error: null,
  },
  unlock: {
    loaded: false,
    loading: false,
    error: null,
  },
  data: null,
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
 * Content reducer.
 * @function content
 * @param {Object} state Current state.
 * @param {Object} action Action to be handled.
 * @returns {Object} New state.
 */
export default function content(state = initialState, action = {}) {
  let { result } = action;
  switch (action.type) {
    case `${UPDATECOLUMNS_CONTENT}`:
      return {
        ...state,
        [getRequestKey(action.type)]: {
          loading: false,
          loaded: true,
          error: null,
          idx: action.indexcolumns,
        },
      };
    case `${CREATE_CONTENT}_PENDING`:
    case `${LOCK_CONTENT}_PENDING`:
    case `${DELETE_CONTENT}_PENDING`:
    case `${UNLOCK_CONTENT}_PENDING`:
    case `${UPDATE_CONTENT}_PENDING`:
    case `${GET_CONTENT}_PENDING`:
    case `${ORDER_CONTENT}_PENDING`:
      return action.subrequest
        ? {
            ...state,
            subrequests: {
              ...state.subrequests,
              [action.subrequest]: {
                ...(state.subrequests[action.subrequest] || {
                  data: null,
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
    case `${CREATE_CONTENT}_SUCCESS`:
      if (result['@static_behaviors']) {
        map(result['@static_behaviors'], (behavior) => {
          result = {
            ...omit(result, behavior),
            ...mapKeys(result[behavior], (value, key) => `${behavior}.${key}`),
          };
        });
      }
      const data = action.subrequest
        ? Array.isArray(result)
          ? result.map((item) => ({
              ...item,
              url: flattenToAppURL(item['@id']),
            }))
          : {
              ...result,
              items:
                action.result &&
                action.result.items &&
                action.result.items.map((item) => ({
                  ...item,
                  url: flattenToAppURL(item['@id']),
                })),
            }
        : {
            ...result,
            items:
              action.result &&
              action.result.items &&
              action.result.items.map((item) => ({
                ...item,
                url: flattenToAppURL(item['@id']),
              })),
          };
      return action.subrequest
        ? {
            ...state,
            subrequests: {
              ...state.subrequests,
              [action.subrequest]: {
                loading: false,
                loaded: true,
                error: null,
                data,
              },
            },
          }
        : {
            ...state,
            data,
            [getRequestKey(action.type)]: {
              loading: false,
              loaded: true,
              error: null,
            },
          };
    case `${GET_CONTENT}_SUCCESS`:
      if (result['@static_behaviors']) {
        map(result['@static_behaviors'], (behavior) => {
          result = {
            ...omit(result, behavior),
            ...mapKeys(result[behavior], (value, key) => `${behavior}.${key}`),
          };
        });
      }
      return action.subrequest
        ? {
            ...state,
            subrequests: {
              ...state.subrequests,
              [action.subrequest]: {
                loading: false,
                loaded: true,
                error: null,
                data: {
                  ...result,
                  items:
                    action.result &&
                    action.result.items &&
                    action.result.items.map((item) => ({
                      ...item,
                      url: flattenToAppURL(item['@id']),
                    })),
                },
              },
            },
          }
        : {
            ...state,
            data: {
              ...result,
              items:
                action.result &&
                action.result.items &&
                action.result.items.map((item) => ({
                  ...item,
                  url: flattenToAppURL(item['@id']),
                })),
            },
            [getRequestKey(action.type)]: {
              loading: false,
              loaded: true,
              error: null,
            },
          };
    case `${DELETE_CONTENT}_SUCCESS`:
    case `${ORDER_CONTENT}_SUCCESS`:
      return {
        ...state,
        [getRequestKey(action.type)]: {
          loading: false,
          loaded: true,
          error: null,
          sort: {
            on: action.sort?.on,
            order: action.sort?.order,
          },
          index: action.index,
        },
      };
    case `${UNLOCK_CONTENT}_SUCCESS`:
      return {
        ...state,
        [getRequestKey(action.type)]: {
          loading: false,
          loaded: true,
          error: null,
        },
        data: {
          ...state.data,
          lock: {
            ...result,
          },
        },
      };
    case `${UPDATE_CONTENT}_SUCCESS`:
      return {
        ...state,
        [getRequestKey(action.type)]: {
          loading: false,
          loaded: true,
          error: null,
          sort: {
            on: action.sort?.on,
            order: action.sort?.order,
          },
        },
      };
    case `${LOCK_CONTENT}_SUCCESS`:
      return {
        ...state,
        [getRequestKey(action.type)]: {
          loading: false,
          loaded: true,
          error: null,
        },
        data: {
          ...state.data,
          lock: {
            ...result,
          },
        },
      };
    case `${CREATE_CONTENT}_FAIL`:
    case `${LOCK_CONTENT}_FAIL`:
    case `${DELETE_CONTENT}_FAIL`:
    case `${UNLOCK_CONTENT}_FAIL`:
    case `${GET_CONTENT}_FAIL`:
    case `${ORDER_CONTENT}_FAIL`:
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
            data: null,
            [getRequestKey(action.type)]: {
              loading: false,
              loaded: false,
              error: action.error,
            },
          };
    case `${UPDATE_CONTENT}_FAIL`:
      return action.subrequest
        ? {
            ...state,
            subrequests: {
              ...state.subrequests,
              [action.subrequest]: {
                loading: false,
                loaded: false,
                error: action.error,
              },
            },
          }
        : {
            ...state,
            [getRequestKey(action.type)]: {
              loading: false,
              loaded: false,
              error: action.error,
            },
          };
    case RESET_CONTENT:
      return action.subrequest
        ? {
            ...state,
            subrequests: omit(state.subrequests, action.subrequest),
          }
        : {
            ...state,
            get: {
              loaded: false,
            },
            data: null,
          };
    default:
      return state;
  }
}
