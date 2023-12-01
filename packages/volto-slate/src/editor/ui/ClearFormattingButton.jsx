import React from 'react';
import { useSlate } from 'slate-react';
import { clearFormatting } from '@plone/volto-slate/utils';

import ToolbarButton from './ToolbarButton';

const ClearFormattingButton = ({ icon, ...props }) => {
  const editor = useSlate();

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
