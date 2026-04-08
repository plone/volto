import { getTransactions, revertTransactions } from './transactions';
import {
  GET_TRANSACTIONS,
  REVERT_TRANSACTIONS,
} from '@plone/volto/constants/ActionTypes';

describe('Transactions action', () => {
  describe('getTransactions', () => {
    it('should create an action to get transactions', () => {
      const action = getTransactions();

      expect(action.type).toEqual(GET_TRANSACTIONS);
      expect(action.request.op).toEqual('get');
      expect(action.request.path).toEqual('/@transactions');
    });
  });

  describe('revertTransactions', () => {
    it('should create an action to revert transactions', () => {
      const transaction_ids = [''];
      const action = revertTransactions(transaction_ids);

      expect(action.type).toEqual(REVERT_TRANSACTIONS);
      expect(action.request.op).toEqual('patch');
      expect(action.request.path).toEqual(`/@transactions`);
      expect(action.request.data).toEqual({ transaction_ids });
    });
  });
});
