import React from 'react';
import {
  Menu as RACMenu,
  MenuItem as RACMenuItem,
  type MenuItemProps,
  type MenuProps,
  MenuTrigger,
  type MenuTriggerProps,
  Popover,
  type PressEvent,
} from 'react-aria-components';

import { Button } from '../Button/Button';
import type { Placement } from 'react-aria';

export interface MenuButtonProps<T>
  extends MenuProps<T>,
    Omit<MenuTriggerProps, 'children'> {
  button?: React.ReactNode;
  onPress?: (e: PressEvent) => void;
  placement?: Placement;
}

export function Menu<T extends object>({
  button,
  onPress,
  children,
  ...props
}: MenuButtonProps<T>) {
  return (
    <MenuTrigger {...props}>
      <Button onPress={onPress}>{button}</Button>
      <Popover placement={props.placement || 'bottom start'}>
        <RACMenu {...props}>{children}</RACMenu>
      </Popover>
    </MenuTrigger>
  );
}

export function MenuItem<T extends object>(props: MenuItemProps<T>) {
  return <RACMenuItem {...props} />;
}
