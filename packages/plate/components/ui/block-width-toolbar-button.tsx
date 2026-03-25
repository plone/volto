import * as React from 'react';

import type { DropdownMenuProps } from '@radix-ui/react-dropdown-menu';

import { DropdownMenuItemIndicator } from '@radix-ui/react-dropdown-menu';
import { CheckIcon } from 'lucide-react';
import { useEditorPlugin, useSelectionFragmentProp } from 'platejs/react';
import {
  WidthDefaultIcon,
  WidthLayoutIcon,
  WidthNarrowIcon,
} from '@plone/components/Icons';

import {
  DEFAULT_BLOCK_WIDTH,
  BlockWidthPlugin,
  BLOCK_WIDTH_VALUES,
  BLOCK_WIDTH_OPTIONS,
  getBlockWidthConfig,
} from '../editor/plugins/block-width-plugin';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from './dropdown-menu';

import {
  ToolbarSplitButton,
  ToolbarSplitButtonPrimary,
  ToolbarSplitButtonSecondary,
} from './toolbar';

const getWidthIcon = (value: string | undefined) =>
  value === BLOCK_WIDTH_VALUES.layout
    ? WidthLayoutIcon
    : value === BLOCK_WIDTH_VALUES.narrow
      ? WidthNarrowIcon
      : WidthDefaultIcon;

export function BlockWidthToolbarButton(props: DropdownMenuProps) {
  const { editor, tf } = useEditorPlugin(BlockWidthPlugin);
  const [open, setOpen] = React.useState(false);
  const activeBlock = editor.api.block()?.[0];
  const config = getBlockWidthConfig(editor, activeBlock);
  const baseValue = config.defaultWidth ?? DEFAULT_BLOCK_WIDTH;
  const widthOptions = React.useMemo(() => {
    const allowed = new Set(config.widths ?? []);

    return BLOCK_WIDTH_OPTIONS.filter((option) => allowed.has(option.value));
  }, [config.widths]);

  const value = useSelectionFragmentProp({
    defaultValue: baseValue,
    getProp: (node) => node.blockWidth,
  });
  const ActiveIcon = getWidthIcon(value ?? baseValue);

  if (widthOptions.length <= 1) {
    return null;
  }

  return (
    <ToolbarSplitButton pressed={open}>
      <ToolbarSplitButtonPrimary
        className="data-[state=on]:bg-accent data-[state=on]:text-accent-foreground"
        onClick={() => {
          tf.blockWidth.setNodes(baseValue);
          editor.tf.focus();
        }}
        data-state={value !== baseValue ? 'on' : 'off'}
      >
        <ActiveIcon className="size-4" />
      </ToolbarSplitButtonPrimary>

      <DropdownMenu open={open} onOpenChange={setOpen} modal={false} {...props}>
        <DropdownMenuTrigger asChild>
          <ToolbarSplitButtonSecondary />
        </DropdownMenuTrigger>

        <DropdownMenuContent align="start" alignOffset={-32}>
          <DropdownMenuRadioGroup
            value={value ?? baseValue}
            onValueChange={(newValue) => {
              tf.blockWidth.setNodes(newValue);
              editor.tf.focus();
            }}
          >
            {widthOptions.map(({ label, value }) => {
              const Icon = getWidthIcon(value);

              return (
                <DropdownMenuRadioItem
                  key={value}
                  className={`
                    min-w-[180px] pl-2
                    *:first:[span]:hidden
                  `}
                  value={value}
                >
                  <span
                    className={`
                      pointer-events-none absolute right-2 flex size-3.5 items-center justify-center
                    `}
                  >
                    <DropdownMenuItemIndicator>
                      <CheckIcon />
                    </DropdownMenuItemIndicator>
                  </span>
                  <span
                    className={`mr-2 inline-flex size-4 items-center justify-center`}
                  >
                    <Icon className="size-4" />
                  </span>
                  {label}
                </DropdownMenuRadioItem>
              );
            })}
          </DropdownMenuRadioGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </ToolbarSplitButton>
  );
}
