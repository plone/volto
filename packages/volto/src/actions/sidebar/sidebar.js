/**
 * Sidebar actions.
 * @module actions/sidebar/sidebar
 */

import { SET_SIDEBAR_TAB } from '@plone/volto/constants/ActionTypes';

/**
 * Set sidebar tab function.
 * @function setSidebarTab
 * @param {Number} index New tab index.
 * @returns {Object} Set sidebar action.
 */
export function setSidebarTab(index) {
  return {
    type: SET_SIDEBAR_TAB,
    index,
  };
}
