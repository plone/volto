import {
  createSlatePlugin,
  ElementApi,
  type SetNodesOptions,
  type SlateEditor,
  type TElement,
} from 'platejs';
import config from '@plone/registry';
import type { StyleDefinition } from '@plone/types';
import { toPlatePlugin } from 'platejs/react';

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
  if (element?.type === 'unknown') {
    return {};
  }

  const registryConfig =
    element?.type === 'unknown'
      ? getPloneBlockRegistryWidthConfig(element)
      : getPlateBlockRegistryWidthConfig(element);

  if (registryConfig.defaultWidth || registryConfig.widths?.length) {
    return registryConfig;
  }

  const pluginOptions = editor.getOptions(BaseBlockWidthPlugin) as
    | BlockWidthPluginOptions
    | undefined;

  return {
    widths: pluginOptions?.defaultWidths,
  };
};

export const getBlockWidthConfig = (
  editor: SlateEditor,
  element?: TElement | null,
) => {
  const blockConfig = resolveBlockWidthConfig(editor, element);
  const defaultWidth = blockConfig.defaultWidth ?? getDefaultBlockWidth();
  const registryWidths = getBlockWidthValueList();
  const widths =
    blockConfig.widths ?? (registryWidths.length ? registryWidths : []);

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

    if (element.type === 'unknown') {
      if (Array.isArray(element.children)) {
        element.children.forEach(visit);
      }
      return;
    }

    const registryConfig = getPlateBlockRegistryWidthConfig(
      element as TElement,
    );
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
  const current = element?.[BLOCK_WIDTH_KEY];
  const { defaultWidth, widths } = getBlockWidthConfig(editor, element);

  if (typeof current === 'string' && isAllowedWidth(widths, current)) {
    return current;
  }

  return defaultWidth;
};

export const withBlockWidthDefaults = <T extends TElement>(
  editor: SlateEditor,
  element: T,
): T => {
  if (element.type === 'unknown') {
    return element;
  }

  const width = getEffectiveBlockWidth(editor, element);

  if (element[BLOCK_WIDTH_KEY] === width) {
    return element;
  }

  return {
    ...element,
    [BLOCK_WIDTH_KEY]: width,
  };
};

const withInsertedBlockWidthDefaults = (
  editor: SlateEditor,
  nodes: unknown,
): unknown => {
  if (Array.isArray(nodes)) {
    return nodes.map((node) => withInsertedBlockWidthDefaults(editor, node));
  }

  if (!ElementApi.isElement(nodes)) {
    return nodes;
  }

  const children: unknown[] | undefined = Array.isArray(nodes.children)
    ? nodes.children.map((child: unknown) =>
        withInsertedBlockWidthDefaults(editor, child),
      )
    : nodes.children;
  const nextNode: TElement =
    children === nodes.children ? nodes : ({ ...nodes, children } as TElement);

  if (!editor.api.isBlock(nextNode) || nextNode.type === 'unknown') {
    return nextNode;
  }

  return withBlockWidthDefaults(editor, nextNode);
};

const setBlockWidth = (
  editor: SlateEditor,
  value: string,
  setNodesOptions?: SetNodesOptions,
) => {
  const matchesValue = (node: TElement) => {
    if (node.type === 'unknown') return false;

    const config = getBlockWidthConfig(editor, node);

    return isAllowedWidth(config.widths, value);
  };

  editor.tf.setNodes(
    { [BLOCK_WIDTH_KEY]: value },
    {
      match: (node) =>
        ElementApi.isElement(node) &&
        editor.api.isBlock(node) &&
        matchesValue(node),
      ...setNodesOptions,
    },
  );
};

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
        if (
          !element ||
          !ElementApi.isElement(element) ||
          element.type === 'unknown'
        ) {
          return props;
        }

        const widthValue = getEffectiveBlockWidth(editor, element) ?? nodeValue;
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
  extendEditor: ({ editor }) => {
    const createBlock = editor.api.create.block.bind(editor.api.create);
    const insertNodes = editor.tf.insertNodes.bind(editor.tf);

    editor.api.create.block = ((...args: any[]) =>
      withInsertedBlockWidthDefaults(editor, createBlock(...args))) as any;

    editor.tf.insertNodes = ((nodes: any, options?: any) =>
      insertNodes(
        withInsertedBlockWidthDefaults(editor, nodes) as any,
        options,
      )) as any;

    return editor;
  },
}).extendTransforms(({ editor }) => ({
  resetWidth: (options?: SetNodesOptions) => {
    const blockEntry = editor.api.block();
    const block =
      blockEntry &&
      ElementApi.isElement(blockEntry[0]) &&
      blockEntry[0].type !== 'unknown'
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
