import config from '@plone/registry';
import type { Value } from 'platejs';
import {
  BLOCK_WIDTH_KEY,
  getBlockWidthDefinitions,
  getDefaultBlockWidth,
} from '../components/editor/plugins/block-width-plugin';

type BlockWidthConfig = {
  defaultWidth?: string;
  widths?: string[];
};

type LegacyElement = Record<string, unknown> & {
  type?: unknown;
  children?: unknown[];
};

const getAllowedWidths = () =>
  getBlockWidthDefinitions()
    .map((width) => width.name)
    .filter((name): name is string => !!name);

const getRegistryBlockWidthConfig = (node: LegacyElement): BlockWidthConfig => {
  if (node.type === 'unknown' && typeof node['@type'] === 'string') {
    const blocksConfig = config?.blocks?.blocksConfig as
      | Record<string, { blockWidth?: BlockWidthConfig }>
      | undefined;

    return blocksConfig?.[node['@type']]?.blockWidth ?? {};
  }

  if (typeof node.type === 'string') {
    const plateBlocksConfig = config?.blocks?.plateBlocksConfig as
      | Record<string, { blockWidth?: BlockWidthConfig }>
      | undefined;

    return plateBlocksConfig?.[node.type]?.blockWidth ?? {};
  }

  return {};
};

export const migrateLegacyBlockWidthsInValue = (value: Value) => {
  const fallbackWidths = getAllowedWidths();
  const fallbackDefaultWidth = getDefaultBlockWidth();

  const visit = (node: unknown) => {
    if (!node || typeof node !== 'object') return;

    const element = node as LegacyElement;
    if (typeof element.type !== 'string') return;

    const registryConfig = getRegistryBlockWidthConfig(element);
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
