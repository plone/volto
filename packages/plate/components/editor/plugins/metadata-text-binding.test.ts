import { describe, expect, it } from 'vitest';

import { getMetadataTextSyncAction } from './metadata-text-binding';

describe('metadata text binding', () => {
  it('does nothing when editor and field are already synchronized', () => {
    expect(
      getMetadataTextSyncAction({
        editorValue: 'Same',
        fieldValue: 'Same',
        isEditorActive: false,
        lastAppliedFromEditor: null,
        lastAppliedFromField: null,
      }),
    ).toBe('none');
  });

  it('does nothing when the bound editor node does not exist', () => {
    expect(
      getMetadataTextSyncAction({
        editorValue: null,
        fieldValue: 'Metadata title',
        isEditorActive: false,
        lastAppliedFromEditor: null,
        lastAppliedFromField: null,
      }),
    ).toBe('none');
  });

  it('prefers editor updates while the bound block is active', () => {
    expect(
      getMetadataTextSyncAction({
        editorValue: 'Typed in editor',
        fieldValue: 'Old title',
        isEditorActive: true,
        lastAppliedFromEditor: null,
        lastAppliedFromField: null,
      }),
    ).toBe('editor-to-field');
  });

  it('prefers metadata updates while the bound block is inactive', () => {
    expect(
      getMetadataTextSyncAction({
        editorValue: 'Old title',
        fieldValue: 'Updated metadata title',
        isEditorActive: false,
        lastAppliedFromEditor: null,
        lastAppliedFromField: null,
      }),
    ).toBe('field-to-editor');
  });

  it('ignores field echoes that originated from the editor', () => {
    expect(
      getMetadataTextSyncAction({
        editorValue: 'Typed in editor',
        fieldValue: 'Typed in editor',
        isEditorActive: true,
        lastAppliedFromEditor: 'Typed in editor',
        lastAppliedFromField: null,
      }),
    ).toBe('none');
  });

  it('ignores editor echoes that originated from metadata', () => {
    expect(
      getMetadataTextSyncAction({
        editorValue: 'Updated metadata title',
        fieldValue: 'Updated metadata title',
        isEditorActive: false,
        lastAppliedFromEditor: null,
        lastAppliedFromField: 'Updated metadata title',
      }),
    ).toBe('none');
  });

  it('keeps pushing the latest editor value while a stale field echo lags behind', () => {
    expect(
      getMetadataTextSyncAction({
        editorValue: 'Newer editor value',
        fieldValue: 'Older editor value',
        isEditorActive: true,
        lastAppliedFromEditor: 'Newer editor value',
        lastAppliedFromField: null,
      }),
    ).toBe('editor-to-field');
  });
});
