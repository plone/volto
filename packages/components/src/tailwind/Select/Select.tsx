import React from 'react';
import { Description, FieldError, Label } from '../Field/Field';
import { composeTailwindRenderProps, focusRing } from '../utils';
import { ChevrondownIcon } from '../../components/icons/ChevrondownIcon';
import { CheckboxIcon } from '../../components/icons/CheckboxIcon';

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
  composeRenderProps,
  Popover,
  Dialog,
  ListBoxItem,
  ListBox,
} from 'react-aria-components';
import { tv } from 'tailwind-variants';

export type Option = {
  id: Key;
  name: string;
};

const selectTriggerStyles = tv({
  extend: focusRing,
  base: [
    'btr border-input flex h-10 w-full cursor-default items-center gap-4 gap-x-2 rounded-lg border py-2 pr-2 pl-3 text-start shadow-[inset_0_1px_0_0_rgba(255,255,255,0.1)] transition group-disabled:opacity-50 **:data-[slot=icon]:size-4 dark:shadow-none',
    'group-data-open:border-ring/70 group-data-open:ring-ring/20 group-data-open:ring-4',
    'text-fg group-invalid:border-danger group-invalid:ring-danger/20 forced-colors:group-invalid:border-[Mark]',
  ],
  variants: {
    isDisabled: {
      true: 'opacity-50 forced-colors:border-[GrayText] forced-colors:text-[GrayText]',
    },
  },
});

interface SelectTriggerProps extends React.ComponentProps<typeof Button> {
  className?: string;
}

const SelectTrigger = ({ className }: SelectTriggerProps) => {
  return (
    <Button
      className={composeRenderProps(className, (className, renderProps) =>
        selectTriggerStyles({
          ...renderProps,
          className,
        }),
      )}
    >
      <SelectValue className="data-placeholder:text-muted-fg grid flex-1 grid-cols-[auto_1fr] items-center text-base" />
      <ChevrondownIcon
        aria-hidden
        className="text-muted-fg group-data-open:text-fg size-4 shrink-0 duration-300 group-disabled:opacity-50 group-data-open:rotate-180 forced-colors:text-[ButtonText] forced-colors:group-disabled:text-[GrayText]"
      />
    </Button>
  );
};

const content = tv({
  base: [
    'bg-overlay text-overlay-fg max-w-xs rounded-xl border bg-clip-padding shadow-xs transition-transform [scrollbar-width:thin] sm:max-w-3xl sm:text-sm dark:backdrop-saturate-200 forced-colors:bg-[Canvas] [&::-webkit-scrollbar]:size-0.5',
  ],
  variants: {
    isEntering: {
      true: [
        'fade-in animate-in duration-150 ease-out',
        'data-[placement=left]:slide-in-from-right-1 data-[placement=right]:slide-in-from-left-1 data-[placement=top]:slide-in-from-bottom-1 data-[placement=bottom]:slide-in-from-top-1',
      ],
    },
    isExiting: {
      true: [
        'fade-out animate-out duration-100 ease-in',
        'data-[placement=left]:slide-out-to-right-1 data-[placement=right]:slide-out-to-left-1 data-[placement=top]:slide-out-to-bottom-1 data-[placement=bottom]:slide-out-to-top-1',
      ],
    },
  },
});

interface SelectListProps<T extends Option>
  extends Omit<ListBoxProps<T>, 'layout' | 'orientation'>,
    Pick<PopoverProps, 'placement'> {
  items?: Iterable<T>;
  listBoxclassName?:
    | string
    | ((values: { defaultClassName?: string }) => string);
  popoverClassname?:
    | string
    | ((values: { defaultClassName?: string }) => string);
}

const SelectList = <T extends Option>({
  items,
  listBoxclassName,
  popoverClassname,
  placement = 'bottom',
  ...props
}: SelectListProps<T>) => {
  return (
    <Popover
      className={composeRenderProps(
        popoverClassname,
        (popoverClassname, renderProps) =>
          content({
            ...renderProps,
            className: popoverClassname,
          }),
      )}
      placement={placement}
    >
      <Dialog role="dialog">
        <ListBox
          layout="stack"
          orientation="vertical"
          className={composeTailwindRenderProps(
            listBoxclassName,
            'grid max-h-96 max-h-[inherit] w-full min-w-56 min-w-[inherit] scroll-py-1 grid-cols-[auto_1fr] border-0 shadow-none',
          )}
          items={items}
          {...props}
        >
          {(item) => (
            <ListBoxItem
              key={item.id}
              id={item.id}
              textValue={item.name}
              className="col-span-2 grid cursor-pointer grid-cols-[auto_1fr] items-center rounded-md px-3 py-2 text-gray-700 hover:bg-gray-100 focus:bg-gray-100 focus:outline-none data-[focused]:bg-gray-100 supports-[grid-template-columns:subgrid]:grid-cols-subgrid"
            >
              {({ isSelected }) => (
                <>
                  {isSelected && (
                    <CheckboxIcon size="xs" className="mr-3 shrink-0" />
                  )}
                  <span className="col-start-2">{item.name}</span>
                </>
              )}
            </ListBoxItem>
          )}
        </ListBox>
      </Dialog>
    </Popover>
  );
};

interface SelectProps<T extends Option> extends AriaSelectProps<T> {
  label?: string;
  description?: string;
  errorMessage?: string | ((validation: ValidationResult) => string);
  items?: Iterable<T>;
  className?: string;
  listBoxclassName?:
    | string
    | ((values: { defaultClassName?: string }) => string);
  popoverClassname?:
    | string
    | ((values: { defaultClassName?: string }) => string);
  placement?: PopoverProps['placement'];
}

export const Select = <T extends Option>({
  label,
  description,
  errorMessage,
  className,
  items,
  listBoxclassName,
  popoverClassname,
  placement,
  ...props
}: SelectProps<T>) => {
  return (
    <AriaSelect
      {...props}
      className={composeTailwindRenderProps(
        className,
        'group selct-value my-classname flex w-full flex-col gap-y-1.5',
      )}
    >
      {label && <Label>{label}</Label>}
      <SelectTrigger />
      <SelectList
        items={items}
        listBoxclassName={listBoxclassName}
        popoverClassname={popoverClassname}
        placement={placement}
      />
      {description && <Description>{description}</Description>}
      <FieldError>{errorMessage}</FieldError>
    </AriaSelect>
  );
};
