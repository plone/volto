import getHistory from './history';
import { GET_HISTORY } from '../../constants/ActionTypes';

describe('History action', () => {
  describe('getHistory', () => {
    it('should create an action to get history', () => {
      const url = 'http://localhost';
      const action = getHistory(url);

      expect(action.type).toEqual(GET_HISTORY);

      const apiMock = {
        get: jest.fn(),
      };
      action.promise(apiMock);

      expect(apiMock.get).toBeCalledWith(`${url}/@history`);
    });
  });
});
