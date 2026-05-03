import {
  applyStyleFieldDefaultsInData,
  getStyleFieldsFromBlockSchema,
  getStyleFieldDefinitionsFromRegistry,
  resolveStyleFields,
  setStyleFieldValue,
} from '@plone/helpers';
import config from '@plone/registry';
import type { BlockConfigBase, BlocksFormData } from '@plone/types';
import {
  createSlatePlugin,
  ElementApi,
  type SetNodesOptions,
  type SlateEditor,
  type TElement,
} from 'platejs';
import { toPlatePlugin } from 'platejs/react';

export const STYLE_FIELDS_KEY = 'styleFields';
const BLOCK_WIDTH_KEY = 'blockWidth';
type StyleFieldConfig = {
  defaultValue?: string;
  values?: readonly string[];
  path?: string;
};

type ValueElement = Record<string, unknown> & {
  type?: unknown;
  children?: unknown[];
};

const isRecord = (value: unknown): value is Record<string, unknown> =>
  !!value && typeof value === 'object' && !Array.isArray(value);

const getGlobalWidthValues = () =>
  (
    (config.blocks as Record<string, unknown>).widths as
      | Array<{ name?: string }>
      | undefined
  )
    ?.map((definition) => definition.name)
    .filter((name): name is string => !!name) ?? [];

const getGlobalDefaultWidth = () => {
  const values = getGlobalWidthValues();

  if (!values.length) return 'default';
  if (values.includes('default')) return 'default';

  return values[0];
};

const getLegacyStyleFieldConfigs = (
  styleFields: Record<string, StyleFieldConfig>,
  legacyWidthConfig?: {
    defaultWidth?: string;
    widths?: readonly string[];
  },
) => {
  if (!legacyWidthConfig) {
    return styleFields;
  }

  styleFields[BLOCK_WIDTH_KEY] = {
    defaultValue: legacyWidthConfig.defaultWidth ?? getGlobalDefaultWidth(),
    values: legacyWidthConfig.widths ?? getGlobalWidthValues(),
  };

  return styleFields;
};

const getElementStyleFieldConfigs = (
  element?: TElement | null,
): Record<string, StyleFieldConfig> => {
  if (!element) return {};

  if (element.type === 'unknown') {
    const blockType = (element as TElement & { '@type'?: unknown })['@type'];

    if (typeof blockType !== 'string') return {};

    const blockConfig = (config.blocks as Record<string, unknown>)
      .blocksConfig as Record<string, BlockConfigBase> | undefined;

    const currentBlockConfig = blockConfig?.[blockType];

    return getLegacyStyleFieldConfigs(
      getStyleFieldsFromBlockSchema(
        currentBlockConfig,
        element as unknown as BlocksFormData,
      ),
      currentBlockConfig?.blockWidth,
    );
  }

  const plateBlocksConfig = (config.blocks as Record<string, unknown>)
    .plateBlocksConfig as
    | Record<
        string,
        {
          blockWidth?: { defaultWidth?: string; widths?: readonly string[] };
        }
      >
    | undefined;

  return getLegacyStyleFieldConfigs(
    {},
    typeof element.type === 'string'
      ? plateBlocksConfig?.[element.type]?.blockWidth
      : undefined,
  );
};

const applyStyleFieldDefaultsToElement = <T extends TElement>(
  element: T,
): T => {
  const fieldConfigs = getElementStyleFieldConfigs(element);
  const nextElement = { ...element } as Record<string, unknown>;
  const nextStyles = nextElement['styles'];

  if (isRecord(nextStyles)) {
    nextElement['styles'] = { ...nextStyles };
  }

  applyStyleFieldDefaultsInData({
    data: nextElement,
    fieldConfigs,
    container: undefined,
    resolveDefinitions: getStyleFieldDefinitionsFromRegistry,
  });

  return nextElement as T;
};

const withInsertedStyleFieldDefaults = (nodes: unknown): unknown => {
  if (Array.isArray(nodes)) {
    return nodes.map((node) => withInsertedStyleFieldDefaults(node));
  }

  if (!ElementApi.isElement(nodes)) {
    return nodes;
  }

  const children: unknown[] | undefined = Array.isArray(nodes.children)
    ? nodes.children.map((child: unknown) =>
        withInsertedStyleFieldDefaults(child),
      )
    : nodes.children;
  const nextNode: TElement =
    children === nodes.children ? nodes : ({ ...nodes, children } as TElement);

  return applyStyleFieldDefaultsToElement(nextNode);
};

const applyStyleFieldDefaultsInValue = (value: unknown[]) => {
  const visit = (node: unknown) => {
    if (!node || typeof node !== 'object') return;

    const element = node as ValueElement;
    if (typeof element.type !== 'string') return;

    if (isRecord(element.styles)) {
      element.styles = { ...element.styles };
    }

    applyStyleFieldDefaultsInData({
      data: element,
      fieldConfigs: getElementStyleFieldConfigs(element as TElement),
      container: undefined,
      resolveDefinitions: getStyleFieldDefinitionsFromRegistry,
    });

    if (Array.isArray(element.children)) {
      element.children.forEach(visit);
    }
  };

  value.forEach(visit);
  return value;
};

