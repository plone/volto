import config from '@plone/volto/registry';
import search from './search';
import {
  RESET_SEARCH_CONTENT,
  SEARCH_CONTENT,
} from '@plone/volto/constants/ActionTypes';

const { settings } = config;
describe('Search reducer', () => {
  it('should return the initial state', () => {
    expect(search()).toEqual({
      error: null,
      items: [],
      total: 0,
      loaded: false,
      loading: false,
      batching: {},
      subrequests: {},
    });
  });

  it('should handle SEARCH_CONTENT_PENDING', () => {
    expect(
      search(undefined, {
        type: `${SEARCH_CONTENT}_PENDING`,
      }),
    ).toEqual({
      error: null,
      items: [],
      total: 0,
      loaded: false,
      loading: true,
      batching: {},
      subrequests: {},
    });
  });

  it('should handle SEARCH_CONTENT_SUCCESS', () => {
    expect(
      search(undefined, {
        type: `${SEARCH_CONTENT}_SUCCESS`,
        result: {
          items: [
            {
              title: 'Welcome to Plone!',
              '@id': `${settings.apiPath}/front-page`,
            },
          ],
          items_total: 1,
          batching: {},
        },
      }),
    ).toEqual({
      error: null,
      items: [
        {
          title: 'Welcome to Plone!',
          '@id': '/front-page',
        },
      ],
      total: 1,
      loaded: true,
      loading: false,
      batching: {},
      subrequests: {},
    });
  });

  it('should handle SEARCH_CONTENT_FAIL', () => {
    expect(
      search(undefined, {
        type: `${SEARCH_CONTENT}_FAIL`,
        error: 'failed',
      }),
    ).toEqual({
      error: 'failed',
      items: [],
      total: 0,
      loaded: false,
      loading: false,
      batching: {},
      subrequests: {},
    });
  });

  it('should handle RESET_SEARCH_CONTENT', () => {
    expect(
      search(undefined, {
        type: RESET_SEARCH_CONTENT,
      }),
    ).toEqual({
      error: null,
      items: [],
      total: 0,
      loaded: false,
      loading: false,
      batching: {},
      subrequests: {},
    });
  });

  it('should handle subrequest SEARCH_CONTENT_PENDING', () => {
    expect(
      search(undefined, {
        type: `${SEARCH_CONTENT}_PENDING`,
        subrequest: 'my-subrequest',
      }),
    ).toEqual({
      error: null,
      items: [],
      total: 0,
      loaded: false,
      loading: false,
      batching: {},
      subrequests: {
        'my-subrequest': {
          error: null,
          items: [],
          total: 0,
          loaded: false,
          loading: true,
          batching: {},
        },
      },
    });
  });

  it('should handle subrequest SEARCH_CONTENT_SUCCESS', () => {
    expect(
      search(
        {
          subrequests: {
            'my-subrequest': {
              error: null,
              items: [],
              total: 0,
              loaded: false,
              loading: true,
              batching: {},
            },
          },
        },
        {
          type: `${SEARCH_CONTENT}_SUCCESS`,
          subrequest: 'my-subrequest',
          result: {
            items: [
              {
                title: 'Welcome to Plone!',
                '@id': `${settings.apiPath}/front-page`,
              },
            ],
            items_total: 1,
            batching: {},
          },
        },
      ),
    ).toEqual({
      subrequests: {
        'my-subrequest': {
          error: null,
          items: [
            {
              title: 'Welcome to Plone!',
              '@id': '/front-page',
            },
          ],
          total: 1,
          loaded: true,
          loading: false,
          batching: {},
        },
      },
    });
  });

  it('should handle subrequest SEARCH_CONTENT_FAIL', () => {
    expect(
      search(
        {
          subrequests: {
            'my-subrequest': {
              error: null,
              items: [],
              total: 0,
              loaded: false,
              loading: true,
              batching: {},
            },
          },
        },
        {
          type: `${SEARCH_CONTENT}_FAIL`,
          subrequest: 'my-subrequest',
          error: 'failed',
        },
      ),
    ).toEqual({
      subrequests: {
        'my-subrequest': {
          error: 'failed',
          items: [],
          total: 0,
          loaded: false,
          loading: false,
          batching: {},
        },
      },
    });
  });

  it('should handle subrequest RESET_SEARCH_CONTENT', () => {
    expect(
      search(
        {
          subrequests: {
            'my-subrequest': {
              error: null,
              items: ['random'],
              total: 1,
              loaded: true,
              loading: false,
              batching: {},
            },
          },
        },
        {
          type: RESET_SEARCH_CONTENT,
          subrequest: 'my-subrequest',
        },
      ),
    ).toEqual({
      subrequests: {},
    });
  });
});
