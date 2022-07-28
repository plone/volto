import React from 'react'; // , useState
import { useSlate } from 'slate-react';

/**
 * A component that can lift the editor to higher level
 *
 * Use like:
 * <SlateEditor ...><EditorReference onHasEditor=((editor) =>
 * this.setState({editor}) /></SlateEditor>
 *
 * With this you have access to the Slate editor "out of tree".
 */

const EditorReference = ({ onHasEditor }) => {
  const editor = useSlate();
  React.useEffect(() => {
    onHasEditor(editor);
  }, [onHasEditor, editor]);
  return null;
};

export default EditorReference;
