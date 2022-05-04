import React from 'react';
import { useSlate } from 'slate-react';
import { isBlockActive, toggleBlock } from 'volto-slate/utils';

import ToolbarButton from './ToolbarButton';

const BlockButton = ({ format, icon, ...props }) => {
  const editor = useSlate();

  const isActive = isBlockActive(editor, format);

  const handleMouseDown = React.useCallback(
    (event) => {
      event.preventDefault();
      toggleBlock(editor, format);
      // console.log('toggled', format, editor);
    },
    [editor, format], // , isActive
  );

  return (
    <ToolbarButton
      {...props}
      active={isActive}
      onMouseDown={handleMouseDown}
      icon={icon}
    />
  );
};

export default BlockButton;
