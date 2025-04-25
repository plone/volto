import { Text, Transforms, Element } from 'slate'; // Editor,
import { SIMPLELINK } from '@plone/volto-slate/constants';
import { jsx } from 'slate-hyperscript';
import { deserialize } from '@plone/volto-slate/editor/deserialize';

const nodeToText = (node) => {
  if (Text.isText(node)) {
    return node.text.trim();
  } else {
    return node.children.map(nodeToText).join('');
  }
};

export const withSimpleLink = (editor) => {
  const { isInline, normalizeNode } = editor;

  editor.isInline = (element) => {
    return element && element.type === SIMPLELINK ? true : isInline(element);
  };

  editor.normalizeNode = (entry) => {
    const [node, path] = entry;
    const isTextNode = Text.isText(node);
    const isElementNode = Element.isElement(node);
    const isLinkTypeNode = node.type === SIMPLELINK;

    // delete childless link nodes
    if (!isTextNode && isElementNode && isLinkTypeNode && !nodeToText(node)) {
      Transforms.removeNodes(editor, { at: path });
      return;
    }

    return normalizeNode(entry);
  };

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
