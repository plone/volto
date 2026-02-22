import React from 'react';
import { useSlate } from 'slate-react';
import {
  isBlockActive,
  toggleInlineFormat,
} from '@plone/volto-slate/utils/blocks';
import EditorContext from '../EditorContext';

import ToolbarButton from './ToolbarButton';

const MarkElementButton = ({ format, icon, ...props }) => {
  const slateEditor = useSlate();
  const contextEditor = React.useContext(EditorContext);
  const editor = slateEditor || contextEditor;

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
