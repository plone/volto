import { Transforms, createEditor } from 'slate'; // , Transforms
import { withReact, ReactEditor } from 'slate-react';

import config from '@plone/volto/registry';

export function setEditorContent(editor, block) {
  Transforms.removeNodes(editor, { at: [0] }); // TODO: at: [] needs rethinking
  Transforms.insertNodes(editor, block);
}

export function makeEditor(options = {}) {
  const { extensions = [] } = options;
  const { slate } = config.settings;
  const defaultExtensions = slate.extensions;

  const editor = withReact(createEditor());

  // TODO: also look for MIME Types in the files case
  editor.dataTransferFormatsOrder = [
    'application/x-slate-fragment',
    'text/html',
    'files',
    'text/plain',
  ];
  editor.dataTransferHandlers = {};

  const plugins = [...defaultExtensions, ...extensions];
  editor.isSelected = () => ReactEditor.isFocused(editor);

  return plugins.reduce((acc, extender) => extender(acc), editor);
}
