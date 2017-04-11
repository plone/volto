import search from './search';
import {
  SEARCH_CONTENT_PENDING,
  SEARCH_CONTENT_SUCCESS,
  SEARCH_CONTENT_FAIL,
} from '../../constants/ActionTypes';
import config from '../../config';

describe('Search reducer', () => {
  it('should return the initial state', () => {
    expect(
      search(),
    ).toEqual({
      error: null,
      items: [],
      loaded: false,
      loading: false,
    });
  });

  it('should handle SEARCH_CONTENT_PENDING', () => {
    expect(
      search(undefined, {
        type: SEARCH_CONTENT_PENDING,
      }),
    ).toEqual({
      error: null,
      items: [],
      loaded: false,
      loading: true,
    });
  });

  it('should handle SEARCH_CONTENT_SUCCESS', () => {
    expect(
      search(undefined, {
        type: SEARCH_CONTENT_SUCCESS,
        result: {
          items: [{
            title: 'Welcome to Plone!',
            '@id': `${config.apiPath}/front-page`,
          }],
        },
      }),
    ).toEqual({
      error: null,
      items: [{
        title: 'Welcome to Plone!',
        '@id': '/front-page',
      }],
      loaded: true,
      loading: false,
    });
  });

  it('should handle SEARCH_CONTENT_FAIL', () => {
    expect(
      search(undefined, {
        type: SEARCH_CONTENT_FAIL,
        error: 'failed',
      }),
    ).toEqual({
      error: 'failed',
      items: [],
      loaded: false,
      loading: false,
    });
  });
});
