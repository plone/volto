import React from 'react';

import { injectLazyLibs } from '@plone/volto/helpers/Loadable/Loadable';

import { Item } from './Item';

const animateLayoutChanges = ({ isSorting, wasDragging }) =>
  isSorting || wasDragging ? false : true;

export function SortableItem({
  id,
  depth,
  dndKitSortable,
  dndKitUtilities,
  ...props
}) {
  const { useSortable } = dndKitSortable;
  const { CSS } = dndKitUtilities;
  const {
    attributes,
    isDragging,
    isSorting,
    listeners,
    setDraggableNodeRef,
    setDroppableNodeRef,
    transform,
    transition,
  } = useSortable({
    id,
    animateLayoutChanges,
  });
  const style = {
    transform: CSS.Translate.toString(transform),
    transition,
  };

  return (
    <Item
      ref={setDraggableNodeRef}
      wrapperRef={setDroppableNodeRef}
      style={style}
      depth={depth}
      ghost={isDragging}
      disableSelection={false}
      disableInteraction={isSorting}
      id={id}
      handleProps={{
        ...attributes,
        ...listeners,
      }}
      {...props}
    />
  );
}

export default injectLazyLibs(['dndKitSortable', 'dndKitUtilities'])(
  SortableItem,
);
