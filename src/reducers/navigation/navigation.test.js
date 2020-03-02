import { settings } from '~/config';
import navigation from './navigation';
import { GET_NAVIGATION } from '@plone/volto/constants/ActionTypes';

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
              '@id': `${settings.apiPath}/front-page`,
            },
            {
              title: 'Folder1',
              '@id': `${settings.apiPath}/folder1`,
              items: [
                {
                  title: 'FolderInFolder1',
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
          url: '/front-page',
        },
        {
          title: 'Folder1',
          url: '/folder1',
          items: [
            {
              title: 'FolderInFolder1',
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
