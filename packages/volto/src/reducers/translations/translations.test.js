import {
  GET_CONTENT_TRANSLATION,
  GET_CONTENT_TRANSLATION_SERVICES,
} from '../../constants/ActionTypes';

import getContentTranslationServicesReducer from './translations';
import getContentTranslationReducer from './translations';

describe('Content Translation Reducers', () => {
  const initialState = {};

  const actions = {
    [`${GET_CONTENT_TRANSLATION_SERVICES}_PENDING`]: {},
    [`${GET_CONTENT_TRANSLATION_SERVICES}_SUCCESS`]: {
      result: 'some data',
    },
    [`${GET_CONTENT_TRANSLATION_SERVICES}_FAIL`]: {
      result: 'some error',
    },
    [`${GET_CONTENT_TRANSLATION}_PENDING`]: {
      subrequest: 'sub1',
    },
    [`${GET_CONTENT_TRANSLATION}_SUCCESS`]: {
      subrequest: 'sub1',
      result: {
        data: 'some data',
      },
    },
    [`${GET_CONTENT_TRANSLATION}_FAIL`]: {
      subrequest: 'sub1',
      result: 'some error',
    },
  };

  it('should return initial state when no action is dispatched', () => {
    expect(getContentTranslationServicesReducer(initialState, {})).toEqual(
      initialState,
    );
    expect(getContentTranslationReducer(initialState, {})).toEqual(
      initialState,
    );
  });

  it('should handle GET_CONTENT_TRANSLATION_SERVICES_PENDING action', () => {
    const expectedState = {
      loading: true,
      loaded: false,
      error: undefined,
      data: [],
    };
    expect(
      getContentTranslationServicesReducer(
        initialState,
        actions[`${GET_CONTENT_TRANSLATION_SERVICES}_PENDING`],
      ),
    ).toEqual(expectedState);
  });

  it('should handle GET_CONTENT_TRANSLATION_SERVICES_SUCCESS action', () => {
    const expectedState = {
      loading: false,
      loaded: true,
      error: null,
      data: actions[`${GET_CONTENT_TRANSLATION_SERVICES}_SUCCESS`].result,
    };
    expect(
      getContentTranslationServicesReducer(
        initialState,
        actions[`${GET_CONTENT_TRANSLATION_SERVICES}_SUCCESS`],
      ),
    ).toEqual(expectedState);
  });

  it('should handle GET_CONTENT_TRANSLATION_SERVICES_FAIL action', () => {
    const expectedState = {
      loading: false,
      loaded: true,
      data: [],
    };
    expect(
      getContentTranslationServicesReducer(
        initialState,
        actions[`${GET_CONTENT_TRANSLATION_SERVICES}_FAIL`],
      ),
    ).toEqual(expectedState);
  });

  it('should handle GET_CONTENT_TRANSLATION_PENDING action', () => {
    const expectedState = {
      content_translation: {
        loading: true,
        loaded: false,
        error: undefined,
        data: [],
      },
    };
    expect(
      getContentTranslationReducer(
        initialState,
        actions[`${GET_CONTENT_TRANSLATION}_PENDING`],
      ),
    ).toEqual(expectedState);
  });

  it('should handle GET_CONTENT_TRANSLATION_SUCCESS action', () => {
    const expectedState = {
      content_translation: {
        loading: false,
        loaded: true,
        error: undefined,
        data: actions[`${GET_CONTENT_TRANSLATION}_SUCCESS`].result.data,
      },
    };
    expect(
      getContentTranslationReducer(
        initialState,
        actions[`${GET_CONTENT_TRANSLATION}_SUCCESS`],
      ),
    ).toEqual(expectedState);
  });

  it('should handle GET_CONTENT_TRANSLATION_FAIL action', () => {
    const expectedState = {
      content_translation: {
        loading: false,
        loaded: true,
        error: actions[`${GET_CONTENT_TRANSLATION}_FAIL`].result,
        data: {},
      },
    };
    expect(
      getContentTranslationReducer(
        initialState,
        actions[`${GET_CONTENT_TRANSLATION}_FAIL`],
      ),
    ).toEqual(expectedState);
  });

  it('should handle GET_CONTENT_TRANSLATION_SERVICES_SUCCESS with a subrequest', () => {
    const expectedState = {
      content_translation: {
        loading: false,
        loaded: true,
        error: undefined,
        data: actions[`${GET_CONTENT_TRANSLATION_SERVICES}_SUCCESS`].result
          .data,
      },
      subrequests: {
        [actions[`${GET_CONTENT_TRANSLATION_SERVICES}_SUCCESS`].subrequest]: {
          loading: true,
          loaded: false,
          error: undefined,
          data: [],
        },
      },
    };
    expect(
      getContentTranslationServicesReducer(
        initialState,
        actions[`${GET_CONTENT_TRANSLATION_SERVICES}_SUCCESS`],
      ),
    ).toEqual(expectedState);
  });

  it('should handle GET_CONTENT_TRANSLATION_SUCCESS with a subrequest', () => {
    const expectedState = {
      content_translation: {
        loading: false,
        loaded: true,
        error: undefined,
        data: actions[`${GET_CONTENT_TRANSLATION}_SUCCESS`].result.data,
      },
      subrequests: {
        [actions[`${GET_CONTENT_TRANSLATION}_SUCCESS`].subrequest]: {
          loading: true,
          loaded: false,
          error: undefined,
          data: actions[`${GET_CONTENT_TRANSLATION}_SUCCESS`].result.data,
        },
      },
    };
    expect(
      getContentTranslationReducer(
        initialState,
        actions[`${GET_CONTENT_TRANSLATION}_SUCCESS`],
      ),
    ).toEqual(expectedState);
  });

  it('should handle GET_CONTENT_TRANSLATION_FAIL with a subrequest', () => {
    const expectedState = {
      content_translation: {
        loading: false,
        loaded: true,
        error: actions[`${GET_CONTENT_TRANSLATION}_FAIL`].result,
        data: {},
      },
      subrequests: {
        [actions[`${GET_CONTENT_TRANSLATION}_FAIL`].subrequest]: {
          loading: true,
          loaded: false,
          error: actions[`${GET_CONTENT_TRANSLATION}_FAIL`].result,
          data: [],
        },
      },
    };
    expect(
      getContentTranslationServicesReducer(
        initialState,
        actions[`${GET_CONTENT_TRANSLATION}_FAIL`],
      ),
    ).toEqual(expectedState);
  });
});
