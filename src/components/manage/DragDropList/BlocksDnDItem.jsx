import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

const BlocksDnDItem = (props) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: props.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    userSelect: 'none',
  };

  return (
    <div ref={setNodeRef} style={style}>
      BlocksDnDItem
    </div>
  );
};

export default BlocksDnDItem;
