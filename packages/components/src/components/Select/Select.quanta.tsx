import React from 'react';
import { Description, FieldError, Label } from '../Field/Field.quanta';
import { ChevrondownIcon } from '../../components/icons/ChevrondownIcon';
import { CheckboxIcon } from '../../components/icons/CheckboxIcon';
import { twMerge } from 'tailwind-merge';

import type {
  ListBoxProps,
  PopoverProps,
  SelectProps as AriaSelectProps,
  ValidationResult,
  Key,
} from 'react-aria-components';
import {
  Button,
  Select as AriaSelect,
  SelectValue,
  Popover,
  Dialog,
  ListBoxItem,
  ListBox,
} from 'react-aria-components';

export type Option = {
  id: Key;
  name: string;
};

interface SelectTriggerProps {
  className?: string;
  placeholder?: string;
  errorMessage?: string | ((validation: ValidationResult) => string);
}

const SelectTrigger = ({
  className,
  placeholder,
  errorMessage,
}: SelectTriggerProps) => {
  return (
    <Button
      className={twMerge(
        'flex h-10 w-full cursor-default items-center justify-between gap-2 rounded-md border border-gray-300 bg-white px-3 py-2 text-sm shadow-sm focus:border-gray-500 focus:ring-2 focus:ring-gray-400 disabled:opacity-50',
        errorMessage
          ? 'border-red-500 focus:border-red-500 focus:ring-red-400'
          : 'border-gray-300 focus:border-gray-500 focus:ring-gray-400',
        className,
      )}
    >
      <SelectValue className="flex-1 truncate text-left data-[placeholder]:text-gray-500" />
      <ChevrondownIcon className="h-4 w-4 shrink-0 text-gray-400 transition-transform duration-200 group-data-[state=open]:rotate-180" />
    </Button>
  );
};

interface SelectListProps<T extends Option>
  extends Omit<ListBoxProps<T>, 'layout' | 'orientation'>,
    Pick<PopoverProps, 'placement'> {
  items?: Iterable<T>;
  className?: string;
}

const SelectList = <T extends Option>({
  items,
  className,
  placement = 'bottom',
  onBlur,
  onFocus,
  ...props
}: SelectListProps<T>) => {
  return (
    <Popover
      className="z-50 w-[var(--trigger-width)] overflow-hidden rounded-md border border-gray-200 bg-white shadow-lg"
      placement={placement}
    >
      <Dialog role="dialog" className="w-[var(--trigger-width)] outline-none">
        <ListBox
          className={twMerge('max-h-60 overflow-auto outline-none', className)}
          items={items}
          onBlur={onBlur}
          onFocus={onFocus}
        >
          {(item) => (
            <ListBoxItem
              key={item.id}
              id={item.id}
              textValue={item.name}
              className="cursor-pointer px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 focus:bg-gray-100 focus:outline-none data-[focused]:bg-gray-100"
            >
              {({ isSelected }) => (
                <div className="flex w-full items-center">
                  <span className="flex-1">{item.name}</span>
                  {isSelected && (
                    <CheckboxIcon className="ml-2 h-4 w-4 text-gray-600" />
                  )}
                </div>
              )}
            </ListBoxItem>
          )}
        </ListBox>
      </Dialog>
    </Popover>
  );
};

export interface SelectProps<T extends Option>
  extends Omit<AriaSelectProps<T>, 'children'> {
  label?: string;
  description?: string;
  errorMessage?: string | ((validation: ValidationResult) => string);
  placeholder?: string;
  items?: Iterable<T>;
  className?: string;
  listBoxClassName?: string;
  placement?: PopoverProps['placement'];
  choices?: string[]; // alternative to items
  onChange?: (value: Key | null) => void;
  onBlur?: () => void;
  onFocus?: () => void;
}

function Select<T extends Option>({
  label,
  description,
  errorMessage,
  placeholder = 'Select an option...',
  className,
  items,
  listBoxClassName,
  placement = 'bottom',
  onChange,
  onBlur,
  onFocus,
  ...props
}: SelectProps<T>) {
  return (
    <AriaSelect
      onSelectionChange={onChange}
      className={twMerge('group flex w-full flex-col gap-1.5', className)}
    >
      {label && <Label>{label}</Label>}
      <SelectTrigger placeholder={placeholder} errorMessage={errorMessage} />
      <SelectList
        items={items}
        className={listBoxClassName}
        placement={placement}
        onBlur={onBlur}
        onFocus={onFocus}
      />
      {description && <Description>{description}</Description>}
      {errorMessage && (
        <div className="text-sm text-red-600">
          {typeof errorMessage === 'function'
            ? errorMessage({} as ValidationResult)
            : errorMessage}
        </div>
      )}
    </AriaSelect>
  );
}

export function SelectWidget<T extends Option>({
  choices,
  items,
  ...props
}: SelectProps<T>) {
  let selectItems = items;

  // If choices are provided, map them to the items format.
  if (choices && choices.length > 0) {
    selectItems = choices.map(
      (item) =>
        ({
          id: item,
          name: item,
        }) as T,
    );
  }

  return <Select {...props} items={selectItems} />;
}
