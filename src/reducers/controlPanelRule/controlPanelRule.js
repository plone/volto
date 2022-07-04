import {
  GET_CONTROLPANEL_RULE,
  DELETE_CONTROLPANEL_RULE,
  EDIT_CONTROLPANEL_RULE,
} from '@plone/volto/constants/ActionTypes';

const initialState = {
  get: {
    loaded: false,
    loading: false,
    error: null,
  },
  delete: {
    loaded: false,
    loading: false,
    error: null,
  },
  edit: {
    loaded: false,
    loading: false,
    error: null,
  },
  item: {},
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
export default function controlPanelRule(state = initialState, action = {}) {
  switch (action.type) {
    case `${GET_CONTROLPANEL_RULE}_PENDING`:
    case `${DELETE_CONTROLPANEL_RULE}_PENDING`:
    case `${EDIT_CONTROLPANEL_RULE}_PENDING`:
      return {
        ...state,
        [getRequestKey(action.type)]: {
          loading: true,
          loaded: false,
          error: null,
        },
      };
    case `${GET_CONTROLPANEL_RULE}_SUCCESS`:
      return {
        ...state,
        item: action.result,
        [getRequestKey(action.type)]: {
          loading: false,
          loaded: true,
          error: null,
        },
      };
    case `${DELETE_CONTROLPANEL_RULE}_SUCCESS`:
    case `${EDIT_CONTROLPANEL_RULE}_SUCCESS`:
      return {
        ...state,
        [getRequestKey(action.type)]: {
          loading: false,
          loaded: true,
          error: action.result?.failed,
        },
      };
    case `${GET_CONTROLPANEL_RULE}_FAIL`:
    case `${DELETE_CONTROLPANEL_RULE}_FAIL`:
    case `${EDIT_CONTROLPANEL_RULE}_FAIL`:
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
