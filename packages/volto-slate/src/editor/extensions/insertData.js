import { Editor, Text, Transforms } from 'slate';
import { deserialize } from 'volto-slate/editor/deserialize';
import {
  createDefaultBlock,
  MIMETypeName,
  normalizeExternalData,
} from 'volto-slate/utils';

export const insertData = (editor) => {
  editor.dataTransferHandlers = {
    ...editor.dataTransferHandlers,
    'application/x-slate-fragment': (dt, fullMime) => {
      const decoded = decodeURIComponent(window.atob(dt));
      const parsed = JSON.parse(decoded);
      editor.beforeInsertFragment && editor.beforeInsertFragment(parsed);
      editor.insertFragment(parsed);

      return true;
    },
    'text/html': (dt, fullMime) => {
      const parsed = new DOMParser().parseFromString(dt, 'text/html');

      const body =
        parsed.getElementsByTagName('google-sheets-html-origin').length > 0
          ? parsed.querySelector('google-sheets-html-origin > table')
          : parsed.body;

      let fragment;

      const val = deserialize(editor, body);
      fragment = Array.isArray(val) ? val : [val];

      // external normalization
      fragment = normalizeExternalData(editor, fragment);

      editor.insertFragment(fragment);

      return true;
    },
    'text/plain': (dt, fullMime) => {
      const text = dt;
      if (!text) return;

      const paras = text.split('\n');
      const fragment = paras.map((p) => createDefaultBlock([{ text: p }]));
      // return insertData(data);

      // check if fragment is p with text and insert as fragment if so

      const fragmentContainsText = (f) => {
        var trigger = false;
        if (f && f[0]) {
          f.forEach((frag) => {
            if (frag.type === 'p') {
              if (frag.children) {
                frag.children.forEach((child) => {
                  if (child.text) {
                    trigger = true;
                  }
                });
              }
            }
          });
        }
        return trigger;
      };

      // When there's already text in the editor, insert a fragment, not nodes
      const containsText = fragmentContainsText(fragment);
      if (fragment && containsText) {
        Transforms.insertFragment(editor, fragment);
      }

      if (Editor.string(editor, [])) {
        if (
          Array.isArray(fragment) &&
          fragment.findIndex((b) => Editor.isInline(b) || Text.isText(b)) > -1
        ) {
          // console.log('insert fragment', fragment);
          // TODO: we want normalization also when dealing with fragments
          Transforms.insertFragment(editor, fragment);
          return true;
        }
      }

      const nodes = normalizeExternalData(editor, fragment);
      if (!containsText) {
        Transforms.insertNodes(editor, nodes);
      }

      return true;
    },
  };

  // TODO: use the rtf data to get the embedded images.
  // const text = data.getData('text/rtf');

  const { insertData } = editor;

  // TODO: move this to extensions/insertData
  // TODO: update and improve comments & docs related to
  // `dataTransferFormatsOrder` and `dataTransferHandlers` features
  editor.insertData = (data) => {
    if (editor.beforeInsertData) {
      editor.beforeInsertData(data);
    }

    // debugger;
    for (let i = 0; i < editor.dataTransferFormatsOrder.length; ++i) {
      const dt = editor.dataTransferFormatsOrder[i];
      if (dt === 'files') {
        const { files } = data;
        if (files && files.length > 0) {
          // or handled here
          return editor.dataTransferHandlers['files'](files);
        }
        continue;
      }
      const satisfyingFormats = data.types.filter((y) =>
        new MIMETypeName(dt).matches(new MIMETypeName(y)),
      );
      for (let j = 0; j < satisfyingFormats.length; ++j) {
        const y = satisfyingFormats[j];
        if (editor.dataTransferHandlers[dt](data.getData(y), y)) {
          // handled here
          return true;
        }
      }
    }
    // not handled until this point
    return insertData(data);
  };

  return editor;
};
