export function normalizeExternalData(editor) {
  editor.normalizeExternalData = (fragment) => {
    return fragment; // don't normalize in text block
  };

  return editor;
}
