import { listActions } from './actions';
import { LIST_ACTIONS } from '../../constants/ActionTypes';

describe('Actions action', () => {
  describe('listActions', () => {
    it('should create an action to list the actions', () => {
      const url = 'http://localhost';
      const action = listActions(url);

      expect(action.type).toEqual(LIST_ACTIONS);

      const apiMock = {
        get: jest.fn(),
      };
      action.promise(apiMock);

      expect(apiMock.get).toBeCalledWith(`${url}/@actions`);
    });
  });
});
