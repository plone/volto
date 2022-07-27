import React from 'react';
import { defaultAnimateLayoutChanges, useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

export default function SortableItem(props) {
  const animateLayoutChanges = (args) =>
    args.isSorting || args.wasDragging
      ? defaultAnimateLayoutChanges(args)
      : true;

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id: props.id, animateLayoutChanges });

  const style = {
    backgroundColor: 'red',
    cursor: 'move',
    height: '200px',
    marginBottom: '20px',
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      {props.id}
    </div>
  );
}
