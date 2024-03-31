/**
 * Groups actions.
 * @module actions/groups/groups
 */

import {
  CREATE_GROUP,
  DELETE_GROUP,
  GET_GROUP,
  LIST_GROUPS,
  LIST_FILTER_GROUPS,
  UPDATE_GROUP,
} from '@plone/volto/constants/ActionTypes';

/**
 * Create group function.
 * @function createGroup
 * @param {Object} data Group data.
 * @returns {Object} Create group action.
 */
export function createGroup(data) {
  return {
    type: CREATE_GROUP,
    request: {
      op: 'post',
      path: '/@groups',
      data,
    },
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
    request: {
      op: 'del',
      path: `/@groups/${id}`,
    },
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
    request: {
      op: 'get',
      path: `/@groups/${id}`,
    },
  };
}

/**
 * List groups function
 * Two group lists needed by user group membership control panel: one for joining, one for filtering users.
 * @function listGroups
 * @returns {Object} List groups action
 */
export function listGroups(query, query_group_filter) {
  return query_group_filter !== undefined
    ? {
        type: LIST_FILTER_GROUPS,
        request: query_group_filter
          ? {
              op: 'get',
              path: `/@groups?query=${query_group_filter}`,
            }
          : {
              op: 'get',
              path: `/@groups`,
            },
      }
    : {
        type: LIST_GROUPS,
        request: query
          ? {
              op: 'get',
              path: `/@groups?query=${query}`,
            }
          : {
              op: 'get',
              path: '/@groups',
            },
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
    request: {
      op: 'patch',
      path: `/@groups/${id}`,
      data,
    },
  };
}
