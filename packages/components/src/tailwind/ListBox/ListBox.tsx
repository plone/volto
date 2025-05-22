import React from 'react';
import { CheckboxIcon } from '../../components/icons';
import {
  ListBox as RACListBox,
  ListBoxItem as RACListBoxItem,
  type ListBoxProps as RACListBoxProps,
  Collection,
  Header,
  type ListBoxItemProps,
  ListBoxSection,
  type SectionProps,
  composeRenderProps,
} from 'react-aria-components';
import { tv } from 'tailwind-variants';
import { composeTailwindRenderProps, focusRing } from '../utils';

interface ListBoxProps<T>
  extends Omit<RACListBoxProps<T>, 'layout' | 'orientation'> {}

export function ListBox<T extends object>({
  children,
  ...props
}: ListBoxProps<T>) {
  return (
    <RACListBox
      {...props}
      className={composeTailwindRenderProps(
        props.className,
        'rounded-lg border border-gray-300 p-1 outline-0',
      )}
    >
      {children}
    </RACListBox>
  );
}

export const itemStyles = tv({
  extend: focusRing,
  base: 'group relative flex cursor-default flex-col gap-1 rounded-md px-2.5 py-1.5 text-sm will-change-transform forced-color-adjust-none select-none',
  variants: {
    isSelected: {
      false: 'text-slate-700 -outline-offset-2 hover:bg-slate-200',
      true: 'bg-gray-600 text-white -outline-offset-4 outline-white forced-colors:bg-[Highlight] forced-colors:text-[HighlightText] forced-colors:outline-[HighlightText] [&+[data-selected]]:rounded-t-none [&:has(+[data-selected])]:rounded-b-none',
    },
    isDisabled: {
      true: 'text-slate-300 forced-colors:text-[GrayText]',
    },
  },
});

export function ListBoxItem(props: ListBoxItemProps) {
  const textValue =
    props.textValue ||
    (typeof props.children === 'string' ? props.children : undefined);
  return (
    <RACListBoxItem {...props} textValue={textValue} className={itemStyles}>
      {composeRenderProps(props.children, (children) => (
        <>
          {children}
          <div className="absolute right-4 bottom-0 left-4 hidden h-px bg-white/20 forced-colors:bg-[HighlightText] [.group[data-selected]:has(+[data-selected])_&]:block" />
        </>
      ))}
    </RACListBoxItem>
  );
}

export const dropdownItemStyles = tv({
  base: 'group flex cursor-default items-center gap-4 rounded-lg py-2 pr-1 pl-3 text-sm outline outline-0 forced-color-adjust-none select-none',
  variants: {
    isDisabled: {
      false: 'text-gray-900',
      true: 'text-gray-300 forced-colors:text-[GrayText]',
    },
    isFocused: {
      true: 'bg-blue-600 text-white forced-colors:bg-[Highlight] forced-colors:text-[HighlightText]',
    },
  },
  compoundVariants: [
    {
      isFocused: false,
      isOpen: true,
      className: 'bg-gray-100',
    },
  ],
});

export function DropdownItem(props: ListBoxItemProps) {
  const textValue =
    props.textValue ||
    (typeof props.children === 'string' ? props.children : undefined);
  return (
    <RACListBoxItem
      {...props}
      textValue={textValue}
      className={dropdownItemStyles}
    >
      {composeRenderProps(props.children, (children, { isSelected }) => (
        <>
          <span className="group-selected:font-semibold flex flex-1 items-center gap-2 truncate font-normal">
            {children}
          </span>
          <span className="flex w-5 items-center">
            {isSelected && <CheckboxIcon className="h-4 w-4" />}
          </span>
        </>
      ))}
    </RACListBoxItem>
  );
}

export interface DropdownSectionProps<T> extends SectionProps<T> {
  title?: string;
  items?: any;
}

export function DropdownSection<T extends object>(
  props: DropdownSectionProps<T>,
) {
  return (
    <ListBoxSection className="after:block after:h-[5px] after:content-[''] first:-mt-[5px]">
      <Header className="sticky -top-[5px] z-10 -mx-1 -mt-px truncate border-y border-y-gray-200 bg-gray-100/60 px-4 py-1 text-sm font-semibold text-gray-500 backdrop-blur-md supports-[-moz-appearance:none]:bg-gray-100 dark:border-y-zinc-700 dark:bg-zinc-700/60 dark:text-zinc-300 [&+*]:mt-1">
        {props.title}
      </Header>
      <Collection items={props.items}>{props.children}</Collection>
    </ListBoxSection>
  );
}
