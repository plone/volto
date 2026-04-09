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
export const FALLBACK_BLOCK_WIDTH = 'default';

export type BlockWidthValue = string;

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
    name: 'narrow',
    label: 'Narrow',
  },
  {
    style: {
      '--block-width': 'var(--default-container-width)',
    },
    name: 'default',
    label: 'Default',
  },
  {
    style: {
      '--block-width': 'var(--layout-container-width)',
    },
    name: 'layout',
    label: 'Layout',
  },
  {
    style: {
      '--block-width': '100%',
    },
    name: 'full',
    label: 'Full Width',
  },
] as const;

export const getBlockWidthDefinitions = (): readonly StyleDefinition[] => {
  const widths = config?.blocks?.widths as StyleDefinition[] | undefined;

  return widths?.length ? widths : FALLBACK_WIDTH_DEFINITIONS;
};

export const getBlockWidthValueList = (): BlockWidthValue[] =>
  getBlockWidthDefinitions()
    .map((width) => width.name)
    .filter((name): name is string => !!name);

export const getDefaultBlockWidth = (): BlockWidthValue => {
  const widthValues = getBlockWidthValueList();

  if (!widthValues.length) return FALLBACK_BLOCK_WIDTH;
  if (widthValues.includes(FALLBACK_BLOCK_WIDTH)) return FALLBACK_BLOCK_WIDTH;

  return widthValues[0];
};

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
  const defaultWidth = blockConfig.defaultWidth ?? getDefaultBlockWidth();
  const registryWidths = getBlockWidthValueList();
  const widths =
    blockConfig.widths ??
    (registryWidths.length
      ? registryWidths
      : (pluginOptions?.defaultWidths ?? []));

  return {
    defaultWidth,
    widths: widths.includes(defaultWidth)
      ? widths
      : ([...widths, defaultWidth] as BlockWidthValue[]),
  };
};

const isAllowedWidth = (widths: readonly BlockWidthValue[], value: string) =>
  widths.includes(value as BlockWidthValue);

type ValueElement = Record<string, unknown> & {
  type?: unknown;
  children?: unknown[];
};

export const applyBlockWidthDefaultsInValue = (value: unknown[]) => {
  const fallbackWidths = getBlockWidthValueList();
  const fallbackDefaultWidth = getDefaultBlockWidth();

  const visit = (node: unknown) => {
    if (!node || typeof node !== 'object') return;

    const element = node as ValueElement;
    if (typeof element.type !== 'string') return;

    const registryConfig =
      element.type === 'unknown'
        ? getPloneBlockRegistryWidthConfig(element as TElement)
        : getPlateBlockRegistryWidthConfig(element as TElement);
    const defaultWidth = registryConfig.defaultWidth ?? fallbackDefaultWidth;
    const widths = registryConfig.widths?.length
      ? registryConfig.widths
      : fallbackWidths;
    const currentWidth = element[BLOCK_WIDTH_KEY];

    if (typeof currentWidth !== 'string' || !widths.includes(currentWidth)) {
      element[BLOCK_WIDTH_KEY] = defaultWidth;
    }

    if (Array.isArray(element.children)) {
      element.children.forEach(visit);
    }
  };

  value.forEach(visit);
  return value;
};

export const getEffectiveBlockWidth = (
  editor: SlateEditor,
  element?: TElement | null,
) => {
  const config = getBlockWidthConfig(editor, element);
  const current = element?.[BLOCK_WIDTH_KEY];

  if (typeof current === 'string' && isAllowedWidth(config.widths, current)) {
    return current;
  }

  return config.defaultWidth;
};

export const withBlockWidthDefaults = <T extends TElement>(
  editor: SlateEditor,
  element: T,
): T => {
  const width = getEffectiveBlockWidth(editor, element);

  if (element[BLOCK_WIDTH_KEY] === width) {
    return element;
  }

  return {
    ...element,
    [BLOCK_WIDTH_KEY]: width,
  };
};

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
  normalizeInitialValue: ({ value }) => {
    applyBlockWidthDefaultsInValue(value);
  },
  inject: {
    isBlock: true,
    nodeProps: {
      nodeKey: BLOCK_WIDTH_KEY,
      transformProps: ({ editor, element, nodeValue, props }) => {
        const widthValue =
          element && ElementApi.isElement(element)
            ? getEffectiveBlockWidth(editor, element)
            : nodeValue;
        const widthStyle = getBlockWidthStyle(widthValue);

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
    defaultWidths: [],
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
