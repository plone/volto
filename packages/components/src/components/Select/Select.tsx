import React from 'react';
import {
  Button,
  FieldError,
  Header,
  Label,
  ListBox,
  ListBoxItem,
  ListBoxSection,
  Popover,
  Select as RACSelect,
  SelectValue,
  Text,
  type ListBoxItemProps,
  type ListBoxProps,
  type PopoverProps,
  type SectionProps,
  type SelectProps as RACSelectProps,
  type ValidationResult,
} from 'react-aria-components';

import { ChevrondownIcon } from '../icons/ChevrondownIcon';
import { ChevronupIcon } from '../icons/ChevronupIcon';

export interface SelectItemObject {
  label: string;
  value: string;
}

interface SelectBaseProps<T extends object, M extends 'single' | 'multiple'>
  extends Omit<RACSelectProps<T, M>, 'children'> {
  label?: string;
  description?: string;
  errorMessage?: string | ((validation: ValidationResult) => string);
  items?: Iterable<T>;
  children?: React.ReactNode | ((item: T) => React.ReactNode);
}

export interface SelectProps<
  T extends object = SelectItemObject,
  M extends 'single' | 'multiple' = 'single',
> extends SelectBaseProps<T, M> {}

export type SelectPopoverContextValue = Pick<
  PopoverProps,
  'className' | 'style'
>;

export const SelectPopoverContext =
  React.createContext<SelectPopoverContextValue | null>(null);

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
  const popoverProps = React.useContext(SelectPopoverContext) ?? undefined;

  return (
    <RACSelect {...props}>
      {({ isOpen }) => (
        <>
          {label && <Label>{label}</Label>}
          <Button>
            <SelectValue />
            <span aria-hidden="true" style={{ display: 'flex' }}>
              {isOpen ? <ChevronupIcon /> : <ChevrondownIcon />}
            </span>
          </Button>
          {description && <Text slot="description">{description}</Text>}
          <FieldError>{errorMessage}</FieldError>
          <Popover {...popoverProps} offset={0}>
            <SelectListBox items={items}>
              {children
                ? children
                : (DefaultSelectItem as unknown as (
                    item: T,
                  ) => React.ReactNode)}
            </SelectListBox>
          </Popover>
        </>
      )}
    </RACSelect>
  );
}

function DefaultSelectItem(item: SelectItemObject) {
  return <SelectItem id={item.label}>{item.value}</SelectItem>;
}

export function SelectListBox<T extends object>(props: ListBoxProps<T>) {
  return <ListBox {...props} />;
}

export function SelectItem(props: ListBoxItemProps) {
  return <ListBoxItem {...props} />;
}

export function SelectSection<T extends object>(props: SectionProps<T>) {
  return <ListBoxSection {...props} />;
}

export function SelectSectionHeader(
  props: React.ComponentProps<typeof Header>,
) {
  return <Header {...props} />;
}
