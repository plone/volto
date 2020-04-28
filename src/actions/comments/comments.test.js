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
} from '@plone/volto/constants/ActionTypes';

describe('Comments action', () => {
  describe('addComment', () => {
    it('should create an action to add a comment', () => {
      const url = 'http://localhost';
      const text = 'Hello World!';
      const action = addComment(url, text);

      expect(action.type).toEqual(ADD_COMMENT);
      expect(action.request.op).toEqual('post');
      expect(action.request.path).toEqual(`${url}/@comments`);
      expect(action.request.data).toEqual({ text });
    });
  });

  describe('deleteComment', () => {
    it('should create an action to delete a comment', () => {
      const url = 'http://localhost';
      const action = deleteComment(url);

      expect(action.type).toEqual(DELETE_COMMENT);
      expect(action.request.op).toEqual('del');
      expect(action.request.path).toEqual(url);
    });
  });

  describe('updateComment', () => {
    it('should create an action to update a comment', () => {
      const url = 'http://localhost';
      const text = 'Hello World!';
      const action = updateComment(url, text);

      expect(action.type).toEqual(UPDATE_COMMENT);
      expect(action.request.op).toEqual('patch');
      expect(action.request.path).toEqual(url);
      expect(action.request.data).toEqual({ text });
    });
  });

  describe('listComments', () => {
    it('should create an action to list comments', () => {
      const url = 'http://localhost';
      const action = listComments(url);

      expect(action.type).toEqual(LIST_COMMENTS);
      expect(action.request.op).toEqual('get');
      expect(action.request.path).toEqual(`${url}/@comments`);
    });
  });
});
