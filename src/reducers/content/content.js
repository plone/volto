/**
 * Content reducer.
 * @module reducers/content/content
 */

import { omit, map, mapKeys } from 'lodash';

import { settings } from '~/config';

import {
  CREATE_CONTENT,
  DELETE_CONTENT,
  GET_CONTENT,
  ORDER_CONTENT,
  RESET_CONTENT,
  UPDATE_CONTENT,
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
    case `${CREATE_CONTENT}_PENDING`:
    case `${DELETE_CONTENT}_PENDING`:
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
                      url: item['@id'].replace(settings.apiPath, ''),
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
                  url: item['@id'].replace(settings.apiPath, ''),
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
          sort: {
            on: action.sort?.on,
            order: action.sort?.order,
          },
        },
      };
    case `${CREATE_CONTENT}_FAIL`:
    case `${DELETE_CONTENT}_FAIL`:
    case `${UPDATE_CONTENT}_FAIL`:
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
    case RESET_CONTENT:
      return action.subrequest
        ? {
            ...state,
            subrequests: omit(state.subrequests, action.subrequest),
          }
        : {
            ...state,
            data: null,
          };
    default:
      return state;
  }
}
