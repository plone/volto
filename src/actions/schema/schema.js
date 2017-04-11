/**
 * Schema actions.
 * @module actions/schema/schema
 */

import {
  GET_SCHEMA_PENDING, GET_SCHEMA_SUCCESS, GET_SCHEMA_FAIL,
} from '../../constants/ActionTypes';

/**
 * Get schema function.
 * @function getSchema
 * @param {string} type Content type.
 * @returns {Object} Get schema action.
 */
export default function getSchema(type) {
  return {
    types: [GET_SCHEMA_PENDING, GET_SCHEMA_SUCCESS, GET_SCHEMA_FAIL],
    promise: api => api.get(`/@types/${type}`),
  };
}
