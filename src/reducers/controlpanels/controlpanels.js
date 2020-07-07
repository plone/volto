/**
 * Controlpanels reducer.
 * @module reducers/controlpanels/controlpanels
 */
import { settings } from '~/config';
import {
  GET_CONTROLPANEL,
  POST_CONTROLPANEL,
  DELETE_CONTROLPANEL,
  LIST_CONTROLPANELS,
  UPDATE_CONTROLPANEL,
  SYSTEM_INFORMATION,
  DATABASE_INFORMATION,
} from '@plone/volto/constants/ActionTypes';

const initialState = {
  get: {
    loaded: false,
    loading: false,
    error: null,
  },
  list: {
    loaded: false,
    loading: false,
    error: null,
  },
  update: {
    loaded: false,
    loading: false,
    error: null,
  },
  post: {
    loaded: false,
    loading: false,
    error: null,
  },
  delete: {
    loaded: false,
    loading: false,
    error: null,
  },
  controlpanel: null,
  controlpanels: [],
  systeminformation: null,
  databaseinformation: null,
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
    case `${GET_CONTROLPANEL}_PENDING`:
    case `${LIST_CONTROLPANELS}_PENDING`:
    case `${SYSTEM_INFORMATION}_PENDING`:
    case `${DATABASE_INFORMATION}_PENDING`:
      return {
        ...state,
        controlpanel: null,
        [getRequestKey(action.type)]: {
          loading: true,
          loaded: false,
          error: null,
        },
      };
    case `${POST_CONTROLPANEL}_PENDING`:
    case `${UPDATE_CONTROLPANEL}_PENDING`:
    case `${DELETE_CONTROLPANEL}_PENDING`:
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
          '@id': action.result['@id'].replace(settings.apiPath, ''),
        },
        [getRequestKey(action.type)]: {
          loading: false,
          loaded: true,
          error: null,
        },
      };
    case `${POST_CONTROLPANEL}_SUCCESS`:
    case `${UPDATE_CONTROLPANEL}_SUCCESS`:
    case `${DELETE_CONTROLPANEL}_SUCCESS`:
      return {
        ...state,
        [getRequestKey(action.type)]: {
          loading: false,
          loaded: true,
          error: null,
        },
      };
    case `${LIST_CONTROLPANELS}_SUCCESS`:
      return {
        ...state,
        [getRequestKey(action.type)]: {
          loading: false,
          loaded: true,
          error: null,
        },
        controlpanels: action.result,
      };
    case `${SYSTEM_INFORMATION}_SUCCESS`: {
      return {
        ...state,
        [getRequestKey(action.type)]: {
          loading: false,
          loaded: true,
          error: null,
        },
        systeminformation: action.result,
      };
    }
    case `${SYSTEM_INFORMATION}_FAIL`: {
      return {
        ...state,
        [getRequestKey(action.type)]: {
          loading: false,
          loaded: true,
          error: action.error,
        },
      };
    }
    case `${DATABASE_INFORMATION}_SUCCESS`: {
      return {
        ...state,
        [getRequestKey(action.type)]: {
          loading: false,
          loaded: true,
          error: null,
        },
        databaseinformation: action.result,
      };
    }
    case `${DATABASE_INFORMATION}_FAIL`: {
      return {
        ...state,
        [getRequestKey(action.type)]: {
          loading: false,
          loaded: true,
          error: action.error,
        },
      };
    }
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
    case `${LIST_CONTROLPANELS}_FAIL`:
      return {
        ...state,
        controlpanels: [],
        [getRequestKey(action.type)]: {
          loading: false,
          loaded: false,
          error: action.error,
        },
      };
    case `${POST_CONTROLPANEL}_FAIL`:
    case `${UPDATE_CONTROLPANEL}_FAIL`:
    case `${DELETE_CONTROLPANEL}_FAIL`:
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
