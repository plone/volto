import { useMemo } from 'react';
import type { Content } from '@plone/types';
import type { BlockEditorContextValue } from './BlockEditorContext';
import {
  deleteBlockFromLayout,
  moveBlockDownInLayout,
  moveBlockUpInLayout,
} from './blockLayoutActions';

type Blocks = Content['blocks'];
type BlocksLayout = Content['blocks_layout'];

type AtomSetter<Value> = (update: (previous: Value) => Value) => void;

type CreateBlockEditorContextValueArgs = {
  setBlocks: AtomSetter<Blocks>;
  setBlocksLayout: AtomSetter<BlocksLayout>;
  onSelectBlock: (blockId: string | null) => void;
};

export const createBlockEditorContextValue = ({
  setBlocks,
  setBlocksLayout,
  onSelectBlock,
}: CreateBlockEditorContextValueArgs): BlockEditorContextValue => {
  const moveBlockUp = (blockId: string) => {
    setBlocksLayout((previousLayout) =>
      moveBlockUpInLayout(previousLayout, blockId),
    );
  };

  const moveBlockDown = (blockId: string) => {
    setBlocksLayout((previousLayout) =>
      moveBlockDownInLayout(previousLayout, blockId),
    );
  };

  const deleteBlock = (blockId: string) => {
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
  };

  return {
    moveBlockUp,
    moveBlockDown,
    deleteBlock,
  };
};

type UseBlockEditorContextValueArgs = {
  setBlocks: AtomSetter<Blocks>;
  setBlocksLayout: AtomSetter<BlocksLayout>;
  onSelectBlock: (blockId: string | null) => void;
};

export const useBlockEditorContextValue = ({
  setBlocks,
  setBlocksLayout,
  onSelectBlock,
}: UseBlockEditorContextValueArgs): BlockEditorContextValue => {
  return useMemo(
    () =>
      createBlockEditorContextValue({
        setBlocksLayout,
        setBlocks,
        onSelectBlock,
      }),
    [onSelectBlock, setBlocks, setBlocksLayout],
  );
};
