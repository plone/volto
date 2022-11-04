import { useSlate, ReactEditor, useSlateSelection } from 'slate-react';
import { Node } from 'slate';

/**
 * Translates the slate selection (text) to window/screen coordinates
 *
 * TODO: we use the anchor as the base for the position. This could be improved
 */
export const useSelectionPosition = () => {
  let rect = {};

  const editor = useSlate();

  const selection = useSlateSelection();
  if (ReactEditor.isFocused(editor) && selection) {
    const slateNode = Node.get(editor, selection.anchor.path);
    const domEl = ReactEditor.toDOMNode(editor, slateNode);
    rect = domEl.getBoundingClientRect();
  }
  return rect;
};
