// import isUrl from 'is-url';
// import { wrapLink } from './utils';
import { LINK } from '@plone/volto-slate/constants';

export const withLink = (editor) => {
  // const { insertData, insertText, isInline } = editor;

  const { isInline } = editor;

  editor.isInline = (element) => {
    return element && element.type === LINK ? true : isInline(element);
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
