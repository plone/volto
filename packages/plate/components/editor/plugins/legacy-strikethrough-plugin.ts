import { ElementApi, TextApi, createSlatePlugin } from 'platejs';
import type { NodeEntry, Path, SlateEditor, Value } from 'platejs';
import { applyNormalizedValue, cloneValueToWritable } from './legacy-utils';

export type LegacyStrikethroughNode = {
  type?: string;
  text?: string;
  strikethrough?: boolean;
  children?: Value;
  [key: string]: unknown;
};

export const migrateLegacyStrikethrough = (editor: SlateEditor, path: Path) => {
  // Mark all text descendants as strikethrough, then unwrap the legacy element.
  editor.tf.setNodes(
    { strikethrough: true },
    {
      at: path,
      match: TextApi.isText,
      mode: 'all',
    },
  );

  editor.tf.unwrapNodes({
    at: path,
    match: (n) => ElementApi.isElement(n) && n.type === 'del',
  });
};

export const migrateLegacyStrikethroughInValue = (nodes: Value) => {
  const mutableNodes = cloneValueToWritable(nodes) as any[];

  const visit = (node: LegacyStrikethroughNode, isStrike = false): any[] => {
    const nextIsStrike = isStrike || node?.type === 'del';

    if (typeof node?.text === 'string') {
      if (nextIsStrike) {
        node.strikethrough = node.strikethrough ?? true;
      }
      return [node];
    }

    if (!Array.isArray(node?.children)) {
      return [node];
    }

    const normalizedChildren = (node.children as any[]).flatMap((child: any) =>
      visit(child as LegacyStrikethroughNode, nextIsStrike),
    );

    if (node.type === 'del') {
      return normalizedChildren;
    }

    node.children = normalizedChildren;
    return [node];
  };

  const normalized = mutableNodes.flatMap((node: any) =>
    visit(node as LegacyStrikethroughNode),
  );
  mutableNodes.splice(0, mutableNodes.length, ...normalized);
  applyNormalizedValue(nodes, mutableNodes as any);
  return mutableNodes as any;
};

/**
 * Converts legacy Slate strikethrough nodes (`type: "del"`) into Plate strikethrough marks.
 */
export const LegacyStrikethroughPlugin = [
  createSlatePlugin({
    key: 'legacyStrikethroughNormalizer',
    node: {
      isElement: true,
      type: 'del',
      isInline: true,
    },
    normalizeInitialValue: ({ value }) => {
      const normalized = migrateLegacyStrikethroughInValue(value);
      applyNormalizedValue(value, normalized);
    },
    extendEditor: ({ editor }) => {
      const { normalizeNode } = editor;

      editor.normalizeNode = (entry: NodeEntry) => {
        const [node, path] = entry;

        if (ElementApi.isElement(node) && node.type === 'del') {
          migrateLegacyStrikethrough(editor, path);
          return;
        }

        (normalizeNode as (entry: NodeEntry) => void)(entry);
      };

      return editor;
    },
  }),
];
