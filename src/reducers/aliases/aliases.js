import {
  GET_ALIASES,
  ADD_ALIASES,
  REMOVE_ALIASES,
} from '@plone/volto/constants/ActionTypes';

const initialState = {
  add: {
    loaded: false,
    loading: false,
    error: null,
  },
  remove: {
    loaded: false,
    loading: false,
    error: null,
  },
  get: {
    loaded: false,
    loading: false,
    error: null,
  },
  items: [],
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
 * Aliases reducer.
 * @function aliases
 * @param {Object} state Current state.
 * @param {Object} action Action to be handled.
 * @returns {Object} New state.
 */
export default function aliases(state = initialState, action = {}) {
  switch (action.type) {
    case `${ADD_ALIASES}_PENDING`:
    case `${GET_ALIASES}_PENDING`:
    case `${REMOVE_ALIASES}_PENDING`:
      return {
        ...state,
        [getRequestKey(action.type)]: {
          loading: true,
          loaded: false,
          error: null,
        },
      };
    case `${GET_ALIASES}_SUCCESS`:
      return {
        ...state,
        items: action.result?.items,
        items_total: action.result?.items_total,
        [getRequestKey(action.type)]: {
          loading: false,
          loaded: true,
          error: null,
        },
      };
    case `${ADD_ALIASES}_SUCCESS`:
    case `${REMOVE_ALIASES}_SUCCESS`:
      return {
        ...state,
        [getRequestKey(action.type)]: {
          loading: false,
          loaded: true,
          error: action.result?.failed,
        },
      };
    case `${GET_ALIASES}_FAIL`:
    case `${ADD_ALIASES}_FAIL`:
    case `${REMOVE_ALIASES}_FAIL`:
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
