import config from '~/config';
import breadcrumbs from './breadcrumbs';
import { GET_BREADCRUMBS } from '../../constants/ActionTypes';

describe('Breadcrumbs reducer', () => {
  it('should return the initial state', () => {
    expect(breadcrumbs()).toEqual({
      error: null,
      items: [],
      loaded: false,
      loading: false,
    });
  });

  it('should handle GET_BREADCRUMBS_PENDING', () => {
    expect(
      breadcrumbs(undefined, {
        type: `${GET_BREADCRUMBS}_PENDING`,
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
        type: `${GET_BREADCRUMBS}_SUCCESS`,
        result: {
          items: [
            {
              title: 'Welcome to Plone!',
              '@id': `${config.apiPath}/front-page`,
            },
          ],
        },
      }),
    ).toEqual({
      error: null,
      items: [
        {
          title: 'Welcome to Plone!',
          url: '/front-page',
        },
      ],
      loaded: true,
      loading: false,
    });
  });

  it('should handle GET_BREADCRUMBS_FAIL', () => {
    expect(
      breadcrumbs(undefined, {
        type: `${GET_BREADCRUMBS}_FAIL`,
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
