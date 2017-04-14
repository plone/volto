/**
 * Workflow actions.
 * @module actions/workflow/workflow
 */

import { GET_WORKFLOW, TRANSITION_WORKFLOW } from '../../constants/ActionTypes';

/**
 * Get workflow function.
 * @function getWorkflow
 * @param {string} url Workflow url.
 * @returns {Object} Get workflow action.
 */
export function getWorkflow(url) {
  return {
    type: GET_WORKFLOW,
    promise: api => api.get(`${url}/@workflow`),
  };
}

/**
 * Transition workflow.
 * @function transitionWorkflow
 * @param {string} url Content url.
 * @returns {Object} Transition workflow action.
 */
export function transitionWorkflow(url) {
  return {
    type: TRANSITION_WORKFLOW,
    promise: api => api.post(url),
  };
}
