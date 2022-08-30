import { SIMPLELINK } from '@plone/volto-slate/constants';
import { jsx } from 'slate-hyperscript';
import { deserialize } from '@plone/volto-slate/editor/deserialize';

export const withSimpleLink = (editor) => {
  // const { insertData, insertText, isInline } = editor;

  const { isInline } = editor;

  editor.isInline = (element) => {
    return element && element.type === SIMPLELINK ? true : isInline(element);
  };

  // editor.insertText = (text) => {
  //   if (text && isUrl(text)) {
  //     wrapLink(editor, text);
  //   } else {
  //     insertText(text);
  //   }
  // };
  //
  // editor.insertData = (data) => {
  //   const text = data.getData('text/plain');
  //
  //   if (text && isUrl(text)) {
  //     wrapLink(editor, text);
  //   } else {
  //     insertData(data);
  //   }
  // };
  return editor;
};

export const simpleLinkDeserializer = (editor, el) => {
  let parent = el;

  let children = Array.from(parent.childNodes)
    .map((el) => deserialize(editor, el))
    .flat();

  if (!children.length) children = [{ text: '' }];

  const attrs = {
    type: SIMPLELINK,
    data: {
      url: el.getAttribute('href'),
    },
  };

  return jsx('element', attrs, children);
};

simpleLinkDeserializer.id = 'simpleLinkDeserializer';
