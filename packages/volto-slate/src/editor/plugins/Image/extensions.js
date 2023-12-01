// The default behavior is to allow images to be copy/pasted inside the editor
// The TextBlockEdit extensions will come and then split the images into
// separate dedicated Volto image blocks.

import { IMAGE } from '@plone/volto-slate/constants';
import { jsx } from 'slate-hyperscript';

export const deserializeImageTag = (editor, el) => {
  const attrs = { type: IMAGE };

  // TODO: not all of these attributes should be stored in the DB
  for (const name of el.getAttributeNames()) {
    attrs[name] = el.getAttribute(name);
  }

  // TODO: recognize more unsupported protocols
  if (typeof attrs.src === 'undefined' || attrs.src.startsWith('file:///')) {
    return null;
  }

  attrs.url = attrs.src;
  delete attrs.src;

  return [jsx('element', attrs, [{ text: '' }])];
};

/**
 * Allows for pasting images from clipboard.
 * Not yet: dragging and dropping images, selecting them through a file system dialog.
 * @param typeImg
 */
export const withImage = (editor) => {
  const { isVoid, isInline } = editor;

  editor.isVoid = (element) => {
    return element.type === IMAGE ? true : isVoid(element);
  };

  // If it's not marked as inline, Slate will strip the {type:'img"} nodes when
  // it finds them next to {text: ''} nodes
  editor.isInline = (element) => {
    return element && element.type === IMAGE ? true : isInline(element);
  };

  editor.htmlTagsToSlate = {
    ...editor.htmlTagsToSlate,
    IMG: deserializeImageTag,
  };

  return editor;
};
