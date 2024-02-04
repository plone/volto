import React from 'react';
import {
  Menu as RACMenu,
  MenuItem as RACMenuItem,
  MenuItemProps,
  MenuProps,
  MenuTrigger,
  MenuTriggerProps,
  Popover,
  PressEvent,
} from 'react-aria-components';

import { Button } from '../Button/Button';

export interface MenuButtonProps<T>
  extends MenuProps<T>,
    Omit<MenuTriggerProps, 'children'> {
  button?: React.ReactNode;
  onPress?: (e: PressEvent) => void;
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
      <Popover>
        <RACMenu {...props}>{children}</RACMenu>
      </Popover>
    </MenuTrigger>
  );
}

export function MenuItem<T extends object>(props: MenuItemProps<T>) {
  return <RACMenuItem {...props} />;
}
