import React, { Fragment, type ReactNode } from 'react';

import {
  Menu as RACMenu,
  MenuItem as RACMenuItem,
  MenuSection as RACMenuSection,
  composeRenderProps,
  MenuTrigger,
  Keyboard,
  Section,
  Text,
  Header,
  type MenuSectionProps as RACMenuSectionProps,
  type MenuItemProps as RACMenuItemProps,
  type SeparatorProps,
  type MenuProps as RACMenuProps,
} from 'react-aria-components';
import { Popover, type PopoverProps } from '../Popover/Popover';
import { CheckboxIcon, ChevronrightIcon } from '../../components/icons';
import { Button } from '../Button/Button';
import { Separator } from '../Separator/Separator';
import { tv } from 'tailwind-variants';
import { focusRing } from '../utils';

export interface itemProps {
  id: string;
  label: string;
  description?: string;
  keyboard?: string;
  icon?: ReactNode;
  separator?: boolean;
  disabled?: boolean;
  section?: boolean;
  header?: string;
  href?: string;
  target?: string;
  children?: itemProps[];
}

export const dropdownItemStyles = tv({
  base: 'group cursor-default items-center gap-x-3 gap-y-0 rounded-lg py-1 pr-1 pl-3 outline outline-0 forced-color-adjust-none select-none',
  variants: {
    isDisabled: {
      false: 'text-gray-900 dark:text-zinc-100',
      true: 'text-gray-300 dark:text-zinc-600 forced-colors:text-[GrayText]',
    },
    isFocused: {
      true: 'bg-blue-600 text-white forced-colors:bg-[Highlight] forced-colors:text-[HighlightText]',
    },
    hasKeyboard: {
      false: '',
      true: '',
    },
    hasDescription: {
      false: '',
      true: '',
    },
    hasIcon: {
      false: '',
      true: '',
    },
  },
  compoundVariants: [
    {
      isFocused: false,
      isOpen: true,
      className: 'bg-gray-100 dark:bg-zinc-700/60',
    },
    {
      hasDescription: true,
      hasIcon: true,
      hasKeyboard: true,
      className:
        'grid grid-flow-col grid-cols-[10%_auto_auto] grid-rows-[auto_auto]',
    },
  ],
});
export interface MenuItemProps extends RACMenuItemProps {
  hasDescription: boolean;
  hasKeyboard: boolean;
  hasIcon: boolean;
}

export function MenuItem(props: MenuItemProps) {
  const textValue =
    props.textValue ||
    (typeof props.children === 'string' ? props.children : undefined);
  return (
    <RACMenuItem
      textValue={textValue}
      {...props}
      className={composeRenderProps(props.className, (className, renderProps) =>
        dropdownItemStyles({
          ...renderProps,
          hasDescription: props.hasDescription,
          hasKeyboard: props.hasKeyboard,
          hasIcon: props.hasIcon,
          className,
        }),
      )}
    ></RACMenuItem>
  );
}

const menu = tv({
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

interface MenuItemContentProps {
  selectionMode: string;
  isSelected: boolean;
  hasSubmenu: boolean;
  item: itemProps;
}

function MenuItemContent({
  item,
  selectionMode,
  isSelected,
  hasSubmenu,
}: MenuItemContentProps) {
  return (
    <>
      {selectionMode && (
        <span className="flex w-4 items-center">
          {isSelected && <CheckboxIcon aria-hidden className="h-4 w-4" />}
        </span>
      )}
      {item.icon && <item.icon className="col-start-1" />}
      {item.label && (
        <Text slot="label" className="col-start-2 text-lg">
          {item.label}
        </Text>
      )}
      {item.description && (
        <Text slot="label" className="col-start-2 text-sm">
          {item.description}
        </Text>
      )}
      {item.keyboard && (
        <Keyboard className="col-start-3 row-span-2 text-lg">
          {item.keyboard}
        </Keyboard>
      )}
      {hasSubmenu && (
        <ChevronrightIcon aria-hidden className="absolute right-2 h-4 w-4" />
      )}
    </>
  );
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
          {props?.menuItems?.map((item, key) => {
            return (
              <Fragment key={item.id || key}>
                {item.separator && !item.section && <Separator />}
                {!item.separator && !item.section && (
                  <MenuItem
                    key={item.id}
                    hasDescription={!!item.description}
                    hasKeyboard={!!item.keyboard}
                    hasIcon={!!item.icon}
                    isDisabled={item.disabled}
                    href={item.href}
                    target={item.target}
                  >
                    <MenuItemContent
                      item={item}
                      selectionMode={props.selectionMode}
                      isSelected={props.isSelected}
                      hasSubmenu={props.hasSubmenu}
                    />
                  </MenuItem>
                )}
                {!item.separator && item.section && (
                  <Section className={key > 0 ? 'mt-4' : ''}>
                    <Header className="px-2 text-lg font-bold">
                      {item.header}
                    </Header>
                    {item.children.map((child) => (
                      <MenuItem
                        key={child.id}
                        hasDescription={!!child.description}
                        hasKeyboard={!!child.keyboard}
                        hasIcon={!!child.icon}
                        isDisabled={child.disabled}
                        href={item.href}
                      >
                        <MenuItemContent
                          item={child}
                          selectionMode={props.selectionMode}
                          isSelected={props.isSelected}
                          hasSubmenu={props.hasSubmenu}
                        />
                      </MenuItem>
                    ))}
                  </Section>
                )}
              </Fragment>
            );
          })}
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
