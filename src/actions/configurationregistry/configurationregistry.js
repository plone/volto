/**
 * Configuration registry actions.
 * @module actions/configurationregistry/configurationregistry
 */

import { GET_CONFIGURATIONREGISTRY } from '@plone/volto/constants/ActionTypes';

/**
 * Get user function
 * @function getUser
 * @param {string} id User id
 * @returns {Object} Get user action
 */
export function getRegistry(recordidentifier) {
  return {
    type: GET_CONFIGURATIONREGISTRY,
    request: {
      op: 'get',
      path: `/@registry/${recordidentifier}`,
    },
  };
}
