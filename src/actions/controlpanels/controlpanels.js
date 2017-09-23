/**
 * Controlpanels actions.
 * @module actions/controlpanels/controlpanels
 */

import { GET_CONTROLPANELS } from '../../constants/ActionTypes';

/**
 * Get controlpanels function.
 * @function getControlpanels
 * @returns {Object} Get controlpanels action.
 */
export default function getControlpanels() {
  return {
    type: GET_CONTROLPANELS,
    promise: api => api.get('/@controlpanels'),
  };
}
