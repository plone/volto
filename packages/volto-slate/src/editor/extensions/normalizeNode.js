import { Text, Transforms, Element, Node } from 'slate'; // Editor,
import config from '@plone/volto/registry';
import { isEqual } from 'lodash';

export const normalizeNode = (editor) => {
  const { normalizeNode } = editor;
  const { slate } = config.settings;

  const validListElements = [...slate.listTypes, slate.listItemType];

  editor.normalizeNode = (entry) => {
    const [node, path] = entry;

    const isTextNode = Text.isText(node);
    const isInlineNode = editor.isInline(node);
    const isElementNode = Element.isElement(node);
    const isListTypeNode = slate.listTypes.includes(node.type);

    // delete childless ul/ol nodes
    if (!isTextNode && isElementNode && !isInlineNode && isListTypeNode) {
      if ((node.children || []).length === 0) {
        Transforms.removeNodes(editor, { at: path });
        return;
      }
    }

    if (node.type === slate.listItemType) {
      // don't allow slate default normalizeNode, as it will remove the blocks
      // when there's combined inline + block elements and the first child is
      // inline
      // See https://github.com/ianstormtaylor/slate/blob/1d8010be8500ef5c98dbd4179354db1986d5c8f4/packages/slate/src/create-editor.ts#L253-L256

      const toWrap = [];
      for (const [child, childPath] of Node.children(editor, path)) {
        if (Text.isText(child) || editor.isInline(child)) {
          toWrap.push([child, childPath]);
        } else {
          break;
        }
      }

      const paths = toWrap.map(([, childPath]) => childPath);
      if (toWrap.length) {
        const newParent = { type: 'span', children: [] };
        Transforms.wrapNodes(editor, newParent, {
          at: path,
          match: (child, childPath) => {
            const is = paths.find((p) => isEqual(p, childPath));
            return !!is;
          },
        });
        return;
      }
    }

    if (isElementNode && isListTypeNode) {
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
