import { Text, Transforms, Element, Node } from 'slate'; // Editor,
import config from '@plone/volto/registry';

export const normalizeNode = (editor) => {
  // enforce list rules (no block elements, only ol/ul/li as possible children
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

    if (isElementNode && isListTypeNode) {
      // lift all child nodes of ul/ol that are not ul/ol/li
      for (const [child, childPath] of Node.children(editor, path)) {
        if (
          !validListElements.includes(child.type) &&
          !validListElements.includes(node.type)
        ) {
          Transforms.liftNodes(editor, { at: childPath, split: true });

          // Alternate strategy, need to investigate
          // const newParent = { type: slate.defaultBlockType, children: [] };
          // Transforms.wrapNodes(editor, newParent, { at: childPath });
          return;
        }
      }
    }

    normalizeNode(entry);
  };

  return editor;
};
