import { useSlate, ReactEditor, useSlateSelection } from 'slate-react';

/**
 * Translates the slate selection (text) to window/screen coordinates
 *
 * TODO: we use the anchor as the base for the position. This could be improved
 */
export const useSelectionPosition = () => {
  let rect = {};

  const editor = useSlate();

  const selection = useSlateSelection();
  if (selection && ReactEditor.isFocused(editor)) {
    try {
      const [textNode] = ReactEditor.toDOMPoint(editor, selection.anchor);
      const parentNode = textNode.parentNode;
      rect = parentNode.getBoundingClientRect();
    } catch {
      // This happens when the selection is outdated because the nodes have
      // been modified? Seems like a bug in slate, then.
    }
  }
  return rect;
};
