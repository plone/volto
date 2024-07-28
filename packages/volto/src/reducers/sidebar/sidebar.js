/**
 * Sidebar reducer.
 * @module reducers/sidebar/sidebar
 */

import { union } from 'lodash';

import {
  RESET_METADATA_FOCUS,
  SET_METADATA_FIELDSETS,
  SET_METADATA_FOCUS,
  SET_SIDEBAR_EXPANDED,
  SET_SIDEBAR_TAB,
} from '@plone/volto/constants/ActionTypes';

const initialState = {
  tab: 0,
  metadataFieldsets: [],
  metadataFieldFocus: '',
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
    case SET_METADATA_FIELDSETS:
      return {
        ...state,
        metadataFieldsets: action.fieldsets,
      };
    case SET_METADATA_FOCUS:
      return {
        ...state,
        metadataFieldsets: union(state.metadataFieldsets, [action.fieldset]),
        metadataFieldFocus: action.field,
      };
    case RESET_METADATA_FOCUS:
      return {
        ...state,
        metadataFieldFocus: '',
      };
    case SET_SIDEBAR_TAB:
      return {
        ...state,
        tab: action.index,
      };
    case SET_SIDEBAR_EXPANDED:
      return {
        ...state,
        expanded: action.isExpanded,
      };
    default:
      return state;
  }
}
