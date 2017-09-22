/**
 * Controlpanel reducer.
 * @module reducers/controlpanel
 */

import { GET_CONTROLPANEL } from '../../constants/ActionTypes';

const initialState = {
  error: null,
  loaded: false,
  loading: false,
  controlpanel: null,
};

/**
 * Controlpanel reducer.
 * @function controlpanel
 * @param {Object} state Current state.
 * @param {Object} action Action to be handled.
 * @returns {Object} New state.
 */
export default function controlpanel(state = initialState, action = {}) {
  switch (action.type) {
    case `${GET_CONTROLPANEL}_PENDING`:
      return {
        ...state,
        error: null,
        loading: true,
        loaded: false,
        controlpanel: null,
      };
    case `${GET_CONTROLPANEL}_SUCCESS`:
      return {
        ...state,
        error: null,
        loading: false,
        loaded: true,
        controlpanel: action.result,
      };
    case `${GET_CONTROLPANEL}_FAIL`:
      return {
        ...state,
        error: action.error,
        loading: false,
        loaded: false,
        controlpanel: null,
      };
    default:
      return state;
  }
}
