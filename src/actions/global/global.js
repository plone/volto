/**
 * Global state.
 * @module actions/global/global
 */

import { GET_GLOBAL_STATE } from '../../constants/ActionTypes';

/**
 * Get global state function
 * @function getGlobalState
 * @returns {Object} List global state variables
 */
export function getGlobalState() {
  return {
    type: GET_GLOBAL_STATE,
    request: {
      op: 'get',
      path: '/@globals',
    },
  };
}
