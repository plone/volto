/**
 * formSelection reducer.
 * @module reducers/formSelection/formSelection
 */

import { FORM_SELECTION } from '@plone/volto/constants/ActionTypes';

const initialState = {};

/**
 * formSelection reducer.
 * @function formSelection
 * @param {Object} state Current state.
 * @param {Object} action Action to be handled.
 * @returns {Object} New state.
 */
export default function formSelection(state = initialState, action = {}) {
  switch (action.type) {
    case FORM_SELECTION:
      return {
        ...state,
        ...action.forms,
      };
    default:
      return state;
  }
}
