/**
 * Toolbar reducer.
 * @module reducers/toolbar/toolbar
 */

import { EXPAND_TOOLBAR } from '@plone/volto/constants/ActionTypes';

const initialState = {
  expanded: false,
};

/**
 * Toolbar reducer.
 * @function toolbar
 * @param {Object} state Current state.
 * @param {Object} action Action to be handled.
 * @returns {Object} New state.
 */
export default function toolbar(state = initialState, action = {}) {
  switch (action.type) {
    case EXPAND_TOOLBAR:
      return {
        expanded: action.isExpanded,
      };
    default:
      return state;
  }
}
