/**
 * Types actions.
 * @module actions/contenttype/contenttype
 */

import { GET_CONTENT_TYPE_TYPES, UPDATE_CONTENT_TYPE_TYPES } from '@plone/volto/constants/ActionTypes';

/**
 * Get types function.
 * @function getContentTypeTypes
 * @param {string} contentType.
 * @returns {Object} Get types action.
 */
export function getContentTypeTypes(contentType) {
  return (dispatch, getState) => {
    if (getState().userSession.token) {
      dispatch({
        type: GET_CONTENT_TYPE_TYPES,
        request: {
          op: 'get',
          path: `/@types/${contentType}`,
        },
      });
    }
  };
}

/**
 * Update document function.
 * @function updateContentTypeFieldTypes
 * @param {string} url Content url.
 * @param {string} text Body of the document.
 * @returns {Object} Update document action.
 */
export function updateContentTypeFieldTypes(contentType, text) {
  console.log(
    'updateContentTypeFieldTypes contentType',
    contentType,
    'text',
    text,
  );
  const data = JSON.parse(text);
  return {
    type: UPDATE_CONTENT_TYPE_TYPES,
    request: {
      op: 'put',
      path: `/@types/${contentType}`,
      data,
    },
  };
}
