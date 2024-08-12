import { GET_CONTENT, GET_NAVROOT } from '@plone/volto/constants/ActionTypes';
import config from '@plone/volto/registry';
import navroot from './navroot';

const { settings } = config;

describe('Navroot reducer', () => {
  it('should return the initial state', () => {
    expect(navroot()).toEqual({
      error: null,
      data: {},
      loaded: false,
      loading: false,
    });
  });

  it('should handle GET_NAVROOT_PENDING', () => {
    expect(
      navroot(undefined, {
        type: `${GET_NAVROOT}_PENDING`,
      }),
    ).toEqual({
      error: null,
      data: {},
      loaded: false,
      loading: true,
    });
  });

  it('should handle GET_NAVROOT_SUCCESS', () => {
    expect(
      navroot(undefined, {
        type: `${GET_NAVROOT}_SUCCESS`,
        result: {
          title: 'Welcome to Plone!',
          description:
            'Congratulations! You have successfully installed Plone.',
          '@id': `${settings.apiPath}/front-page`,
        },
      }),
    ).toEqual({
      error: null,
      data: {
        '@id': `${settings.apiPath}/front-page`,
        title: 'Welcome to Plone!',
        description: 'Congratulations! You have successfully installed Plone.',
      },

      loaded: true,
      loading: false,
    });
  });

  it('should handle GET_NAVROOT_FAIL', () => {
    expect(
      navroot(undefined, {
        type: `${GET_NAVROOT}_FAIL`,
        error: 'failed',
      }),
    ).toEqual({
      error: undefined,
      data: {},
      loaded: false,
      loading: false,
    });
  });
});

describe('Navroot reducer (NAVROOT)GET_CONTENT', () => {
  beforeEach(() => {
    config.settings.apiExpanders = [
      {
        match: '',
        GET_CONTENT: ['navroot'],
      },
    ];
  });

  it('should handle (NAVROOT)GET_CONTENT_SUCCESS', () => {
    expect(
      navroot(undefined, {
        type: `${GET_CONTENT}_SUCCESS`,
        result: {
          '@components': {
            navroot: {
              navroot: {
                title: 'Welcome to Plone!',
                description:
                  'Congratulations! You have successfully installed Plone.',
                '@id': `${settings.apiPath}/front-page`,
              },
            },
          },
        },
      }),
    ).toEqual({
      error: null,
      data: {
        navroot: {
          '@id': `${settings.apiPath}/front-page`,
          title: 'Welcome to Plone!',
          description:
            'Congratulations! You have successfully installed Plone.',
        },
      },
      loaded: true,
      loading: false,
    });
  });
});
