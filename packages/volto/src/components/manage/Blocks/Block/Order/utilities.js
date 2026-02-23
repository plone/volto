import isArray from 'lodash/isArray';

import { getBlocksLayoutFieldname } from '@plone/volto/helpers/Blocks/Blocks';

function getDragDepth(offset, indentationWidth) {
  return Math.round(offset / indentationWidth);
}

export function getProjection(
  items,
  activeId,
  overId,
  dragOffset,
  indentationWidth,
  arrayMove,
) {
  const overItemIndex = items.findIndex(({ id }) => id === overId);
  const activeItemIndex = items.findIndex(({ id }) => id === activeId);
  const activeItem = items[activeItemIndex];
  const newItems = arrayMove(items, activeItemIndex, overItemIndex);
  const previousItem = newItems[overItemIndex - 1];
  const nextItem = newItems[overItemIndex + 1];
  const dragDepth = getDragDepth(dragOffset, indentationWidth);
  const projectedDepth = activeItem.depth + dragDepth;
  const maxDepth = getMaxDepth({
    previousItem,
  });
  const minDepth = getMinDepth({ nextItem });
  let depth = projectedDepth;

  if (projectedDepth >= maxDepth) {
    depth = maxDepth;
  } else if (projectedDepth < minDepth) {
    depth = minDepth;
  }

  return { depth, maxDepth, minDepth, ...getParent() };

  function getParent() {
    if (depth === 0 || !previousItem) {
      return {
        parentId: null,
        parentType: null,
      };
    }

    if (depth <= previousItem.depth) {
      return {
        parentId: previousItem.parentId,
        parentType: previousItem.parentType,
      };
    }

    if (depth > previousItem.depth) {
      return {
        parentId: previousItem.id,
        parentType: previousItem.data?.['@type'] || null,
      };
    }

    const newParent = newItems
      .slice(0, overItemIndex)
      .reverse()
      .find((item) => item.depth === depth);

    return newParent
      ? {
          parentId: newParent.parentId,
          parentType: newParent.parentType,
        }
      : {
          parentId: null,
          parentType: null,
        };
  }
}

function getMaxDepth({ previousItem }) {
  const blocksLayoutFieldname = getBlocksLayoutFieldname(
    previousItem?.data || {},
  );
  if (previousItem) {
    return isArray(previousItem.data?.[blocksLayoutFieldname]?.items)
      ? previousItem.depth + 1
      : previousItem.depth;
  }

  return 0;
}

function getMinDepth({ nextItem }) {
  if (nextItem) {
    return nextItem.depth;
  }

  return 0;
}

function flatten(items = [], parentId = null, parentType = null, depth = 0) {
  return items.reduce((acc, item, index) => {
    return [
      ...acc,
      { ...item, parentId, parentType, depth, index },
      ...flatten(item.children, item.id, item.data?.['@type'], depth + 1),
    ];
  }, []);
}

export function flattenTree(items) {
  return flatten(items);
}

export function findItem(items, itemId) {
  return items.find(({ id }) => id === itemId);
}

export function removeChildrenOf(items, ids) {
  const excludeParentIds = [...ids];

  return items.filter((item) => {
    if (item.parentId && excludeParentIds.includes(item.parentId)) {
      if (item.children.length) {
        excludeParentIds.push(item.id);
      }
      return false;
    }

    return true;
  });
}
