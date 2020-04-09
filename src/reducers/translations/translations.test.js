import translations from './translations';
import { GET_TRANSLATION_LOCATOR } from '@plone/volto/constants/ActionTypes';

describe('Navigation reducer', () => {
  it('should return the initial state', () => {
    expect(translations()).toEqual({
      error: null,
      translationLocation: null,
      loaded: false,
      loading: false,
    });
  });

  it('should handle GET_TRANSLATION_LOCATOR_PENDING', () => {
    expect(
      translations(undefined, {
        type: `${GET_TRANSLATION_LOCATOR}_PENDING`,
      }),
    ).toEqual({
      error: null,
      translationLocation: null,
      loaded: false,
      loading: true,
    });
  });

  it('should handle GET_TRANSLATION_LOCATOR_SUCCESS', () => {
    expect(
      translations(undefined, {
        type: `${GET_TRANSLATION_LOCATOR}_SUCCESS`,
        result: {
          '@id': 'http://mytranslationlocation',
        },
      }),
    ).toEqual({
      error: null,
      translationLocation: 'http://mytranslationlocation',
      loaded: true,
      loading: false,
    });
  });

  it('should handle GET_TRANSLATION_LOCATOR_FAIL', () => {
    expect(
      translations(undefined, {
        type: `${GET_TRANSLATION_LOCATOR}_FAIL`,
        error: 'failed',
      }),
    ).toEqual({
      error: 'failed',
      translationLocation: null,
      loaded: false,
      loading: false,
    });
  });
});
