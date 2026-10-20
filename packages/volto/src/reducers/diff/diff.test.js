import { GET_DIFF } from '@plone/volto/constants/ActionTypes';
import diff from './diff';

describe('Diff reducer', () => {
  it('should return the initial state', () => {
    expect(diff()).toEqual({
      error: null,
      data: [],
      loaded: false,
      loading: false,
    });
  });

  it('should handle GET_DIFF_PENDING', () => {
    expect(
      diff(undefined, {
        type: `${GET_DIFF}_PENDING`,
      }),
    ).toEqual({
      error: null,
      data: [],
      loaded: false,
      loading: true,
    });
  });

  it('should handle GET_DIFF_SUCCESS with array result with static behaviors', () => {
    expect(
      diff(undefined, {
        type: `${GET_DIFF}_SUCCESS`,
        result: [
          {
            '@static_behaviors': [
              'guillotina.behaviors.dublincore.IDublinCore',
            ],
            'guillotina.behaviors.dublincore.IDublinCore': {
              title: 'test page',
            },
          },
          {
            '@static_behaviors': [
              'guillotina.behaviors.dublincore.IDublinCore',
            ],
            'guillotina.behaviors.dublincore.IDublinCore': {
              title: 'test second page',
            },
          },
        ],
      }),
    ).toEqual({
      error: null,
      data: [
        {
          '@static_behaviors': ['guillotina.behaviors.dublincore.IDublinCore'],

          'guillotina.behaviors.dublincore.IDublinCore.title': 'test page',
        },
        {
          '@static_behaviors': ['guillotina.behaviors.dublincore.IDublinCore'],
          'guillotina.behaviors.dublincore.IDublinCore.title':
            'test second page',
        },
      ],
      loaded: true,
      loading: false,
    });
  });

  it('should handle GET_DIFF_SUCCESS with array result without static behaviors', () => {
    const data = [
      {
        title: 'test page',
        'guillotina.behaviors.dublincore.IDublinCore': {
          title: 'test page',
        },
      },
      {
        title: 'test second page',
        'guillotina.behaviors.dublincore.IDublinCore': {
          title: 'test second page',
        },
      },
    ];
    expect(
      diff(undefined, {
        type: `${GET_DIFF}_SUCCESS`,
        result: data,
      }),
    ).toEqual({
      error: null,
      data: data,
      loaded: true,
      loading: false,
    });
  });

  it('should handle GET_DIFF_FAIL', () => {
    expect(
      diff(undefined, {
        type: `${GET_DIFF}_FAIL`,
        error: 'failed',
      }),
    ).toEqual({
      error: 'failed',
      data: [],
      loaded: false,
      loading: false,
    });
  });
});
