/**
 * Transactions actions.
 * @module actions/undoControlPanel/transactions
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

export function revertTransactions(Transactions_IDs) {
  return {
    type: REVERT_TRANSACTIONS,
    request: {
      op: 'patch',
      path: '/@transactions',
      data: { Transactions_IDs },
    },
  };
}
