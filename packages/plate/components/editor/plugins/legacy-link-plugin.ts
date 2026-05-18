import { ElementApi, KEYS, createSlatePlugin } from 'platejs';
import type { NodeEntry, Path, SlateEditor, Value } from 'platejs';
import { applyNormalizedValue, cloneValueToWritable } from './legacy-utils';

export type LegacyLinkData = {
  url?: string;
  target?: string;
  [key: string]: unknown;
};

export type LegacyLinkElement = {
  type?: string;
  url?: string;
  target?: string;
  data?: LegacyLinkData;
  children?: LegacyLinkElement[];
  [key: string]: unknown;
};

export const migrateLegacyLink = (
  editor: SlateEditor,
  path: Path,
  node: LegacyLinkElement,
) => {
  const linkType = editor.getType(KEYS.link);
  const legacyUrl =
    typeof node?.data?.url === 'string' ? node.data.url : undefined;
  const legacyTarget = node?.data?.target ?? node?.target;

  editor.tf.setNodes(
    {
      type: linkType,
      url: legacyUrl ?? node.url,
      ...(legacyTarget ? { target: legacyTarget } : {}),
    },
    { at: path },
  );

  if (node?.data !== undefined) {
    editor.tf.unsetNodes('data', { at: path });
  }
};

export const migrateLegacyLinksInValueStatic = (
  nodes: Value,
  linkType = KEYS.link,
) => {
  // For SSR/offline usage: caller provides the link type; operates without an editor instance.
  const mutableNodes = cloneValueToWritable(nodes);

  const visit = (node: LegacyLinkElement) => {
    if (!ElementApi.isElement(node)) {
      return;
    }
    const element = node as LegacyLinkElement;

    const legacyUrl =
      typeof element.data?.url === 'string' ? element.data.url : undefined;
    if (typeof legacyUrl === 'string') {
      element.type = linkType;
      element.url = legacyUrl;
      if (element.data?.target) {
        element.target = element.data.target;
      }
      delete element.data;
    } else if (
      element.type === linkType &&
      typeof element.data?.url === 'string'
    ) {
      element.url = element.data.url;
      if (element.data?.target) {
        element.target = element.data.target;
      }
      delete element.data;
    } else if (element.type === 'link') {
      element.type = linkType;
    }

    if (Array.isArray(element.children)) {
      element.children.forEach(visit);
    }
  };

  mutableNodes.forEach(visit);
  applyNormalizedValue(nodes, mutableNodes);
  return mutableNodes;
};

export const migrateLegacyLinksInValue = (
  editor: SlateEditor,
  nodes: Value,
) => {
  // Editor-aware: resolves the configured link type from the plugin before normalizing.
  const mutableNodes = cloneValueToWritable(nodes);
  const plateLinkType = editor.getType(KEYS.link);
  const visit = (node: LegacyLinkElement) => {
    if (!ElementApi.isElement(node)) {
      return;
    }
    const element = node as LegacyLinkElement;

    const legacyUrl =
      typeof element.data?.url === 'string' ? element.data.url : undefined;
    if (typeof legacyUrl === 'string') {
      element.type = plateLinkType;
      element.url = legacyUrl;
      if (element.data?.target) {
        element.target = element.data.target;
      }
      delete element.data;
    } else if (
      element.type === plateLinkType &&
      typeof element.data?.url === 'string'
    ) {
      element.url = element.data.url;
      if (element.data?.target) {
        element.target = element.data.target;
      }
      delete element.data;
    } else if (element.type === 'link') {
      element.type = plateLinkType;
    }

    if (Array.isArray(element.children)) {
      element.children.forEach(visit);
    }
  };

  mutableNodes.forEach(visit);
  applyNormalizedValue(nodes, mutableNodes);
  return mutableNodes;
};

/**
 * Converts legacy Slate link nodes (`type: "link"`, `data.url`) into the
 * default Plate link schema.
 */
export const LegacyLinkPlugin = [
  createSlatePlugin({
    key: 'legacyLinkNormalizer',
    node: {
      isElement: true,
      isInline: true,
      type: 'link',
    },
    normalizeInitialValue: ({ editor, value }) => {
      const normalized = migrateLegacyLinksInValue(editor, value);
      applyNormalizedValue(value, normalized);
    },
    extendEditor: ({ editor }) => {
      const { normalizeNode } = editor;

      editor.normalizeNode = (entry: NodeEntry) => {
        const [node, path] = entry;

        if (ElementApi.isElement(node)) {
          const plateLinkType = editor.getType(KEYS.link);
          const isLegacyLink =
            node.type === 'link' &&
            typeof (node as any)?.data?.url === 'string';
          const isPlateLinkWithLegacyData =
            node.type === plateLinkType &&
            typeof (node as any)?.data?.url === 'string';

          if (isLegacyLink || isPlateLinkWithLegacyData) {
            migrateLegacyLink(editor, path, node);
            return;
          }

          if (node.type === 'link' && !isLegacyLink) {
            editor.tf.setNodes(
              {
                type: plateLinkType,
              },
              { at: path },
            );
            return;
          }
        }

        (normalizeNode as (entry: NodeEntry) => void)(entry);
      };

      return editor;
    },
  }),
];
