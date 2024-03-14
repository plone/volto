/**
 * Form actions.
 * @module actions/form/form
 */

import { SET_FORM_DATA } from '@plone/volto/constants/ActionTypes';

/**
 * Set form data function.
 * @function setFormData
 * @param {Object} data New form data.
 * @returns {Object} Set sidebar action.
 */
export function setFormData(data) {
  return {
    type: SET_FORM_DATA,
    data,
  };
}
