/**
 * Relations actions.
 * @module actions/relations/relations
 */

import {
  CREATE_RELATIONS,
  DELETE_RELATIONS,
  LIST_RELATIONS,
} from '@plone/volto/constants/ActionTypes';

/**
 * Create relation function.
 * @function createRelations
 * @param {Object|Array} content Relation data.
 * @returns {Object} Create relation action.
 */
export function createRelations(content) {
  return {
    type: CREATE_RELATIONS,
    request: {
      op: 'post',
      path: '/@relations-catalog',
      data: content,
    },
  };
}

/**
 * Delete relation function.
 * @function deleteRelations
 * @param {string} id Relation id
 * @returns {Object} Delete relation action.
 */
export function deleteRelations(content) {
  return {
    type: DELETE_RELATIONS,
    request: {
      op: 'del',
      path: `/@relations-catalog`,
      data: content,
    },
  };
}

/**
 * List relations function
 * @function listRelations
 * @param {string} relation Name of relation
 * @param {list} sources list of UIDS
 * @param {list} targets list of UIDS
 * @param {boolean} backrelations
 * @returns {Object} List relations action
 */
export function listRelations(relation, sources, targets, backrelations = 0) {
  let path = '/@relations-catalog';
  if (relation) {
    path += `?relation=${relation}`;
  }
  return {
    type: LIST_RELATIONS,
    request: { op: 'get', path: path },
  };
}
