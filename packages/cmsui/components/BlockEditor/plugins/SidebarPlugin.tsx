import * as React from 'react';
import { createPortal } from 'react-dom';
import {
  BlockSelectionPlugin,
  createPlatePlugin,
  ElementApi,
  useEditorRef,
  useEditorSelector,
} from '@plone/plate/components/editor';
import type { BlockConfigBase } from '@plone/types';
import config from '@plone/registry';
import BlockSettingsForm from '../BlockSettingsForm';

type SelectedNativeBlock = {
  key: string;
  path: number[];
  data: Record<string, unknown> & { '@type': string };
  schema: BlockConfigBase['blockSchema'];
};

const isUnknownElement = (node: unknown) =>
  ElementApi.isElement(node) && node.type === 'unknown';

const getUnknownFromBlockSelection = (editor: any): [any, number[]] | null => {
  const entries =
    editor
      .getApi(BlockSelectionPlugin)
      ?.blockSelection?.getNodes?.({ selectionFallback: true, sort: true }) ??
    [];

  for (let index = entries.length - 1; index >= 0; index -= 1) {
    const [node, path] = entries[index];
    if (isUnknownElement(node)) return [node, path];
  }

  return null;
};

const getUnknownFromActiveElement = (editor: any): [any, number[]] | null => {
  if (typeof document === 'undefined') return null;

  const activeElement = document.activeElement as HTMLElement | null;
  const blockElement = activeElement?.closest?.('[data-slate-node="element"]');
  if (!blockElement) return null;

  try {
    const node = editor.api.toSlateNode(blockElement);
    if (!isUnknownElement(node)) return null;
    const path = editor.api.findPath(node);
    return path ? [node, path] : null;
  } catch {
    return null;
  }
};

const getSelectedNativeBlock = (editor: any): SelectedNativeBlock | null => {
  const entry =
    getUnknownFromBlockSelection(editor) ??
    getUnknownFromActiveElement(editor) ??
    editor.api.block({ highest: true });
  if (!entry) return null;

  const [node, path] = entry;
  if (!isUnknownElement(node)) return null;

  const blockType = node['@type'];
  if (typeof blockType !== 'string') return null;

  const blockConfig = (
    config.blocks.blocksConfig as unknown as Record<string, BlockConfigBase>
  )?.[blockType];
  if (!blockConfig?.blockSchema) return null;

  const data = { ...node } as Record<string, unknown>;
  delete data.id;
  delete data.type;
  delete data.children;

  return {
    key: path.join('-'),
    path,
    data: {
      ...data,
      '@type': blockType,
    },
    schema: blockConfig.blockSchema,
  };
};

export function SidebarAfterEditable() {
  const editor = useEditorRef();
  const selectedNativeBlock = useEditorSelector(getSelectedNativeBlock, []);

  const onFormDataChange = React.useCallback(
    (next: Record<string, unknown>) => {
      if (!selectedNativeBlock) return;
      const patch = { ...next };
      delete patch.id;
      delete patch.type;
      delete patch.children;
      editor.tf.setNodes(patch as any, { at: selectedNativeBlock.path });
    },
    [editor, selectedNativeBlock],
  );

  const sidebar =
    typeof document === 'undefined'
      ? null
      : (document.getElementById('sidebar') ??
        document.querySelector<HTMLElement>('[aria-label="Sidebar"]'));

  if (!sidebar) return null;
  if (!selectedNativeBlock) return null;

  return createPortal(
    <BlockSettingsForm
      key={selectedNativeBlock.key}
      schema={selectedNativeBlock.schema}
      formData={selectedNativeBlock.data}
      onFormDataChange={onFormDataChange}
    />,
    sidebar,
  );
}

export const SidebarPlugin = createPlatePlugin({
  key: 'cmsui-sidebar',
  render: {
    afterEditable: SidebarAfterEditable,
  },
});
