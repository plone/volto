import {
  GET_CONTENT,
  GET_NAVIGATION,
  LOGOUT,
} from '@plone/volto/constants/ActionTypes';
import config from '@plone/volto/registry';
import navigation from './navigation';

const { settings } = config;

describe('Navigation reducer', () => {
  it('should return the initial state', () => {
    expect(navigation()).toEqual({
      error: null,
      items: [],
      loaded: false,
      loading: false,
    });
  });

  it('should handle GET_NAVIGATION_PENDING', () => {
    expect(
      navigation(undefined, {
        type: `${GET_NAVIGATION}_PENDING`,
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
        type: `${GET_NAVIGATION}_SUCCESS`,
        result: {
          items: [
            {
              title: 'Welcome to Plone!',
              description:
                'Congratulations! You have successfully installed Plone.',
              '@id': `${settings.apiPath}/front-page`,
            },
          ],
        },
      }),
    ).toEqual({
      error: null,
      items: [
        {
          '@id': 'http://localhost:8080/Plone/front-page',
          title: 'Welcome to Plone!',
          description:
            'Congratulations! You have successfully installed Plone.',
          url: '/front-page',
        },
      ],
      loaded: true,
      loading: false,
    });
  });

  it('should handle GET_NAVIGATION_SUCCESS with navigation depth', () => {
    expect(
      navigation(undefined, {
        type: `${GET_NAVIGATION}_SUCCESS`,
        result: {
          items: [
            {
              title: 'Welcome to Plone!',
              description:
                'Congratulations! You have successfully installed Plone.',
              '@id': `${settings.apiPath}/front-page`,
            },
            {
              title: 'Folder1',
              description: 'Folder description',
              '@id': `${settings.apiPath}/folder1`,
              items: [
                {
                  title: 'FolderInFolder1',
                  description: 'Sub-folder description',
                  '@id': `${settings.apiPath}/folderinfolder1`,
                },
              ],
            },
          ],
        },
      }),
    ).toEqual({
      error: null,
      items: [
        {
          '@id': 'http://localhost:8080/Plone/front-page',
          title: 'Welcome to Plone!',
          description:
            'Congratulations! You have successfully installed Plone.',
          url: '/front-page',
        },
        {
          '@id': 'http://localhost:8080/Plone/folder1',
          title: 'Folder1',
          description: 'Folder description',
          url: '/folder1',
          items: [
            {
              '@id': 'http://localhost:8080/Plone/folderinfolder1',
              title: 'FolderInFolder1',
              description: 'Sub-folder description',
              url: '/folderinfolder1',
            },
          ],
        },
      ],
      loaded: true,
      loading: false,
    });
  });

  it('should handle GET_NAVIGATION_FAIL', () => {
    expect(
      navigation(undefined, {
        type: `${GET_NAVIGATION}_FAIL`,
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

describe('Navigation reducer (NAVIGATION)GET_CONTENT', () => {
  beforeEach(() => {
    config.settings.apiExpanders = [
      {
        match: '',
        GET_CONTENT: ['navigation'],
      },
    ];
  });

  it('should handle (NAVIGATION)GET_CONTENT_SUCCESS', () => {
    expect(
      navigation(undefined, {
        type: `${GET_CONTENT}_SUCCESS`,
        result: {
          '@components': {
            navigation: {
              items: [
                {
                  title: 'Welcome to Plone!',
                  description:
                    'Congratulations! You have successfully installed Plone.',
                  '@id': `${settings.apiPath}/front-page`,
                },
              ],
            },
          },
        },
      }),
    ).toEqual({
      error: null,
      items: [
        {
          '@id': 'http://localhost:8080/Plone/front-page',
          title: 'Welcome to Plone!',
          description:
            'Congratulations! You have successfully installed Plone.',
          url: '/front-page',
        },
      ],
      loaded: true,
      loading: false,
    });
  });

  it('should handle (NAVIGATION)GET_NAVIGATION_SUCCESS (standalone with apiExpander enabled)', () => {
    expect(
      navigation(undefined, {
        type: `${GET_NAVIGATION}_SUCCESS`,
        result: {
          items: [
            {
              title: 'Welcome to Plone!',
              description:
                'Congratulations! You have successfully installed Plone.',
              '@id': `${settings.apiPath}/front-page`,
            },
          ],
        },
      }),
    ).toEqual({
      error: null,
      items: [
        {
          '@id': 'http://localhost:8080/Plone/front-page',
          title: 'Welcome to Plone!',
          description:
            'Congratulations! You have successfully installed Plone.',
          url: '/front-page',
        },
      ],
      loaded: true,
      loading: false,
    });
  });
});

describe('Navigation reducer on logout', () => {
  let apiExpanders;

  beforeEach(() => {
    apiExpanders = config.settings.apiExpanders;
    config.settings.apiExpanders = [{ match: '', GET_CONTENT: ['navigation'] }];
  });

  afterEach(() => {
    config.settings.apiExpanders = apiExpanders;
  });

  const getAuthenticatedState = () =>
    navigation(undefined, {
      type: `${GET_CONTENT}_SUCCESS`,
      result: {
        '@id': '/private',
        '@components': {
          navigation: { items: [{ '@id': '/private', title: 'Private page' }] },
        },
      },
    });

  it.each(['SUCCESS', 'FAIL'])(
    'should clear authenticated data on LOGOUT_%s even when the landing page returns 401',
    (status) => {
      const authenticatedState = getAuthenticatedState();
      expect(authenticatedState.loaded).toBe(true);

      const loggedOutState = navigation(authenticatedState, {
        type: `${LOGOUT}_${status}`,
      });
      expect(loggedOutState).toEqual(navigation());
      expect(
        navigation(loggedOutState, {
          type: `${GET_CONTENT}_FAIL`,
          error: { status: 401 },
        }),
      ).toEqual(navigation());
    },
  );

  it.each(['SUCCESS', 'FAIL'])(
    'should load anonymous data from content expanders after LOGOUT_%s',
    (status) => {
      const loggedOutState = navigation(getAuthenticatedState(), {
        type: `${LOGOUT}_${status}`,
      });
      const publicData = {
        items: [{ '@id': '/public', title: 'Public page' }],
      };
      const result = navigation(loggedOutState, {
        type: `${GET_CONTENT}_SUCCESS`,
        result: {
          '@id': '/public',
          '@components': { navigation: publicData },
        },
      });

      expect(result).toEqual({
        ...navigation(),
        items: [{ ...publicData.items[0], url: '/public' }],
        loaded: true,
      });
    },
  );
});
