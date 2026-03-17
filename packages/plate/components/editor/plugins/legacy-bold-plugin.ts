import { ElementApi, TextApi, createSlatePlugin } from 'platejs';
import type { Path, SlateEditor, Value } from 'platejs';
import { applyNormalizedValue, cloneValueToWritable } from './legacy-utils';

export type LegacyBoldNode = {
  type?: string;
  text?: string;
  bold?: boolean;
  children?: LegacyBoldNode[];
  [key: string]: unknown;
};

export const migrateLegacyBold = (editor: SlateEditor, path: Path) => {
  // Mark all text descendants as bold, then unwrap the legacy element.
  editor.tf.setNodes(
    { bold: true },
    {
      at: path,
      match: TextApi.isText,
      mode: 'all',
    },
  );

  editor.tf.unwrapNodes({
    at: path,
    match: (n) => ElementApi.isElement(n) && n.type === 'strong',
  });
};

export const migrateLegacyBoldInValue = (nodes: Value) => {
  const mutableNodes = cloneValueToWritable(nodes);

  const visit = (node: LegacyBoldNode, isBold = false): LegacyBoldNode[] => {
    const nextIsBold = isBold || node?.type === 'strong';

    if (typeof node?.text === 'string') {
      if (nextIsBold) {
        node.bold = node.bold ?? true;
      }
      return [node];
    }

    if (!Array.isArray(node?.children)) {
      return [node];
    }

    const normalizedChildren = node.children.flatMap((child: LegacyBoldNode) =>
      visit(child, nextIsBold),
    );

    if (node.type === 'strong') {
      return normalizedChildren;
    }

    node.children = normalizedChildren;
    return [node];
  };

  const normalized = mutableNodes.flatMap((node: any) => visit(node));
  mutableNodes.splice(0, mutableNodes.length, ...normalized);
  applyNormalizedValue(nodes, mutableNodes);
  return mutableNodes;
};

/**
 * Converts legacy Slate bold nodes (`type: "strong"`) into Plate bold marks.
 */
export const LegacyBoldPlugin = [
  createSlatePlugin({
    key: 'legacyBoldNormalizer',
    node: {
      isElement: true,
      type: 'strong',
      isInline: true,
    },
    normalizeInitialValue: ({ value }) => {
      const normalized = migrateLegacyBoldInValue(value);
      applyNormalizedValue(value, normalized);
    },
    extendEditor: ({ editor }) => {
      const { normalizeNode } = editor;

      editor.normalizeNode = (entry) => {
        const [node, path] = entry;

        if (ElementApi.isElement(node) && node.type === 'strong') {
          migrateLegacyBold(editor, path);
          return;
        }

        normalizeNode(entry);
      };

      return editor;
    },
  }),
];
