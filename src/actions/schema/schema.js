/**
 * Schema actions.
 * @module actions/schema/schema
 */

import {
  GET_SCHEMA,
  GET_FIELD_SCHEMA,
  POST_SCHEMA,
  PUT_SCHEMA,
  UPDATE_SCHEMA,
  UPDATE_FIELD_SCHEMA,
} from '@plone/volto/constants/ActionTypes';

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

/**
 * Post schema function.
 * @function postSchema
 * @param {string} type Content type.
 * @param {Object} data Schema data.
 * @returns {Object} Post schema action.
 */
export function postSchema(type, data) {
  return {
    type: POST_SCHEMA,
    request: {
      op: 'post',
      path: `/@types/${type}`,
      data,
    },
  };
}

/**
 * Put schema function.
 * @function putSchema
 * @param {string} type Content type.
 * @param {Object} data Schema data.
 * @returns {Object} Put schema action.
 */
export function putSchema(type, data) {
  return {
    type: PUT_SCHEMA,
    request: {
      op: 'put',
      path: `/@types/${type}`,
      data,
    },
  };
}

/**
 * Update schema function.
 * @function updateSchema
 * @param {string} type Content type.
 * @param {Object} data Schema data.
 * @returns {Object} Update schema action.
 */
export function updateSchema(type, data) {
  return {
    type: UPDATE_SCHEMA,
    request: {
      op: 'patch',
      path: `/@types/${type}`,
      data,
    },
  };
}

/**
 * Get field schema function.
 * @function getFieldSchema
 * @param {string} type Content type.
 * @param {string} field Content type field name.
 * @returns {Object} Get field schema action.
 */
export function getFieldSchema(type, field) {
  return (dispatch, getState) => {
    if (getState().userSession.token) {
      dispatch({
        type: GET_FIELD_SCHEMA,
        request: {
          op: 'get',
          path: `/@types/${type}/${field}`,
        },
      });
    }
  };
}

/**
 * Update field schema function.
 * @function updateFieldSchema
 * @param {string} type Content type.
 * @param {string} field Content type field name.
 * @param {Object} data Schema data.
 * @returns {Object} Add field action.
 */
export function updateFieldSchema(type, field, data) {
  return {
    type: UPDATE_FIELD_SCHEMA,
    request: {
      op: 'put',
      path: `/@types/${type}/${field}`,
      data,
    },
  };
}
