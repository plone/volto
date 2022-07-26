import React from 'react';
import { useSlate } from 'slate-react';
import { isBlockActive, toggleInlineFormat } from '@plone/volto-slate/utils';

import ToolbarButton from './ToolbarButton';

const MarkElementButton = ({ format, icon, ...props }) => {
  const editor = useSlate();

  const isActive = isBlockActive(editor, format);

  const handleMouseDown = React.useCallback(
    (event) => {
      event.preventDefault();
      toggleInlineFormat(editor, format);
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

export default MarkElementButton;
