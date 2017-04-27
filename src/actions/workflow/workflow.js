/**
 * Workflow actions.
 * @module actions/workflow/workflow
 */

import {
  GET_WORKFLOW,
  GET_WORKFLOW_MULTIPLE,
  TRANSITION_WORKFLOW,
} from '../../constants/ActionTypes';

/**
 * Get workflow function.
 * @function getWorkflow
 * @param {string|Array} urls Workflow url(s).
 * @returns {Object} Get workflow action.
 */
export function getWorkflow(urls) {
  return {
    type: typeof urls === 'string' ? GET_WORKFLOW : GET_WORKFLOW_MULTIPLE,
    promise: typeof urls === 'string'
      ? api => api.get(`${urls}/@workflow`)
      : api => Promise.all(urls.map(url => api.get(`${url}/@workflow`))),
  };
}

/**
 * Transition workflow.
 * @function transitionWorkflow
 * @param {string} urls Content url(s).
 * @returns {Object} Transition workflow action.
 */
export function transitionWorkflow(urls) {
  return {
    type: TRANSITION_WORKFLOW,
    promise: typeof urls === 'string'
      ? api => api.post(urls)
      : api => Promise.all(urls.map(url => api.post(url))),
  };
}
