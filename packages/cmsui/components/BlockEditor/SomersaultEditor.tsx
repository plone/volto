import { useAtom, type PrimitiveAtom } from 'jotai';
import { useFieldFocusAtom } from '@plone/helpers';
import type { Content } from '@plone/types';
import { BlockEditorContext } from './BlockEditorContext';
import { useBlockEditorContextValue } from './useBlockEditorContextValue';
import { PlateEditor, type Value } from '@plone/plate/components/editor';
import plateBlockNativeConfig from '@plone/blocks/plate/native';
import { TITLE_BLOCK_TYPE } from '@plone/plate/components/editor/plugins/title';

type BlockEditorProps = {
  formAtom: PrimitiveAtom<Content>;
};

const SOMERSAULT_KEY = '__somersault__';

const BlockEditor = (props: BlockEditorProps) => {
  const blocksAtom = useFieldFocusAtom(props.formAtom, 'blocks');

  const [blocks, setBlocks] = useAtom(blocksAtom);

  const initialValue: Value =
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

  const blockEditorContextValue = useBlockEditorContextValue({
    setBlocks,
  });

  return (
    <BlockEditorContext.Provider value={blockEditorContextValue}>
      <PlateEditor
        editorConfig={plateBlockNativeConfig.editorConfig}
        value={initialValue}
        onChange={(options) => {
          setBlocks((previousBlocks) => ({
            ...(previousBlocks || {}),
            [SOMERSAULT_KEY]: {
              '@type': SOMERSAULT_KEY,
              value: options.value as Value[],
            },
          }));
        }}
      />
    </BlockEditorContext.Provider>
  );
};

export default BlockEditor;
