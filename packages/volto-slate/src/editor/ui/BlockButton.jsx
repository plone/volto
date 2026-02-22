import React from 'react';
import { useSlate } from 'slate-react';
import { isBlockActive, toggleBlock } from '@plone/volto-slate/utils/blocks';
import EditorContext from '../EditorContext';

import ToolbarButton from './ToolbarButton';

const BlockButton = ({ format, icon, allowedChildren, ...props }) => {
  const slateEditor = useSlate();
  const contextEditor = React.useContext(EditorContext);
  const editor = slateEditor || contextEditor;

  const isActive = isBlockActive(editor, format);

  const handleMouseDown = React.useCallback(
    (event) => {
      event.preventDefault();
      toggleBlock(editor, format, allowedChildren);
      // console.log('toggled', format, editor);
    },
    [editor, format, allowedChildren], // , isActive
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
