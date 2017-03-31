import { addContent, deleteContent, editContent, getContent } from './content';
import {
  ADD_CONTENT, ADD_CONTENT_SUCCESS, ADD_CONTENT_FAIL,
  DELETE_CONTENT, DELETE_CONTENT_SUCCESS, DELETE_CONTENT_FAIL,
  EDIT_CONTENT, EDIT_CONTENT_SUCCESS, EDIT_CONTENT_FAIL,
  GET_CONTENT, GET_CONTENT_SUCCESS, GET_CONTENT_FAIL,
} from '../../constants/ActionTypes';

describe('Content action', () => {
  describe('addContent', () => {
    it('should create an action to add content', () => {
      const url = 'http://localhost';
      const content = 'Hello World!';
      const action = addContent(url, content);

      expect(action.types).toEqual([ADD_CONTENT, ADD_CONTENT_SUCCESS, ADD_CONTENT_FAIL]);

      const apiMock = {
        post: jest.fn(),
      };
      action.promise(apiMock);

      expect(apiMock.post).toBeCalledWith(url, { data: content });
    });
  });

  describe('deleteContent', () => {
    it('should create an action to delete content', () => {
      const url = 'http://localhost';
      const action = deleteContent(url);

      expect(action.types).toEqual([DELETE_CONTENT, DELETE_CONTENT_SUCCESS, DELETE_CONTENT_FAIL]);

      const apiMock = {
        del: jest.fn(),
      };
      action.promise(apiMock);

      expect(apiMock.del).toBeCalledWith(url);
    });
  });

  describe('editContent', () => {
    it('should create an action to edit content', () => {
      const url = 'http://localhost';
      const content = 'Hello World!';
      const action = editContent(url, content);

      expect(action.types).toEqual([EDIT_CONTENT, EDIT_CONTENT_SUCCESS, EDIT_CONTENT_FAIL]);

      const apiMock = {
        patch: jest.fn(),
      };
      action.promise(apiMock);

      expect(apiMock.patch).toBeCalledWith(url, { data: content });
    });
  });

  describe('getContent', () => {
    it('should create an action to get content', () => {
      const url = 'http://localhost';
      const action = getContent(url);

      expect(action.types).toEqual([GET_CONTENT, GET_CONTENT_SUCCESS, GET_CONTENT_FAIL]);

      const apiMock = {
        get: jest.fn(),
      };
      action.promise(apiMock);

      expect(apiMock.get).toBeCalledWith(url);
    });
  });
});
