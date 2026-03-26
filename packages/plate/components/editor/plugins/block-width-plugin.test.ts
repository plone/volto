import { afterEach, describe, expect, it, vi } from 'vitest';
import config from '@plone/registry';

import {
  BaseBlockWidthPlugin,
  BLOCK_WIDTH_VALUES,
  DEFAULT_BLOCK_WIDTH,
  getBlockWidthConfig,
  getBlockWidthDefinitions,
  getBlockWidthOptions,
} from './block-width-plugin';

type RegistryBlocksState = {
  widths?: unknown;
  plateBlocksConfig?: unknown;
  blocksConfig?: unknown;
};

type TransformPropsArgs = {
  nodeValue?: string;
  props: {
    style?: Record<string, string>;
  };
};

type TransformPropsFn = (args: TransformPropsArgs) => {
  style: Record<string, string>;
};

const registryBlocks = config.blocks as Record<string, unknown>;

const snapshotRegistryState = (): RegistryBlocksState => ({
  widths: registryBlocks.widths,
  plateBlocksConfig: registryBlocks.plateBlocksConfig,
  blocksConfig: registryBlocks.blocksConfig,
});

const restoreRegistryState = (state: RegistryBlocksState) => {
  registryBlocks.widths = state.widths;
  registryBlocks.plateBlocksConfig = state.plateBlocksConfig;
  registryBlocks.blocksConfig = state.blocksConfig;
};

const initialRegistryState = snapshotRegistryState();

const createEditor = (defaultWidths = [BLOCK_WIDTH_VALUES.default]) =>
  ({
    getOptions: vi.fn(() => ({ defaultWidths })),
  }) as any;

afterEach(() => {
  restoreRegistryState(initialRegistryState);
});

describe('block width plugin', () => {
  it('falls back to the default width definitions when config.blocks.widths is unset', () => {
    registryBlocks.widths = undefined;

    expect(getBlockWidthDefinitions()).toEqual([
      {
        style: { '--block-width': 'var(--narrow-container-width)' },
        name: 'narrow',
        label: 'Narrow',
      },
      {
        style: { '--block-width': 'var(--default-container-width)' },
        name: 'default',
        label: 'Default',
      },
      {
        style: { '--block-width': 'var(--layout-container-width)' },
        name: 'layout',
        label: 'Layout',
      },
      {
        style: { '--block-width': '100%' },
        name: 'full',
        label: 'Full Width',
      },
    ]);
  });

  it('reads width definitions and toolbar options from config.blocks.widths', () => {
    registryBlocks.widths = [
      {
        name: 'default',
        label: 'Default',
        style: { '--block-width': 'var(--default-container-width)' },
      },
      {
        name: 'cinema',
        label: 'Cinema',
        style: { '--block-width': '120ch' },
      },
    ];

    expect(getBlockWidthDefinitions()).toEqual(registryBlocks.widths);
    expect(getBlockWidthOptions()).toEqual([
      { label: 'Default', value: 'default' },
      { label: 'Cinema', value: 'cinema' },
    ]);
  });

  it('resolves plate block width config from config.blocks.plateBlocksConfig', () => {
    registryBlocks.plateBlocksConfig = {
      p: {
        blockWidth: {
          defaultWidth: BLOCK_WIDTH_VALUES.narrow,
          widths: [BLOCK_WIDTH_VALUES.narrow],
        },
      },
    };

    const editor = createEditor();

    expect(
      getBlockWidthConfig(editor, {
        type: 'p',
        children: [{ text: 'Paragraph' }],
      } as any),
    ).toEqual({
      defaultWidth: BLOCK_WIDTH_VALUES.narrow,
      widths: [BLOCK_WIDTH_VALUES.narrow],
    });
  });

  it('resolves plone block width config from config.blocks.blocksConfig', () => {
    registryBlocks.blocksConfig = {
      image: {
        blockWidth: {
          defaultWidth: BLOCK_WIDTH_VALUES.default,
          widths: [BLOCK_WIDTH_VALUES.layout, BLOCK_WIDTH_VALUES.default],
        },
      },
    };

    const editor = createEditor();

    expect(
      getBlockWidthConfig(editor, {
        type: 'unknown',
        '@type': 'image',
        children: [{ text: '' }],
      } as any),
    ).toEqual({
      defaultWidth: BLOCK_WIDTH_VALUES.default,
      widths: [BLOCK_WIDTH_VALUES.layout, BLOCK_WIDTH_VALUES.default],
    });
  });

  it('adds the default width to the allowed list when the config omits it', () => {
    registryBlocks.plateBlocksConfig = {
      p: {
        blockWidth: {
          defaultWidth: BLOCK_WIDTH_VALUES.default,
          widths: [BLOCK_WIDTH_VALUES.narrow],
        },
      },
    };

    const editor = createEditor();
    const result = getBlockWidthConfig(editor, {
      type: 'p',
      children: [{ text: 'Paragraph' }],
    } as any);

    expect(result.defaultWidth).toBe(BLOCK_WIDTH_VALUES.default);
    expect(result.widths).toEqual([
      BLOCK_WIDTH_VALUES.narrow,
      BLOCK_WIDTH_VALUES.default,
    ]);
  });

  it('injects the resolved width style object into node props', () => {
    registryBlocks.widths = [
      {
        name: 'default',
        label: 'Default',
        style: { '--block-width': 'var(--default-container-width)' },
      },
      {
        name: 'full',
        label: 'Full Width',
        style: { '--block-width': '100%' },
      },
    ];

    const transformProps = (BaseBlockWidthPlugin as any).inject.nodeProps
      .transformProps as TransformPropsFn;

    expect(
      transformProps({
        nodeValue: BLOCK_WIDTH_VALUES.full,
        props: {
          style: {
            color: 'red',
          },
        },
      }),
    ).toEqual({
      style: {
        color: 'red',
        '--block-width': '100%',
      },
    });

    expect(DEFAULT_BLOCK_WIDTH).toBe(BLOCK_WIDTH_VALUES.default);
  });
});
