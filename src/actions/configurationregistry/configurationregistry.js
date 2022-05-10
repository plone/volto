/**
 * Configuration registry actions.
 * @module actions/configurationregistry/configurationregistry
 */

import { GET_CONFIGURATIONREGISTRY } from '@plone/volto/constants/ActionTypes';

/**
 * Get user function
 * @function getRegistry
 * @param {string} recordidentifier Record id
 * @returns {Object} configuration registry record
 *
 * Example:
 * dispatch(getRegistry('plone.many_users'));
 *
 * useSelector((state) => state.configurationregistry.record['plone.many_users']?.record);
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
