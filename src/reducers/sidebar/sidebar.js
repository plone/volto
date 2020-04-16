/**
 * Sidebar reducer.
 * @module reducers/sidebar/sidebar
 */

import { SET_SIDEBAR_TAB } from '@plone/volto/constants/ActionTypes';

const initialState = {
  tab: 0,
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
    default:
      return state;
  }
}
