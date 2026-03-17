import { useEffect } from 'react';
import { useAtom, useSetAtom, type PrimitiveAtom } from 'jotai';
import { useFieldFocusAtom } from '@plone/helpers';
import EditBlockWrapper from './EditBlockWrapper';
import type { Content } from '@plone/types';
import { BlockEditorContext, selectedBlockAtom } from './BlockEditorContext';
import { useBlockEditorContextValue } from './useBlockEditorContextValue';

type BlockEditorProps = {
  formAtom: PrimitiveAtom<Content>;
};

const BlockEditor = (props: BlockEditorProps) => {
  const blocksLayoutAtom = useFieldFocusAtom(props.formAtom, 'blocks_layout');
  const blocksAtom = useFieldFocusAtom(props.formAtom, 'blocks');

  // TODO: The inferred type for blocks and blocks_layout are not working
  // properly, so we cast them to the expected types.
  // We need to figure out why this is happening (see helpers/atoms.ts)
  // const [blocks] = useAtom(blocksAtom) as unknown as [Content['blocks']];
  const [blocksLayout] = useAtom(blocksLayoutAtom);

  const onSelectBlock = useSetAtom(selectedBlockAtom);
  const setBlocksLayout = useSetAtom(blocksLayoutAtom);
  const setBlocks = useSetAtom(blocksAtom);

  const blockEditorContextValue = useBlockEditorContextValue({
    setBlocks,
    setBlocksLayout,
    onSelectBlock,
  });

  useEffect(() => {
    onSelectBlock(blocksLayout?.items?.[0] || null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <BlockEditorContext.Provider value={blockEditorContextValue}>
      <div>
        {blocksLayout?.items?.map((blockId) => {
          return <EditBlockWrapper key={blockId} block={blockId} />;
        })}
      </div>
    </BlockEditorContext.Provider>
  );
};

export default BlockEditor;
