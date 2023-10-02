import { LIST_ACTIONS } from '@plone/volto/constants/ActionTypes';
import { listActions } from './actions';

describe('Actions action', () => {
  describe('listActions', () => {
    it('should create an action to list the actions', () => {
      const url = 'http://127.0.0.1';
      const action = listActions(url);

      expect(action.type).toEqual(LIST_ACTIONS);
      expect(action.request.op).toEqual('get');
      expect(action.request.path).toEqual(`${url}/@actions`);
    });
  });
});
