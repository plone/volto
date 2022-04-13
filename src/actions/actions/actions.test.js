import { listActions } from './actions';
import { LIST_ACTIONS } from '@plone/volto/constants/ActionTypes';

describe('Actions action', () => {
  describe('listActions', () => {
    it('should create an action to list the actions', () => {
      const url = 'http://localhost';
      const getState = () => ({});
      const dispatch = jest.fn();

      listActions(url)(dispatch, getState);

      expect(dispatch).toHaveBeenCalledWith({
        type: LIST_ACTIONS,
        request: {
          op: 'get',
          path: `${url}/@actions`,
        },
      });
    });
  });
});
