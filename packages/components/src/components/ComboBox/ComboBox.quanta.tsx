import React from 'react';
import {
  Button,
  ComboBox as RACComboBox,
  type ComboBoxProps as RACComboBoxProps,
  Group,
  Input,
  type ListBoxItemProps,
  type ListBoxProps,
  type ValidationResult,
} from 'react-aria-components';
import { tv } from 'tailwind-variants';

import { Description, FieldError, Label } from '../Field/Field.quanta';
import { DropdownItem, ListBox } from '../ListBox/ListBox.quanta';
import { Popover } from '../Popover/Popover.quanta';
import { composeTailwindRenderProps, focusRing } from '../utils';
import { ChevrondownIcon } from '../icons';

const triggerStyles = tv({
  extend: focusRing,
  base: `
    flex min-h-11 min-w-45 items-center gap-2 rounded-lg bg-quanta-snow py-1 pr-2 pl-3 text-sm
    text-quanta-space transition
    focus-within:bg-quanta-air
    hover:bg-quanta-smoke
    forced-colors:bg-[Field]
  `,
  variants: {
    isFocusVisible: {
      // Mirror the focus ring on the group when the inner input is focused.
      true: 'outline-3',
      false: 'outline-0',
    },
    isDisabled: {
      true: `
        cursor-not-allowed bg-quanta-air text-quanta-silver
        hover:bg-quanta-air
        forced-colors:text-[GrayText]
      `,
    },
    isInvalid: {
      true: `
        bg-quanta-ballet
        hover:bg-quanta-flamingo
      `,
    },
  },
});

export interface ComboBoxProps<T extends object>
  extends Omit<RACComboBoxProps<T>, 'children'> {
  label?: string;
  description?: string | null;
  errorMessage?: string | ((validation: ValidationResult) => string);
  placeholder?: string;
  items?: Iterable<T>;
  children: React.ReactNode | ((item: T) => React.ReactNode);
}

/**
 * Quanta-styled, searchable single-select. Built on react-aria's `ComboBox`,
 * so typing in the input filters the options (default "contains" filter when
 * options are passed as a static collection). Visually matches `Select`.
 */
export function ComboBox<T extends object>({
  label,
  description,
  errorMessage,
  placeholder,
  items,
  children,
  ...props
}: ComboBoxProps<T>) {
  return (
    <RACComboBox
      menuTrigger="focus"
      allowsEmptyCollection
      {...props}
      className={composeTailwindRenderProps(
        props.className,
        'group flex flex-col gap-1',
      )}
    >
      {({ isOpen, isDisabled, isInvalid }) => (
        <>
          {label && <Label>{label}</Label>}
          <Group
            className={(renderProps) =>
              triggerStyles({ ...renderProps, isDisabled, isInvalid })
            }
          >
            <Input
              placeholder={placeholder}
              className={`
                min-w-0 flex-1 truncate bg-transparent py-1 outline-0
                placeholder:text-quanta-pigeon
              `}
            />
            <Button
              aria-label="Show suggestions"
              className="flex shrink-0 items-center rounded outline-0"
            >
              <ChevrondownIcon
                aria-hidden
                size="base"
                className={
                  isOpen
                    ? 'rotate-180 transition-transform'
                    : 'transition-transform'
                }
              />
            </Button>
          </Group>
          {description && <Description>{description}</Description>}
          <FieldError>{errorMessage}</FieldError>
          <Popover className="min-w-(--trigger-width) p-1">
            <ComboBoxListBox items={items}>{children}</ComboBoxListBox>
          </Popover>
        </>
      )}
    </RACComboBox>
  );
}

export function ComboBoxListBox<T extends object>(props: ListBoxProps<T>) {
  return (
    <ListBox
      {...props}
      renderEmptyState={
        props.renderEmptyState ??
        (() => (
          <div className="px-3 py-2 text-sm text-quanta-pigeon">
            No results found
          </div>
        ))
      }
      className={composeTailwindRenderProps(
        props.className,
        'max-h-72 min-w-(--trigger-width) p-1',
      )}
    />
  );
}

export function ComboBoxItem(props: ListBoxItemProps) {
  return <DropdownItem {...props} />;
}
