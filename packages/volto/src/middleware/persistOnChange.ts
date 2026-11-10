import type { Dispatch, Middleware } from 'redux';
import get from 'lodash/get';
import { save } from 'redux-localstorage-simple';

type SaveOptions = Parameters<typeof save>[0];

/**
 * Persists `options.states` to localStorage with `redux-localstorage-simple`,
 * but only schedules a save when one of those states actually changed.
 *
 * The decision is taken per action from the current state, so it does not
 * depend on authentication or on which reducers are configured.
 */
const persistOnChange =
  (options: SaveOptions = {}): Middleware =>
  (store) => {
    const states = options.states ?? [];
    const select = (state: unknown): unknown[] =>
      states.length ? states.map((path) => get(state, path)) : [state];

    // `save` reads the state after calling `next`, so a pass-through `next`
    // lets us reuse its debounced write after our own `next(action)` has run.
    const passThrough: Dispatch = (action) => action;
    const scheduleSave = save(options)(store)(passThrough);
    let last = select(store.getState());

    return (next) => (action) => {
      const result = next(action);
      const current = select(store.getState());
      if (current.some((slice, index) => slice !== last[index])) {
        last = current;
        scheduleSave(action);
      }
      return result;
    };
  };

export default persistOnChange;
