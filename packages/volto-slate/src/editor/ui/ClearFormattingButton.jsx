import React from 'react';
import { useSlate } from 'slate-react';
import { clearFormatting } from '@plone/volto-slate/utils/blocks';
import EditorContext from '../EditorContext';

import ToolbarButton from './ToolbarButton';

const ClearFormattingButton = ({ icon, ...props }) => {
  const slateEditor = useSlate();
  const contextEditor = React.useContext(EditorContext);
  const editor = slateEditor || contextEditor;

  const handleMouseDown = React.useCallback(
    (event) => {
      event.preventDefault();
      clearFormatting(editor);
    },
    [editor],
  );

  return <ToolbarButton {...props} onMouseDown={handleMouseDown} icon={icon} />;
};

export default ClearFormattingButton;
