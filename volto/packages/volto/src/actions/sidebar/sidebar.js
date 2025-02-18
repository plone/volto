/**
 * Sidebar actions.
 * @module actions/sidebar/sidebar
 */

import {
  SET_METADATA_FIELDSETS,
  SET_METADATA_FOCUS,
  RESET_METADATA_FOCUS,
  SET_SIDEBAR_TAB,
} from '@plone/volto/constants/ActionTypes';

/**
 * Set metadata fieldsets function.
 * @function setMetadataFieldsets
 * @param {Array} fieldsets New fieldsets.
 * @returns {Object} Set metadata fieldsets action.
 */
export function setMetadataFieldsets(fieldsets) {
  return {
    type: SET_METADATA_FIELDSETS,
    fieldsets,
  };
}

/**
 * Set metadata focus function.
 * @function setMetadataFocus
 * @param {String} fieldset Fieldset of the field.
 * @param {String} field Field to set focus too.
 * @returns {Object} Set metadata focus action.
 */
export function setMetadataFocus(fieldset, field) {
  return {
    type: SET_METADATA_FOCUS,
    fieldset,
    field,
  };
}

/**
 * Resets metadata focus function.
 * @function resetMetadataFocus
 * @returns {Object} Set metadata focus action.
 */
export function resetMetadataFocus() {
  return {
    type: RESET_METADATA_FOCUS,
  };
}

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
