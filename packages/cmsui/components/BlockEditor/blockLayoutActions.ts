import type { Content } from '@plone/types';

type BlocksLayout = Content['blocks_layout'];

const reorderBlock = (
  layout: BlocksLayout,
  blockId: string,
  offset: number,
): BlocksLayout => {
  if (!layout?.items?.length) {
    return layout;
  }

  const currentIndex = layout.items.indexOf(blockId);

  if (currentIndex === -1) {
    return layout;
  }

  const targetIndex = currentIndex + offset;

  if (targetIndex < 0 || targetIndex >= layout.items.length) {
    return layout;
  }

  const reorderedItems = [...layout.items];
  const [blockToMove] = reorderedItems.splice(currentIndex, 1);
  reorderedItems.splice(targetIndex, 0, blockToMove);

  return {
    ...layout,
    items: reorderedItems,
  };
};

export const moveBlockUpInLayout = (layout: BlocksLayout, blockId: string) =>
  reorderBlock(layout, blockId, -1);

export const moveBlockDownInLayout = (layout: BlocksLayout, blockId: string) =>
  reorderBlock(layout, blockId, 1);

export const deleteBlockFromLayout = (
  layout: BlocksLayout,
  blockId: string,
): BlocksLayout => {
  if (!layout?.items?.length) {
    return layout;
  }

  const filteredItems = layout.items.filter((item) => item !== blockId);

  if (filteredItems.length === layout.items.length) {
    return layout;
  }

  return {
    ...layout,
    items: filteredItems,
  };
};
