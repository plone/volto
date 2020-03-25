/**
 * Types actions.
 * @module actions/types/types
 */

import {
  GET_TYPES,
  CREATE_TYPE,
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
