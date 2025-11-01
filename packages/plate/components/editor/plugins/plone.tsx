import { createPlatePlugin } from 'platejs/react';

export const PloneEditorPlugin = (
  onFocusSidebar: () => void,
  onFocusHelpers: () => void,
  onFocusNextBlock: () => void,
  onFocusPreviousBlock: () => void,
) =>
  createPlatePlugin({
    key: 'ploneEditor',
    handlers: {
      onKeyDown: ({ editor, event }) => {
        if (event.key === 'Tab') {
          // Do we actually need to prevent default here?
          event.preventDefault();
          if (!event.shiftKey) {
            onFocusSidebar();
          } else {
            console.log('Shift+Tab pressed, TODO move to helpers');
            onFocusHelpers();
          }
        }
        if (
          event.key === 'ArrowDown' &&
          editor.api.isCollapsed() &&
          editor.api.isAt({ end: true })
        ) {
          console.log('ArrowDown pressed, TODO move to next block');
          onFocusNextBlock();
        }
        if (
          event.key === 'ArrowUp' &&
          editor.api.isCollapsed() &&
          editor.api.isAt({ start: true })
        ) {
          console.log('ArrowUp pressed, TODO move to previous block');
          onFocusPreviousBlock();
        }
      },
    },
  });
