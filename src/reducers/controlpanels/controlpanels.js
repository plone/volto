/**
 * Controlpanels reducer.
 * @module reducers/controlpanels
 */

import { GET_CONTROLPANELS } from '../../constants/ActionTypes';

const initialState = {
  error: null,
  loaded: false,
  loading: false,
  controlpanels: [],
};

/**
 * Controlpanels reducer.
 * @function controlpanels
 * @param {Object} state Current state.
 * @param {Object} action Action to be handled.
 * @returns {Object} New state.
 */
export default function controlpanels(state = initialState, action = {}) {
  switch (action.type) {
    case `${GET_CONTROLPANELS}_PENDING`:
      return {
        ...state,
        error: null,
        loading: true,
        loaded: false,
      };
    case `${GET_CONTROLPANELS}_SUCCESS`:
      return {
        ...state,
        error: null,
        loading: false,
        loaded: true,
        controlpanels: action.result,
      };
    case `${GET_CONTROLPANELS}_FAIL`:
      return {
        ...state,
        error: action.error,
        loading: false,
        loaded: false,
        controlpanels: [],
      };
    default:
      return state;
  }
}
