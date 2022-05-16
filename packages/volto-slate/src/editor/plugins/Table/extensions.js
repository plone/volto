import { blockTagDeserializer } from '@plone/volto-slate/editor/deserialize';
import {
  TABLE,
  TR,
  TD,
  TFOOT,
  THEAD,
  TBODY,
  TH,
} from '@plone/volto-slate/constants';
import { Editor, Point, Range } from 'slate';

export const withTable = (editor) => {
  const { deleteBackward, deleteForward, insertBreak } = editor;

  // paste support
  editor.htmlTagsToSlate = {
    ...editor.htmlTagsToSlate,
    TABLE: blockTagDeserializer(TABLE),
    THEAD: blockTagDeserializer(THEAD),
    TFOOT: blockTagDeserializer(TFOOT),
    TBODY: blockTagDeserializer(TBODY),
    TR: blockTagDeserializer(TR),
    TH: blockTagDeserializer(TH),
    TD: blockTagDeserializer(TD),
  };

  editor.deleteBackward = (unit) => {
    const { selection } = editor;

    if (selection && Range.isCollapsed(selection)) {
      const [cell] = Editor.nodes(editor, {
        match: (n) => n.type === TD,
      });

      if (cell) {
        const [, cellPath] = cell;
        const start = Editor.start(editor, cellPath);

        if (Point.equals(selection.anchor, start)) {
          return;
        }
      }
    }

    deleteBackward(unit);
  };

  editor.deleteForward = (unit) => {
    const { selection } = editor;

    if (selection && Range.isCollapsed(selection)) {
      const [cell] = Editor.nodes(editor, {
        match: (n) => n.type === TD,
      });

      if (cell) {
        const [, cellPath] = cell;
        const end = Editor.end(editor, cellPath);

        if (Point.equals(selection.anchor, end)) {
          return;
        }
      }
    }

    deleteForward(unit);
  };

  editor.insertBreak = () => {
    const { selection } = editor;

    if (selection) {
      const [table] = Editor.nodes(editor, {
        match: (n) => n.type === TABLE,
      });

      if (table) {
        return;
      }
    }

    insertBreak();
  };

  return editor;
};
