/**
 * Configuration registry actions.
 * @module actions/configurationregistry/configurationregistry
 */

import { GET_CONFIGURATIONREGISTRY } from '@plone/volto/constants/ActionTypes';

/**
 * Get user function
 * @function getRegistry
 * @param {string} recordidentifier Record id
 * @returns {Object} Get configuration registry action
 */
export function getRegistry(recordidentifier) {
  return {
    type: GET_CONFIGURATIONREGISTRY,
    recordidentifier,
    request: {
      op: 'get',
      path: `/@registry/${recordidentifier}`,
    },
  };
}
