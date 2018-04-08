import { getDiff } from './diff';
import { GET_DIFF } from '../../constants/ActionTypes';

describe('Diff action', () => {
  describe('getDiff', () => {
    it('should create an action to get a diff', () => {
      const url = 'http://localhost';
      const one = '1';
      const two = '2';
      const action = getDiff(url, one, two);

      expect(action.type).toEqual(GET_DIFF);

      const apiMock = {
        get: jest.fn(),
      };
      action.promise(apiMock);

      expect(apiMock.get).toBeCalledWith(`${url}/@history/${one}`);
      expect(apiMock.get).toBeCalledWith(`${url}/@history/${two}`);
    });
  });
});
