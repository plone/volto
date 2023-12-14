// eslint-disable-next-line import/no-unresolved
import { GET_USERSCHEMA } from '@plone/volto/constants/ActionTypes';

/**
 * Get the user schema.
 * @function getUserSchema
 * @returns {Object} Get the user schema action.
 */
export function getUserSchema() {
  return {
    type: GET_USERSCHEMA,
    request: {
      op: 'get',
      path: `/@userschema`,
    },
  };
}
