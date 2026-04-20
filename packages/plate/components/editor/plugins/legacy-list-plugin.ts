import { ElementApi, KEYS, createSlatePlugin } from 'platejs';
import type { NodeEntry, Path, SlateEditor, Value } from 'platejs';

import { applyNormalizedValue, cloneValueToWritable } from './legacy-utils';

type LegacyListElement = {
  type?: string;
  children?: Value;
  listStyleType?: string;
  indent?: number;
  listStart?: number;
  [key: string]: unknown;
};

const listTypeMap: Record<string, string> = {
  ul: KEYS.ul, // disc
  ol: KEYS.ol, // decimal
};

const flattenListNode = (node: LegacyListElement): any[] => {
  const listStyleType = listTypeMap[node.type ?? ''] ?? KEYS.ul;
  const items = (node.children ?? []).filter((child) =>
    ElementApi.isElement(child),
  );

  return items.map((child, index) => {
    const children = child.children ?? [{ text: '' }];
    const isOrdered = listStyleType === KEYS.ol;
    const position = index + 1;
    return {
      type: KEYS.p,
      children,
      indent: 1,
      listStyleType,
      ...(isOrdered && index === 0 ? { listRestartPolite: position } : {}),
      ...(isOrdered && index > 0 ? { listStart: position } : {}),
      ...(!isOrdered && index > 0 ? { listStart: position } : {}),
    };
  });
};

export const migrateLegacyListsInValue = (nodes: Value): Value => {
  const mutable = cloneValueToWritable(nodes) as any[];

  const visit = (node: LegacyListElement): any[] => {
    const isList = node?.type === 'ul' || node?.type === 'ol';

    if (isList) {
      return flattenListNode(node);
    }

    if (!Array.isArray(node?.children)) {
      return [node];
    }

    const normalizedChildren = (node.children as any[]).flatMap((child: any) =>
      visit(child as LegacyListElement),
    );
    node.children = normalizedChildren;
    return [node];
  };

  const normalized = mutable.flatMap((node: any) =>
    visit(node as LegacyListElement),
  );
  mutable.splice(0, mutable.length, ...normalized);
  applyNormalizedValue(nodes, mutable as any);
  return mutable as any;
};

const migrateListAtPath = (editor: SlateEditor, path: Path) => {
  const nodeEntry = editor.api.node(path);
  if (!nodeEntry) return;
  const [node] = nodeEntry as unknown as [LegacyListElement, Path];
  const items = flattenListNode(node);

  editor.tf.withoutNormalizing(() => {
    editor.tf.removeNodes({ at: path });
    editor.tf.insertNodes(items as any, { at: path });
  });
};

/**
 * Converts legacy Slate list nodes (`type: "ul" | "ol"` with `li` children) into
 * flattened Plate list paragraphs with list markers.
 */
export const LegacyListPlugin = [
  createSlatePlugin({
    key: 'legacyListNormalizer',
    node: {
      isElement: true,
      type: 'ul',
    },
    normalizeInitialValue: ({ value }) => {
      const normalized = migrateLegacyListsInValue(value);
      applyNormalizedValue(value, normalized);
    },
    extendEditor: ({ editor }) => {
      const { normalizeNode } = editor;

      editor.normalizeNode = (entry: NodeEntry) => {
        const [node, path] = entry;

        if (
          ElementApi.isElement(node) &&
          (node.type === 'ul' || node.type === 'ol')
        ) {
          migrateListAtPath(editor, path);
          return;
        }

        (normalizeNode as (entry: NodeEntry) => void)(entry);
      };

      return editor;
    },
  }).extend({
    // also target ordered lists
    node: { type: 'ol', isElement: true },
  }),
];
