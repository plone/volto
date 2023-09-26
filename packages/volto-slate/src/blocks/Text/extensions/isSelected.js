export const withIsSelected = (editor) => {
  editor.isSelected = () => {
    const blockProps = editor.getBlockProps();
    return blockProps.selected;
  };
  return editor;
};
