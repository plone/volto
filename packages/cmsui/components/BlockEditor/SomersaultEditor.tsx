import { useAtom, type PrimitiveAtom } from 'jotai';
import { isDeepEqual, useFieldFocusAtom } from '@plone/helpers';
import type { BlockConfigBase, Content } from '@plone/types';
import * as React from 'react';
import { createPortal } from 'react-dom';
import { BlockEditorContext } from './BlockEditorContext';
import { useBlockEditorContextValue } from './useBlockEditorContextValue';
import {
  ElementApi,
  PlateEditor,
  type Path,
  useEditorRef,
  useEditorSelector,
  type Value,
} from '@plone/plate/components/editor';
import plateBlockNativeConfig from '@plone/blocks/plate/native-editor';
import { TITLE_BLOCK_TYPE } from '@plone/plate/components/editor/plugins/title';
import BlockSettingsForm from './BlockSettingsForm';
import config from '@plone/registry';

type BlockEditorProps = {
  formAtom: PrimitiveAtom<Content>;
};

const SOMERSAULT_KEY = '__somersault__';
const SOMERSAULT_SETTINGS_BLOCK_KEY = '__somersault_selected_block__';

type SelectedNativeBlock = {
  path: Path;
  key: string;
  data: Record<string, unknown> & { '@type': string };
  schema: BlockConfigBase['blockSchema'];
};

function stripSomersaultSettingsBlock<T extends Record<string, unknown> | null>(
  blocks: T,
) {
  if (!blocks) return blocks;
  const nextBlocks = { ...blocks };
  delete nextBlocks[SOMERSAULT_SETTINGS_BLOCK_KEY];
  return nextBlocks as T;
}

const getSelectedNativeBlock = (editor: any): SelectedNativeBlock | null => {
  const entry = editor.api.block({ highest: true });
  if (!entry) return null;

  const [node, path] = entry;
  if (!ElementApi.isElement(node) || node.type !== 'unknown') return null;

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
    path,
    key: path.join('-'),
    data: {
      ...data,
      '@type': blockType,
    },
    schema: blockConfig.blockSchema,
  };
};

const SomersaultBlockSettingsBridge = (props: {
  formAtom: PrimitiveAtom<Content>;
}) => {
  const { formAtom } = props;
  const editor = useEditorRef();
  const blocksAtom = useFieldFocusAtom(formAtom, 'blocks');
  const [blocks, setBlocks] = useAtom(blocksAtom);

  const selectedNativeBlock = useEditorSelector(getSelectedNativeBlock, []);
  const selectionKey = selectedNativeBlock?.key;

  React.useEffect(() => {
    if (!selectedNativeBlock) {
      setBlocks((previousBlocks) =>
        stripSomersaultSettingsBlock(previousBlocks || {}),
      );
      return;
    }

    setBlocks((previousBlocks) => {
      const currentBlocks = previousBlocks || {};
      const currentSettingsData = (currentBlocks as any)[
        SOMERSAULT_SETTINGS_BLOCK_KEY
      ];

      if (isDeepEqual(currentSettingsData, selectedNativeBlock.data)) {
        return previousBlocks;
      }

      return {
        ...currentBlocks,
        [SOMERSAULT_SETTINGS_BLOCK_KEY]: selectedNativeBlock.data,
      } as typeof previousBlocks;
    });
  }, [selectedNativeBlock, setBlocks]);

  React.useEffect(() => {
    if (!selectedNativeBlock) return;

    const settingsData = (blocks as any)?.[SOMERSAULT_SETTINGS_BLOCK_KEY] as
      | (Record<string, unknown> & { '@type': string })
      | undefined;
    if (!settingsData) return;
    if (isDeepEqual(settingsData, selectedNativeBlock.data)) return;

    const patch = { ...settingsData } as Record<string, unknown>;
    delete patch.id;
    delete patch.type;
    delete patch.children;

    editor.tf.setNodes(patch as any, { at: selectedNativeBlock.path });
  }, [blocks, editor, selectedNativeBlock]);

  const sidebar =
    typeof document !== 'undefined' ? document.getElementById('sidebar') : null;

  if (!selectedNativeBlock || !sidebar) return null;

  return createPortal(
    <BlockSettingsForm
      schema={selectedNativeBlock.schema}
      block={SOMERSAULT_SETTINGS_BLOCK_KEY}
      key={selectionKey}
    />,
    sidebar,
  );
};

const BlockEditor = (props: BlockEditorProps) => {
  const blocksAtom = useFieldFocusAtom(props.formAtom, 'blocks');

  const [blocks, setBlocks] = useAtom(blocksAtom);

  // Keep the initial Plate value stable across parent re-renders.
  // If we pass a freshly derived value on each change, Plate treats it as a
  // new controlled value and media nodes (like images) can visually blink.
  const stableInitialValueRef = React.useRef<Value | null>(null);

  if (!stableInitialValueRef.current) {
    stableInitialValueRef.current =
      (((blocks as any)?.[SOMERSAULT_KEY]?.value as Value | undefined) ?? [])
        .length > 0
        ? ((blocks as any)[SOMERSAULT_KEY].value as Value)
        : [
            {
              type: TITLE_BLOCK_TYPE,
              children: [{ text: '' }],
            },
            {
              type: 'p',
              children: [{ text: '' }],
            },
          ];
  }

  const blockEditorContextValue = useBlockEditorContextValue({
    setBlocks,
    // TODO: Update the context so the values are not needed when using the editor in somersault mode.
    // Could be that they are no longer needed (maybe for the future order tab...)
    setBlocksLayout: (update) => update({ items: [] }),
    onSelectBlock: () => {},
  });

  return (
    <BlockEditorContext.Provider value={blockEditorContextValue}>
      <PlateEditor
        editorConfig={plateBlockNativeConfig}
        value={stableInitialValueRef.current}
        onChange={(options) => {
          setBlocks((previousBlocks) => ({
            ...(stripSomersaultSettingsBlock(previousBlocks || {}) || {}),
            [SOMERSAULT_KEY]: {
              '@type': SOMERSAULT_KEY,
              value: options.value as unknown as Value[],
            },
          }));
        }}
      >
        <SomersaultBlockSettingsBridge formAtom={props.formAtom} />
      </PlateEditor>
    </BlockEditorContext.Provider>
  );
};

export default BlockEditor;
