import {
  GET_CONTENT,
  GET_NAVIGATION,
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
          title: 'Welcome to Plone!',
          description:
            'Congratulations! You have successfully installed Plone.',
          url: '/front-page',
        },
        {
          title: 'Folder1',
          description: 'Folder description',
          url: '/folder1',
          items: [
            {
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
