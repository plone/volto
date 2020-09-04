import {
  createContent,
  deleteContent,
  updateContent,
  getContent,
  orderContent,
  resetContent,
  sortContent,
} from './content';
import {
  CREATE_CONTENT,
  DELETE_CONTENT,
  UPDATE_CONTENT,
  GET_CONTENT,
  ORDER_CONTENT,
  RESET_CONTENT,
} from '@plone/volto/constants/ActionTypes';

describe('Content action', () => {
  describe('createContent', () => {
    it('should create an action to add content', () => {
      const url = 'http://localhost';
      const content = 'Hello World!';
      const action = createContent(url, content);

      expect(action.type).toEqual(CREATE_CONTENT);
      expect(action.request.op).toEqual('post');
      expect(action.request.path).toEqual(url);
      expect(action.request.data).toEqual(content);
    });

    it('should create an action to add content for multiple objects', () => {
      const url = 'http://localhost';
      const content = ['Hello World!', 'Hello World2!'];
      const action = createContent(url, content);

      expect(action.type).toEqual(CREATE_CONTENT);
      expect(action.request[0].op).toEqual('post');
      expect(action.request[0].path).toEqual(url);
      expect(action.request[0].data).toEqual(content[0]);
      expect(action.request[1].op).toEqual('post');
      expect(action.request[1].path).toEqual(url);
      expect(action.request[1].data).toEqual(content[1]);
    });
  });

  describe('deleteContent', () => {
    it('should create an action to delete content', () => {
      const url = 'http://localhost';
      const action = deleteContent(url);

      expect(action.type).toEqual(DELETE_CONTENT);
      expect(action.request.op).toEqual('del');
      expect(action.request.path).toEqual(url);
    });

    it('should create an action to delete content for multiple urls', () => {
      const urls = ['http://localhost/blog', 'http://locahost/users'];
      const action = deleteContent(urls);

      expect(action.type).toEqual(DELETE_CONTENT);
      expect(action.request[0].op).toEqual('del');
      expect(action.request[0].path).toEqual(urls[0]);
      expect(action.request[1].op).toEqual('del');
      expect(action.request[1].path).toEqual(urls[1]);
    });
  });

  describe('updateContent', () => {
    it('should create an action to update content', () => {
      const url = 'http://localhost';
      const content = 'Hello World!';
      const action = updateContent(url, content);

      expect(action.type).toEqual(UPDATE_CONTENT);
      expect(action.request.op).toEqual('patch');
      expect(action.request.path).toEqual(url);
      expect(action.request.data).toEqual(content);
    });

    it('should create an action to update content for multiple urls', () => {
      const urls = ['http://localhost/blog', 'http://locahost/users'];
      const content = ['Hello World!', 'Hello World2!'];
      const action = updateContent(urls, content);

      expect(action.type).toEqual(UPDATE_CONTENT);
      expect(action.request[0].op).toEqual('patch');
      expect(action.request[0].path).toEqual(urls[0]);
      expect(action.request[0].data).toEqual(content[0]);
      expect(action.request[1].op).toEqual('patch');
      expect(action.request[1].path).toEqual(urls[1]);
      expect(action.request[1].data).toEqual(content[1]);
    });
  });

  describe('orderContent', () => {
    it('should create an action to order content', () => {
      const parent = '/blog';
      const url = '/blog/my-post';
      const delta = 1;
      const subset = [];
      const action = orderContent(parent, url, delta, subset);

      expect(action.type).toEqual(ORDER_CONTENT);
      expect(action.request.op).toEqual('patch');
      expect(action.request.path).toEqual(parent);
      expect(action.request.data).toEqual({
        ordering: {
          obj_id: url,
          delta,
          subset_ids: subset,
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

      expect(action.type).toEqual(UPDATE_CONTENT);
      expect(action.request.op).toEqual('patch');
      expect(action.request.path).toEqual(url);
      expect(action.request.data).toEqual({
        sort: {
          on,
          order,
        },
      });
    });
  });

  describe('getContent', () => {
    it('should create an action to get content', () => {
      const url = 'http://localhost';
      const action = getContent(url);

      expect(action.type).toEqual(GET_CONTENT);
      expect(action.request.op).toEqual('get');
      expect(action.request.path).toEqual(`${url}?fullobjects`);
    });

    it('should create an action to get content with version', () => {
      const url = 'http://localhost';
      const version = '0';
      const action = getContent(url, version);

      expect(action.type).toEqual(GET_CONTENT);
      expect(action.request.op).toEqual('get');
      expect(action.request.path).toEqual(
        `${url}/@history/${version}?fullobjects`,
      );
    });

    it('should create an action to get content with a subrequest', () => {
      const url = 'http://localhost';
      const action = getContent(url, null, 'my-subrequest');

      expect(action.type).toEqual(GET_CONTENT);
      expect(action.subrequest).toEqual('my-subrequest');
      expect(action.request.op).toEqual('get');
      expect(action.request.path).toEqual(`${url}?fullobjects`);
    });

    it('should create an action to get content with a pagination page', () => {
      const url = 'http://localhost';
      const action = getContent(url, null, null, 2);

      expect(action.type).toEqual(GET_CONTENT);
      expect(action.request.op).toEqual('get');
      expect(action.request.path).toEqual(
        `${url}?fullobjects&b_start=25&b_size=25`,
      );
    });
  });

  describe('resetContent', () => {
    it('should create an action to reset content', () => {
      const action = resetContent();

      expect(action.type).toEqual(RESET_CONTENT);
    });

    it('should create an action to reset content with a subrequest', () => {
      const action = resetContent('my-subrequest');

      expect(action.type).toEqual(RESET_CONTENT);
      expect(action.subrequest).toEqual('my-subrequest');
    });
  });

  describe('createContent', () => {
    it('should create an action to add content in a subrequest', () => {
      const url = 'http://localhost';
      const content = 'Hello World!';
      const action = createContent(url, content, '1234');

      expect(action.type).toEqual(CREATE_CONTENT);
      expect(action.request.op).toEqual('post');
      expect(action.request.path).toEqual(url);
      expect(action.request.data).toEqual(content);
    });

    it('should create an action to add content for multiple objects in a subrequest', () => {
      const url = 'http://localhost';
      const content = ['Hello World!', 'Hello World2!'];
      const action = createContent(url, content, '1234');

      expect(action.type).toEqual(CREATE_CONTENT);
      expect(action.request[0].op).toEqual('post');
      expect(action.request[0].path).toEqual(url);
      expect(action.request[0].data).toEqual(content[0]);
      expect(action.request[1].op).toEqual('post');
      expect(action.request[1].path).toEqual(url);
      expect(action.request[1].data).toEqual(content[1]);
    });
  });
});
