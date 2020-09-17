/**
 * formSelection actions.
 * @module actions/formSelection/formSelection
 */

import { FORM_SELECTION } from '@plone/volto/constants/ActionTypes';

/**
 * Set form selection function
 * @function setFormSelection
 * @param {string} formId Form Id (path or uuid)
 * @param {string} selected Block id (uuid or null, when nothing is selected)
 * @returns {Object} Set form selection action.
 */
export function setFormSelection(formId, selected) {
  return {
    type: FORM_SELECTION,
    forms: { [formId]: selected },
  };
}

/**
 * Set multiple forms selection function
 * @function setMultipleFormSelection
 * @param {Object} form selections mapping (formid : selection)
 * @returns {Object} Set form selection action.
 */
export function setMultipleFormSelection(formSelections) {
  return {
    type: FORM_SELECTION,
    forms: formSelections,
  };
}
