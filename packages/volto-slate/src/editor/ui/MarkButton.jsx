import React from 'react';
import { useSlate } from 'slate-react';

import { isMarkActive, toggleMark } from '@plone/volto-slate/utils';
import ToolbarButton from './ToolbarButton';

const MarkButton = ({ format, icon, ...props }) => {
  const editor = useSlate();

  return (
    <ToolbarButton
      {...props}
      active={isMarkActive(editor, format)}
      onMouseDown={(event) => {
        event.preventDefault();
        toggleMark(editor, format);
      }}
      icon={icon}
    />
  );
};

export default MarkButton;
