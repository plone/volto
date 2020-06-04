/**
 * Sidebar reducer.
 * @module reducers/sidebar/sidebar
 */

import {
  SET_SIDEBAR_TAB,
  COPY_BLOCK,
} from '@plone/volto/constants/ActionTypes';

const initialState = {
  tab: 0,
  blockData: null,
};

/**
 * Sidebar reducer.
 * @function sidebar
 * @param {Object} state Current state.
 * @param {Object} action Action to be handled.
 * @returns {Object} New state.
 */
export default function sidebar(state = initialState, action = {}) {
  switch (action.type) {
    case SET_SIDEBAR_TAB:
      return {
        ...state,
        tab: action.index,
      };
    case COPY_BLOCK:
      return {
        ...state,
        blockData: action.blockData,
      };
    default:
      return state;
  }
}
