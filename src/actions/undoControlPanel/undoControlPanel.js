/**
 * Undo-Cotrol-Panel actions.
 * @module actions/undoControlPanel/undoControlPanel
 */
import { GET_TRANSACTION } from '@plone/volto/constants/ActionTypes';

/**
 * Get transaction function.
 * @function getTransaction
 * @param {string} url Content url.
 * @returns {Object} Get transaction action.
 */
export function getTransaction(url) {
  return {
    type: GET_TRANSACTION,
    request: {
      op: 'get',
      path: `${url}/@undo`,
    },
  };
}
