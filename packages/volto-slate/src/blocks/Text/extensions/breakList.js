import { Editor, Range, Transforms } from 'slate';
import config from '@plone/volto/registry';
import {
  isCursorAtBlockEnd,
  splitEditorInTwoFragments,
  setEditorContent,
  createAndSelectNewBlockAfter,
  getCurrentListItem,
  createEmptyParagraph,
} from '@plone/volto-slate/utils';

/**
 * Handles `Enter` key on empty and non-empty list items.
 *
 * @param {Editor} editor The editor which should be modified by this extension
 * with a new version of the `insertBreak` method of the Slate editor.
 *
 * @description If the selection does not exist or is expanded, handle with the
 * default behavior. If the selection is inside a LI and it starts at a non-0
 * offset, split the LI. If the selection anchor is not in a LI or it is not at
 * offset 0, handle with the default behavior. Else delete the line before the
 * text cursor and then split the editor in two fragments, and convert them to
 * separate Slate Text blocks, based on the selection.
 */
export const breakList = (editor) => {
  const { insertBreak } = editor;

  editor.insertBreak = () => {
    // If the selection does not exist or is expanded, handle with the default
    // behavior.
    if (!(editor.selection && Range.isCollapsed(editor.selection))) {
      insertBreak();
      return false;
    }

    const { slate } = config.settings;
    const { anchor } = editor.selection;
    const blockProps = editor.getBlockProps();
    const detached = blockProps.detached;

    const ref = Editor.rangeRef(editor, editor.selection, {
      affinity: 'inward',
    });

    // If the selection is inside a LI and it starts at a non-0 offset, split
    // the LI. (if one of the parents is a list item, break that list item)
    const [listItem, listItemPath] = getCurrentListItem(editor);
    if (listItem) {
      // if there is text in the selection
      if (Editor.string(editor, listItemPath)) {
        Transforms.splitNodes(editor, {
          at: editor.selection,
          match: (node) => node.type === slate.listItemType,
          always: true, // in case cursor is at end of line
        });

        return true;
      }
    }

    // If the selection anchor is not in a LI or it is not at offset 0, handle
    // with the default behavior.
    const [parent] = Editor.parent(editor, anchor.path); // , parentPath

    if (parent.type !== slate.listItemType || anchor.offset > 0) {
      insertBreak();
      return; // applies default behaviour, as defined in insertBreak.js extension
    }

    if (parent && !detached) {
      const { data } = blockProps;
      // Don't add new block if not allowed
      if (data?.disableNewBlocks) {
        return insertBreak();
      }
    }

    Editor.deleteBackward(editor, { unit: 'line' });
    // also account for empty nodes [{text: ''}]
    if (Editor.isEmpty(editor, parent)) {
      if (detached) {
        Transforms.removeNodes(editor, { at: ref.current });

        Transforms.insertNodes(editor, createEmptyParagraph(), {
          at: [editor.children.length],
        });
        Transforms.select(editor, Editor.end(editor, []));
      } else {
        createAndSelectNewBlockAfter(editor, [createEmptyParagraph()]);
        Transforms.removeNodes(editor, { at: ref.current });
      }
      return true;
    }

    Transforms.removeNodes(editor, { at: ref.current });

    if (isCursorAtBlockEnd(editor)) {
      if (detached) {
        Editor.insertNode(editor, createEmptyParagraph());
      } else {
        createAndSelectNewBlockAfter(editor, [createEmptyParagraph()]);
      }
      return true;
    }

    if (!detached) {
      const [top, bottom] = splitEditorInTwoFragments(editor, ref.current);
      setEditorContent(editor, top);
      createAndSelectNewBlockAfter(editor, bottom);
    }
    return true;
  };

  return editor;
};
