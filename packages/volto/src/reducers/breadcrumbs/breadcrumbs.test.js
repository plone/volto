import config from '@plone/volto/registry';
import breadcrumbs from './breadcrumbs';
import {
  GET_BREADCRUMBS,
  GET_CONTENT,
} from '@plone/volto/constants/ActionTypes';

const { settings } = config;

describe('Breadcrumbs reducer', () => {
  it('should return the initial state', () => {
    expect(breadcrumbs()).toEqual({
      error: null,
      items: [],
      root: null,
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
      root: null,
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
              '@id': `${settings.apiPath}/front-page`,
            },
          ],
          root: settings.apiPath,
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
      root: '',
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
      root: null,
      loaded: false,
      loading: false,
    });
  });
});

describe('Breadcrumbs reducer - (BREADCRUMBS)GET_CONTENT', () => {
  beforeEach(() => {
    config.settings.apiExpanders = [
      {
        match: '',
        GET_CONTENT: ['breadcrumbs'],
      },
    ];
  });

  it('should handle (BREADCRUMBS)GET_CONTENT_SUCCESS', () => {
    expect(
      breadcrumbs(undefined, {
        type: `${GET_CONTENT}_SUCCESS`,
        result: {
          '@components': {
            breadcrumbs: {
              items: [
                {
                  title: 'Welcome to Plone!',
                  '@id': `${settings.apiPath}/front-page`,
                },
              ],
              root: settings.apiPath,
            },
          },
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
      root: '',
      loaded: true,
      loading: false,
    });
  });
});
