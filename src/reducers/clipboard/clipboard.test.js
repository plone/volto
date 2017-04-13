import clipboard from './clipboard';
import {
  COPY,
  CUT,
  COPY_PENDING,
  COPY_SUCCESS,
  COPY_FAIL,
  MOVE_PENDING,
  MOVE_SUCCESS,
  MOVE_FAIL,
} from '../../constants/ActionTypes';

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

  it('should handle COPY_PENDING', () => {
    expect(
      clipboard(undefined, {
        type: COPY_PENDING,
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

  it('should handle COPY_SUCCESS', () => {
    expect(
      clipboard(undefined, {
        type: COPY_SUCCESS,
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

  it('should handle COPY_FAIL', () => {
    expect(
      clipboard(undefined, {
        type: COPY_FAIL,
        error: {
          error: 'failed',
        },
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

  it('should handle MOVE_PENDING', () => {
    expect(
      clipboard(undefined, {
        type: MOVE_PENDING,
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

  it('should handle MOVE_SUCCESS', () => {
    expect(
      clipboard(undefined, {
        type: MOVE_SUCCESS,
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

  it('should handle MOVE_FAIL', () => {
    expect(
      clipboard(undefined, {
        type: MOVE_FAIL,
        error: {
          error: 'failed',
        },
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
        source: 'http://source',
      }),
    ).toEqual({
      action: 'copy',
      source: 'http://source',
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
        source: 'http://source',
      }),
    ).toEqual({
      action: 'cut',
      source: 'http://source',
      request: {
        loaded: false,
        loading: false,
        error: null,
      },
    });
  });
});
