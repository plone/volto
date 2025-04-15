import linkIntegrity from './linkIntegrity';
import { LINK_INTEGRITY_CHECK } from '@plone/volto/constants/ActionTypes';

describe('Link integrity reducer', () => {
  it('should return the initial state', () => {
    expect(linkIntegrity()).toEqual({
      error: null,
      loaded: false,
      loading: false,
      result: null,
    });
  });

  it('should handle LINK_INTEGRITY_CHECK_PENDING', () => {
    expect(
      linkIntegrity(undefined, {
        type: `${LINK_INTEGRITY_CHECK}_PENDING`,
      }),
    ).toEqual({
      error: null,
      loaded: false,
      loading: true,
      result: null,
    });
  });

  it('should handle LINK_INTEGRITY_CHECK_SUCCESS', () => {
    expect(
      linkIntegrity(undefined, {
        type: `${LINK_INTEGRITY_CHECK}_SUCCESS`,
        result: 'result',
      }),
    ).toEqual({
      error: null,
      loaded: true,
      loading: false,
      result: 'result',
    });
  });

  it('should handle LINK_INTEGRITY_CHECK_FAIL', () => {
    expect(
      linkIntegrity(undefined, {
        type: `${LINK_INTEGRITY_CHECK}_FAIL`,
        error: 'failed',
      }),
    ).toEqual({
      error: 'failed',
      loaded: true,
      loading: false,
      result: null,
    });
  });
});
