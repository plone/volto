import * as React from 'react';

import type { DropdownMenuProps } from '@radix-ui/react-dropdown-menu';

import { DropdownMenuItemIndicator } from '@radix-ui/react-dropdown-menu';
import { CheckIcon } from 'lucide-react';
import { useEditorPlugin, useSelectionFragmentProp } from 'platejs/react';
import {
  WidthDefaultIcon,
  WidthFullIcon,
  WidthLayoutIcon,
  WidthNarrowIcon,
} from '@plone/components/Icons';

import {
  BlockWidthPlugin,
  BLOCK_WIDTH_KEY,
  getDefaultBlockWidth,
  getBlockWidthConfig,
  getBlockWidthOptions,
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

export function BlockWidthToolbarButton(props: DropdownMenuProps) {
  const { editor, tf } = useEditorPlugin(BlockWidthPlugin);
  const styleFieldTransforms = tf.styleFields as {
    resetStyleField: (fieldName: string) => void;
    setStyleField: (fieldName: string, value: string) => void;
  };
  const [open, setOpen] = React.useState(false);
  const activeBlock = editor.api.block()?.[0];
  const config = getBlockWidthConfig(editor, activeBlock);
  const baseValue = config.defaultWidth ?? getDefaultBlockWidth();
  const widthOptions = React.useMemo(() => {
    const allowed = new Set(config.widths ?? []);
    const options = getBlockWidthOptions();

    return options.filter((option) => allowed.has(option.value));
  }, [config.widths]);

  const value = useSelectionFragmentProp({
    defaultValue: baseValue,
    getProp: (node) => node.blockWidth,
  });

  return (
    <ToolbarSplitButton pressed={open}>
      <ToolbarSplitButtonPrimary
        className="data-[state=on]:bg-accent data-[state=on]:text-accent-foreground"
        onClick={() => {
          styleFieldTransforms.resetStyleField(BLOCK_WIDTH_KEY);
          editor.tf.focus();
        }}
        data-state={value !== baseValue ? 'on' : 'off'}
      >
        <WidthDefaultIcon className="size-4" />
      </ToolbarSplitButtonPrimary>

      <DropdownMenu open={open} onOpenChange={setOpen} modal={false} {...props}>
        <DropdownMenuTrigger asChild>
          <ToolbarSplitButtonSecondary />
        </DropdownMenuTrigger>

        <DropdownMenuContent align="start" alignOffset={-32}>
          <DropdownMenuRadioGroup
            value={value ?? baseValue}
            onValueChange={(newValue) => {
              styleFieldTransforms.setStyleField(BLOCK_WIDTH_KEY, newValue);
              editor.tf.focus();
            }}
          >
            {widthOptions.map(({ label, value }) => {
              const Icon =
                value === 'full'
                  ? WidthFullIcon
                  : value === 'layout'
                    ? WidthLayoutIcon
                    : value === 'narrow'
                      ? WidthNarrowIcon
                      : WidthDefaultIcon;

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
