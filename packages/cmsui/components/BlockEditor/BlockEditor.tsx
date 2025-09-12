import { useEffect } from 'react';
import { atom, useAtom, useSetAtom, type PrimitiveAtom } from 'jotai';
import { useFieldFocusAtom } from '@plone/helpers';
import EditBlockWrapper from './EditBlockWrapper';
import type { Content } from '@plone/types';

type BlockEditorProps = {
  formAtom: PrimitiveAtom<Content>;
};

export const selectedBlockAtom = atom<string | null>(null);

const BlockEditor = (props: BlockEditorProps) => {
  const blocksLayoutAtom = useFieldFocusAtom(props.formAtom, 'blocks_layout');

  // TODO: The inferred type for blocks and blocks_layout are not working
  // properly, so we cast them to the expected types.
  // We need to figure out why this is happening (see helpers/atoms.ts)
  // const [blocks] = useAtom(blocksAtom) as unknown as [Content['blocks']];
  const [blocksLayout] = useAtom(blocksLayoutAtom) as unknown as [
    Content['blocks_layout'],
  ];

  const onSelectBlock = useSetAtom(selectedBlockAtom);

  useEffect(() => {
    onSelectBlock(blocksLayout?.items?.[0] || null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      {blocksLayout?.items?.map((blockId) => {
        return <EditBlockWrapper key={blockId} block={blockId} />;
      })}
    </div>
  );
};

export default BlockEditor;
