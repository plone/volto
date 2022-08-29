import React from 'react';
import EditorContext from '@plone/volto-slate/editor/EditorContext';

export const useEditorContext = () => {
  return React.useContext(EditorContext);
};
