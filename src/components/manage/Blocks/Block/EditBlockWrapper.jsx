import React from 'react';
import { Icon } from '@plone/volto/components';
import { blockHasValue } from '@plone/volto/helpers';

import dragSVG from '@plone/volto/icons/drag.svg';

const EditBlockWrapper = (props) => {
  const { draginfo, block, selected, children } = props;

  return (
    <div
      ref={draginfo.innerRef}
      {...draginfo.draggableProps}
      className={`block-editor-${block['@type']}`}
    >
      <div style={{ position: 'relative' }}>
        <div
          style={{
            visibility: selected && blockHasValue(block) ? 'visible' : 'hidden',
            display: 'inline-block',
          }}
          {...draginfo.dragHandleProps}
          className="drag handle wrapper"
        >
          <Icon name={dragSVG} size="18px" />
        </div>
        {children}
      </div>
    </div>
  );
};

export default EditBlockWrapper;
