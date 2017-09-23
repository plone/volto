/**
 * Controlpanel actions.
 * @module actions/controlpanel/controlpanel
 */

import {
  EDIT_CONTROLPANEL,
  GET_CONTROLPANEL,
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
    promise: api => api.get(`/@controlpanels/${id}`),
  };
}

/**
 * Edit controlpanel function.
 * @function editControlpanel
 * @param {string} url Controlpanel url.
 * @param {Object} data Controlpanel data.
 * @returns {Object} Edit controlpanel action.
 */
export function editControlpanel(url, data) {
  return {
    type: EDIT_CONTROLPANEL,
    promise: api => api.patch(url, { data }),
  };
}
