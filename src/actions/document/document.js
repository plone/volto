/**
 * Types actions.
 * @module actions/types/types
 */

import { GET_DOCUMENT_FIELD_SCHEMA, GET_DOCUMENT_TYPES, UPDATE_DOCUMENT_FIELD_SCHEMA, UPDATE_DOCUMENT_TYPES } from '@plone/volto/constants/ActionTypes';

/**
 * Get types function.
 * @function getDocumentTypes
 * @param {string} url Content url.
 * @returns {Object} Get types action.
 */
export function getDocumentTypes() {
  return (dispatch, getState) => {
    if (getState().userSession.token) {
      dispatch({
        type: GET_DOCUMENT_TYPES,
        request: {
          op: 'get',
          path: `/@types/Document`,
        },
      });
    }
  };
}

/**
 * Update document function.
 * @function updateDocumentTypes
 * @param {string} url Content url.
 * @param {string} text Body of the document.
 * @returns {Object} Update document action.
 */
export function updateDocumentTypes(url, text) {
  return {
    type: UPDATE_DOCUMENT_TYPES,
    request: {
      op: 'put',
      path: `/@types/Document`,
      data: { text },
    },
  };
}

/**
 * Get field schema.
 * @function getFieldSchema
 * @param {string} url Content url.
 * @returns {Object} Get types action.
 */
export function getFieldSchema(type) {
  return (dispatch, getState) => {
    if (getState().userSession.token) {
      dispatch({
        type: GET_DOCUMENT_FIELD_SCHEMA,
        request: {
          op: 'get',
          path: `/@types/Document/${type}`,
        },
      });
    }
  };
}

/**
 * Update field function.
 * @function updateDocumentField
 * @param {string} url Content url.
 * @param {string} text Body of the field.
 * @returns {Object} Add field action.
 */
export function updateDocumentField(type, text) {
  return {
    type: UPDATE_DOCUMENT_FIELD_SCHEMA,
    request: {
      op: 'put',
      path: `/@types/Document/${type}`,
      data: { text },
    },
  };
}
