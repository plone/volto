import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { BlockWidthToolbarButton } from './block-width-toolbar-button';

vi.mock('platejs/react', () => ({
  useEditorPlugin: () => ({
    editor: {
      api: {
        block: () => [{ type: 'p' }],
      },
      tf: {
        focus: vi.fn(),
      },
    },
    tf: {
      styleFields: {
        resetStyleField: vi.fn(),
        setStyleField: vi.fn(),
      },
    },
  }),
  useSelectionFragmentProp: () => 'default',
}));

vi.mock('@plone/components/Icons', () => ({
  WidthDefaultIcon: () => <span>default-icon</span>,
  WidthFullIcon: () => <span>full-icon</span>,
  WidthLayoutIcon: () => <span>layout-icon</span>,
  WidthNarrowIcon: () => <span>narrow-icon</span>,
}));

vi.mock('../editor/plugins/block-width-plugin', () => ({
  BlockWidthPlugin: {},
  BLOCK_WIDTH_KEY: 'blockWidth',
  getDefaultBlockWidth: () => 'default',
  getBlockWidthConfig: () => ({
    defaultWidth: 'default',
    widths: ['default'],
  }),
  getBlockWidthOptions: () => [
    {
      label: 'Default',
      value: 'default',
    },
  ],
}));

describe('BlockWidthToolbarButton', () => {
  it('does not render when there is only a single allowed width option', () => {
    render(<BlockWidthToolbarButton />);

    expect(screen.queryByText('default-icon')).toBeNull();
  });
});
