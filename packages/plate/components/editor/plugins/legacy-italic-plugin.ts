import { ElementApi, TextApi, createSlatePlugin } from 'platejs';
import type { NodeEntry, Path, SlateEditor, Value } from 'platejs';
import { applyNormalizedValue, cloneValueToWritable } from './legacy-utils';

export type LegacyItalicNode = {
  type?: string;
  text?: string;
  italic?: boolean;
  children?: Value;
  [key: string]: unknown;
};

export const migrateLegacyItalic = (editor: SlateEditor, path: Path) => {
  // Mark all text descendants as italic, then unwrap the legacy element.
  editor.tf.setNodes(
    { italic: true },
    {
      at: path,
      match: TextApi.isText,
      mode: 'all',
    },
  );

  editor.tf.unwrapNodes({
    at: path,
    match: (n) => ElementApi.isElement(n) && n.type === 'em',
  });
};

export const migrateLegacyItalicInValue = (nodes: Value) => {
  const mutableNodes = cloneValueToWritable(nodes) as any[];

  const visit = (node: LegacyItalicNode, isItalic = false): any[] => {
    const nextIsItalic = isItalic || node?.type === 'em';

    if (typeof node?.text === 'string') {
      if (nextIsItalic) {
        node.italic = node.italic ?? true;
      }
      return [node];
    }

    if (!Array.isArray(node?.children)) {
      return [node];
    }

    const normalizedChildren = (node.children as any[]).flatMap((child: any) =>
      visit(child as LegacyItalicNode, nextIsItalic),
    );

    if (node.type === 'em') {
      return normalizedChildren;
    }

    node.children = normalizedChildren;
    return [node];
  };

  const normalized = mutableNodes.flatMap((node: any) =>
    visit(node as LegacyItalicNode),
  );
  mutableNodes.splice(0, mutableNodes.length, ...normalized);
  applyNormalizedValue(nodes, mutableNodes as any);
  return mutableNodes as any;
};

/**
 * Converts legacy Slate italic nodes (`type: "em"`) into Plate italic marks.
 */
export const LegacyItalicPlugin = [
  createSlatePlugin({
    key: 'legacyItalicNormalizer',
    node: {
      isElement: true,
      type: 'em',
      isInline: true,
    },
    normalizeInitialValue: ({ value }) => {
      const normalized = migrateLegacyItalicInValue(value);
      applyNormalizedValue(value, normalized);
    },
    extendEditor: ({ editor }) => {
      const { normalizeNode } = editor;

      editor.normalizeNode = (entry: NodeEntry) => {
        const [node, path] = entry;

        if (ElementApi.isElement(node) && node.type === 'em') {
          migrateLegacyItalic(editor, path);
          return;
        }

        (normalizeNode as (entry: NodeEntry) => void)(entry);
      };

      return editor;
    },
  }),
];
