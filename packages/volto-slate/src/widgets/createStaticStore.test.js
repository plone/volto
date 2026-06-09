import { createStaticStore } from './createStaticStore';

describe('createStaticStore', () => {
  it('provides a stable Redux store for static rendering', () => {
    const state = { userSession: { token: 'secret-token' } };
    const store = createStaticStore(state);
    const listener = vi.fn();

    const unsubscribe = store.subscribe(listener);

    expect(store.getState()).toEqual(state);

    store.dispatch({ type: 'IGNORED' });

    expect(store.getState()).toEqual(state);
    expect(listener).toHaveBeenCalledTimes(1);

    unsubscribe();
  });
});
