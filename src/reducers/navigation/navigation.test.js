import navigation from './navigation';
import {
  GET_NAVIGATION_PENDING,
  GET_NAVIGATION_SUCCESS,
  GET_NAVIGATION_FAIL,
} from '../../constants/ActionTypes';
import config from '../../config';

describe('Navigation reducer', () => {
  it('should return the initial state', () => {
    expect(
      navigation(),
    ).toEqual({
      error: null,
      items: [],
      loaded: false,
      loading: false,
    });
  });

  it('should handle GET_NAVIGATION_PENDING', () => {
    expect(
      navigation(undefined, {
        type: GET_NAVIGATION_PENDING,
      }),
    ).toEqual({
      error: null,
      items: [],
      loaded: false,
      loading: true,
    });
  });

  it('should handle GET_NAVIGATION_SUCCESS', () => {
    expect(
      navigation(undefined, {
        type: GET_NAVIGATION_SUCCESS,
        result: [{
          items: [{
            title: 'Welcome to Plone!',
            url: `${config.apiPath}/front-page`,
          }],
        }],
      }),
    ).toEqual({
      error: null,
      items: [{
        title: 'Welcome to Plone!',
        url: '/front-page',
      }],
      loaded: true,
      loading: false,
    });
  });

  it('should handle GET_NAVIGATION_FAIL', () => {
    expect(
      navigation(undefined, {
        type: GET_NAVIGATION_FAIL,
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
