export const softBreak = ({ editor, event }) => {
  if (event.key === 'Enter' && event.shiftKey) {
    event.preventDefault();
    editor.insertText('\n');
    return true;
  }
};
