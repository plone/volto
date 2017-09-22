/**
 * Controlpanel actions.
 * @module actions/controlpanel/controlpanel
 */

import { GET_CONTROLPANEL } from '../../constants/ActionTypes';

/**
 * Get controlpanel function.
 * @function getControlpanel
 * @param {id} id Controlpanel id.
 * @returns {Object} Get controlpanel action.
 */
export default function getControlpanel(id) {
  return {
    type: GET_CONTROLPANEL,
    promise: api => api.get(`/controlpanel/${id}`),
  };
}
