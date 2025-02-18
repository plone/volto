/**
 * Rebuild relations action.
 * @module actions/relations/rebuild
 */

import { REBUILD_RELATIONS } from '@plone/volto/constants/ActionTypes';

/**
 * Rebuild relation function.
 * @function rebuildRelations
 * @param {Boolean} flush Flush intids
 * @returns {Object} Rebuild relation action.
 */
export function rebuildRelations(flush = false) {
  let path = '/@relations/rebuild';
  const data = flush === true ? { flush: 1 } : {};
  return {
    type: REBUILD_RELATIONS,
    request: {
      op: 'post',
      path: path,
      data: data,
    },
  };
}
