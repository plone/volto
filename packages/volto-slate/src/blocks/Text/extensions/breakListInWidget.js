import { Editor, Range, Transforms } from 'slate';

import config from '@plone/volto/registry';
import { isCursorAtBlockEnd } from '@plone/volto-slate/utils/selection';
import { getCurrentListItem } from '@plone/volto-slate/utils/lists';
import { createEmptyParagraph } from '@plone/volto-slate/utils/blocks';

export const breakListInWidget = (editor) => {
  const { insertBreak } = editor;

  editor.insertBreak = () => {
    if (!(editor.selection && Range.isCollapsed(editor.selection))) {
      insertBreak();
      return false;
    }

    const { slate } = config.settings;
    const { anchor } = editor.selection;

    const ref = Editor.rangeRef(editor, editor.selection, {
      affinity: 'inward',
    });

    const [listItem, listItemPath] = getCurrentListItem(editor);
    if (listItem) {
      if (Editor.string(editor, listItemPath)) {
        Transforms.splitNodes(editor, {
          at: editor.selection,
          match: (node) => node.type === slate.listItemType,
          always: true,
        });

        return true;
      }
    }

    const [parent] = Editor.parent(editor, anchor.path);

    if (parent.type !== slate.listItemType || anchor.offset > 0) {
      insertBreak();
      return;
    }

    Editor.deleteBackward(editor, { unit: 'line' });
    // also account for empty nodes [{text: ''}]
    if (Editor.isEmpty(editor, parent)) {
      Transforms.removeNodes(editor, { at: ref.current });

      Transforms.insertNodes(editor, createEmptyParagraph(), {
        at: [editor.children.length],
      });
      Transforms.select(editor, Editor.end(editor, []));

      return true;
    }

    Transforms.removeNodes(editor, { at: ref.current });

    if (isCursorAtBlockEnd(editor)) {
      Editor.insertNode(editor, createEmptyParagraph());
      return true;
    }
    return true;
  };

  return editor;
};
