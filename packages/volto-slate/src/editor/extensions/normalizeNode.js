import { Text, Transforms, Element, Node, Path } from 'slate'; // Editor,
import config from '@plone/volto/registry';
import { isEqual } from 'lodash';

const hasNoText = (node) => {
  const texts = Array.from(Node.texts(node));
  const text = texts.reduce((acc, [child]) => `${acc}${child?.text || ''}`, '');
  return text === '';
};

export const normalizeNode = (editor) => {
  const { normalizeNode } = editor;
  const { slate } = config.settings;

  // slate.listTypes is 'ol', 'ul'
  const validListElements = [...slate.listTypes, slate.listItemType];

  editor.normalizeNode = (entry) => {
    const [node, path] = entry;

    const isInlineNode = Text.isText(node) || editor.isInline(node);
    const isListTypeNode =
      !isInlineNode &&
      Element.isElement(node) &&
      slate.listTypes.includes(node.type);

    // delete childless ul/ol nodes
    if (isListTypeNode) {
      if ((node.children || []).length === 0) {
        Transforms.removeNodes(editor, { at: path });
        return;
      }
    }

    if (node.type === slate.listItemType) {
      // if we have inline text nodes, we lift any found <ul/ol> as sibling
      if (
        node.children?.length &&
        (Text.isText(node.children[0]) || editor.isInline(node.children[0]))
      ) {
        const toLift = Array.from(Node.elements(node))
          .filter(([childNode, childRelPath]) => {
            return (
              childRelPath.length === 1 &&
              slate.listTypes.includes(childNode?.type)
            );
          })
          .map(([n, p]) => [...path, ...p]);
        if (toLift.length) {
          Transforms.liftNodes(editor, {
            at: path,
            split: true,
            match: (childNode, childPath) =>
              Path.isChild(childPath, path) &&
              toLift.findIndex((f) => isEqual(f, childPath)) > -1,
          });
          return;
        }
      }

      // after we hit enter in a list item, remove any leftover duplicated
      // elements. Slate splits the elements (and copies it to the next line
      const emptyEntries = Array.from(Node.elements(node))
        .filter(([childNode, childRelPath]) => childRelPath.length === 1)
        .filter(([childNode, childRelPath]) => hasNoText(childNode));

      const [toRemove] = emptyEntries;
      if (toRemove) {
        const [, childRelPath] = toRemove;
        const at = [...path, ...childRelPath];
        Transforms.removeNodes(editor, { at });
        return;
      }
    }

    if (isListTypeNode) {
      // lift all child nodes of ul/ol that are not ul/ol/li
      for (const [child, childPath] of Node.children(editor, path)) {
        if (
          !validListElements.includes(child.type) &&
          !validListElements.includes(node.type)
        ) {
          Transforms.liftNodes(editor, { at: childPath, split: true });
          return;
        }
      }
    }

    normalizeNode(entry);
  };

  return editor;
};
