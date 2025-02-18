import { Transforms, Range } from 'slate';

export const withDeleteSelectionOnEnter = (editor) => {
  const { insertBreak } = editor;

  editor.insertBreak = () => {
    // if selection is expanded, delete it
    if (editor?.selection && Range.isExpanded(editor.selection)) {
      Transforms.delete(editor);
    }
    return insertBreak();
  };

  return editor;
};
