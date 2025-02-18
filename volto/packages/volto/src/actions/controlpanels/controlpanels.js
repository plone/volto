/**
 * Controlpanels actions.
 * @module actions/controlpanels/controlpanels
 */

import {
  GET_CONTROLPANEL,
  POST_CONTROLPANEL,
  DELETE_CONTROLPANEL,
  LIST_CONTROLPANELS,
  UPDATE_CONTROLPANEL,
  SYSTEM_INFORMATION,
  DATABASE_INFORMATION,
} from '@plone/volto/constants/ActionTypes';
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
 * Post controlpanel function.
 * @function postControlpanel
 * @param {id} id Controlpanel id.
 * @param {Object} data Controlpanel data.
 * @returns {Object} Post controlpanel action.
 */
export function postControlpanel(id, data) {
  return {
    type: POST_CONTROLPANEL,
    request: {
      op: 'post',
      path: `/@controlpanels/${id}`,
      data,
    },
  };
}

/**
 * Delete controlpanel function.
 * @function deleteControlpanel
 * @param {id} id Controlpanel id.
 * @param {string} item Controlpanel item to be deleted.
 * @returns {Object} Delete controlpanel action.
 */
export function deleteControlpanel(id, item) {
  return {
    type: DELETE_CONTROLPANEL,
    request: {
      op: 'del',
      path: `/@controlpanels/${id}/${item}`,
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

export function getSystemInformation() {
  return {
    type: SYSTEM_INFORMATION,
    request: {
      op: 'get',
      path: '/@system',
    },
  };
}

export function getDatabaseInformation() {
  return {
    type: DATABASE_INFORMATION,
    request: {
      op: 'get',
      path: '/@database',
    },
  };
}
