import { normalizeExternalData as normalize } from '@plone/volto-slate/utils/blocks';

export function normalizeExternalData(editor) {
  editor.normalizeExternalData = (fragment) => {
    return normalize(editor, fragment);
  };
  return editor;
}
