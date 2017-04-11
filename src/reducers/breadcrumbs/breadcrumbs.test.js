import breadcrumbs from './breadcrumbs';
import {
  GET_BREADCRUMBS_PENDING,
  GET_BREADCRUMBS_SUCCESS,
  GET_BREADCRUMBS_FAIL,
} from '../../constants/ActionTypes';
import config from '../../config';

describe('Breadcrumbs reducer', () => {
  it('should return the initial state', () => {
    expect(
      breadcrumbs(),
    ).toEqual({
      error: null,
      items: [],
      loaded: false,
      loading: false,
    });
  });

  it('should handle GET_BREADCRUMBS_PENDING', () => {
    expect(
      breadcrumbs(undefined, {
        type: GET_BREADCRUMBS_PENDING,
      }),
    ).toEqual({
      error: null,
      items: [],
      loaded: false,
      loading: true,
    });
  });

  it('should handle GET_BREADCRUMBS_SUCCESS', () => {
    expect(
      breadcrumbs(undefined, {
        type: GET_BREADCRUMBS_SUCCESS,
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

  it('should handle GET_BREADCRUMBS_FAIL', () => {
    expect(
      breadcrumbs(undefined, {
        type: GET_BREADCRUMBS_FAIL,
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
