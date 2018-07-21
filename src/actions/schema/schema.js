/**
 * Schema actions.
 * @module actions/schema/schema
 */

import { GET_SCHEMA } from '../../constants/ActionTypes';

/**
 * Get schema function.
 * @function getSchema
 * @param {string} type Content type.
 * @returns {Object} Get schema action.
 */
export function getSchema(type) {
  return {
    type: GET_SCHEMA,
    request: {
      op: 'get',
      path: `/@types/${type}`,
    },
  };
}
