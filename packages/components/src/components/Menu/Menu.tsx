import React from 'react';
import {
  Menu as RACMenu,
  MenuItem as RACMenuItem,
  MenuSection as RACMenuSection,
  MenuTrigger as RACMenuTrigger,
  Popover,
  Separator as RACSeparator,
  SubmenuTrigger as RACSubmenuTrigger,
  type MenuItemProps,
  type MenuProps,
  type MenuSectionProps,
  type MenuTriggerProps,
  type SeparatorProps,
  type SubmenuTriggerProps,
} from 'react-aria-components';
import type { Placement } from 'react-aria';

export function Menu<T extends object>(props: MenuProps<T>) {
  return <RACMenu {...props} />;
}

export function MenuItem<T extends object>(props: MenuItemProps<T>) {
  return <RACMenuItem {...props} />;
}

export function MenuSeparator(props: SeparatorProps) {
  return <RACSeparator {...props} />;
}

export function MenuSection<T extends object>(props: MenuSectionProps<T>) {
  return <RACMenuSection {...props} />;
}

interface BasicMenuTriggerProps extends MenuTriggerProps {
  placement?: Placement;
}

export function MenuTrigger(props: BasicMenuTriggerProps) {
  const [trigger, menu] = React.Children.toArray(props.children) as [
    React.ReactElement,
    React.ReactElement,
  ];

  return (
    <RACMenuTrigger {...props}>
      {trigger}
      <Popover placement={props.placement || 'bottom start'}>{menu}</Popover>
    </RACMenuTrigger>
  );
}

export function SubmenuTrigger(props: SubmenuTriggerProps) {
  const [trigger, menu] = React.Children.toArray(props.children) as [
    React.ReactElement,
    React.ReactElement,
  ];

  return (
    <RACSubmenuTrigger {...props}>
      {trigger}
      <Popover>{menu}</Popover>
    </RACSubmenuTrigger>
  );
}
