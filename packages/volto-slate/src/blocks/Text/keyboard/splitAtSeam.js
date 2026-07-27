import ReactDOM from 'react-dom';
import { Editor, Range } from 'slate';
import { splitEditorInTwoFragments } from '@plone/volto-slate/utils/ops';
import { setEditorContent } from '@plone/volto-slate/utils/editor';
import { createAndSelectNewBlockAfter } from '@plone/volto-slate/utils/volto-blocks';

/**
 * Handle Enter after an inline Backspace-merge seam.
 *
 * Detects when the caret is at offset 0 of a leaf that is not the first
 * leaf of a top-level node (e.g., after merging two blocks of same type),
 * and splits the current Slate block into two Volto Slate blocks.
 */
export function splitAtSeam({ editor, event }, intl) {
  const { selection } = editor;
  if (!selection || !Range.isCollapsed(selection)) return;

  const point = selection.anchor;
  if (point.offset !== 0) return;

  // We are interested in positions like [paragraphIndex, leafIndex]
  // where leafIndex > 0 (caret at the beginning of a subsequent leaf)
  if (!point.path || point.path.length < 2) return;

  const leafIndex = point.path[1];
  if (leafIndex <= 0) return; // first leaf, let default handlers run

  // Ensure parent is a top-level block (parent path length 1)
  const parentEntry = Editor.parent(editor, point);
  if (!parentEntry) return;
  const parentPath = parentEntry[1];
  if (!parentPath || parentPath.length !== 1) return;

  event.preventDefault();
  event.stopPropagation();

  ReactDOM.unstable_batchedUpdates(() => {
    const [top, bottom] = splitEditorInTwoFragments(editor);
    createAndSelectNewBlockAfter(editor, bottom, intl);
    setEditorContent(editor, top);
  });

  return true;
}
