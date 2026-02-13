import { useEffect } from 'react';
import { useAtom, useSetAtom, type PrimitiveAtom } from 'jotai';
import { useFieldFocusAtom } from '@plone/helpers';
import EditBlockWrapper from './EditBlockWrapper';
import type { Content } from '@plone/types';
import { BlockEditorContext, selectedBlockAtom } from './BlockEditorContext';
import { useBlockEditorContextValue } from './useBlockEditorContextValue';
import { PlateEditor, type Value } from '@plone/plate/components/editor';
import plateBlockConfig from '@plone/plate/config/presets/block';

type BlockEditorProps = {
  formAtom: PrimitiveAtom<Content>;
};

const BlockEditor = (props: BlockEditorProps) => {
  const blocksAtom = useFieldFocusAtom(props.formAtom, 'blocks');

  const [blocks, setBlocks] = useAtom(blocksAtom);

  const blockEditorContextValue = useBlockEditorContextValue({
    setBlocks,
  });

  return (
    <BlockEditorContext.Provider value={blockEditorContextValue}>
      <PlateEditor
        editorConfig={plateBlockConfig.editorConfig}
        value={[]}
        onChange={(options) => {
          setBlocks(options.value as Value[]);
        }}
      />
    </BlockEditorContext.Provider>
  );
};

export default BlockEditor;
