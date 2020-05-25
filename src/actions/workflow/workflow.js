/**
 * Workflow actions.
 * @module actions/workflow/workflow
 */

import {
  GET_WORKFLOW,
  GET_WORKFLOW_MULTIPLE,
  TRANSITION_WORKFLOW,
} from '@plone/volto/constants/ActionTypes';

import { settings } from '~/config';

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
        : urls.map((url) => ({ op: 'get', path: `${url}/@workflow` })),
  };
}

/**
 * Transition workflow.
 * @function transitionWorkflow
 * @param {string} urls Content url(s).
 * @param {bool} include_children Include children.
 * @returns {Object} Transition workflow action.
 */
export function transitionWorkflow(urls, include_children = false) {
  return {
    type: TRANSITION_WORKFLOW,
    request:
      typeof urls === 'string'
        ? {
            op: 'post',
            path: urls.replace(settings.apiPath, ''),
            data: { include_children },
          }
        : urls.map((url) => ({
            op: 'post',
            path: url.replace(settings.apiPath, ''),
            data: { include_children },
          })),
  };
}
