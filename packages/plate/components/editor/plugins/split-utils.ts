import config from '@plone/registry';
import { KEYS, PathApi } from 'platejs';
import type { PlateEditor } from 'platejs/react';

export const getBlocksApi = (editor: PlateEditor) => {
  const editorApi = (editor as any)?.blocksApi;

  if (editorApi) return editorApi;

  try {
    const utility = config.getUtility({
      name: 'useBlocksApi',
      type: 'blocksApiContext',
    });
    return (utility as any)?.method?.();
  } catch (error) {
    return null;
  }
};

export const getIntl = (editor: PlateEditor) => (editor as any)?.intl ?? null;

export const splitEditorAtCursor = (editor: PlateEditor) => {
  const api = getBlocksApi(editor);

  if (!api) return;
  if (!editor.selection || !editor.api.isCollapsed()) return;

  const slashType = editor.getType(KEYS.slashInput);

  // Remove the slash input node and the trailing character.
  editor.tf.withoutNormalizing(() => {
    editor.tf.removeNodes({
      match: (node) => (node as any)?.type === slashType,
    });
    editor.tf.deleteBackward({ unit: 'character' });
  });

  const block = editor.api.block();

  if (!block) return;

  const blockPath = block[1];

  editor.tf.splitNodes({
    at: editor.selection,
    match: (node) => editor.api.isBlock(node),
    always: true,
  });

  const splitIndex = PathApi.next(blockPath)[0];
  const lower = editor.children.slice(splitIndex);

  if (!lower.length) return;

  editor.tf.withoutNormalizing(() => {
    while (editor.children.length > splitIndex) {
      editor.tf.removeNodes({ at: [splitIndex] });
    }
  });

  const { id, data, type, onInsertBlock, onSelectBlock } = api;
  const blockType = (data as any)['@type'] || type || 'slate';
  const cleanLower = lower
    .map((node: any) => {
      if (Array.isArray(node?.children)) {
        const keptChildren = node.children.filter(
          (child: any) =>
            !(typeof child.text === 'string' && child.text.trim() === ''),
        );
        return keptChildren.length ? { ...node, children: keptChildren } : null;
      }
      return node;
    })
    .filter(Boolean);

  if (!cleanLower.length) return;

  const upperData = { ...data, '@type': blockType, value: editor.children };
  const lowerData = {
    ...data,
    '@type': blockType,
    value: JSON.parse(JSON.stringify(cleanLower)),
  };

  // Defer to the next tick so Plate's own change cycle settles first.
  setTimeout(() => {
    const newId = onInsertBlock(id, lowerData, upperData);
    if (onSelectBlock && newId) {
      onSelectBlock(newId);
    }
  }, 0);
};
