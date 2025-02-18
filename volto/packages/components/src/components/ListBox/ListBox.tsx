import React from 'react';
import {
  ListBox as RACListBox,
  ListBoxItem as RACListBoxItem,
  type ListBoxItemProps,
  type ListBoxProps,
} from 'react-aria-components';

export function ListBox<T extends object>({
  children,
  ...props
}: ListBoxProps<T>) {
  return <RACListBox {...props}>{children}</RACListBox>;
}

export function ListBoxItem(props: ListBoxItemProps) {
  return <RACListBoxItem {...props} />;
}
