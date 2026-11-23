/**
 * Tests for BlocksClipboardSync: for authenticated users the blocks clipboard
 * follows the changes other tabs make to it in localStorage, unrelated keys
 * are ignored, and anonymous users get no listener.
 *
 * Author: Giulio Malaguti
 * Last modified: 2026-11-23
 */
import React from 'react';
import { act, render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { createStore, combineReducers } from 'redux';
import blocksClipboard from '@plone/volto/reducers/blocksClipboard/blocksClipboard';
import { loadBlocksClipboardFromStorage } from '@plone/volto/helpers/Blocks/cloneBlocks';
import BlocksClipboardSync from './BlocksClipboardSync';

vi.mock('@plone/volto/helpers/Blocks/cloneBlocks', () => ({
  loadBlocksClipboardFromStorage: vi.fn(),
}));

const COPY_KEY = 'redux_localstorage_simple_blocksClipboard.copy';
const copiedBlocks = [{ '@type': 'slate', plaintext: 'copied' }];

let storedClipboard;

// The storage event only fires in the tabs that did not write the value.
const changeFromOtherTab = (key, clipboard) => {
  storedClipboard = clipboard;
  window.dispatchEvent(new StorageEvent('storage', { key }));
};

const userSession = (state = { token: null }, action) =>
  action.type === 'SET_TOKEN' ? { token: action.token } : state;

const renderWithClipboard = (initialClipboard, token = 'jwt-token') => {
  const store = createStore(combineReducers({ blocksClipboard, userSession }), {
    blocksClipboard: initialClipboard,
    userSession: { token },
  });
  render(
    <Provider store={store}>
      <BlocksClipboardSync />
    </Provider>,
  );
  return store;
};

describe('BlocksClipboardSync', () => {
  beforeEach(() => {
    storedClipboard = undefined;
    loadBlocksClipboardFromStorage.mockImplementation(() => storedClipboard);
  });

  it('loads the blocks copied in another tab', () => {
    const store = renderWithClipboard({});
    changeFromOtherTab(COPY_KEY, { copy: copiedBlocks });
    expect(store.getState().blocksClipboard).toEqual({ copy: copiedBlocks });
  });

  it('empties the clipboard when another tab pastes or resets it', () => {
    storedClipboard = { copy: copiedBlocks };
    const store = renderWithClipboard({ copy: copiedBlocks });
    changeFromOtherTab(COPY_KEY, undefined);
    expect(store.getState().blocksClipboard).toEqual({});
  });

  it('ignores changes to unrelated localStorage keys', () => {
    storedClipboard = { copy: copiedBlocks };
    const store = renderWithClipboard({ copy: copiedBlocks });
    changeFromOtherTab('some_other_key', undefined);
    expect(store.getState().blocksClipboard).toEqual({ copy: copiedBlocks });
  });

  it('loads the stored clipboard on mount', () => {
    storedClipboard = { copy: copiedBlocks };
    const store = renderWithClipboard({});
    expect(store.getState().blocksClipboard).toEqual({ copy: copiedBlocks });
  });

  it('keeps blocks not saved to localStorage yet on mount', () => {
    const store = renderWithClipboard({ copy: copiedBlocks });
    expect(store.getState().blocksClipboard).toEqual({ copy: copiedBlocks });
  });

  it('does not listen for anonymous users', () => {
    const store = renderWithClipboard({}, null);
    changeFromOtherTab(COPY_KEY, { copy: copiedBlocks });
    expect(store.getState().blocksClipboard).toEqual({});
  });

  it('stops listening after logout', () => {
    const store = renderWithClipboard({});
    act(() => {
      store.dispatch({ type: 'SET_TOKEN', token: null });
    });
    changeFromOtherTab(COPY_KEY, { copy: copiedBlocks });
    expect(store.getState().blocksClipboard).toEqual({});
  });
});
