/**
 * Controlpanel reducer.
 * @module reducers/controlpanel
 */

import {
  EDIT_CONTROLPANEL,
  GET_CONTROLPANEL,
} from '../../constants/ActionTypes';
import config from '../../config';

const initialState = {
  edit: {
    loaded: false,
    loading: false,
    error: null,
  },
  get: {
    loaded: false,
    loading: false,
    error: null,
  },
  controlpanel: null,
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
 * Controlpanel reducer.
 * @function controlpanel
 * @param {Object} state Current state.
 * @param {Object} action Action to be handled.
 * @returns {Object} New state.
 */
export default function controlpanel(state = initialState, action = {}) {
  switch (action.type) {
    case `${EDIT_CONTROLPANEL}_PENDING`:
    case `${GET_CONTROLPANEL}_PENDING`:
      return {
        ...state,
        [getRequestKey(action.type)]: {
          loading: true,
          loaded: false,
          error: null,
        },
      };
    case `${GET_CONTROLPANEL}_SUCCESS`:
      return {
        ...state,
        controlpanel: {
          ...action.result,
          '@id': action.result['@id'].replace(config.apiPath, ''),
        },
        [getRequestKey(action.type)]: {
          loading: false,
          loaded: true,
          error: null,
        },
      };
    case `${EDIT_CONTROLPANEL}_SUCCESS`:
      return {
        ...state,
        [getRequestKey(action.type)]: {
          loading: false,
          loaded: true,
          error: null,
        },
      };
    case `${EDIT_CONTROLPANEL}_FAIL`:
    case `${GET_CONTROLPANEL}_FAIL`:
      return {
        ...state,
        controlpanel: null,
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
