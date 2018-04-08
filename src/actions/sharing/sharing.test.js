import { updateSharing, getSharing } from './sharing';
import { UPDATE_SHARING, GET_SHARING } from '../../constants/ActionTypes';

describe('Sharing action', () => {
  describe('updateSharing', () => {
    it('should create an action to update sharing', () => {
      const url = 'http://localhost';
      const sharing = 'Hello World!';
      const action = updateSharing(url, sharing);

      expect(action.type).toEqual(UPDATE_SHARING);

      const apiMock = {
        post: jest.fn(),
      };
      action.promise(apiMock);

      expect(apiMock.post).toBeCalledWith(`${url}/@sharing`, {
        data: sharing,
      });
    });
  });

  describe('getSharing', () => {
    it('should create an action to get sharing', () => {
      const url = 'http://localhost';
      const action = getSharing(url);

      expect(action.type).toEqual(GET_SHARING);

      const apiMock = {
        get: jest.fn(),
      };
      action.promise(apiMock);

      expect(apiMock.get).toBeCalledWith(`${url}/@sharing`);
    });

    it('should create an action to get sharing with search param', () => {
      const url = 'http://localhost';
      const search = 'admin';
      const action = getSharing(url, search);

      expect(action.type).toEqual(GET_SHARING);

      const apiMock = {
        get: jest.fn(),
      };
      action.promise(apiMock);

      expect(apiMock.get).toBeCalledWith(`${url}/@sharing?search=${search}`);
    });
  });
});
