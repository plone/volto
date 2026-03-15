import {
  type SetNodesOptions,
  type SlateEditor,
  type TElement,
  createSlatePlugin,
  ElementApi,
  getInjectMatch,
  getPluginByType,
} from 'platejs';
import { toPlatePlugin } from 'platejs/react';

export const BLOCK_WIDTH_KEY = 'blockWidth';

export const BLOCK_WIDTH_VALUES = {
  layout: 'var(--layout-container-width)',
  default: 'var(--default-container-width)',
  narrow: 'var(--narrow-container-width)',
} as const;

export const BLOCK_WIDTH_VALUE_LIST = [
  BLOCK_WIDTH_VALUES.layout,
  BLOCK_WIDTH_VALUES.default,
  BLOCK_WIDTH_VALUES.narrow,
] as const;

export type BlockWidthValue = (typeof BLOCK_WIDTH_VALUE_LIST)[number];

export const BLOCK_WIDTH_OPTIONS = [
  { label: 'Layout', value: BLOCK_WIDTH_VALUES.layout },
  { label: 'Default', value: BLOCK_WIDTH_VALUES.default },
  { label: 'Narrow', value: BLOCK_WIDTH_VALUES.narrow },
] as const;

export const DEFAULT_BLOCK_WIDTH = BLOCK_WIDTH_VALUES.default;

export type BlockWidthConfig = {
  defaultWidth?: BlockWidthValue;
  widths?: readonly BlockWidthValue[];
};

export type BlockWidthPluginOptions = {
  defaultWidths?: readonly BlockWidthValue[];
};

const getBlockPluginWidthConfig = (
  editor: SlateEditor,
  element?: TElement | null,
): BlockWidthConfig => {
  if (!element) return {};

  const plugin = getPluginByType(editor, element.type);

  return (
    (plugin?.options as { blockWidth?: BlockWidthConfig } | undefined)
      ?.blockWidth ?? {}
  );
};

export const getBlockWidthConfig = (
  editor: SlateEditor,
  element?: TElement | null,
) => {
  const pluginOptions =
    editor.getOptions<BaseBlockWidthPluginOptions>(BaseBlockWidthPlugin);
  const blockConfig = getBlockPluginWidthConfig(editor, element);
  const defaultWidth = blockConfig.defaultWidth ?? DEFAULT_BLOCK_WIDTH;
  const widths =
    blockConfig.widths ?? pluginOptions.defaultWidths ?? BLOCK_WIDTH_VALUE_LIST;

  return {
    defaultWidth,
    widths: widths.includes(defaultWidth)
      ? widths
      : ([...widths, defaultWidth] as BlockWidthValue[]),
  };
};

const isAllowedWidth = (widths: readonly BlockWidthValue[], value: string) =>
  widths.includes(value as BlockWidthValue);

const setBlockWidth = (
  editor: SlateEditor,
  value: string,
  setNodesOptions?: SetNodesOptions,
) => {
  const { nodeKey } = editor.getInjectProps(BaseBlockWidthPlugin);
  const match = getInjectMatch(
    editor,
    editor.getPlugin({ key: BLOCK_WIDTH_KEY }),
  );

  if (!nodeKey) return;

  const matchesValue = (node: TElement) => {
    const config = getBlockWidthConfig(editor, node);

    return isAllowedWidth(config.widths, value);
  };

  editor.tf.setNodes(
    { [nodeKey]: value },
    {
      match: (node) => match(node) && matchesValue(node),
      ...setNodesOptions,
    },
  );
};

type BaseBlockWidthPluginOptions = BlockWidthPluginOptions;

export const BaseBlockWidthPlugin = createSlatePlugin<BlockWidthPluginOptions>({
  key: BLOCK_WIDTH_KEY,
  inject: {
    isBlock: true,
    nodeProps: {
      nodeKey: BLOCK_WIDTH_KEY,
      styleKey: 'maxWidth',
      validNodeValues: BLOCK_WIDTH_VALUE_LIST,
    },
  },
  options: {
    defaultWidths: BLOCK_WIDTH_VALUE_LIST,
  },
  extendEditor: ({ editor }) => {
    const { normalizeNode } = editor;

    editor.normalizeNode = (entry) => {
      const [node, path] = entry;

      if (ElementApi.isElement(node) && editor.api.isBlock(node)) {
        const config = getBlockWidthConfig(editor, node);
        const current = (node as TElement)[BLOCK_WIDTH_KEY] as
          | string
          | undefined;

        if (!current || !isAllowedWidth(config.widths, current)) {
          editor.tf.setNodes(
            { [BLOCK_WIDTH_KEY]: config.defaultWidth },
            { at: path },
          );
          return;
        }
      }

      normalizeNode(entry);
    };

    return editor;
  },
}).extendTransforms(({ editor }) => ({
  addMark: (value: string) => {
    setBlockWidth(editor, value);
  },
  setNodes: (value: string, options?: SetNodesOptions) => {
    setBlockWidth(editor, value, options);
  },
}));

export const BlockWidthPlugin = toPlatePlugin(BaseBlockWidthPlugin);
