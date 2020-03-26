/**
 * Types reducer.
 * @module reducers/types/types
 */

import {
  GET_TYPES,
  CREATE_TYPE,
  DELETE_TYPE,
} from '@plone/volto/constants/ActionTypes';

const initialState = {
  error: null,
  loaded: false,
  loading: false,
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
  types: [],
};

/**
 * Types reducer.
 * @function types
 * @param {Object} state Current state.
 * @param {Object} action Action to be handled.
 * @returns {Object} New state.
 */
export default function types(state = initialState, action = {}) {
  switch (action.type) {
    case `${CREATE_TYPE}_PENDING`:
      return {
        ...state,
        create: {
          loaded: false,
          loading: true,
          error: null,
        }
      }
    case `${DELETE_TYPE}_PENDING`:
      return {
        ...state,
        delete: {
          loaded: false,
          loading: true,
          error: null,
        }
      }
    case `${GET_TYPES}_PENDING`:
      return {
        ...state,
        error: null,
        loading: true,
        loaded: false,
      };
    case `${CREATE_TYPE}_SUCCESS`:
      return {
        ...state,
        create: {
          loaded: true,
          loading: false,
          error: null,
        }
      }
    case `${DELETE_TYPE}_SUCCESS`:
      return {
        ...state,
        delete: {
          loaded: true,
          loading: false,
          error: null,
        }
      }
    case `${GET_TYPES}_SUCCESS`:
      return {
        ...state,
        error: null,
        loading: false,
        loaded: true,
        types: action.result,
      };
    case `${CREATE_TYPE}_FAIL`:
      return {
        ...state,
        create: {
          loaded: false,
          loading: false,
          error: action.error,
        }
      }
    case `${DELETE_TYPE}_FAIL`:
      return {
        ...state,
        delete: {
          loaded: false,
          loading: false,
          error: action.error,
        }
      }
    case `${GET_TYPES}_FAIL`:
      return {
        ...state,
        error: action.error,
        loading: false,
        loaded: false,
        types: [],
      };
    default:
      return state;
  }
}
