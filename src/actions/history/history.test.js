import { getHistory, revertHistory } from './history';
import {
  GET_HISTORY,
  REVERT_HISTORY,
} from '@plone/volto/constants/ActionTypes';

describe('History action', () => {
  describe('getHistory', () => {
    it('should create an action to get history', () => {
      const url = 'http://localhost';
      const action = getHistory(url);

      expect(action.type).toEqual(GET_HISTORY);
      expect(action.request.op).toEqual('get');
      expect(action.request.path).toEqual(`${url}/@history`);
    });
  });

  describe('revertHistory', () => {
    it('should create an action to revert history', () => {
      const url = 'http://localhost';
      const version = 0;
      const action = revertHistory(url, version);

      expect(action.type).toEqual(REVERT_HISTORY);
      expect(action.request.op).toEqual('patch');
      expect(action.request.path).toEqual(`${url}/@history`);
      expect(action.request.data).toEqual({ version });
    });
  });
});
