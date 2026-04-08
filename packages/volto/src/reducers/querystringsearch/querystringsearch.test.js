import querystringsearch from './querystringsearch';
import { GET_QUERYSTRING_RESULTS } from '@plone/volto/constants/ActionTypes';

describe('Querystring reducer', () => {
  it('should return the initial state', () => {
    expect(querystringsearch()).toEqual({
      error: null,
      items: [],
      total: 0,
      loaded: false,
      loading: false,
      batching: {},
      subrequests: {},
    });
  });

  it('should handle GET_QUERYSTRING_RESULTS_PENDING', () => {
    expect(
      querystringsearch(undefined, {
        type: `${GET_QUERYSTRING_RESULTS}_PENDING`,
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

  it('should handle GET_QUERYSTRING_RESULTS_SUCCESS', () => {
    expect(
      querystringsearch(undefined, {
        type: `${GET_QUERYSTRING_RESULTS}_SUCCESS`,
        subrequest: 'my-subrequest',
        result: {
          items_total: 1,
          items: [
            {
              title: 'My content',
              '@id': 'http://my-content',
            },
          ],
        },
      }),
    ).toEqual({
      error: null,
      loaded: false,
      loading: false,
      items: [],
      total: 0,
      batching: {},
      subrequests: {
        'my-subrequest': {
          error: null,
          items: [
            {
              title: 'My content',
              '@id': 'http://my-content',
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

  it('should handle GET_QUERYSTRING_RESULTS_FAIL', () => {
    expect(
      querystringsearch(undefined, {
        type: `${GET_QUERYSTRING_RESULTS}_FAIL`,
        error: 'failed',
      }),
    ).toEqual({
      error: 'failed',
      loaded: false,
      loading: false,
      batching: {},
      subrequests: {},
      items: [],
      total: 0,
    });
  });
});
