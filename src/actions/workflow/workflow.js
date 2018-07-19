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
    request:
      typeof urls === 'string'
        ? { op: 'get', path: `${urls}/@workflow` }
        : urls.map(url => ({ op: 'get', path: `${url}/@workflow` })),
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
    request:
      typeof urls === 'string'
        ? { op: 'post', path: urls }
        : urls.map(url => ({ op: 'post', path: url })),
  };
}
