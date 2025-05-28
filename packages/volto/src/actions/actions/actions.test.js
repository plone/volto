import { listActions } from './actions';
import { LIST_ACTIONS } from '@plone/volto/constants/ActionTypes';

describe('Actions action', () => {
  describe('listActions', () => {
    it('should create an action to list the actions', () => {
      const url = 'http://localhost';
      const action = listActions(url);

      expect(action.type).toBe(LIST_ACTIONS);
      expect(action.request.op).toBe('get');
      expect(action.request.path).toBe(`${url}/@actions`);
    });
  });
});
