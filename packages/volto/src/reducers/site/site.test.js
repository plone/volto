import { GET_SITE } from '@plone/volto/constants/ActionTypes';
import config from '@plone/volto/registry';
import site from './site';

const { settings } = config;

describe('Site reducer', () => {
  it('should return the initial state', () => {
    expect(site()).toEqual({
      error: null,
      data: {},
      loaded: false,
      loading: false,
    });
  });

  it('should handle GET_SITE_PENDING', () => {
    expect(
      site(undefined, {
        type: `${GET_SITE}_PENDING`,
      }),
    ).toEqual({
      error: null,
      data: {},
      loaded: false,
      loading: true,
    });
  });

  it('should handle GET_SITE_SUCCESS', () => {
    expect(
      site(undefined, {
        type: `${GET_SITE}_SUCCESS`,
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

  it('should handle GET_SITE_FAIL', () => {
    expect(
      site(undefined, {
        type: `${GET_SITE}_FAIL`,
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
