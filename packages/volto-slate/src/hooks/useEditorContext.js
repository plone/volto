import React from 'react';
import EditorContext from 'volto-slate/editor/EditorContext';

export const useEditorContext = () => {
  return React.useContext(EditorContext);
};
