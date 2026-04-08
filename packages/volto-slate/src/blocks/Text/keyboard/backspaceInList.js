import { Transforms } from 'slate';
import config from '@plone/volto/registry';
import {
  isCursorInList,
  isCursorAtListBlockStart,
} from '@plone/volto-slate/utils/lists';
import { deconstructToVoltoBlocks } from '@plone/volto-slate/utils/volto-blocks';

/**
 * Handle the new Volto blocks created by `deconstructToVoltoBlocks`.
 * @param {Editor} editor The Slate editor object
 * @param {string[]} newIds The IDs of the newly created Volto blocks.
 */
const handleNewVoltoBlocks = (editor, newIds) => {
  const props = editor.getBlockProps();
  props.onSelectBlock(newIds[0]);
};

/**
 * Handles the Backspace key press event in the given `editor`.
 *
 * @param {Editor} editor
 * @param {Event} event
 */
export function backspaceInList({ editor, event }) {
  // If the cursor is not in a list, nothing special.
  if (!isCursorInList(editor)) return false;

  if (isCursorAtListBlockStart(editor)) {
    const { slate } = config.settings;
    const blockProps = editor.getBlockProps();
    const { data } = blockProps;

    // Can't split if block is required
    if (data?.required) return;

    // Raise all LI-s as direct children of the editor.
    // TODO: add check for path depth
    // Error: Cannot lift node at a path [0] because it has a depth of less
    // than `2`.
    Transforms.liftNodes(editor, {
      match: (n, path) => {
        // console.log('lift', n, path);
        return path.length > 1 && n.type === slate.listItemType;
      },
    });

    // Convert all the selection to be of type `slate.defaultBlockType` (by
    // default 'p' or paragraph).
    Transforms.setNodes(editor, { type: slate.defaultBlockType });

    deconstructToVoltoBlocks(editor).then((newIds) => {
      handleNewVoltoBlocks(editor, newIds);
    });

    return true;
  }
}
