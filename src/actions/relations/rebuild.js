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
  let path = '/@relations';
  var searchParams = new URLSearchParams();
  searchParams.append('rebuild', '1');
  flush && searchParams.append('flush', '1');
  const searchParamsToString = searchParams.toString();
  path += `?${searchParamsToString}`;
  return {
    type: REBUILD_RELATIONS,
    request: { op: 'get', path: path },
  };
}
