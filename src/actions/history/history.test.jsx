import { getHistory, revertHistory } from './history';
import { GET_HISTORY, REVERT_HISTORY } from '../../constants/ActionTypes';

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

  describe('revertHistory', () => {
    it('should create an action to revert history', () => {
      const url = 'http://localhost';
      const version = 0;
      const action = revertHistory(url, version);

      expect(action.type).toEqual(REVERT_HISTORY);

      const apiMock = {
        patch: jest.fn(),
      };
      action.promise(apiMock);

      expect(apiMock.patch).toBeCalledWith(`${url}/@history`, {
        data: { version },
      });
    });
  });
});
