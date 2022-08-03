import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

export default function SortableItem(props) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id: props.id });

  const style = {
    // backgroundColor: 'red',
    // cursor: 'move',
    // height: '200px',
    // marginBottom: '20px',
    transform: CSS.Transform.toString(transform),
    transition,
  };
  const Block = props.children;
  // debugger;
  console.log(props);
  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <Block {...props} />
    </div>
  );
}
