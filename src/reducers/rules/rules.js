import {
  ADD_RULE,
  GET_RULES,
  ENABLE_RULES,
  DISABLE_RULES,
  APPLY_SUB_RULES,
  UNAPPLY_SUB_RULES,
  REMOVE_RULES,
} from '@plone/volto/constants/ActionTypes';

const initialState = {
  add: {
    loaded: false,
    loading: false,
    error: null,
  },
  enable: {
    loaded: false,
    loading: false,
    error: null,
  },
  disable: {
    loaded: false,
    loading: false,
    error: null,
  },
  apply: {
    loaded: false,
    loading: false,
    error: null,
  },
  unapply: {
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
  rules: [],
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
 * Rules reducer.
 * @function rules
 * @param {Object} state Current state.
 * @param {Object} action Action to be handled.
 * @returns {Object} New state.
 */
export default function rules(state = initialState, action = {}) {
  switch (action.type) {
    case `${ADD_RULE}_PENDING`:
    case `${GET_RULES}_PENDING`:
    case `${ENABLE_RULES}_PENDING`:
    case `${DISABLE_RULES}_PENDING`:
    case `${APPLY_SUB_RULES}_PENDING`:
    case `${UNAPPLY_SUB_RULES}_PENDING`:
    case `${REMOVE_RULES}_PENDING`:
      return {
        ...state,
        [getRequestKey(action.type)]: {
          loading: true,
          loaded: false,
          error: null,
        },
      };
    case `${GET_RULES}_SUCCESS`:
      return {
        ...state,
        rules: action.result?.[`content-rules`],
        [getRequestKey(action.type)]: {
          loading: false,
          loaded: true,
          error: null,
        },
      };
    case `${ADD_RULE}_SUCCESS`:
    case `${ENABLE_RULES}_SUCCESS`:
    case `${DISABLE_RULES}_SUCCESS`:
    case `${APPLY_SUB_RULES}_SUCCESS`:
    case `${UNAPPLY_SUB_RULES}_SUCCESS`:
    case `${REMOVE_RULES}_SUCCESS`:
      return {
        ...state,
        [getRequestKey(action.type)]: {
          loading: false,
          loaded: true,
          error: action.result?.failed,
        },
      };
    case `${ADD_RULE}_FAIL`:
    case `${GET_RULES}_FAIL`:
    case `${ENABLE_RULES}_FAIL`:
    case `${DISABLE_RULES}_FAIL`:
    case `${APPLY_SUB_RULES}_FAIL`:
    case `${UNAPPLY_SUB_RULES}_FAIL`:
    case `${REMOVE_RULES}_FAIL`:
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
