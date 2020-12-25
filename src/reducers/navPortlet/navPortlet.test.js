import navPortlet from './navPortlet';
import { GET_NAVPORTLET } from '@plone/volto/constants/ActionTypes';

describe('Navigation Portlet reducer', () => {
  it('should return the initial state', () => {
    expect(navPortlet()).toEqual({});
  });

  it('should handle GET_NAVPORTLET_PENDING', () => {
    expect(
      navPortlet(undefined, {
        url: '/',
        result: {},
        type: `${GET_NAVPORTLET}_PENDING`,
      }),
    ).toEqual({
      '/': {
        error: undefined,
        loaded: false,
        loading: true,
      },
    });
  });

  it('should handle GET_NAVPORTLET_SUCCESS', () => {
    expect(
      navPortlet(
        {
          '/': {
            error: undefined,
            loaded: false,
            loading: true,
          },
        },
        {
          type: `${GET_NAVPORTLET}_SUCCESS`,
          url: '/',
          result: {
            '@id': 'http://localhost:8080/Plone/@navportlet',
            title: 'Navigation',
            items: [
              {
                title: 'Welcome to Plone!',
                url: '/front-page',
              },
            ],
          },
        },
      ),
    ).toEqual({
      '/': {
        data: {
          '@id': 'http://localhost:8080/Plone/@navportlet',
          title: 'Navigation',
          items: [
            {
              title: 'Welcome to Plone!',
              url: '/front-page',
            },
          ],
        },
        error: undefined,
        loaded: true,
        loading: false,
      },
    });
  });

  it('should handle GET_NAVIGATION_FAIL', () => {
    expect(
      navPortlet(undefined, {
        url: '/',
        type: `${GET_NAVPORTLET}_FAIL`,
        error: 'failed',
      }),
    ).toEqual({
      '/': {
        error: 'failed',
        loaded: false,
        loading: false,
      },
    });
  });
});
