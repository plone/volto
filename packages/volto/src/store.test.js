import { createMemoryHistory } from 'history';
import config from '@plone/volto/registry';
import configureStore from './store';
import {
  SET_BLOCKS_CLIPBOARD,
  LOGIN,
} from '@plone/volto/constants/ActionTypes';

const PREFIX = 'redux_localstorage_simple_';
const DEBOUNCE = 500;
const LOGIN_SUCCESS = `${LOGIN}_SUCCESS`;

const createLocalStorage = (initial = {}) => {
  const data = new Map(Object.entries(initial));
  return {
    getItem: vi.fn((key) => (data.has(key) ? data.get(key) : null)),
    setItem: vi.fn((key, value) => data.set(key, String(value))),
    removeItem: vi.fn((key) => data.delete(key)),
    clear: vi.fn(() => data.clear()),
    get length() {
      return data.size;
    },
    key: vi.fn((index) => Array.from(data.keys())[index] ?? null),
  };
};

const preferenceReducer = (state = {}, action = {}) =>
  action.type === 'SET_PREFERENCE' ? { theme: action.theme } : state;

describe('configureStore persistent reducers', () => {
  let storage;
  let settings;
  let addonReducers;

  beforeEach(() => {
    vi.useFakeTimers();
    storage = createLocalStorage();
    vi.stubGlobal('localStorage', storage);
    settings = config.settings;
    addonReducers = config.addonReducers;
    config.settings = {
      ...settings,
      storeExtenders: [],
      persistentReducers: ['blocksClipboard.cut', 'blocksClipboard.copy'],
    };
  });

  afterEach(() => {
    vi.useRealTimers();
    config.settings = settings;
    config.addonReducers = addonReducers;
  });

  const createStore = (initialState = {}) =>
    configureStore(initialState, createMemoryHistory());

  it('persists changes when an anonymous user logs in without reloading', () => {
    const store = createStore({ userSession: { token: null } });

    store.dispatch({ type: LOGIN_SUCCESS, result: { token: 'secret' } });
    store.dispatch({
      type: SET_BLOCKS_CLIPBOARD,
      copy: [{ '@type': 'slate' }],
    });
    vi.advanceTimersByTime(DEBOUNCE);

    expect(
      JSON.parse(storage.getItem(`${PREFIX}blocksClipboard.copy`)),
    ).toEqual([{ '@type': 'slate' }]);
  });

  it('persists and loads custom persistent reducers for anonymous users', () => {
    config.addonReducers = { preference: preferenceReducer };
    config.settings.persistentReducers = ['preference.theme'];

    const store = createStore({ userSession: { token: null } });
    store.dispatch({ type: 'SET_PREFERENCE', theme: 'dark' });
    vi.advanceTimersByTime(DEBOUNCE);

    expect(JSON.parse(storage.getItem(`${PREFIX}preference.theme`))).toBe(
      'dark',
    );

    const reloaded = createStore({ userSession: { token: null } });
    expect(reloaded.getState().preference).toEqual({ theme: 'dark' });
  });

  it('restores persisted state on boot', () => {
    storage.setItem(
      `${PREFIX}blocksClipboard.cut`,
      JSON.stringify([{ '@type': 'image' }]),
    );

    const store = createStore({ userSession: { token: 'secret' } });

    expect(store.getState().blocksClipboard).toEqual({
      cut: [{ '@type': 'image' }],
    });
  });

  it('does not touch localStorage when the persisted state does not change', () => {
    const store = createStore({ userSession: { token: null } });
    storage.setItem.mockClear();

    store.dispatch({ type: 'UNRELATED_ACTION' });
    store.dispatch({ type: LOGIN_SUCCESS, result: { token: 'secret' } });
    vi.advanceTimersByTime(DEBOUNCE);

    expect(storage.setItem).not.toHaveBeenCalled();
    expect(storage.removeItem).not.toHaveBeenCalled();
  });

  it('removes persisted keys when the state is cleared', () => {
    const store = createStore({ userSession: { token: 'secret' } });
    store.dispatch({
      type: SET_BLOCKS_CLIPBOARD,
      cut: [{ '@type': 'slate' }],
    });
    vi.advanceTimersByTime(DEBOUNCE);
    expect(storage.getItem(`${PREFIX}blocksClipboard.cut`)).not.toBeNull();

    store.dispatch({ type: SET_BLOCKS_CLIPBOARD });
    vi.advanceTimersByTime(DEBOUNCE);

    expect(storage.getItem(`${PREFIX}blocksClipboard.cut`)).toBeNull();
  });

  it('does not warn about missing keys on first run', () => {
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => {});

    createStore({ userSession: { token: null } });

    expect(warn).not.toHaveBeenCalled();
    warn.mockRestore();
  });
});
