import { settings } from '~/config';
import content from './content';
import {
  CREATE_CONTENT,
  DELETE_CONTENT,
  GET_CONTENT,
  RESET_CONTENT,
  UPDATE_CONTENT,
} from '@plone/volto/constants/ActionTypes';

describe('Content reducer', () => {
  it('should return the initial state', () => {
    expect(content()).toEqual({
      create: {
        loaded: false,
        loading: false,
        error: null,
      },
      delete: {
        loaded: false,
        loading: false,
        error: null,
      },
      update: {
        loaded: false,
        loading: false,
        error: null,
      },
      get: {
        loaded: false,
        loading: false,
        error: null,
      },
      order: {
        loaded: false,
        loading: false,
        error: null,
      },
      data: null,
      subrequests: {},
    });
  });

  it('should handle CREATE_CONTENT_PENDING', () => {
    expect(
      content(undefined, {
        type: `${CREATE_CONTENT}_PENDING`,
      }),
    ).toMatchObject({
      create: {
        loaded: false,
        loading: true,
        error: null,
      },
    });
  });

  it('should handle CREATE_CONTENT_PENDING with subrequest', () => {
    expect(
      content(undefined, {
        type: `${CREATE_CONTENT}_PENDING`,
        subrequest: '1234',
      }),
    ).toMatchObject({
      subrequests: {
        '1234': {
          data: null,
          loaded: false,
          loading: true,
          error: null,
        },
      },
    });
  });

  it('should handle CREATE_CONTENT_SUCCESS', () => {
    expect(
      content(undefined, {
        type: `${CREATE_CONTENT}_SUCCESS`,
        result: {
          items: [
            {
              '@id': `${settings.apiPath}/home-page`,
            },
          ],
        },
      }),
    ).toMatchObject({
      create: {
        loaded: true,
        loading: false,
        error: null,
      },
      data: {
        items: [
          {
            '@id': `${settings.apiPath}/home-page`,
            url: '/home-page',
          },
        ],
      },
    });
  });

  it('should handle CREATE_CONTENT_SUCCESS with subrequest', () => {
    expect(
      content(undefined, {
        type: `${CREATE_CONTENT}_SUCCESS`,
        subrequest: '1234',
        result: {
          items: [
            {
              '@id': `${settings.apiPath}/home-page`,
            },
          ],
        },
      }),
    ).toMatchObject({
      subrequests: {
        '1234': {
          data: {
            items: [
              {
                '@id': `${settings.apiPath}/home-page`,
                url: '/home-page',
              },
            ],
          },
          loaded: true,
          loading: false,
          error: null,
        },
      },
    });
  });

  it('should handle CREATE_CONTENT_SUCCESS with subrequest and multiple requests', () => {
    expect(
      content(undefined, {
        type: `${CREATE_CONTENT}_SUCCESS`,
        subrequest: '1234',
        result: [
          {
            '@id': `${settings.apiPath}/home-page`,
          },
          {
            '@id': `${settings.apiPath}/news`,
            url: '/news',
          },
        ],
      }),
    ).toMatchObject({
      subrequests: {
        '1234': {
          data: [
            {
              '@id': `${settings.apiPath}/home-page`,
              url: '/home-page',
            },
            {
              '@id': `${settings.apiPath}/news`,
              url: '/news',
            },
          ],
          loaded: true,
          loading: false,
          error: null,
        },
      },
    });
  });

  it('should handle CREATE_CONTENT_FAIL', () => {
    expect(
      content(undefined, {
        type: `${CREATE_CONTENT}_FAIL`,
        error: 'failed',
      }),
    ).toMatchObject({
      create: {
        loaded: false,
        loading: false,
        error: 'failed',
      },
      data: null,
    });
  });

  it('should handle CREATE_CONTENT_FAIL with subrequest', () => {
    expect(
      content(undefined, {
        type: `${CREATE_CONTENT}_FAIL`,
        subrequest: '1234',
        error: 'failed',
      }),
    ).toMatchObject({
      subrequests: {
        '1234': {
          data: null,
          loaded: false,
          loading: false,
          error: 'failed',
        },
      },
    });
  });

  it('should handle DELETE_CONTENT_PENDING', () => {
    expect(
      content(undefined, {
        type: `${DELETE_CONTENT}_PENDING`,
      }),
    ).toMatchObject({
      delete: {
        loaded: false,
        loading: true,
        error: null,
      },
    });
  });

  it('should handle DELETE_CONTENT_SUCCESS', () => {
    expect(
      content(undefined, {
        type: `${DELETE_CONTENT}_SUCCESS`,
      }),
    ).toMatchObject({
      delete: {
        loaded: true,
        loading: false,
        error: null,
      },
    });
  });

  it('should handle DELETE_CONTENT_FAIL', () => {
    expect(
      content(undefined, {
        type: `${DELETE_CONTENT}_FAIL`,
        error: 'failed',
      }),
    ).toMatchObject({
      delete: {
        loaded: false,
        loading: false,
        error: 'failed',
      },
    });
  });

  it('should handle UPDATE_CONTENT_PENDING', () => {
    expect(
      content(undefined, {
        type: `${UPDATE_CONTENT}_PENDING`,
      }),
    ).toMatchObject({
      update: {
        loaded: false,
        loading: true,
        error: null,
      },
    });
  });

  it('should handle UPDATE_CONTENT_SUCCESS', () => {
    expect(
      content(undefined, {
        type: `${UPDATE_CONTENT}_SUCCESS`,
      }),
    ).toMatchObject({
      update: {
        loaded: true,
        loading: false,
        error: null,
      },
    });
  });

  it('should handle UPDATE_CONTENT_FAIL', () => {
    expect(
      content(undefined, {
        type: `${UPDATE_CONTENT}_FAIL`,
        error: 'failed',
      }),
    ).toMatchObject({
      update: {
        loaded: false,
        loading: false,
        error: 'failed',
      },
    });
  });

  it('should handle GET_CONTENT_PENDING', () => {
    expect(
      content(undefined, {
        type: `${GET_CONTENT}_PENDING`,
      }),
    ).toMatchObject({
      get: {
        loaded: false,
        loading: true,
        error: null,
      },
      data: null,
    });
  });

  it('should handle GET_CONTENT_SUCCESS', () => {
    expect(
      content(undefined, {
        type: `${GET_CONTENT}_SUCCESS`,
        result: {
          items: [
            {
              '@id': `${settings.apiPath}/home-page`,
            },
          ],
        },
      }),
    ).toMatchObject({
      get: {
        loaded: true,
        loading: false,
        error: null,
      },
      data: {
        items: [
          {
            '@id': `${settings.apiPath}/home-page`,
            url: '/home-page',
          },
        ],
      },
    });
  });

  it('should handle GET_CONTENT_FAIL', () => {
    expect(
      content(undefined, {
        type: `${GET_CONTENT}_FAIL`,
        error: 'failed',
      }),
    ).toMatchObject({
      get: {
        loaded: false,
        loading: false,
        error: 'failed',
      },
      data: null,
    });
  });

  it('should handle RESET_CONTENT', () => {
    expect(
      content(
        {
          data: ['item 1'],
        },
        {
          type: RESET_CONTENT,
        },
      ),
    ).toMatchObject({
      data: null,
    });
  });

  it('should handle subrequest GET_CONTENT_PENDING', () => {
    expect(
      content(undefined, {
        type: `${GET_CONTENT}_PENDING`,
        subrequest: 'my-subrequest',
      }),
    ).toMatchObject({
      subrequests: {
        'my-subrequest': {
          loaded: false,
          loading: true,
          error: null,
          data: null,
        },
      },
    });
  });

  it('should handle subrequest GET_CONTENT_SUCCESS', () => {
    expect(
      content(
        {
          subrequests: {
            'my-subrequest': {
              loaded: false,
              loading: true,
              error: null,
              data: null,
            },
          },
        },
        {
          type: `${GET_CONTENT}_SUCCESS`,
          subrequest: 'my-subrequest',
          result: {
            items: [
              {
                '@id': `${settings.apiPath}/home-page`,
              },
            ],
          },
        },
      ),
    ).toMatchObject({
      subrequests: {
        'my-subrequest': {
          loaded: true,
          loading: false,
          error: null,
          data: {
            items: [
              {
                '@id': `${settings.apiPath}/home-page`,
                url: '/home-page',
              },
            ],
          },
        },
      },
    });
  });

  it('should handle subrequest GET_CONTENT_FAIL', () => {
    expect(
      content(
        {
          subrequests: {
            'my-subrequest': {
              loaded: false,
              loading: true,
              error: null,
              data: null,
            },
          },
        },
        {
          type: `${GET_CONTENT}_FAIL`,
          subrequest: 'my-subrequest',
          error: 'failed',
        },
      ),
    ).toMatchObject({
      subrequests: {
        'my-subrequest': {
          loaded: false,
          loading: false,
          error: 'failed',
          data: null,
        },
      },
    });
  });

  it('should handle subrequest RESET_CONTENT', () => {
    expect(
      content(
        {
          subrequests: { 'my-subrequest': 'some-value' },
        },
        {
          type: RESET_CONTENT,
          subrequest: 'my-subrequest',
        },
      ),
    ).toMatchObject({
      subrequests: {},
    });
  });
});
