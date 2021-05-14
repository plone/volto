import workingcopy from './workingcopy';
import { CREATE_WORKING_COPY } from '@plone/volto/constants/ActionTypes';

describe('Working copy reducer', () => {
  it('should return the initial state', () => {
    expect(workingcopy()).toEqual({
      info: {},
      create: {
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
    });
  });

  it('should handle CREATE_WORKING_COPY_SUCCESS', () => {
    expect(
      workingcopy(undefined, {
        type: `${CREATE_WORKING_COPY}_SUCCESS`,
        result: {
          '@id': 'http://localhost:8080/Plone/copy_of_document',
        },
      }),
    ).toEqual({
      info: { '@id': '/copy_of_document' },
      create: {
        loaded: true,
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
    });
  });
});
