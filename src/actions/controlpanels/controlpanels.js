/**
 * Controlpanels actions.
 * @module actions/controlpanels/controlpanels
 */

import {
  GET_CONTROLPANEL,
  LIST_CONTROLPANELS,
  UPDATE_CONTROLPANEL,
} from '../../constants/ActionTypes';

/**
 * Get controlpanel function.
 * @function getControlpanel
 * @param {id} id Controlpanel id.
 * @returns {Object} Get controlpanel action.
 */
export function getControlpanel(id) {
  return {
    type: GET_CONTROLPANEL,
    request: {
      op: 'get',
      path: `/@controlpanels/${id}`,
    },
  };
}

/**
 * List controlpanels function.
 * @function listControlpanels
 * @returns {Object} List controlpanels action.
 */
export function listControlpanels() {
  return {
    type: LIST_CONTROLPANELS,
    request: {
      op: 'get',
      path: '/@controlpanels',
    },
  };
}

/**
 * Update controlpanel function.
 * @function updateControlpanel
 * @param {string} url Controlpanel url.
 * @param {Object} data Controlpanel data.
 * @returns {Object} Update controlpanel action.
 */
export function updateControlpanel(url, data) {
  return {
    type: UPDATE_CONTROLPANEL,
    request: {
      op: 'patch',
      path: url,
      data,
    },
  };
}
