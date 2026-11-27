/**
 * Keeps the blocks clipboard (copy/cut) in sync across browser tabs.
 * The clipboard is persisted in localStorage, but every tab writes its own
 * state there on each redux action: a tab opened before the copy, even one
 * not editing, removed it and Paste disappeared in the editor. App mounts
 * this for authenticated users, so every tab follows the clipboard, not only
 * the ones rendering BlocksToolbar.
 *
 * Author: Giulio Malaguti
 * Last modified: 2026-11-23
 */
import React, { useEffect } from 'react';
import { useDispatch, useSelector, useStore } from 'react-redux';
import isEqual from 'lodash/isEqual';
import { setBlocksClipboard } from '@plone/volto/actions/blocksClipboard/blocksClipboard';
import { loadBlocksClipboardFromStorage } from '@plone/volto/helpers/Blocks/cloneBlocks';

const ClipboardStorageListener = () => {
  const dispatch = useDispatch();
  const store = useStore();

  useEffect(() => {
    const syncFromStorage = (event) => {
      if (event?.key && !event.key.includes('blocksClipboard')) {
        return;
      }

      const clipboard = loadBlocksClipboardFromStorage();
      const currentClipboard = store.getState().blocksClipboard || {};

      // Saving to localStorage is debounced: on mount the storage can still be
      // empty while this tab already holds the blocks just copied.
      if (
        !event &&
        !clipboard &&
        (currentClipboard.cut || currentClipboard.copy)
      ) {
        return;
      }

      if (!isEqual(clipboard || {}, currentClipboard)) {
        dispatch(setBlocksClipboard(clipboard || {}));
      }
    };

    syncFromStorage();
    window.addEventListener('storage', syncFromStorage);
    return () => window.removeEventListener('storage', syncFromStorage);
  }, [dispatch, store]);

  return null;
};

const BlocksClipboardSync = () => {
  const token = useSelector((state) => state.userSession?.token);
  return token ? <ClipboardStorageListener /> : null;
};

export default BlocksClipboardSync;
