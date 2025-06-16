// It's a wrapper around `Editor.nodes` that catches errors when the selection is invalid or out of bounds.
import { Editor } from 'slate';

export function safeEditorNodes(editor, options) {
  try {
    return Array.from(Editor.nodes(editor, options));
  } catch (e) {
    // eslint-disable-next-line no-console
    console.warn('safeEditorNodes: selection invalid or out of bounds:', {
      options,
      selection: editor.selection,
      error: e,
    });
    return [];
  }
}
