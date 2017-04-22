import search from './search';
import { SEARCH_CONTENT } from '../../constants/ActionTypes';
import config from '../../config';

describe('Search reducer', () => {
  it('should return the initial state', () => {
    expect(search()).toEqual({
      error: null,
      items: [],
      total: 0,
      loaded: false,
      loading: false,
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
              '@id': `${config.apiPath}/front-page`,
            },
          ],
          items_total: 1,
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
    });
  });
});
