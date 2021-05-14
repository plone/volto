/**
 * Working copy actions.
 * @module actions/workingcopy/workingcopy
 */

import { CREATE_WORKING_COPY } from '@plone/volto/constants/ActionTypes';

/**
 * Create Working Copy function.
 * @function createWorkingCopy
 * @param {string|Array} urls Workflow url(s).
 * @returns {Object} Get workflow action.
 */
export function createWorkingCopy(path) {
  return {
    type: CREATE_WORKING_COPY,
    request: {
      op: 'post',
      path: `${path}/@workingcopy`,
    },
  };
}
