/**
 * Groups actions.
 * @module actions/groups/groups
 */

import {
  CREATE_GROUP,
  DELETE_GROUP,
  GET_GROUP,
  LIST_GROUPS,
  UPDATE_GROUP,
} from '../../constants/ActionTypes';

/**
 * Create group function.
 * @function createGroup
 * @param {Object} data Group data.
 * @returns {Object} Create group action.
 */
export function createGroup(data) {
  return {
    type: CREATE_GROUP,
    promise: api => api.post('/@groups', { data }),
  };
}

/**
 * Delete group function.
 * @function deleteGroup
 * @param {string} id Group id
 * @returns {Object} Delete group action.
 */
export function deleteGroup(id) {
  return {
    type: DELETE_GROUP,
    promise: api => api.del(`/@groups/${id}`),
  };
}

/**
 * Get group function
 * @function getGroup
 * @param {string} id Group id
 * @returns {Object} Get group action
 */
export function getGroup(id) {
  return {
    type: GET_GROUP,
    promise: api => api.get(`/@groups/${id}`),
  };
}

/**
 * List groups function
 * @function listGroups
 * @returns {Object} List groups action
 */
export function listGroups() {
  return {
    type: LIST_GROUPS,
    promise: api => api.get('/@groups'),
  };
}

/**
 * Update group function.
 * @function updateGroup
 * @param {string} id Group id
 * @param {Object} data Group data.
 * @returns {Object} Update group action.
 */
export function updateGroup(id, data) {
  return {
    type: UPDATE_GROUP,
    promise: api => api.patch(`/@groups/${id}`, { data }),
  };
}
