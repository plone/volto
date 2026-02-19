import { useAtom, type PrimitiveAtom } from 'jotai';
import { useFieldFocusAtom } from '@plone/helpers';
import type { Content } from '@plone/types';
import { BlockEditorContext } from './BlockEditorContext';
import { useBlockEditorContextValue } from './useBlockEditorContextValue';
import { PlateEditor, type Value } from '@plone/plate/components/editor';
import plateBlockNativeConfig from '@plone/blocks/plate/native';

type BlockEditorProps = {
  formAtom: PrimitiveAtom<Content>;
};

const BlockEditor = (props: BlockEditorProps) => {
  const blocksAtom = useFieldFocusAtom(props.formAtom, 'blocks');

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [blocks, setBlocks] = useAtom(blocksAtom);

  const blockEditorContextValue = useBlockEditorContextValue({
    setBlocks,
  });

  return (
    <BlockEditorContext.Provider value={blockEditorContextValue}>
      <PlateEditor
        editorConfig={plateBlockNativeConfig.editorConfig}
        value={[]}
        onChange={(options) => {
          setBlocks(options.value as Value[]);
        }}
      />
    </BlockEditorContext.Provider>
  );
};

export default BlockEditor;
