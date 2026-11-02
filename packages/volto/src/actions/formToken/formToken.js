/**
 * Form token actions.
 * @module actions/formToken/formToken
 */

import { GET_FORM_TOKEN } from '@plone/volto/constants/ActionTypes';

/**
 * Get form token function: a single-use token for a form, which plone.restapi
 * only accepts once it is old enough.
 * @function getFormToken
 * @param {string} url Content url.
 * @returns {Object} Get form token action.
 */
export function getFormToken(url = '') {
  return {
    type: GET_FORM_TOKEN,
    request: {
      op: 'get',
      path: `${url}/@form-token`,
    },
  };
}
