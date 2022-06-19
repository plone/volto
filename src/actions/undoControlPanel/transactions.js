/**
 * Transactions actions.
 * @module actions/undoControlPanel/transactions
 */
import { GET_TRANSACTION } from '@plone/volto/constants/ActionTypes';

/**
 * Get transaction function.
 * @function getTransaction
 * @param {string} url Content url.
 * @returns {Object} Get transaction action.
 */
export function getTransactions() {
  return {
    type: GET_TRANSACTION,
    request: {
      op: 'get',
      path: `/@transactions`,
    },
  };
}
