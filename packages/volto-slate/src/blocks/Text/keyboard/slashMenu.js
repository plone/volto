export const slashMenu = ({ editor, event }) => {
  if (!editor.showSlashMenu) return;

  const { slashArrowUp, slashArrowDown, slashEnter } = editor;

  const handlers = {
    ArrowUp: slashArrowUp,
    ArrowDown: slashArrowDown,
    Enter: slashEnter,
  };

  const handler = handlers[event.key];
  if (handler) {
    event.preventDefault();
    handler();
  }

  return true;
};
