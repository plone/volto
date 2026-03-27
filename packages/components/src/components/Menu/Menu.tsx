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
  buttonRef?: React.Ref<HTMLButtonElement>;
  className?: string;
  isOpen?: boolean;
  isNonModal?: boolean;
  onOpenChange?: (isOpen: boolean) => void;
  onPress?: (e: PressEvent) => void;
  placement?: Placement;
}

export function Menu<T extends object>({
  button,
  buttonRef,
  children,
  className,
  isOpen,
  isNonModal = false,
  onOpenChange,
  onPress,
  placement,
  ...props
}: MenuButtonProps<T>) {
  return (
    <MenuTrigger isOpen={isOpen} onOpenChange={onOpenChange} {...props}>
      <Button ref={buttonRef} onPress={onPress}>
        {button}
      </Button>
      <Popover placement={placement || 'bottom start'} isNonModal={isNonModal}>
        <RACMenu className={className} {...props}>
          {children}
        </RACMenu>
      </Popover>
    </MenuTrigger>
  );
}

export function MenuItem<T extends object>(props: MenuItemProps<T>) {
  return <RACMenuItem {...props} />;
}
