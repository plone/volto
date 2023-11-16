/**
 * Upgrade reducer.
 * @module reducers/upgrade/upgrade
 */
import { GET_UPGRADE, POST_UPGRADE } from '@plone/volto/constants/ActionTypes';

const initialState = {
  get: {
    loaded: false,
    loading: false,
    error: null,
  },
  post: {
    loaded: false,
    loading: false,
    error: null,
  },
  upgradeinformation: null,
  upgradereport: null,
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
 * Controlpanels reducer.
 * @function controlpanels
 * @param {Object} state Current state.
 * @param {Object} action Action to be handled.
 * @returns {Object} New state.
 */
export default function controlpanels(state = initialState, action = {}) {
  switch (action.type) {
    case `${GET_UPGRADE}_PENDING`:
      return {
        ...state,
        controlpanel: null,
        [getRequestKey(action.type)]: {
          loading: true,
          loaded: false,
          error: null,
        },
      };
    case `${POST_UPGRADE}_PENDING`:
      return {
        ...state,
        [getRequestKey(action.type)]: {
          loading: true,
          loaded: false,
          error: null,
        },
      };
    case `${GET_UPGRADE}_SUCCESS`: {
      return {
        ...state,
        [getRequestKey(action.type)]: {
          loading: false,
          loaded: true,
          error: null,
        },
        upgradeinformation: action.result,
      };
    }
    case `${GET_UPGRADE}_FAIL`: {
      return {
        ...state,
        [getRequestKey(action.type)]: {
          loading: false,
          loaded: true,
          error: action.error,
        },
      };
    }
    case `${POST_UPGRADE}_SUCCESS`: {
      return {
        ...state,
        [getRequestKey(action.type)]: {
          loading: false,
          loaded: true,
          error: null,
        },
        upgradereport: action.result,
      };
    }
    case `${POST_UPGRADE}_FAIL`: {
      return {
        ...state,
        [getRequestKey(action.type)]: {
          loading: false,
          loaded: true,
          error: action.error,
        },
      };
    }
    default:
      return state;
  }
}
