import {
  type SetNodesOptions,
  type SlateEditor,
  type TElement,
  createSlatePlugin,
  ElementApi,
  getPluginByType,
} from 'platejs';
import { toPlatePlugin } from 'platejs/react';
import config from '@plone/registry';
import type { StyleDefinition } from '@plone/types';

export const BLOCK_WIDTH_KEY = 'blockWidth';

export const BLOCK_WIDTH_VALUES = {
  narrow: 'narrow',
  default: 'default',
  layout: 'layout',
  full: 'full',
} as const;

export const BLOCK_WIDTH_VALUE_LIST = [
  BLOCK_WIDTH_VALUES.narrow,
  BLOCK_WIDTH_VALUES.default,
  BLOCK_WIDTH_VALUES.layout,
  BLOCK_WIDTH_VALUES.full,
] as const;

export type BlockWidthValue = (typeof BLOCK_WIDTH_VALUE_LIST)[number];

export const BLOCK_WIDTH_OPTIONS = [
  { label: 'Narrow', value: BLOCK_WIDTH_VALUES.narrow },
  { label: 'Default', value: BLOCK_WIDTH_VALUES.default },
  { label: 'Layout', value: BLOCK_WIDTH_VALUES.layout },
  { label: 'Full Width', value: BLOCK_WIDTH_VALUES.full },
] as const;

export const DEFAULT_BLOCK_WIDTH = BLOCK_WIDTH_VALUES.default;

export type BlockWidthConfig = {
  defaultWidth?: BlockWidthValue;
  widths?: readonly BlockWidthValue[];
};

export type BlockWidthPluginOptions = {
  defaultWidths?: readonly BlockWidthValue[];
};

const FALLBACK_WIDTH_DEFINITIONS: readonly StyleDefinition[] = [
  {
    style: {
      '--block-width': 'var(--narrow-container-width)',
    },
    name: BLOCK_WIDTH_VALUES.narrow,
    label: 'Narrow',
  },
  {
    style: {
      '--block-width': 'var(--default-container-width)',
    },
    name: BLOCK_WIDTH_VALUES.default,
    label: 'Default',
  },
  {
    style: {
      '--block-width': 'var(--layout-container-width)',
    },
    name: BLOCK_WIDTH_VALUES.layout,
    label: 'Layout',
  },
  {
    style: {
      '--block-width': '100%',
    },
    name: BLOCK_WIDTH_VALUES.full,
    label: 'Full Width',
  },
] as const;

export const getBlockWidthDefinitions = (): readonly StyleDefinition[] => {
  const widths = config?.blocks?.widths as StyleDefinition[] | undefined;

  return widths?.length ? widths : FALLBACK_WIDTH_DEFINITIONS;
};

const getBlockWidthValueList = (): BlockWidthValue[] =>
  getBlockWidthDefinitions().map((width) => width.name as BlockWidthValue);

export const getBlockWidthOptions = () =>
  getBlockWidthDefinitions().map((width) => ({
    label: width.label,
    value: width.name as BlockWidthValue,
  }));

const getBlockWidthStyle = (value?: string) =>
  getBlockWidthDefinitions().find((width) => width.name === value)?.style;

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

const getPlateBlockRegistryWidthConfig = (
  element?: TElement | null,
): BlockWidthConfig => {
  if (!element?.type) return {};

  const plateBlocksConfig = config?.blocks?.plateBlocksConfig as
    | Record<string, { blockWidth?: BlockWidthConfig }>
    | undefined;

  return plateBlocksConfig?.[element.type]?.blockWidth ?? {};
};

const getPloneBlockRegistryWidthConfig = (
  element?: TElement | null,
): BlockWidthConfig => {
  const blockType = (
    element as (TElement & { '@type'?: unknown }) | null | undefined
  )?.['@type'];
  if (!blockType || typeof blockType !== 'string') return {};

  const blocksConfig = config?.blocks?.blocksConfig as unknown as
    | Record<string, { blockWidth?: BlockWidthConfig }>
    | undefined;

  return blocksConfig?.[blockType]?.blockWidth ?? {};
};

export const resolveBlockWidthConfig = (
  editor: SlateEditor,
  element?: TElement | null,
): BlockWidthConfig => {
  const registryConfig =
    element?.type === 'unknown'
      ? getPloneBlockRegistryWidthConfig(element)
      : getPlateBlockRegistryWidthConfig(element);

  if (registryConfig.defaultWidth || registryConfig.widths?.length) {
    return registryConfig;
  }

  return getBlockPluginWidthConfig(editor, element);
};

export const getBlockWidthConfig = (
  editor: SlateEditor,
  element?: TElement | null,
) => {
  const pluginOptions = editor.getOptions(BaseBlockWidthPlugin) as
    | BaseBlockWidthPluginOptions
    | undefined;
  const blockConfig = resolveBlockWidthConfig(editor, element);
  const defaultWidth = blockConfig.defaultWidth ?? DEFAULT_BLOCK_WIDTH;
  const widths =
    blockConfig.widths ??
    pluginOptions?.defaultWidths ??
    getBlockWidthValueList();

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

  if (!nodeKey) return;

  const matchesValue = (node: TElement) => {
    const config = getBlockWidthConfig(editor, node);

    return isAllowedWidth(config.widths, value);
  };

  editor.tf.setNodes(
    { [nodeKey]: value },
    {
      match: (node) =>
        ElementApi.isElement(node) &&
        editor.api.isBlock(node) &&
        matchesValue(node),
      ...setNodesOptions,
    },
  );
};

type BaseBlockWidthPluginOptions = BlockWidthPluginOptions;

export const BaseBlockWidthPlugin = createSlatePlugin({
  key: BLOCK_WIDTH_KEY,
  inject: {
    isBlock: true,
    nodeProps: {
      nodeKey: BLOCK_WIDTH_KEY,
      transformProps: ({ nodeValue, props }) => {
        const widthStyle = getBlockWidthStyle(nodeValue);

        if (!widthStyle) return props;

        return {
          ...props,
          style: {
            ...(props.style ?? {}),
            ...widthStyle,
          },
        };
      },
    },
  },
  options: {
    defaultWidths: [...BLOCK_WIDTH_VALUE_LIST],
  },
  extendEditor: ({ editor }) => {
    const normalizeNode = editor.normalizeNode as (entry: any) => void;

    editor.normalizeNode = (entry: any) => {
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
  resetWidth: (options?: SetNodesOptions) => {
    const blockEntry = editor.api.block();
    const block =
      blockEntry && ElementApi.isElement(blockEntry[0])
        ? blockEntry[0]
        : undefined;
    const { defaultWidth } = getBlockWidthConfig(editor, block);

    setBlockWidth(editor, defaultWidth, options);
  },
  setWidth: (value: string, options?: SetNodesOptions) => {
    setBlockWidth(editor, value, options);
  },
}));

export const BlockWidthPlugin = toPlatePlugin(BaseBlockWidthPlugin);
