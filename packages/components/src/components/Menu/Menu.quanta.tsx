import React, { Fragment, type ReactNode } from 'react';

import {
  Menu as RACMenu,
  MenuItem as RACMenuItem,
  composeRenderProps,
  MenuTrigger,
  Keyboard,
  Section,
  Text,
  Header,
  type MenuItemProps as RACMenuItemProps,
  type SeparatorProps,
  type MenuProps as RACMenuProps,
  type MenuTriggerProps,
  type PressEvent,
} from 'react-aria-components';
import { Popover, type PopoverProps } from '../Popover/Popover.quanta';
import { CheckboxIcon, ChevronrightIcon } from '../../components/icons';
import { Button } from '../Button/Button.quanta';
import { Separator } from '../Separator/Separator.quanta';
import { tv } from 'tailwind-variants';

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
  base: `
    group cursor-default items-center gap-x-3 gap-y-0 rounded-lg py-1 pr-1 pl-3 outline-0
    forced-color-adjust-none select-none
  `,
  variants: {
    isDisabled: {
      false: `
        text-gray-900
        dark:text-zinc-100
      `,
      true: `
        text-gray-300
        dark:text-zinc-600
        forced-colors:text-[GrayText]
      `,
    },
    isFocused: {
      true: `
        bg-blue-600 text-white
        forced-colors:bg-[Highlight] forced-colors:text-[HighlightText]
      `,
    },
    selectionMode: {
      single: 'flex',
      multiple: 'flex',
    },
    hasDescription: {
      false: '',
      true: '',
    },
    hasKeyboard: {
      false: '',
      true: '',
    },
    hasIcon: {
      false: '',
      true: '',
    },
    hasHref: {
      false: '',
      true: 'block',
    },
  },
  compoundVariants: [
    {
      isFocused: false,
      isOpen: true,
      className: `
        bg-gray-100
        dark:bg-zinc-700/60
      `,
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
  selectionMode: 'single' | 'multiple' | undefined;
  item: itemProps;
}

export interface MenuButtonProps<T>
  extends RACMenuProps<T>,
    Omit<MenuTriggerProps, 'children'> {
  button?: React.ReactNode;
  onPress?: (e: PressEvent) => void;

  placement?: PopoverProps['placement'];
  selectionMode?: 'single' | 'multiple';
  menuItems: itemProps[];
}

export function MenuItem(props: MenuItemProps) {
  const textValue =
    props.textValue ||
    (typeof props.children === 'string' ? props.children : undefined);
  return (
    <RACMenuItem
      textValue={textValue}
      {...props}
      id={props.item?.id}
      className={composeRenderProps(props.className, (className, renderProps) =>
        dropdownItemStyles({
          ...renderProps,
          hasDescription: !!props.item.description,
          hasIcon: !!props.item?.icon,
          hasKeyboard: !!props.item?.keyboard,
          isDisabled: props.item?.disabled,
          selectionMode: props?.selectionMode,
          hasHref: !!props.item?.href,
          className,
        }),
      )}
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
            {props.item.icon && <props.item.icon className="col-start-1" />}
            <Text slot="label" className="col-start-2 text-lg">
              {children}
            </Text>
            {props.item.description && (
              <Text slot="description" className="col-start-2 text-sm">
                {props.item.description}
              </Text>
            )}
            {props.item.keyboard && (
              <Keyboard className="col-start-3 row-span-2 text-lg">
                {props.item.keyboard}
              </Keyboard>
            )}
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
          className={`
            max-h-[inherit] overflow-auto p-1 outline-0
            [clip-path:inset(0_0_0_0_round_.75rem)]
          `}
        >
          {props?.menuItems?.map((item, key) => {
            return (
              <Fragment key={item.id || key}>
                {item.separator && !item.section && <Separator />}
                {!item.separator && !item.section && (
                  <MenuItem
                    key={item.id}
                    item={item}
                    isDisabled={item.disabled}
                    selectionMode={props.selectionMode}
                  >
                    {item.label}
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
                        item={child}
                        isDisabled={child.disabled}
                        selectionMode={props.selectionMode}
                      >
                        {child.label}
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
      className={`
        mx-3 my-1 border-b border-gray-300
        dark:border-zinc-700
      `}
    />
  );
}
