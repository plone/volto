import vocabularies from './vocabularies';
import { GET_VOCABULARY } from '@plone/volto/constants/ActionTypes';

describe('Vocabularies reducer', () => {
  it('should return the initial state', () => {
    expect(vocabularies()).toEqual({});
  });

  it('should handle GET_VOCABULARY_PENDING', () => {
    expect(
      vocabularies(undefined, {
        type: `${GET_VOCABULARY}_PENDING`,
        vocabulary: 'plone.app.vocabularies.Keywords',
      }),
    ).toEqual({
      'plone.app.vocabularies.Keywords': {
        error: null,
        loaded: false,
        loading: true,
      },
    });
  });

  it('should handle GET_VOCABULARY_SUCCESS', () => {
    expect(
      vocabularies(undefined, {
        type: `${GET_VOCABULARY}_SUCCESS`,
        vocabulary: 'plone.app.vocabularies.Keywords',
        result: {
          items: [
            {
              '@id': '/tag',
              title: 'Tag',
              token: 'Tag',
            },
          ],
        },
      }),
    ).toEqual({
      'plone.app.vocabularies.Keywords': {
        error: null,
        loaded: true,
        loading: false,
        items: [
          {
            label: 'Tag',
            value: 'Tag',
          },
        ],
      },
    });
  });

  it('should handle GET_VOCABULARY_FAIL', () => {
    expect(
      vocabularies(undefined, {
        type: `${GET_VOCABULARY}_FAIL`,
        vocabulary: 'plone.app.vocabularies.Keywords',
        error: 'failed',
      }),
    ).toEqual({
      'plone.app.vocabularies.Keywords': {
        error: 'failed',
        loaded: false,
        loading: false,
      },
    });
  });
});
