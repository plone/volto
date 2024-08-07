/**
 * Relations actions.
 * @module actions/relations/relations
 */

import {
  CREATE_RELATIONS,
  DELETE_RELATIONS,
  LIST_RELATIONS,
  STATS_RELATIONS,
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
      data: {
        items: content,
      },
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
      data: {
        items: content,
      },
    },
  };
}

/**
 * Query relations
 * @function queryRelations
 * @param {string} relation Name of relation
 * @param {boolean} onlyBroken
 * @returns {Object} List relations action
 */
export function queryRelations(
  relation = null,
  onlyBroken = false,
  subrequest = null,
  source = null,
  target = null,
  query_source = null,
  query_target = null,
) {
  let path = '/@relations';
  var searchParams = new URLSearchParams();
  relation && searchParams.append('relation', relation);
  onlyBroken && searchParams.append('onlyBroken', onlyBroken);
  source && searchParams.append('source', source);
  target && searchParams.append('target', target);
  query_source && searchParams.append('query_source', query_source);
  query_target && searchParams.append('query_target', query_target);
  const searchParamsToString = searchParams.toString();
  if (searchParamsToString) {
    path += `?${searchParamsToString}`;
  }
  return {
    type: LIST_RELATIONS,
    subrequest,
    request: {
      op: 'get',
      path: path,
    },
  };
}

/** Get relation stats
 * @function getRelationStats
 * @returns {Object} Relation stats
 */

export function getRelationStats() {
  let path = '/@relations';
  return {
    type: STATS_RELATIONS,
    request: {
      op: 'get',
      path: path,
    },
  };
}
