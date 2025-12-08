import { NodeApi, type SlateEditor } from 'platejs';
import { createPlatePlugin, useEditorRef } from 'platejs/react';
import { useEffect } from 'react';

const EDITABLE_TO_EDITOR = new WeakMap<HTMLElement, SlateEditor>();

const plateCypressAdapter = {
  EDITABLE_TO_EDITOR,
  getNode: NodeApi.get,
};

declare global {
  interface Window {
    plateCypressAdapter?: typeof plateCypressAdapter;
  }
}

export const useCypressAdapter = () => {
  const editor = useEditorRef();

  useEffect(() => {
    if (!editor) return;

    const editable = editor.api.toDOMNode(editor);

    if (!editable) return;

    window.plateCypressAdapter = plateCypressAdapter;
    EDITABLE_TO_EDITOR.set(editable as HTMLElement, editor);

    return () => {
      EDITABLE_TO_EDITOR.delete(editable as HTMLElement);
    };
  }, [editor]);

  return null;
};

export const CypressPlugin = createPlatePlugin({
  key: 'cypress',
  useHooks: useCypressAdapter,
});
