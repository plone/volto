import { afterEach, describe, expect, it } from 'vitest';
import config from '@plone/registry';
import type { Value } from 'platejs';
import { migrateLegacyBlockWidthsInValue } from './block-width';

describe('migrateLegacyBlockWidthsInValue', () => {
  afterEach(() => {
    config.blocks.plateBlocksConfig = {} as any;
    config.blocks.blocksConfig = {} as any;
    config.blocks.widths = [] as any;
  });

  it('injects the configured default block width when blockWidth is missing', () => {
    config.blocks.widths = [
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
    ] as any;
    config.blocks.plateBlocksConfig = {
      p: {
        blockWidth: {
          defaultWidth: 'narrow',
          widths: ['narrow'],
        },
      },
    } as any;

    const value: Value = [
      {
        type: 'p',
        children: [{ text: 'Legacy paragraph without width' }],
      } as any,
    ];

    migrateLegacyBlockWidthsInValue(value);

    expect(value).toEqual([
      {
        type: 'p',
        blockWidth: 'narrow',
        children: [{ text: 'Legacy paragraph without width' }],
      },
    ]);
  });
});
