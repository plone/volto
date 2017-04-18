import { editSharing, getSharing } from './sharing';
import { EDIT_SHARING, GET_SHARING } from '../../constants/ActionTypes';

describe('Sharing action', () => {
  describe('editSharing', () => {
    it('should create an action to edit sharing', () => {
      const url = 'http://localhost';
      const sharing = 'Hello World!';
      const action = editSharing(url, sharing);

      expect(action.type).toEqual(EDIT_SHARING);

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

      expect(apiMock.get).toBeCalledWith(
        `${url}/@sharing?search_term=${search}`,
      );
    });
  });
});
