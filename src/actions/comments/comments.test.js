import {
  addComment,
  deleteComment,
  editComment,
  getComments,
} from './comments';
import {
  ADD_COMMENT,
  DELETE_COMMENT,
  EDIT_COMMENT,
  GET_COMMENTS,
} from '../../constants/ActionTypes';

describe('Comments action', () => {
  describe('addComment', () => {
    it('should create an action to add a comment', () => {
      const url = 'http://localhost';
      const text = 'Hello World!';
      const action = addComment(url, text);

      expect(action.type).toEqual(ADD_COMMENT);

      const apiMock = {
        post: jest.fn(),
      };
      action.promise(apiMock);

      expect(apiMock.post).toBeCalledWith(`${url}/@comments`, {
        data: { text },
      });
    });
  });

  describe('deleteComment', () => {
    it('should create an action to delete a comment', () => {
      const url = 'http://localhost';
      const action = deleteComment(url);

      expect(action.type).toEqual(DELETE_COMMENT);

      const apiMock = {
        del: jest.fn(),
      };
      action.promise(apiMock);

      expect(apiMock.del).toBeCalledWith(url);
    });
  });

  describe('editComment', () => {
    it('should create an action to edit a comment', () => {
      const url = 'http://localhost';
      const text = 'Hello World!';
      const action = editComment(url, text);

      expect(action.type).toEqual(EDIT_COMMENT);

      const apiMock = {
        patch: jest.fn(),
      };
      action.promise(apiMock);

      expect(apiMock.patch).toBeCalledWith(url, {
        data: { text },
      });
    });
  });

  describe('getComments', () => {
    it('should create an action to get comments', () => {
      const url = 'http://localhost';
      const action = getComments(url);

      expect(action.type).toEqual(GET_COMMENTS);

      const apiMock = {
        get: jest.fn(),
      };
      action.promise(apiMock);

      expect(apiMock.get).toBeCalledWith(`${url}/@comments`);
    });
  });
});
