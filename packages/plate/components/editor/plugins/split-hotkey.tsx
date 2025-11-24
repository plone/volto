import { createPlatePlugin } from 'platejs/react';

import { KEYS } from 'platejs';
import { splitEditorAtCursor } from './split-utils';

const isHotkeyEvent = (
  event: KeyboardEvent | { nativeEvent?: KeyboardEvent },
) => {
  const e: any = (event as any)?.nativeEvent ?? event;
  if (!e) return false;

  const mod = e.metaKey || e.ctrlKey;

  return (
    mod &&
    e.shiftKey &&
    (e.key === '\\' || e.key === '|' || e.code === 'Backslash')
  );
};

export const SplitHotkeyPlugin = createPlatePlugin({
  key: 'split_hotkey',
  handlers: {
    onKeyDown: ({ editor, event }) => {
      const nativeEvent = (event as any)?.nativeEvent ?? event;
      if (!nativeEvent) return;

      if (!isHotkeyEvent(nativeEvent as KeyboardEvent)) return;

      if (!editor.selection || !editor.api.isCollapsed()) return;

      event.preventDefault();
      splitEditorAtCursor(editor);
    },
  },
});
