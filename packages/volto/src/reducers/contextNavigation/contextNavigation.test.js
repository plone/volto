import getContextNavigation from './contextNavigation';
import { GET_CONTEXT_NAVIGATION } from '@plone/volto/constants/ActionTypes';

describe('Context Navigation reducer', () => {
  it('should return the initial state', () => {
    expect(getContextNavigation()).toEqual({});
  });

  it('should handle GET_CONTEXT_NAVIGATION', () => {
    expect(
      getContextNavigation(undefined, {
        url: '/',
        result: {},
        type: `${GET_CONTEXT_NAVIGATION}_PENDING`,
      }),
    ).toEqual({
      '/': {
        error: undefined,
        loaded: false,
        loading: true,
      },
    });
  });

  it('should handle GET_CONTEXT_NAVIGATION_SUCCESS', () => {
    expect(
      getContextNavigation(
        {
          '/': {
            error: undefined,
            loaded: false,
            loading: true,
          },
        },
        {
          type: `${GET_CONTEXT_NAVIGATION}_SUCCESS`,
          url: '/',
          result: {
            '@id': 'http://localhost:8080/Plone/@contextnavigation',
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
          '@id': 'http://localhost:8080/Plone/@contextnavigation',
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

  it('should handle GET_CONTEXT_NAVIGATION_FAIL', () => {
    expect(
      getContextNavigation(undefined, {
        url: '/',
        type: `${GET_CONTEXT_NAVIGATION}_FAIL`,
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
