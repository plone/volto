import {
  deletePendingPromise,
  getPendingPromise,
  resetPendingPromises,
  setPendingPromise,
} from './dedupeRequests';

afterEach(() => {
  resetPendingPromises();
});

describe('getPendingPromise', () => {
  it('returns null if the given promise is not pending', () => {
    setPendingPromise(
      'test',
      new Promise(
        () => {},
        () => {},
      ),
    );
    expect(getPendingPromise('testnull')).toBeNull();
  });

  it('returns a promise if the given request is set as pending', () => {
    setPendingPromise(
      'test',
      new Promise(
        () => {},
        () => {},
      ),
    );
    expect(getPendingPromise('test')).not.toBeNull();
  });
});

describe('deletePendingPromise', () => {
  it('stops tracking the given request', () => {
    setPendingPromise(
      'test',
      new Promise(
        () => {},
        () => {},
      ),
    );
    expect(getPendingPromise('test')).not.toBeNull();
    deletePendingPromise('test');
    expect(getPendingPromise('test')).toBeNull();
  });
});
