import workingcopy from './workingcopy';
import {
  APPLY_WORKING_COPY,
  CREATE_WORKING_COPY,
  REMOVE_WORKING_COPY,
} from '@plone/volto/constants/ActionTypes';

describe('Working copy reducer', () => {
  it('should return the initial state', () => {
    expect(workingcopy()).toEqual({
      info: {},
      create: {
        loaded: false,
        loading: false,
        error: null,
      },
      apply: {
        loaded: false,
        loading: false,
        error: null,
      },
      remove: {
        loaded: false,
        loading: false,
        error: null,
      },
    });
  });

  it('should handle CREATE_WORKING_COPY_PENDING', () => {
    expect(
      workingcopy(undefined, {
        type: `${CREATE_WORKING_COPY}_PENDING`,
      }),
    ).toEqual({
      info: {},
      create: {
        loaded: false,
        loading: true,
        error: null,
      },
      apply: {
        loaded: false,
        loading: false,
        error: null,
      },
      remove: {
        loaded: false,
        loading: false,
        error: null,
      },
    });
  });

  it('should handle CREATE_WORKING_COPY_SUCCESS', () => {
    expect(
      workingcopy(undefined, {
        type: `${CREATE_WORKING_COPY}_SUCCESS`,
        result: {
          '@id': 'http://localhost:8080/Plone/copy_of_document',
          title: 'The title',
        },
      }),
    ).toEqual({
      info: { '@id': '/copy_of_document', title: 'The title' },
      create: {
        loaded: true,
        loading: false,
        error: null,
      },
      apply: {
        loaded: false,
        loading: false,
        error: null,
      },
      remove: {
        loaded: false,
        loading: false,
        error: null,
      },
    });
  });

  it('should handle CREATE_WORKING_COPY_FAIL', () => {
    expect(
      workingcopy(undefined, {
        type: `${CREATE_WORKING_COPY}_FAIL`,
        error: {
          response: {
            error: 'failed',
          },
        },
      }),
    ).toEqual({
      info: {},
      create: {
        loaded: false,
        loading: false,
        error: 'failed',
      },
      apply: {
        loaded: false,
        loading: false,
        error: null,
      },
      remove: {
        loaded: false,
        loading: false,
        error: null,
      },
    });
  });

  it('should handle APPLY_WORKING_COPY_PENDING', () => {
    expect(
      workingcopy(undefined, {
        type: `${APPLY_WORKING_COPY}_PENDING`,
      }),
    ).toEqual({
      info: {},
      apply: {
        loaded: false,
        loading: true,
        error: null,
      },
      create: {
        loaded: false,
        loading: false,
        error: null,
      },
      remove: {
        loaded: false,
        loading: false,
        error: null,
      },
    });
  });

  it('should handle APPLY_WORKING_COPY_SUCCESS', () => {
    expect(
      workingcopy(undefined, {
        type: `${APPLY_WORKING_COPY}_SUCCESS`,
      }),
    ).toEqual({
      info: {},
      apply: {
        loaded: true,
        loading: false,
        error: null,
      },
      create: {
        loaded: false,
        loading: false,
        error: null,
      },
      remove: {
        loaded: false,
        loading: false,
        error: null,
      },
    });
  });

  it('should handle APPLY_WORKING_COPY_FAIL', () => {
    expect(
      workingcopy(undefined, {
        type: `${APPLY_WORKING_COPY}_FAIL`,
        error: {
          response: {
            error: 'failed',
          },
        },
      }),
    ).toEqual({
      info: {},
      apply: {
        loaded: false,
        loading: false,
        error: 'failed',
      },
      create: {
        loaded: false,
        loading: false,
        error: null,
      },
      remove: {
        loaded: false,
        loading: false,
        error: null,
      },
    });
  });

  it('should handle REMOVE_WORKING_COPY_PENDING', () => {
    expect(
      workingcopy(undefined, {
        type: `${REMOVE_WORKING_COPY}_PENDING`,
      }),
    ).toEqual({
      info: {},
      remove: {
        loaded: false,
        loading: true,
        error: null,
      },
      apply: {
        loaded: false,
        loading: false,
        error: null,
      },
      create: {
        loaded: false,
        loading: false,
        error: null,
      },
    });
  });

  it('should handle REMOVE_WORKING_COPY_SUCCESS', () => {
    expect(
      workingcopy(undefined, {
        type: `${REMOVE_WORKING_COPY}_SUCCESS`,
      }),
    ).toEqual({
      info: {},
      remove: {
        loaded: true,
        loading: false,
        error: null,
      },
      create: {
        loaded: false,
        loading: false,
        error: null,
      },
      apply: {
        loaded: false,
        loading: false,
        error: null,
      },
    });
  });

  it('should handle REMOVE_WORKING_COPY_FAIL', () => {
    expect(
      workingcopy(undefined, {
        type: `${REMOVE_WORKING_COPY}_FAIL`,
        error: {
          response: {
            error: 'failed',
          },
        },
      }),
    ).toEqual({
      info: {},
      remove: {
        loaded: false,
        loading: false,
        error: 'failed',
      },
      create: {
        loaded: false,
        loading: false,
        error: null,
      },
      apply: {
        loaded: false,
        loading: false,
        error: null,
      },
    });
  });
});
