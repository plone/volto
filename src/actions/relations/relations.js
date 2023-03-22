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
      path: '/@relations',
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
      path: `/@relations`,
      data: content,
    },
  };
}

/**
 * List relations function
 * @function queryRelations
 * @param {string} relation Name of relation
 * @param {boolean} onlyBroken
 * @returns {Object} List relations action
 */
export function queryRelations(
  relation = null,
  onlyBroken = false,
  subrequest = null,
) {
  let path = '/@relations';
  var searchParams = new URLSearchParams();
  (relation || onlyBroken) && searchParams.append('max', 2500);
  relation && searchParams.append('relation', relation);
  onlyBroken && searchParams.append('onlyBroken', onlyBroken);
  const searchParamsToString = searchParams.toString();
  if (searchParamsToString) {
    path += `?${searchParamsToString}`;
  }
  return {
    type: LIST_RELATIONS,
    subrequest,
    request: { op: 'get', path: path },
  };
}
