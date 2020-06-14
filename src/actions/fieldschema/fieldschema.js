/**
 * Types actions.
 * @module actions/fieldschema/fieldschema
 */

import { GET_CONTENT_TYPE_FIELD_SCHEMA, UPDATE_CONTENT_TYPE_FIELD_SCHEMA } from '@plone/volto/constants/ActionTypes';

/**
 * Get field schema.
 * @function getFieldSchema
 * @param {string} url Content url.
 * @returns {Object} Get types action.
 */
export function getFieldSchema(contentType, type) {
  return (dispatch, getState) => {
    if (getState().userSession.token) {
      dispatch({
        type: GET_CONTENT_TYPE_FIELD_SCHEMA,
        request: {
          op: 'get',
          path: `/@types/${contentType}/${type}`,
        },
      });
    }
  };
}

/**
 * Update field function.
 * @function updateFieldSchema
 * @param {string} url Content url.
 * @param {string} text Body of the field.
 * @returns {Object} Add field action.
 */
export function updateFieldSchema(contentType, type, text) {
  return {
    type: UPDATE_CONTENT_TYPE_FIELD_SCHEMA,
    request: {
      op: 'put',
      path: `/@types/${contentType}/${type}`,
      data: { text },
    },
  };
}
