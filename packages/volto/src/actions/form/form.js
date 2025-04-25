/**
 * Form actions.
 * @module actions/form/form
 */

import {
  SET_FORM_DATA,
  SET_UI_STATE,
} from '@plone/volto/constants/ActionTypes';

/**
 * Set form data function.
 * @function setFormData
 * @param {Object} data New form data.
 * @returns {Object} Set form data action.
 */
export function setFormData(data) {
  return {
    type: SET_FORM_DATA,
    data,
  };
}

/**
 * Set ui state function.
 * @function setUIState
 * @param {Object} ui New ui state.
 * @returns {Object} Set ui state action.
 */
export function setUIState(ui) {
  return {
    type: SET_UI_STATE,
    ui,
  };
}
