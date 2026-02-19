import { describe, expect, it } from 'vitest';

import {
  TITLE_BLOCK_TYPE,
  getTitleSyncAction,
  BaseTitleBlockPlugin,
} from './title';

describe('title block plugin', () => {
  it('exposes the expected title block type key', () => {
    expect(TITLE_BLOCK_TYPE).toBe('volto_title');
    expect(BaseTitleBlockPlugin.key).toBe(TITLE_BLOCK_TYPE);
  });

  describe('sync direction', () => {
    it('returns none when no title block exists in editor', () => {
      expect(
        getTitleSyncAction({
          previousAtomTitle: 'Metadata title',
          previousEditorTitle: null,
          atomTitle: 'Metadata title',
          editorTitle: null,
        }),
      ).toBe('none');
    });

    it('initializes a new empty title block from existing metadata title', () => {
      expect(
        getTitleSyncAction({
          previousAtomTitle: 'Metadata title',
          previousEditorTitle: null,
          atomTitle: 'Metadata title',
          editorTitle: '',
        }),
      ).toBe('atom-to-editor');
    });

    it('syncs metadata form updates into the title block', () => {
      expect(
        getTitleSyncAction({
          previousAtomTitle: 'Old metadata title',
          previousEditorTitle: 'Old metadata title',
          atomTitle: 'Updated metadata title',
          editorTitle: 'Old metadata title',
        }),
      ).toBe('atom-to-editor');
    });

    it('syncs title block typing back into metadata', () => {
      expect(
        getTitleSyncAction({
          previousAtomTitle: 'Old title',
          previousEditorTitle: 'Old title',
          atomTitle: 'Old title',
          editorTitle: 'Typed in editor',
        }),
      ).toBe('editor-to-atom');
    });

    it('returns none when title block and metadata are already synchronized', () => {
      expect(
        getTitleSyncAction({
          previousAtomTitle: 'Same',
          previousEditorTitle: 'Same',
          atomTitle: 'Same',
          editorTitle: 'Same',
        }),
      ).toBe('none');
    });
  });
});
