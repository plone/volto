import {
  protectLoadStart,
  protectLoadEnd,
  loadProtector,
} from './storeProtectLoadUtils';
import * as Url from '../helpers/Url/Url';

const tick = async () => new Promise((resolve) => setTimeout(resolve, 0));

describe('storeProtectLoadUtils', () => {
  describe('protectLoadStart middleware', () => {
    test('idle', () => {
      const dispatch = jest.fn();
      const getState = jest.fn(() => ({
        router: {
          location: {
            pathname: '/PATH',
          },
        },
      }));
      const next = jest.fn(() => 'NEXT');
      const action = { type: 'ANY' };
      const result = protectLoadStart({ dispatch, getState })(next)(action);
      expect(dispatch).toBeCalledTimes(0);
      expect(next).toBeCalledWith(action);
      expect(result).toBe('NEXT');
    });

    const testLocationChange =
      ({ locationMap, resetBeforeFetch }) =>
      () => {
        const dispatch = jest.fn();
        const getState = jest.fn(() => ({
          router: {
            location: {
              pathname: '/PATH',
            },
          },
        }));
        const next = jest.fn(() => 'NEXT');
        const action = {
          type: '@@router/LOCATION_CHANGE',
          payload: { location: { pathname: '/NEW-PATH' } },
        };
        Url.isCmsUi = jest.fn((path) => locationMap[path]);
        const result = protectLoadStart({ dispatch, getState })(next)(action);
        expect(dispatch).toBeCalledWith({
          type: '@@loadProtector/START',
          location: { pathname: '/NEW-PATH' },
          resetBeforeFetch,
        });
        expect(next).toBeCalledWith(action);
        expect(result).toBe('NEXT');
      };

    const testLocationSkipped =
      ({ locationMap }) =>
      () => {
        const dispatch = jest.fn();
        const getState = jest.fn(() => ({
          router: {
            location: {
              pathname: '/PATH',
            },
          },
        }));
        const next = jest.fn(() => 'NEXT');
        const action = {
          type: '@@router/LOCATION_CHANGE',
          payload: { location: { pathname: '/NEW-PATH' } },
        };
        Url.isCmsUi = jest.fn((path) => locationMap[path]);
        const result = protectLoadStart({ dispatch, getState })(next)(action);
        expect(dispatch).toBeCalledWith({
          type: '@@loadProtector/SKIPPED',
          location: { pathname: '/NEW-PATH' },
        });
        expect(next).toBeCalledWith(action);
        expect(result).toBe('NEXT');
      };

    describe('location change', () => {
      test(
        'non content => content',
        testLocationChange({
          locationMap: { '/PATH': true, '/NEW-PATH': false },
          resetBeforeFetch: true,
        }),
      );
      test(
        'content => content',
        testLocationChange({
          locationMap: { '/PATH': false, '/NEW-PATH': false },
          resetBeforeFetch: false,
        }),
      );
      test(
        'content => non content',
        testLocationSkipped({
          locationMap: { '/PATH': false, '/NEW-PATH': true },
        }),
      );
      test(
        'non content => non content',
        testLocationSkipped({
          locationMap: { '/PATH': true, '/NEW-PATH': true },
        }),
      );
    });

    test('skips functional actions', () => {
      const dispatch = jest.fn();
      const getState = jest.fn(() => ({
        router: {
          location: {
            pathname: '/PATH',
          },
        },
      }));
      const next = jest.fn(() => 'NEXT');
      const action = () => {};
      const result = protectLoadStart({ dispatch, getState })(next)(action);
      expect(dispatch).toBeCalledTimes(0);
      expect(next).toBeCalledWith(action);
      expect(result).toBe('NEXT');
    });
  });

  describe('protectLoadEnd middleware', () => {
    test('idle', async () => {
      const dispatch = jest.fn();
      const getState = jest.fn(() => ({
        loadProtector: {
          isCounting: false,
        },
      }));
      const next = jest.fn(() => 'NEXT');
      const action = { type: 'ANY' };
      const result = protectLoadEnd({ dispatch, getState })(next)(action);
      expect(dispatch).toBeCalledTimes(0);
      expect(next).toBeCalledWith(action);
      expect(result).toBe('NEXT');
      await tick();
      expect(dispatch).toBeCalledTimes(0);
    });

    test('not dispatching', async () => {
      const dispatch = jest.fn();
      const getState = jest.fn(() => ({
        loadProtector: {
          isCounting: true,
        },
      }));
      const next = jest.fn(() => 'NEXT');
      const action = { type: 'ANY' };
      const result = protectLoadEnd({ dispatch, getState })(next)(action);
      expect(dispatch).toBeCalledTimes(0);
      expect(next).toBeCalledWith(action);
      expect(result).toBe('NEXT');
      await tick();
      expect(dispatch).toBeCalledTimes(0);
    });

    test('skip functional actions', async () => {
      const dispatch = jest.fn();
      const getState = jest.fn(() => ({
        loadProtector: {
          isCounting: true,
        },
      }));
      const next = jest.fn(() => 'NEXT');
      const action = () => {};
      const result = protectLoadEnd({ dispatch, getState })(next)(action);
      expect(dispatch).toBeCalledTimes(0);
      expect(next).toBeCalledWith(action);
      expect(result).toBe('NEXT');
      await tick();
      expect(dispatch).toBeCalledTimes(0);
    });

    test('resetting', async () => {
      const dispatch = jest.fn();
      const getState = jest.fn(() => ({
        loadProtector: {
          resetBeforeFetch: true,
        },
      }));
      const next = jest.fn(() => 'NEXT');
      const action = { type: 'GET_CONTENT_PENDING' };
      const result = protectLoadEnd({ dispatch, getState })(next)(action);
      expect(dispatch).toBeCalledWith({ type: 'RESET_CONTENT' });
      expect(next).toBeCalledWith(action);
      expect(result).toBe('NEXT');
      await tick();
      expect(dispatch).toBeCalledTimes(1);
    });

    test('not resetting on content-content transition ', async () => {
      const dispatch = jest.fn();
      const getState = jest.fn(() => ({
        loadProtector: {
          isCounting: true,
          resetBeforeFetch: false,
        },
      }));
      const next = jest.fn(() => 'NEXT');
      const action = { type: 'GET_CONTENT_PENDING' };
      const result = protectLoadEnd({ dispatch, getState })(next)(action);
      expect(dispatch).toBeCalledTimes(0);
      expect(next).toBeCalledWith(action);
      expect(result).toBe('NEXT');
      await tick();
      expect(dispatch).toBeCalledTimes(0);
    });

    test('counting down when success', async () => {
      const dispatch = jest.fn();
      const getState = jest.fn(() => ({
        loadProtector: {
          isCounting: true,
          requestCount: 2,
        },
      }));
      const next = jest.fn(() => 'NEXT');
      const action = { type: 'ANY_SUCCESS' };
      const result = protectLoadEnd({ dispatch, getState })(next)(action);
      expect(dispatch).toBeCalledTimes(0);
      expect(next).toBeCalledWith(action);
      expect(result).toBe('NEXT');
      await tick();
      expect(dispatch).toBeCalledTimes(0);
    });

    test('counting down when failure', async () => {
      const dispatch = jest.fn();
      const getState = jest.fn(() => ({
        loadProtector: {
          isCounting: true,
          requestCount: 2,
        },
      }));
      const next = jest.fn(() => 'NEXT');
      const action = { type: 'ANY_FAIL' };
      const result = protectLoadEnd({ dispatch, getState })(next)(action);
      expect(dispatch).toBeCalledTimes(0);
      expect(next).toBeCalledWith(action);
      expect(result).toBe('NEXT');
      await tick();
      expect(dispatch).toBeCalledTimes(0);
    });

    test('ending protect when success', async () => {
      const dispatch = jest.fn();
      const getState = jest.fn(() => ({
        loadProtector: {
          isCounting: true,
          requestCount: 1,
        },
      }));
      const next = jest.fn(() => 'NEXT');
      const action = { type: 'ANY_SUCCESS' };
      const result = protectLoadEnd({ dispatch, getState })(next)(action);
      expect(dispatch).toBeCalledTimes(0);
      expect(next).toBeCalledWith(action);
      expect(result).toBe('NEXT');
      await tick();
      expect(dispatch).toBeCalledTimes(1);
      expect(dispatch).toBeCalledWith({ type: '@@loadProtector/END' });
    });

    test('ending protect when failure', async () => {
      const dispatch = jest.fn();
      const getState = jest.fn(() => ({
        loadProtector: {
          isCounting: true,
          requestCount: 1,
        },
      }));
      const next = jest.fn(() => 'NEXT');
      const action = { type: 'ANY_FAIL' };
      const result = protectLoadEnd({ dispatch, getState })(next)(action);
      expect(dispatch).toBeCalledTimes(0);
      expect(next).toBeCalledWith(action);
      expect(result).toBe('NEXT');
      await tick();
      expect(dispatch).toBeCalledTimes(1);
      expect(dispatch).toBeCalledWith({ type: '@@loadProtector/END' });
    });
  });

  describe('loadProtector store', () => {
    test('PROTECT_START', () => {
      const state = {
        foo: 'BAR',
        isCounting: false,
      };
      const action = { type: '@@loadProtector/START' };
      const result = loadProtector(state, action);
      expect(result).toEqual({
        foo: 'BAR',
        requestCount: 0,
        isCounting: true,
      });
    });
    test('PROTECT_END', () => {
      const state = {
        foo: 'BAR',
        requestCount: 1,
        isCounting: true,
        resetBeforeFetch: false,
      };
      const action = { type: '@@loadProtector/END' };
      const result = loadProtector(state, action);
      expect(result).toEqual({
        foo: 'BAR',
        requestCount: 0,
        isCounting: false,
        resetBeforeFetch: false,
      });
    });
    test('PROTECT_SKIPPED', () => {
      const state = {
        foo: 'BAR',
        requestCount: 1,
        isCounting: true,
        resetBeforeFetch: false,
      };
      const action = {
        type: '@@loadProtector/SKIPPED',
        location: { pathname: '/NEW-PATH' },
      };
      const result = loadProtector(state, action);
      expect(result).toEqual({
        foo: 'BAR',
        requestCount: 0,
        isCounting: false,
        resetBeforeFetch: false,
        postponedLocation: null,
        location: { pathname: '/NEW-PATH' },
      });
    });
    test('GET_CONTENT_SUCCESS pass when not counting', () => {
      const state = {
        foo: 'BAR',
        isCounting: false,
      };
      const action = {
        type: 'GET_CONTENT_SUCCESS',
      };
      const result = loadProtector(state, action);
      expect(result).toEqual({
        foo: 'BAR',
        isCounting: false,
      });
    });
    test('GET_CONTENT_FAIL pass when not counting', () => {
      const state = {
        foo: 'BAR',
        isCounting: false,
      };
      const action = {
        type: 'GET_CONTENT_FAIL',
      };
      const result = loadProtector(state, action);
      expect(result).toEqual({
        foo: 'BAR',
        isCounting: false,
      });
    });
    test('GET_CONTENT_SUCCESS when counting', () => {
      const state = {
        foo: 'BAR',
        requestCount: 1,
        isCounting: true,
        postponedLocation: { pathname: '/NEW-PATH' },
      };
      const action = {
        type: 'GET_CONTENT_SUCCESS',
      };
      const result = loadProtector(state, action);
      expect(result).toEqual({
        foo: 'BAR',
        requestCount: 0,
        isCounting: true,
        postponedLocation: null,
        location: { pathname: '/NEW-PATH' },
      });
    });
    test('GET_CONTENT_FAIL when counting', () => {
      const state = {
        foo: 'BAR',
        requestCount: 1,
        isCounting: true,
        postponedLocation: { pathname: '/NEW-PATH' },
      };
      const action = {
        type: 'GET_CONTENT_FAIL',
      };
      const result = loadProtector(state, action);
      expect(result).toEqual({
        foo: 'BAR',
        requestCount: 0,
        isCounting: true,
        postponedLocation: null,
        location: { pathname: '/NEW-PATH' },
      });
    });
    test('RESET_CONTENT will remove the reset condition', () => {
      const state = {
        foo: 'BAR',
        resetBeforeFetch: true,
      };
      const action = {
        type: 'RESET_CONTENT',
      };
      const result = loadProtector(state, action);
      expect(result).toEqual({
        foo: 'BAR',
        resetBeforeFetch: false,
      });
    });
    describe('pass when not counting', () => {
      const expectPass = (action, requestCount) => () => {
        const state = {
          foo: 'BAR',
          requestCount,
          isCounting: false,
        };
        const result = loadProtector(state, action);
        expect(result).toEqual({
          foo: 'BAR',
          requestCount,
          isCounting: false,
        });
      };
      test('pending', expectPass({ type: 'ANY_PENDING' }), 2);
      test('success', expectPass({ type: 'ANY_SUCCESS' }), 2);
      test('failure', expectPass({ type: 'ANY_FAIL' }), 2);
    });
    describe('counting', () => {
      const expectCount = (action, from, to) => () => {
        const state = {
          foo: 'BAR',
          requestCount: from,
          isCounting: true,
        };
        const result = loadProtector(state, action);
        expect(result).toEqual({
          foo: 'BAR',
          requestCount: to,
          isCounting: true,
        });
      };
      test('pending counts up', expectCount({ type: 'ANY_PENDING' }, 2, 3));
      test('success counts down', expectCount({ type: 'ANY_SUCCESS' }, 2, 1));
      test('failure counts down', expectCount({ type: 'ANY_FAIL' }, 2, 1));
    });
  });
});
