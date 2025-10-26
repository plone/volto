import { createContext, useCallback, useEffect, useMemo } from 'react';
import { atom, useAtom, useSetAtom, type PrimitiveAtom } from 'jotai';
import { useFieldFocusAtom } from '@plone/helpers';
import EditBlockWrapper from './EditBlockWrapper';
import type { Content } from '@plone/types';
import {
  deleteBlockFromLayout,
  moveBlockDownInLayout,
  moveBlockUpInLayout,
} from './blockLayoutActions';

type BlockEditorProps = {
  formAtom: PrimitiveAtom<Content>;
};

export const selectedBlockAtom = atom<string | null>(null);
export const BlockEditorContext = createContext<{
  moveBlockUp: (blockId: string) => void;
  moveBlockDown: (blockId: string) => void;
  deleteBlock: (blockId: string) => void;
} | null>(null);

const BlockEditor = (props: BlockEditorProps) => {
  const blocksLayoutAtom = useFieldFocusAtom(props.formAtom, 'blocks_layout');
  const blocksAtom = useFieldFocusAtom(props.formAtom, 'blocks');

  // TODO: The inferred type for blocks and blocks_layout are not working
  // properly, so we cast them to the expected types.
  // We need to figure out why this is happening (see helpers/atoms.ts)
  // const [blocks] = useAtom(blocksAtom) as unknown as [Content['blocks']];
  const [blocksLayout] = useAtom(blocksLayoutAtom);
  const setBlocksLayout = useSetAtom(blocksLayoutAtom);
  const setBlocks = useSetAtom(blocksAtom);

  const onSelectBlock = useSetAtom(selectedBlockAtom);

  const moveBlockUp = useCallback(
    (blockId: string) => {
      setBlocksLayout((previousLayout) =>
        moveBlockUpInLayout(previousLayout, blockId),
      );
    },
    [setBlocksLayout],
  );

  const moveBlockDown = useCallback(
    (blockId: string) => {
      setBlocksLayout((previousLayout) =>
        moveBlockDownInLayout(previousLayout, blockId),
      );
    },
    [setBlocksLayout],
  );

  const deleteBlock = useCallback(
    (blockId: string) => {
      setBlocks((previousBlocks) => {
        if (!previousBlocks || !(blockId in previousBlocks)) {
          return previousBlocks;
        }

        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { [blockId]: _removed, ...remainingBlocks } = previousBlocks;
        return remainingBlocks;
      });

      setBlocksLayout((previousLayout) => {
        const updatedLayout = deleteBlockFromLayout(previousLayout, blockId);
        const previousItems = previousLayout?.items ?? [];

        if (previousItems.length) {
          const deletedIndex = previousItems.indexOf(blockId);

          if (deletedIndex !== -1) {
            const nextItems = updatedLayout?.items ?? [];
            const fallbackIndex =
              nextItems.length > 0
                ? Math.min(deletedIndex, nextItems.length - 1)
                : -1;
            const nextSelectedBlock =
              fallbackIndex >= 0 ? nextItems[fallbackIndex] : null;
            onSelectBlock(nextSelectedBlock ?? null);
          }
        } else {
          onSelectBlock(null);
        }

        return updatedLayout;
      });
    },
    [onSelectBlock, setBlocks, setBlocksLayout],
  );

  const blockEditorContextValue = useMemo(
    () => ({
      moveBlockUp,
      moveBlockDown,
      deleteBlock,
    }),
    [moveBlockUp, moveBlockDown, deleteBlock],
  );

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
