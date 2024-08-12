import {
  GET_CONTROLPANEL_RULES,
  ADD_NEW_CONTENT_RULE,
} from '@plone/volto/constants/ActionTypes';

const initialState = {
  get: {
    loaded: false,
    loading: false,
    error: null,
  },
  add: {
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
 * Rules reducer.
 * @function rules
 * @param {Object} state Current state.
 * @param {Object} action Action to be handled.
 * @returns {Object} New state.
 */
export default function controlpanelrules(state = initialState, action = {}) {
  switch (action.type) {
    case `${GET_CONTROLPANEL_RULES}_PENDING`:
    case `${ADD_NEW_CONTENT_RULE}_PENDING`:
      return {
        ...state,
        [getRequestKey(action.type)]: {
          loading: true,
          loaded: false,
          error: null,
        },
      };
    case `${ADD_NEW_CONTENT_RULE}_SUCCESS`:
      return {
        ...state,
        [getRequestKey(action.type)]: {
          loading: false,
          loaded: true,
          error: null,
        },
      };
    case `${GET_CONTROLPANEL_RULES}_SUCCESS`:
      return {
        ...state,
        items: action.result?.items[0],
        [getRequestKey(action.type)]: {
          loading: false,
          loaded: true,
          error: null,
        },
      };
    case `${GET_CONTROLPANEL_RULES}_FAIL`:
    case `${ADD_NEW_CONTENT_RULE}_FAIL`:
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
