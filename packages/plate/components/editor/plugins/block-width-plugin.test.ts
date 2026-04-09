import { afterEach, describe, expect, it, vi } from 'vitest';
import config from '@plone/registry';

import {
  BaseBlockWidthPlugin,
  FALLBACK_BLOCK_WIDTH,
  getBlockWidthConfig,
  getDefaultBlockWidth,
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

const createEditor = (defaultWidths = ['default']) =>
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
          defaultWidth: 'narrow',
          widths: ['narrow'],
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
      defaultWidth: 'narrow',
      widths: ['narrow'],
    });
  });

  it('resolves plone block width config from config.blocks.blocksConfig', () => {
    registryBlocks.blocksConfig = {
      image: {
        blockWidth: {
          defaultWidth: 'default',
          widths: ['layout', 'default'],
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
      defaultWidth: 'default',
      widths: ['layout', 'default'],
    });
  });

  it('adds the default width to the allowed list when the config omits it', () => {
    registryBlocks.plateBlocksConfig = {
      p: {
        blockWidth: {
          defaultWidth: 'default',
          widths: ['narrow'],
        },
      },
    };

    const editor = createEditor();
    const result = getBlockWidthConfig(editor, {
      type: 'p',
      children: [{ text: 'Paragraph' }],
    } as any);

    expect(result.defaultWidth).toBe('default');
    expect(result.widths).toEqual(['narrow', 'default']);
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
        nodeValue: 'full',
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

    expect(getDefaultBlockWidth()).toBe('default');
    expect(FALLBACK_BLOCK_WIDTH).toBe('default');
  });

  it('uses the configured default width style when blockWidth is missing', () => {
    registryBlocks.widths = [
      {
        name: 'narrow',
        label: 'Narrow',
        style: { '--block-width': 'var(--narrow-container-width)' },
      },
      {
        name: 'default',
        label: 'Default',
        style: { '--block-width': 'var(--default-container-width)' },
      },
    ];
    registryBlocks.plateBlocksConfig = {
      p: {
        blockWidth: {
          defaultWidth: 'narrow',
          widths: ['narrow'],
        },
      },
    };

    const editor = createEditor();
    const transformProps = (BaseBlockWidthPlugin as any).inject.nodeProps
      .transformProps as TransformPropsFn;

    expect(
      transformProps({
        editor,
        element: {
          type: 'p',
          children: [{ text: 'Paragraph without width' }],
        },
        props: {
          style: {
            color: 'red',
          },
        },
      } as any),
    ).toEqual({
      style: {
        color: 'red',
        '--block-width': 'var(--narrow-container-width)',
      },
    });
  });

  it('derives the fallback default width from the registry definitions', () => {
    registryBlocks.widths = [
      {
        name: 'cinema',
        label: 'Cinema',
        style: { '--block-width': '120ch' },
      },
      {
        name: 'wide',
        label: 'Wide',
        style: { '--block-width': '90ch' },
      },
    ];

    expect(getDefaultBlockWidth()).toBe('cinema');
  });
});
