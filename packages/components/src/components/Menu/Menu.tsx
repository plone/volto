import React from 'react';
import {
  Header,
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
import { getMenuTriggerChildren } from './menuTriggerChildren';

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

export function MenuSectionHeader(props: React.ComponentProps<typeof Header>) {
  return <Header {...props} />;
}

interface BasicMenuTriggerProps extends MenuTriggerProps {
  placement?: Placement;
}

export function MenuTrigger(props: BasicMenuTriggerProps) {
  const [trigger, menu] = getMenuTriggerChildren(props.children, 'MenuTrigger');

  return (
    <RACMenuTrigger {...props}>
      {trigger}
      <Popover placement={props.placement || 'bottom start'}>{menu}</Popover>
    </RACMenuTrigger>
  );
}

export function SubmenuTrigger(props: SubmenuTriggerProps) {
  const [trigger, menu] = getMenuTriggerChildren(
    props.children,
    'SubmenuTrigger',
  );

  return (
    <RACSubmenuTrigger {...props}>
      {trigger}
      <Popover placement="end">{menu}</Popover>
    </RACSubmenuTrigger>
  );
}