const buildStyleFieldPatch = (
  node: TElement,
  fieldName: string,
  value: string,
  fieldConfig?: StyleFieldConfig,
) => {
  const nextNode = { ...node } as TElement & Record<string, unknown>;

  if (isRecord(nextNode.styles)) {
    nextNode.styles = { ...nextNode.styles };
  }

  setStyleFieldValue(nextNode, fieldName, value, fieldConfig);

  if (
    typeof fieldConfig?.path === 'string' &&
    fieldConfig.path.startsWith('styles.')
  ) {
    return {
      styles: nextNode.styles,
    };
  }

  if (!(fieldName in node) && isRecord(node.styles)) {
    return {
      styles: nextNode.styles,
    };
  }

  return {
    [fieldName]: nextNode[fieldName],
  };
};

export const setStyleFieldOnEditor = (
  editor: SlateEditor,
  fieldName: string,
  value: string,
  setNodesOptions?: SetNodesOptions,
) => {
  const entries = setNodesOptions?.at
    ? [editor.api.node<TElement>(setNodesOptions.at)].filter(Boolean)
    : editor.api.blocks({ mode: 'lowest' });

  entries.forEach((entry) => {
    if (!entry) return;

    const [node, path] = entry;

    if (!ElementApi.isElement(node) || !editor.api.isBlock(node)) return;

    const fieldConfig = getElementStyleFieldConfigs(node)[fieldName];
    const definitions = getStyleFieldDefinitionsFromRegistry(fieldName, {
      data: node as Record<string, unknown>,
      blockType:
        (typeof node.type === 'string' && node.type !== 'unknown'
          ? node.type
          : (node as TElement & { '@type'?: string })['@type']) ?? undefined,
      fieldName,
    });

    const allowedValues = fieldConfig?.values?.length
      ? fieldConfig.values
      : definitions
          .map((definition: { name?: string }) => definition.name)
          .filter((name: string | undefined): name is string => !!name);

    if (!allowedValues.includes(value)) return;

    editor.tf.setNodes(
      buildStyleFieldPatch(node, fieldName, value, fieldConfig),
      {
        ...setNodesOptions,
        at: path,
      },
    );
  });
};

export const resetStyleFieldOnEditor = (
  editor: SlateEditor,
  fieldName: string,
  options?: SetNodesOptions,
) => {
  const blockEntry = editor.api.block();
  const block =
    blockEntry && ElementApi.isElement(blockEntry[0])
      ? blockEntry[0]
      : undefined;
  const defaultValue = block
    ? getElementStyleFieldConfigs(block)[fieldName]?.defaultValue
    : undefined;

  if (!defaultValue) return;

  setStyleFieldOnEditor(editor, fieldName, defaultValue, options);
};

export const BaseStyleFieldsPlugin = createSlatePlugin({
  key: STYLE_FIELDS_KEY,
  normalizeInitialValue: ({ value }) => {
    applyStyleFieldDefaultsInValue(value);
  },
  inject: {
    isBlock: true,
    nodeProps: {
      transformProps: ({ element, props }) => {
        if (!element || !ElementApi.isElement(element)) {
          return props;
        }

        const { style } = resolveStyleFields({
          data: element as Record<string, unknown>,
          fieldConfigs: getElementStyleFieldConfigs(element),
          container: undefined,
          resolveDefinitions: getStyleFieldDefinitionsFromRegistry,
        });

        if (!Object.keys(style).length) return props;

        return {
          ...props,
          style: {
            ...(props.style ?? {}),
            ...style,
          },
        };
      },
    },
  },
  extendEditor: ({ editor }) => {
    const createBlock = editor.api.create.block.bind(editor.api.create);
    const insertNodes = editor.tf.insertNodes.bind(editor.tf);

    editor.api.create.block = ((...args: any[]) =>
      withInsertedStyleFieldDefaults(createBlock(...args))) as any;

    editor.tf.insertNodes = ((nodes: any, options?: any) =>
      insertNodes(
        withInsertedStyleFieldDefaults(nodes) as any,
        options,
      )) as any;

    return editor;
  },
}).extendTransforms(({ editor }) => ({
  setStyleField: (
    fieldName: string,
    value: string,
    options?: SetNodesOptions,
  ) => {
    setStyleFieldOnEditor(editor, fieldName, value, options);
  },
  resetStyleField: (fieldName: string, options?: SetNodesOptions) => {
    resetStyleFieldOnEditor(editor, fieldName, options);
  },
}));

export const StyleFieldsPlugin = toPlatePlugin(BaseStyleFieldsPlugin);
