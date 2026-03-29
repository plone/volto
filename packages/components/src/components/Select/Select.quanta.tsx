import React from 'react';
import {
  Button,
  Header,
  ListBoxSection,
  Select as RACSelect,
  SelectValue,
  type ListBoxItemProps,
  type ListBoxProps,
  type SectionProps,
} from 'react-aria-components';
import { twMerge } from 'tailwind-merge';
import { tv } from 'tailwind-variants';

import { Description, FieldError, Label } from '../Field/Field.quanta';
import { DropdownItem, ListBox } from '../ListBox/ListBox.quanta';
import { Popover } from '../Popover/Popover.quanta';
import { composeTailwindRenderProps, focusRing } from '../utils';
import { ChevrondownIcon } from '../icons';
import {
  SelectSectionHeader as BasicSelectSectionHeader,
  type SelectItemObject,
  type SelectProps,
} from './Select';

const triggerStyles = tv({
  extend: focusRing,
  base: `
    flex min-h-11 min-w-[180px] items-center gap-3 rounded-lg bg-quanta-snow px-3 py-2 text-left
    text-sm text-quanta-space transition
    hover:bg-quanta-smoke
    focus:bg-quanta-air
    active:bg-quanta-air
    forced-colors:bg-[Field]
  `,
  variants: {
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

function DefaultSelectItems({ items }: { items?: Iterable<SelectItemObject> }) {
  if (!items) {
    return null;
  }

  return (
    <>
      {Array.from(items).map((item) => (
        <SelectItem key={item.label} id={item.label}>
          {item.value}
        </SelectItem>
      ))}
    </>
  );
}

export function Select<
  T extends object = SelectItemObject,
  M extends 'single' | 'multiple' = 'single',
>({
  label,
  description,
  errorMessage,
  children,
  items,
  ...props
}: SelectProps<T, M>) {
  return (
    <RACSelect
      {...props}
      className={composeTailwindRenderProps(
        props.className,
        'group flex flex-col gap-1',
      )}
    >
      {({ isOpen }) => (
        <>
          {label && <Label>{label}</Label>}
          <Button className={triggerStyles}>
            <SelectValue
              className={`
                min-w-0 flex-1 truncate
                data-[placeholder]:text-quanta-pigeon
              `}
            />
            <SelectChevron isOpen={isOpen} />
          </Button>
          {description && <Description>{description}</Description>}
          <FieldError>{errorMessage}</FieldError>
          <Popover className="min-w-(--trigger-width) p-1">
            <SelectListBox items={items}>
              {children ? (
                children
              ) : (
                <DefaultSelectItems
                  items={items as Iterable<SelectItemObject>}
                />
              )}
            </SelectListBox>
          </Popover>
        </>
      )}
    </RACSelect>
  );
}

function SelectChevron({ isOpen }: { isOpen: boolean }) {
  return (
    <ChevrondownIcon
      aria-hidden
      size="base"
      className={
        isOpen
          ? 'shrink-0 rotate-180 transition-transform'
          : 'shrink-0 transition-transform'
      }
    />
  );
}

export function SelectListBox<T extends object>(props: ListBoxProps<T>) {
  return (
    <ListBox
      {...props}
      className={composeTailwindRenderProps(
        props.className,
        'max-h-72 min-w-(--trigger-width) p-1',
      )}
    />
  );
}

export function SelectItem(props: ListBoxItemProps) {
  return <DropdownItem {...props} />;
}

export function SelectSection<T extends object>(props: SectionProps<T>) {
  return (
    <ListBoxSection
      {...props}
      className={twMerge(
        `
          after:block after:h-1 after:content-['']
          first:after:h-0
        `,
        props.className,
      )}
    />
  );
}

export function SelectSectionHeader(
  props: React.ComponentProps<typeof BasicSelectSectionHeader>,
) {
  return (
    <Header
      {...props}
      className={twMerge(
        'px-3 py-1 text-xs font-semibold tracking-wide text-quanta-pigeon uppercase',
        props.className,
      )}
    />
  );
}

export type { SelectItemObject, SelectProps };
