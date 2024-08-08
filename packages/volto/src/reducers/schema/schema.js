/**
 * Schema reducer.
 * @module reducers/schema/schema
 */

import { flatten, keys, pickBy, isArray, map, mapKeys, merge } from 'lodash';

import {
  GET_SCHEMA,
  POST_SCHEMA,
  PUT_SCHEMA,
  UPDATE_SCHEMA,
} from '@plone/volto/constants/ActionTypes';

const initialState = {
  error: null,
  loaded: false,
  loading: false,
  schema: null,
  post: {
    loaded: false,
    loading: false,
    error: null,
  },
  update: {
    loaded: false,
    loading: false,
    error: null,
  },
  put: {
    loaded: false,
    loading: false,
    error: null,
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
 * Schema reducer.
 * @function schema
 * @param {Object} state Current state.
 * @param {Object} action Action to be handled.
 * @returns {Object} New state.
 */
export default function schema(state = initialState, action = {}) {
  switch (action.type) {
    /** PENDING */
    case `${GET_SCHEMA}_PENDING`:
      return {
        ...state,
        error: null,
        loading: true,
        loaded: false,
      };
    case `${POST_SCHEMA}_PENDING`:
    case `${PUT_SCHEMA}_PENDING`:
    case `${UPDATE_SCHEMA}_PENDING`:
      return {
        ...state,
        [getRequestKey(action.type)]: {
          loading: true,
          loaded: false,
          error: null,
        },
      };

    /** SUCCESS */
    case `${GET_SCHEMA}_SUCCESS`:
      return {
        ...state,
        error: null,
        loading: false,
        loaded: true,
        schema: {
          ...action.result,
          required: [
            ...action.result.required,
            ...flatten(
              map(keys(pickBy(action.result.properties, isArray)), (fieldset) =>
                map(
                  action.result.definitions[fieldset].required,
                  (required) => `${fieldset}.${required}`,
                ),
              ),
            ),
          ],
          properties: {
            ...action.result.properties,
            ...merge(
              ...map(
                keys(pickBy(action.result.properties, isArray)),
                (fieldset) =>
                  mapKeys(
                    action.result.definitions[fieldset].properties,
                    (value, key) => `${fieldset}.${key}`,
                  ),
              ),
            ),
          },
        },
      };
    case `${POST_SCHEMA}_SUCCESS`:
    case `${PUT_SCHEMA}_SUCCESS`:
    case `${UPDATE_SCHEMA}_SUCCESS`:
      return {
        ...state,
        [getRequestKey(action.type)]: {
          loading: false,
          loaded: true,
          error: null,
        },
      };

    /** FAIL */
    case `${GET_SCHEMA}_FAIL`:
      return {
        ...state,
        error: action.error,
        loading: false,
        loaded: false,
        schema: null,
      };
    case `${POST_SCHEMA}_FAIL`:
    case `${PUT_SCHEMA}_FAIL`:
    case `${UPDATE_SCHEMA}_FAIL`:
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
