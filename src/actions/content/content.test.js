import {
  addContent,
  deleteContent,
  editContent,
  getContent,
  orderContent,
  sortContent,
} from './content';
import {
  ADD_CONTENT,
  DELETE_CONTENT,
  EDIT_CONTENT,
  GET_CONTENT,
} from '../../constants/ActionTypes';

describe('Content action', () => {
  describe('addContent', () => {
    it('should create an action to add content', () => {
      const url = 'http://localhost';
      const content = 'Hello World!';
      const action = addContent(url, content);

      expect(action.type).toEqual(ADD_CONTENT);

      const apiMock = {
        post: jest.fn(),
      };
      action.promise(apiMock);

      expect(apiMock.post).toBeCalledWith(url, { data: content });
    });

    it('should create an action to add content for multiple objects', () => {
      const url = 'http://localhost';
      const content = ['Hello World!', 'Hello World2!'];
      const action = addContent(url, content);

      expect(action.type).toEqual(ADD_CONTENT);

      const apiMock = {
        post: jest.fn(),
      };
      action.promise(apiMock);

      expect(apiMock.post).toBeCalledWith(url, { data: content[0] });
      expect(apiMock.post).toBeCalledWith(url, { data: content[1] });
    });
  });

  describe('deleteContent', () => {
    it('should create an action to delete content', () => {
      const url = 'http://localhost';
      const action = deleteContent(url);

      expect(action.type).toEqual(DELETE_CONTENT);

      const apiMock = {
        del: jest.fn(),
      };
      action.promise(apiMock);

      expect(apiMock.del).toBeCalledWith(url);
    });

    it('should create an action to delete content for multiple urls', () => {
      const urls = ['http://localhost/blog', 'http://locahost/users'];
      const action = deleteContent(urls);

      expect(action.type).toEqual(DELETE_CONTENT);

      const apiMock = {
        del: jest.fn(),
      };
      action.promise(apiMock);

      expect(apiMock.del).toBeCalledWith(urls[0]);
      expect(apiMock.del).toBeCalledWith(urls[1]);
    });
  });

  describe('editContent', () => {
    it('should create an action to edit content', () => {
      const url = 'http://localhost';
      const content = 'Hello World!';
      const action = editContent(url, content);

      expect(action.type).toEqual(EDIT_CONTENT);

      const apiMock = {
        patch: jest.fn(),
      };
      action.promise(apiMock);

      expect(apiMock.patch).toBeCalledWith(url, { data: content });
    });

    it('should create an action to edit content for multiple urls', () => {
      const urls = ['http://localhost/blog', 'http://locahost/users'];
      const content = ['Hello World!', 'Hello World2!'];
      const action = editContent(urls, content);

      expect(action.type).toEqual(EDIT_CONTENT);

      const apiMock = {
        patch: jest.fn(),
      };
      action.promise(apiMock);

      expect(apiMock.patch).toBeCalledWith(urls[0], { data: content[0] });
      expect(apiMock.patch).toBeCalledWith(urls[1], { data: content[1] });
    });
  });

  describe('orderContent', () => {
    it('should create an action to order content', () => {
      const parent = '/blog';
      const url = '/blog/my-post';
      const delta = 1;
      const subset = [];
      const action = orderContent(parent, url, delta, subset);

      expect(action.type).toEqual(EDIT_CONTENT);

      const apiMock = {
        patch: jest.fn(),
      };
      action.promise(apiMock);

      expect(apiMock.patch).toBeCalledWith(parent, {
        data: {
          ordering: {
            obj_id: url,
            delta,
            subset_ids: subset,
          },
        },
      });
    });
  });

  describe('sortContent', () => {
    it('should create an action to sort content', () => {
      const url = '/blog';
      const on = 'id';
      const order = 'ascending';
      const action = sortContent(url, on, order);

      expect(action.type).toEqual(EDIT_CONTENT);

      const apiMock = {
        patch: jest.fn(),
      };
      action.promise(apiMock);

      expect(apiMock.patch).toBeCalledWith(url, {
        data: {
          sort: {
            on,
            order,
          },
        },
      });
    });
  });

  describe('getContent', () => {
    it('should create an action to get content', () => {
      const url = 'http://localhost';
      const action = getContent(url);

      expect(action.type).toEqual(GET_CONTENT);

      const apiMock = {
        get: jest.fn(),
      };
      action.promise(apiMock);

      expect(apiMock.get).toBeCalledWith(url);
    });

    it('should create an action to get content with version', () => {
      const url = 'http://localhost';
      const versionId = '0';
      const action = getContent(url, versionId);

      expect(action.type).toEqual(GET_CONTENT);

      const apiMock = {
        get: jest.fn(),
      };
      action.promise(apiMock);

      expect(apiMock.get).toBeCalledWith(`${url}?version_id=${versionId}`);
    });
  });
});
