import aliases from './aliases';

import {
  GET_ALIASES,
  ADD_ALIASES,
  REMOVE_ALIASES,
} from '@plone/volto/constants/ActionTypes';

describe('Aliases reducer', () => {
  it('should return the initial state', () => {
    expect(aliases()).toMatchObject({
      add: {
        loaded: false,
        loading: false,
        error: null,
      },
      remove: {
        loaded: false,
        loading: false,
        error: null,
      },
      get: {
        loaded: false,
        loading: false,
        error: null,
      },
      items: [],
    });
  });

  it('should handle GET_ALIASES_PENDING', () => {
    expect(
      aliases(undefined, {
        type: `${GET_ALIASES}_PENDING`,
      }),
    ).toMatchObject({
      add: {
        loaded: false,
        loading: false,
        error: null,
      },
      remove: {
        loaded: false,
        loading: false,
        error: null,
      },
      get: {
        loading: true,
        loaded: false,
        error: null,
      },
      items: [],
    });
  });

  it('should handle ADD_ALIASES_PENDING', () => {
    expect(
      aliases(undefined, {
        type: `${ADD_ALIASES}_PENDING`,
      }),
    ).toMatchObject({
      add: {
        loaded: false,
        loading: true,
        error: null,
      },
      remove: {
        loaded: false,
        loading: false,
        error: null,
      },
      get: {
        loading: false,
        loaded: false,
        error: null,
      },
      items: [],
    });
  });

  it('should handle REMOVE_ALIASES_PENDING', () => {
    expect(
      aliases(undefined, {
        type: `${REMOVE_ALIASES}_PENDING`,
      }),
    ).toMatchObject({
      add: {
        loaded: false,
        loading: false,
        error: null,
      },
      remove: {
        loaded: false,
        loading: true,
        error: null,
      },
      get: {
        loading: false,
        loaded: false,
        error: null,
      },
      items: [],
    });
  });

  it('should handle GET_ALIASES_SUCCESS', () => {
    expect(
      aliases(undefined, {
        type: `${GET_ALIASES}_SUCCESS`,
      }),
    ).toMatchObject({
      add: {
        loaded: false,
        loading: false,
        error: null,
      },
      remove: {
        loaded: false,
        loading: false,
        error: null,
      },
      get: {
        loading: false,
        loaded: true,
        error: null,
      },
      items: undefined,
      items_total: undefined,
    });
  });

  it('should handle ADD_ALIASES_SUCCESS', () => {
    expect(
      aliases(undefined, {
        type: `${ADD_ALIASES}_SUCCESS`,
      }),
    ).toMatchObject({
      add: {
        loading: false,
        loaded: true,
      },
      remove: {
        loaded: false,
        loading: false,
        error: null,
      },
      get: {
        loaded: false,
        loading: false,
        error: null,
      },
      items: [],
    });
  });

  it('should handle REMOVE_ALIASES_SUCCESS', () => {
    expect(
      aliases(undefined, {
        type: `${REMOVE_ALIASES}_SUCCESS`,
      }),
    ).toMatchObject({
      add: {
        loading: false,
        loaded: false,
      },
      remove: {
        loading: false,
        loaded: true,
      },
      get: {
        loading: false,
        loaded: false,
        error: null,
      },
      items: [],
    });
  });

  it('should handle GET_ALIASES_FAIL', () => {
    expect(
      aliases(undefined, {
        type: `${GET_ALIASES}_FAIL`,
      }),
    ).toMatchObject({
      add: {
        loading: false,
        loaded: false,
        error: null,
      },
      remove: {
        loaded: false,
        loading: false,
        error: null,
      },
      get: {
        loading: false,
        loaded: false,
        error: undefined,
      },
      items: [],
    });
  });

  it('should handle ADD_ALIASES_FAIL', () => {
    expect(
      aliases(undefined, {
        type: `${ADD_ALIASES}_FAIL`,
      }),
    ).toMatchObject({
      add: {
        loading: false,
        loaded: false,
        error: undefined,
      },
      remove: {
        loaded: false,
        loading: false,
        error: null,
      },
      get: {
        loading: false,
        loaded: false,
        error: null,
      },
      items: [],
    });
  });

  it('should handle REMOVE_ALIASES_FAIL', () => {
    expect(
      aliases(undefined, {
        type: `${REMOVE_ALIASES}_FAIL`,
      }),
    ).toMatchObject({
      add: {
        loading: false,
        loaded: false,
        error: null,
      },
      remove: {
        loaded: false,
        loading: false,
        error: undefined,
      },
      get: {
        loading: false,
        loaded: false,
        error: null,
      },
      items: [],
    });
  });
});
