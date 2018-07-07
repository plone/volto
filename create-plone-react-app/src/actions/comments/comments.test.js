import {
  addComment,
  deleteComment,
  updateComment,
  listComments,
} from './comments';
import {
  ADD_COMMENT,
  DELETE_COMMENT,
  UPDATE_COMMENT,
  LIST_COMMENTS,
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

  describe('updateComment', () => {
    it('should create an action to update a comment', () => {
      const url = 'http://localhost';
      const text = 'Hello World!';
      const action = updateComment(url, text);

      expect(action.type).toEqual(UPDATE_COMMENT);

      const apiMock = {
        patch: jest.fn(),
      };
      action.promise(apiMock);

      expect(apiMock.patch).toBeCalledWith(url, {
        data: { text },
      });
    });
  });

  describe('listComments', () => {
    it('should create an action to list comments', () => {
      const url = 'http://localhost';
      const action = listComments(url);

      expect(action.type).toEqual(LIST_COMMENTS);

      const apiMock = {
        get: jest.fn(),
      };
      action.promise(apiMock);

      expect(apiMock.get).toBeCalledWith(`${url}/@comments`);
    });
  });
});
