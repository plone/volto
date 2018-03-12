import getActions from './actions';
import { GET_ACTIONS } from '../../constants/ActionTypes';

describe('Actions action', () => {
  describe('getActions', () => {
    it('should create an action to get the actions', () => {
      const url = 'http://localhost';
      const action = getActions(url);

      expect(action.type).toEqual(GET_ACTIONS);

      const apiMock = {
        get: jest.fn(),
      };
      action.promise(apiMock);

      expect(apiMock.get).toBeCalledWith(`${url}/@actions`);
    });
  });
});
