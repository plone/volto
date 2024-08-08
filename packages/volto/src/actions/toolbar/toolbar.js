import { EXPAND_TOOLBAR } from '@plone/volto/constants/ActionTypes';

/**
 * Set sidebar tab function.
 * @function setExpandedToolbar
 * @param {Number} index New tab index.
 * @returns {Object} Set sidebar action.
 */
export function setExpandedToolbar(isExpanded) {
  return {
    type: EXPAND_TOOLBAR,
    isExpanded,
  };
}
