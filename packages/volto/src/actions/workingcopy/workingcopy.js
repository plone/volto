/**
 * Working copy actions.
 * @module actions/workingcopy/workingcopy
 */

import {
  APPLY_WORKING_COPY,
  CREATE_WORKING_COPY,
  REMOVE_WORKING_COPY,
} from '@plone/volto/constants/ActionTypes';

/**
 * Create Working Copy function.
 * @function createWorkingCopy
 * @param {string} path The content path.
 * @returns {Object} Get workingcopy action.
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

/**
 * Apply Working Copy function.
 * @function applyWorkingCopy
 * @param {string} path The content path.
 * @returns {Object} Get workingcopy action.
 */
export function applyWorkingCopy(path) {
  return {
    type: APPLY_WORKING_COPY,
    request: {
      op: 'patch',
      path: `${path}/@workingcopy`,
    },
  };
}

/**
 * Remove Working Copy function.
 * @function removeWorkingCopy
 * @param {string} path The content path.
 * @returns {Object} Get workingcopy action.
 */
export function removeWorkingCopy(path) {
  return {
    type: REMOVE_WORKING_COPY,
    request: {
      op: 'del',
      path: `${path}/@workingcopy`,
    },
  };
}
