import { ElementApi, KEYS, PathApi, createSlatePlugin } from 'platejs';
import type { Path, SlateEditor, Value } from 'platejs';

import { applyNormalizedValue, cloneValueToWritable } from './legacy-utils';

type LegacyListElement = {
  type?: string;
  children?: LegacyListElement[];
  listStyleType?: string;
  indent?: number;
  listStart?: number;
  [key: string]: unknown;
};

const listTypeMap: Record<string, string> = {
  ul: KEYS.ul, // disc
  ol: KEYS.ol, // decimal
};

const flattenListNode = (node: LegacyListElement): LegacyListElement[] => {
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
  const mutable = cloneValueToWritable(nodes);

  const visit = (node: LegacyListElement): LegacyListElement[] => {
    const isList = node?.type === 'ul' || node?.type === 'ol';

    if (isList) {
      return flattenListNode(node);
    }

    if (!Array.isArray(node?.children)) {
      return [node];
    }

    const normalizedChildren = node.children.flatMap((child) => visit(child));
    node.children = normalizedChildren;
    return [node];
  };

  const normalized = mutable.flatMap((node) => visit(node));
  mutable.splice(0, mutable.length, ...normalized);
  applyNormalizedValue(nodes, mutable);
  return mutable;
};

const migrateListAtPath = (editor: SlateEditor, path: Path) => {
  const nodeEntry = editor.api.node(path);
  if (!nodeEntry) return;
  const [node] = nodeEntry as [LegacyListElement];
  const items = flattenListNode(node);

  editor.tf.withoutNormalizing(() => {
    editor.tf.removeNodes({ at: path });
    editor.tf.insertNodes(items, { at: path });
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

      editor.normalizeNode = (entry) => {
        const [node, path] = entry;

        if (
          ElementApi.isElement(node) &&
          (node.type === 'ul' || node.type === 'ol')
        ) {
          migrateListAtPath(editor, path);
          return;
        }

        normalizeNode(entry);
      };

      return editor;
    },
  }).extend({
    // also target ordered lists
    node: { type: 'ol', isElement: true },
  }),
];
