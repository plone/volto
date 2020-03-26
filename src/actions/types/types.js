/**
 * Types actions.
 * @module actions/types/types
 */

import {
  GET_TYPES,
  CREATE_TYPE,
  DELETE_TYPE,
 } from '@plone/volto/constants/ActionTypes';

/**
 * Get types function.
 * @function getTypes
 * @param {string} url Content url.
 * @returns {Object} Get types action.
 */
export function getTypes(url) {
  return (dispatch, getState) => {
    if (getState().userSession.token) {
      dispatch({
        type: GET_TYPES,
        request: {
          op: 'get',
          path: `${url}/@types`,
        },
      });
    }
  };
}

/**
 * Create type function.
 * @function createType
 * @param {Object} data Type data.
 * @returns {Object} Create type action.
 */
export function createType(data) {
  return {
    type: CREATE_TYPE,
    request: {
      op: 'post',
      path: '/@types',
      data,
    },
  };
}

/**
 * Delete type function.
 * @function deleteType
 * @param {string} id Type id
 * @returns {Object} Delete type action.
 */
export function deleteType(tid) {
  return {
    type: DELETE_TYPE,
    request: {
      op: 'del',
      path: `/@types/${tid}`,
    },
  };
}
