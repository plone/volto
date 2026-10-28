import { getQueryStringResults } from './querystringsearch';
import { GET_QUERYSTRING_RESULTS } from '@plone/volto/constants/ActionTypes';

describe('querystringsearch action', () => {
  describe('getQueryStringResults', () => {
    it('should create an action to get the querystring results', () => {
      const data = {
        query: [
          {
            i: 'portal_type',
            o: 'plone.app.querystring.operation.selection.any',
            v: ['Document'],
          },
        ],
      };
      const action = getQueryStringResults('', data);

      expect(action.type).toEqual(GET_QUERYSTRING_RESULTS);
      expect(action.request.op).toEqual('post');
      expect(action.request.path).toEqual('/@querystring-search');
    });
    it('should create an action to get the querystring results with a page', () => {
      const data = {
        query: [
          {
            i: 'portal_type',
            o: 'plone.app.querystring.operation.selection.any',
            v: ['Document'],
          },
        ],
      };
      const action = getQueryStringResults('', data, null, 2);

      expect(action.type).toEqual(GET_QUERYSTRING_RESULTS);
      expect(action.request.op).toEqual('post');
      expect(action.request.path).toEqual('/@querystring-search');
      expect(action.request.data).toEqual({ ...data, b_size: 25, b_start: 25 });
    });
  });
  it('should create an action to get the querystring results - context aware', () => {
    const data = {
      query: [
        {
          i: 'portal_type',
          o: 'plone.app.querystring.operation.selection.any',
          v: ['Document'],
        },
      ],
    };
    const action = getQueryStringResults('/folder1/folder2/object1', data);

    expect(action.type).toEqual(GET_QUERYSTRING_RESULTS);
    expect(action.request.op).toEqual('post');
    expect(action.request.path).toEqual(
      '/folder1/folder2/object1/@querystring-search',
    );
  });
  it('should create an action to get the querystring results fixing sort_order', () => {
    const data = {
      query: [
        {
          i: 'portal_type',
          o: 'plone.app.querystring.operation.selection.any',
          v: ['Document'],
        },
      ],
      sort_order: true,
    };
    const action = getQueryStringResults('', data);

    expect(action.type).toEqual(GET_QUERYSTRING_RESULTS);
    expect(action.request.op).toEqual('post');
    expect(action.request.path).toEqual('/@querystring-search');
    expect(action.request.data.sort_order).toEqual('descending');
  });

  describe('depth handling', () => {
    it('appends depth to path value when depth is set and path has no embedded depth', () => {
      const data = {
        query: [
          {
            i: 'path',
            o: 'plone.app.querystring.operation.string.path',
            v: '/folder',
          },
        ],
        depth: 2,
      };
      const action = getQueryStringResults('', data);

      const pathQuery = action.request.data.query.find((q) => q.i === 'path');
      expect(pathQuery.v).toEqual('/folder::2');
    });

    it('does not double-append depth when path value already contains an embedded depth', () => {
      const data = {
        query: [
          {
            i: 'path',
            o: 'plone.app.querystring.operation.string.path',
            v: '/folder::1',
          },
        ],
        depth: 3,
      };
      const action = getQueryStringResults('', data);

      const pathQuery = action.request.data.query.find((q) => q.i === 'path');
      expect(pathQuery.v).toEqual('/folder::1');
    });

    it('removes depth from the top-level request data', () => {
      const data = {
        query: [
          {
            i: 'path',
            o: 'plone.app.querystring.operation.string.path',
            v: '/folder',
          },
        ],
        depth: 2,
      };
      const action = getQueryStringResults('', data);

      expect(action.request.data.depth).toBeUndefined();
    });

    it('handles mixed path entries: appends depth only to those without embedded depth', () => {
      const data = {
        query: [
          {
            i: 'path',
            o: 'plone.app.querystring.operation.string.path',
            v: '/folder-a',
          },
          {
            i: 'path',
            o: 'plone.app.querystring.operation.string.path',
            v: '/folder-b::5',
          },
        ],
        depth: 2,
      };
      const action = getQueryStringResults('', data);

      const [pathA, pathB] = action.request.data.query.filter(
        (q) => q.i === 'path',
      );
      expect(pathA.v).toEqual('/folder-a::2');
      expect(pathB.v).toEqual('/folder-b::5');
    });
  });
});
