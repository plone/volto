import { ElementApi, KEYS, createSlatePlugin } from "platejs";
import type { Path, PlateEditor, Value } from "platejs";

const migrateLegacyLink = (editor: PlateEditor, path: Path, node: any) => {
  const linkType = editor.getType(KEYS.link);
  const legacyUrl =
    typeof node?.data?.url === "string" ? node.data.url : undefined;
  const legacyTarget = node?.data?.target ?? node?.target;

  editor.tf.setNodes(
    {
      type: linkType,
      url: legacyUrl ?? node.url,
      ...(legacyTarget ? { target: legacyTarget } : {}),
    },
    { at: path }
  );

  if (node?.data !== undefined) {
    editor.tf.unsetNodes("data", { at: path });
  }
};

const migrateLegacyLinksInValue = (editor: PlateEditor, nodes: Value) => {
  const plateLinkType = editor.getType(KEYS.link);
  const visit = (node: any) => {
    if (!ElementApi.isElement(node)) {
      return;
    }

    const legacyUrl =
      typeof node?.data?.url === "string" ? node.data.url : undefined;
    if (typeof legacyUrl === "string") {
      node.type = plateLinkType;
      node.url = legacyUrl;
      if (node?.data?.target) {
        node.target = node.data.target;
      }
      delete node.data;
    } else if (
      node.type === plateLinkType &&
      typeof node?.data?.url === "string"
    ) {
      node.url = node.data.url;
      if (node?.data?.target) {
        node.target = node.data.target;
      }
      delete node.data;
    } else if (node.type === "link") {
      node.type = plateLinkType;
    }

    if (Array.isArray(node.children)) {
      node.children.forEach(visit);
    }
  };

  nodes.forEach(visit);
};

/**
 * Converts legacy Slate link nodes (`type: "link"`, `data.url`) into the
 * default Plate link schema.
 */
export const LegacyLinkPlugin = [
  createSlatePlugin({
    key: "legacyLinkNormalizer",
    node: {
      isElement: true,
      isInline: true,
      type: "link",
    },
    normalizeInitialValue: ({ editor, value }) => {
      migrateLegacyLinksInValue(editor, value);
    },
    extendEditor: ({ editor }) => {
      const { normalizeNode } = editor;

      editor.normalizeNode = (entry) => {
        const [node, path] = entry;

        if (ElementApi.isElement(node)) {
          const plateLinkType = editor.getType(KEYS.link);
          const isLegacyLink =
            node.type === "link" &&
            typeof (node as any)?.data?.url === "string";
          const isPlateLinkWithLegacyData =
            node.type === plateLinkType &&
            typeof (node as any)?.data?.url === "string";

          if (isLegacyLink || isPlateLinkWithLegacyData) {
            migrateLegacyLink(editor, path, node);
            return;
          }

          if (node.type === "link" && !isLegacyLink) {
            editor.tf.setNodes(
              {
                type: plateLinkType,
              },
              { at: path }
            );
            return;
          }
        }

        normalizeNode(entry);
      };

      return editor;
    },
  }),
];
