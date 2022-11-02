import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

import { Icon } from '@plone/volto/components';
import { Button } from 'semantic-ui-react';

import dragSVG from '@plone/volto/icons/drag.svg';

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
    transform: CSS.Translate.toString(transform),
    transition,
  };
  const Block = props.children;
  // debugger;
  console.log(props);
  return (
    <div ref={setNodeRef} style={style ? style : null}>
      <div {...listeners} {...attributes}>
        <Icon name={dragSVG} size="19px" />
      </div>
      <Block {...props} />
    </div>
  );
}
