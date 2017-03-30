/**
 * Workflow actions.
 * @module actions/workflow/workflow
 */

import {
  GET_WORKFLOW, GET_WORKFLOW_SUCCESS, GET_WORKFLOW_FAIL,
  TRANSITION_WORKFLOW, TRANSITION_WORKFLOW_SUCCESS, TRANSITION_WORKFLOW_FAIL,
} from '../../constants/ActionTypes';

/**
 * Get workflow function.
 * @function getWorkflow
 * @param {string} url Workflow url.
 * @returns {Object} Get workflow action.
 */
export function getWorkflow(url) {
  return {
    types: [GET_WORKFLOW, GET_WORKFLOW_SUCCESS, GET_WORKFLOW_FAIL],
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
    types: [TRANSITION_WORKFLOW, TRANSITION_WORKFLOW_SUCCESS, TRANSITION_WORKFLOW_FAIL],
    promise: api => api.post(url),
  };
}
