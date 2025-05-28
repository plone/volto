import React, { type ReactNode } from 'react';

import {
  Menu as RACMenu,
  MenuItem as RACMenuItem,
  MenuSection as RACMenuSection,
  Separator,
  composeRenderProps,
  MenuTrigger,
  Keyboard,
  Text,
  Header,
  Collection,
  type MenuSectionProps as RACMenuSectionProps,
  type MenuItemProps,
  type SeparatorProps,
  type MenuProps as RACMenuProps,
} from 'react-aria-components';
import { Popover, type PopoverProps } from '../Popover/Popover';
import { CheckboxIcon, ChevronrightIcon } from '../../components/icons';
import { Button } from '../Button/Button';
import { tv } from 'tailwind-variants';
import { focusRing } from '../utils';

export interface itemProps {
  id: string;
  label: string;
  description: string;
  keyboard: string;
  icon: ReactNode;
}

export function MenuItem(props: MenuItemProps) {
  const textValue =
    props.textValue ||
    (typeof props.children === 'string' ? props.children : undefined);
  return (
    <RACMenuItem
      textValue={textValue}
      {...props}
      // className={dropdownItemStyles}
    >
      {composeRenderProps(
        props.children,
        (children, { selectionMode, isSelected, hasSubmenu }) => (
          <>
            {selectionMode !== 'none' && (
              <span className="flex w-4 items-center">
                {isSelected && <CheckboxIcon aria-hidden className="h-4 w-4" />}
              </span>
            )}
            <span className="group-selected:font-semibold flex flex-1 items-center gap-2 truncate font-normal">
              {children}
            </span>
            {hasSubmenu && (
              <ChevronrightIcon
                aria-hidden
                className="absolute right-2 h-4 w-4"
              />
            )}
          </>
        ),
      )}
    </RACMenuItem>
  );
}

const menu = tv({
  extend: focusRing,
  base: '',
  variants: {},
});

const menuItem = tv({
  extend: focusRing,
  base: '',
  variants: {},
});
export interface MenuButtonProps<T>
  extends MenuProps<T>,
    Omit<MenuTriggerProps, 'children'> {
  button?: React.ReactNode;
  onPress?: (e: PressEvent) => void;

  placement?: PopoverProps['placement'];
  menuItems: itemProps[];
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
      <Popover placement={props.placement} className="min-w-[150px]">
        <RACMenu
          {...props}
          className="max-h-[inherit] overflow-auto p-1 outline outline-0 [clip-path:inset(0_0_0_0_round_.75rem)]"
        >
          {props?.menuItems?.map((item) => (
            <MenuItem key={item.id}>
              {item.icon && <item.icon />}
              <Text slot="label">{item.label}</Text>
              {item.description && <Text slot="label">{item.description}</Text>}
              {item.keyboard && <Keyboard>{item.keyboard}</Keyboard>}
            </MenuItem>
          ))}
        </RACMenu>
      </Popover>
    </MenuTrigger>
  );
}

export function MenuSeparator(props: SeparatorProps) {
  return (
    <Separator
      {...props}
      className="mx-3 my-1 border-b border-gray-300 dark:border-zinc-700"
    />
  );
}
