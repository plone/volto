import { useAtom, type PrimitiveAtom } from 'jotai';
import { useFieldFocusAtom } from '@plone/helpers';
import type { Content } from '@plone/types';
import * as React from 'react';
import { BlockEditorContext } from './BlockEditorContext';
import { useBlockEditorContextValue } from './useBlockEditorContextValue';
import { PlateEditor, type Value } from '@plone/plate/components/editor';
import plateBlockNativeConfig from '@plone/blocks/plate/native-editor';
import { TITLE_BLOCK_TYPE } from '@plone/plate/components/editor/plugins/title';

type BlockEditorProps = {
  formAtom: PrimitiveAtom<Content>;
};

const SOMERSAULT_KEY = '__somersault__';

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
          setBlocks(
            (previousBlocks) =>
              ({
                ...(previousBlocks || {}),
                [SOMERSAULT_KEY]: {
                  '@type': SOMERSAULT_KEY,
                  value: options.value as unknown as Value[],
                },
              }) as typeof previousBlocks,
          );
        }}
      />
    </BlockEditorContext.Provider>
  );
};

export default BlockEditor;
