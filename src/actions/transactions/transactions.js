/**
 * Transactions actions.
 * @module actions/transactions/transactions
 */
import {
  GET_TRANSACTIONS,
  REVERT_TRANSACTIONS,
} from '@plone/volto/constants/ActionTypes';

/**
 * Get transaction function.
 * @function getTransaction
 * @returns {Object} Get transaction action.
 */
export function getTransactions() {
  return {
    type: GET_TRANSACTIONS,
    request: {
      op: 'get',
      path: `/@transactions`,
    },
  };
}

/**
 * Revert transactions function.
 * @function revertTransactions
 * @param {Array of strings} url Content url.
 * @returns {Object} Revert transactions action.
 */

export function revertTransactions(transaction_ids) {
  return {
    type: REVERT_TRANSACTIONS,
    request: {
      op: 'patch',
      path: '/@transactions',
      data: { transaction_ids },
    },
  };
}
