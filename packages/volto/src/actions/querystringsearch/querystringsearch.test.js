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

  describe('offset', () => {
    const data = {
      query: [
        {
          i: 'portal_type',
          o: 'plone.app.querystring.operation.selection.any',
          v: ['Document'],
        },
      ],
    };

    it('skips the leading items on the first page', () => {
      const action = getQueryStringResults(
        '',
        { ...data, b_size: 10, offset: 3 },
        'sub',
        1,
      );

      expect(action.request.data).toMatchObject({ b_start: 3 });
    });

    it('stays applied while paginating', () => {
      const action = getQueryStringResults(
        '',
        { ...data, b_size: 10, offset: 3 },
        'sub',
        2,
      );

      expect(action.request.data).toMatchObject({ b_start: 13 });
    });

    it('tolerates an offset stored as a string by the widget', () => {
      const action = getQueryStringResults(
        '',
        { ...data, b_size: 10, offset: '3' },
        'sub',
        2,
      );

      expect(action.request.data).toMatchObject({ b_start: 13 });
    });

    it('applies the offset even when no page is requested', () => {
      const action = getQueryStringResults('', { ...data, offset: 4 }, 'sub');

      expect(action.request.data.b_start).toEqual(4);
    });

    it('raises the limit by the offset so the listing still gets its items', () => {
      const action = getQueryStringResults(
        '',
        { ...data, b_size: 10, offset: 3, limit: 10 },
        'sub',
        1,
      );

      expect(action.request.data.limit).toEqual(13);
    });

    // plone.app.querystring's querybuilder only applies limit when truthy, so
    // a zero limit must reach the backend untouched rather than being raised
    // to the offset, which would cap the batch at the skipped items.
    it('keeps a zero limit meaning no limit', () => {
      const action = getQueryStringResults(
        '',
        { ...data, b_size: 10, offset: 3, limit: 0 },
        'sub',
        1,
      );

      expect(action.request.data.limit).toEqual(0);
    });

    it('leaves the request untouched when nothing is skipped', () => {
      const withoutOffset = getQueryStringResults(
        '',
        { ...data, b_size: 10, limit: 5 },
        'sub',
        2,
      );
      const withZeroOffset = getQueryStringResults(
        '',
        { ...data, b_size: 10, limit: 5, offset: 0 },
        'sub',
        2,
      );

      expect(withoutOffset.request.data).toMatchObject({
        b_start: 10,
        limit: 5,
      });
      expect(withZeroOffset.request.data).toEqual({
        ...withoutOffset.request.data,
        offset: 0,
      });
    });

    it('sends no b_start when there is neither a page nor an offset', () => {
      const action = getQueryStringResults('', data);

      expect(action.request.data.b_start).toBeUndefined();
      expect(JSON.stringify(action.request.data)).not.toContain('b_start');
    });
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
