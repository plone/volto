/**
 * Configuration registry reducer.
 * @module reducers/configurationregistry/configurationregistry
 */

import { startsWith } from 'lodash';

import { GET_CONFIGURATIONREGISTRY } from '@plone/volto/constants/ActionTypes';

const initialState = {
  record: {},
  records: [],
  get: {
    error: null,
    loaded: false,
    loading: false,
  },
};

/**
 * Get request key
 * @function getRequestKey
 * @param {string} actionType Action type.
 * @returns {string} Request key.
 */
function getRequestKey(actionType) {
  if (startsWith(actionType, 'UPDATE_PASSWORD')) {
    return 'update_password';
  }
  return actionType.split('_')[0].toLowerCase();
}

/**
 * Configuration registry reducer.
 * @function registry
 * @param {Object} state Current state.
 * @param {Object} action Action to be handled.
 * @returns {Object} New state.
 */
export default function registry(state = initialState, action = {}) {
  switch (action.type) {
    case `${GET_CONFIGURATIONREGISTRY}_PENDING`:
      return {
        ...state,
        [getRequestKey(action.type)]: {
          loading: true,
          loaded: false,
          error: null,
        },
      };
    case `${GET_CONFIGURATIONREGISTRY}_SUCCESS`:
      return {
        ...state,
        record: action.result,
        [getRequestKey(action.type)]: {
          loading: false,
          loaded: true,
          error: null,
        },
      };
    case `${GET_CONFIGURATIONREGISTRY}_FAIL`:
      return {
        ...state,
        record: {},
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
