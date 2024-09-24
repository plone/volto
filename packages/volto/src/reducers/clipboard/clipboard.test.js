import clipboard from './clipboard';
import {
  COPY,
  CUT,
  COPY_CONTENT,
  MOVE_CONTENT,
} from '@plone/volto/constants/ActionTypes';

describe('Clipboard reducer', () => {
  it('should return the initial state', () => {
    expect(clipboard()).toEqual({
      action: null,
      source: null,
      request: {
        loaded: false,
        loading: false,
        error: null,
      },
    });
  });

  it('should handle COPY_CONTENT_PENDING', () => {
    expect(
      clipboard(undefined, {
        type: `${COPY_CONTENT}_PENDING`,
      }),
    ).toEqual({
      action: null,
      source: null,
      request: {
        loaded: false,
        loading: true,
        error: null,
      },
    });
  });

  it('should handle COPY_CONTENT_SUCCESS', () => {
    expect(
      clipboard(undefined, {
        type: `${COPY_CONTENT}_SUCCESS`,
      }),
    ).toEqual({
      action: null,
      source: null,
      request: {
        loaded: true,
        loading: false,
        error: null,
      },
    });
  });

  it('should handle COPY_CONTENT_FAIL', () => {
    expect(
      clipboard(undefined, {
        type: `${COPY_CONTENT}_FAIL`,
        error: 'failed',
      }),
    ).toEqual({
      action: null,
      source: null,
      request: {
        loaded: false,
        loading: false,
        error: 'failed',
      },
    });
  });

  it('should handle MOVE_CONTENT_PENDING', () => {
    expect(
      clipboard(undefined, {
        type: `${MOVE_CONTENT}_PENDING`,
      }),
    ).toEqual({
      action: null,
      source: null,
      request: {
        loaded: false,
        loading: true,
        error: null,
      },
    });
  });

  it('should handle MOVE_CONTENT_SUCCESS', () => {
    expect(
      clipboard(undefined, {
        type: `${MOVE_CONTENT}_SUCCESS`,
      }),
    ).toEqual({
      action: null,
      source: null,
      request: {
        loaded: true,
        loading: false,
        error: null,
      },
    });
  });

  it('should handle MOVE_CONTENT_FAIL', () => {
    expect(
      clipboard(undefined, {
        type: `${MOVE_CONTENT}_FAIL`,
        error: 'failed',
      }),
    ).toEqual({
      action: null,
      source: null,
      request: {
        loaded: false,
        loading: false,
        error: 'failed',
      },
    });
  });

  it('should handle COPY', () => {
    expect(
      clipboard(undefined, {
        type: COPY,
        source: ['http://source'],
      }),
    ).toEqual({
      action: 'copy',
      source: ['http://source'],
      request: {
        loaded: false,
        loading: false,
        error: null,
      },
    });
  });

  it('should handle CUT', () => {
    expect(
      clipboard(undefined, {
        type: CUT,
        source: ['http://source'],
      }),
    ).toEqual({
      action: 'cut',
      source: ['http://source'],
      request: {
        loaded: false,
        loading: false,
        error: null,
      },
    });
  });
});
