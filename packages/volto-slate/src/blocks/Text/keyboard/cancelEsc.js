export const cancelEsc = ({ editor, event }) => {
  const props = editor.getBlockProps();
  const { onSelectBlock, onSelectWrapper, id, blockNode } = props;

  event.stopPropagation();
  event.nativeEvent.stopImmediatePropagation();
  event.preventDefault();

  onSelectWrapper(blockNode.current.parentNode, id);
  // onSelectBlock(id, true, event); // selection with active buttons doesn't work

  /* 1. the first focus should go on the outer wrapper
     2. with the tab key you have the possibility to rotate the various buttons,
     3. at the fourth tab you have the focus again on the wrapper,
     4. to enter the slate input field press Enter
     5. otherwise you move with the arrows keys */
};
