import React from 'react';
import { useSlate } from 'slate-react';

import { isMarkActive, toggleMark } from '@plone/volto-slate/utils/marks';
import EditorContext from '../EditorContext';
import ToolbarButton from './ToolbarButton';

const MarkButton = ({ format, icon, ...props }) => {
  const slateEditor = useSlate();
  const contextEditor = React.useContext(EditorContext);
  const editor = slateEditor || contextEditor;

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
