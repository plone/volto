/**
 * A Menu component designed for use inside the Toolbar's shadow DOM.
 *
 * React Aria's Popover uses FocusScope and useInteractOutside, which rely on
 * `document.activeElement`. Inside a shadow DOM, `document.activeElement`
 * returns the shadow host element rather than the actual focused element,
 * breaking focus containment and outside-click detection.
 *
 * ToolbarMenu works around this by:
 *  - Setting `isNonModal` on the Popover to disable FocusScope containment
 *  - Managing open state and dismiss-on-outside-click manually via native
 *    event listeners on both the shadow root and document
 *
 * Usage is identical to the base Menu component. Pass custom CSS via the
 * `styles` prop (imported with `?inline`) — it will be injected into the
 * shadow root automatically:
 *
 *   import menuStyles from './MyMenu.css?inline';
 *
 *   <ToolbarMenu button={<MyIcon />} className="my-menu" styles={menuStyles}>
 *     <MenuItem href="/foo">Foo</MenuItem>
 *   </ToolbarMenu>
 */

import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  type MenuItemProps,
  type MenuProps,
  type MenuTriggerProps,
  type PressEvent,
} from 'react-aria-components';
import { Menu, MenuItem } from '@plone/components';
import type { Placement } from 'react-aria';

export interface ToolbarMenuProps<T>
  extends MenuProps<T>,
    Omit<MenuTriggerProps, 'children'> {
  button?: React.ReactNode;
  className?: string;
  onPress?: (e: PressEvent) => void;
  placement?: Placement;
  /** CSS string (imported with `?inline`) to inject into the shadow root. */
  styles?: string;
}

export function ToolbarMenu<T extends object>({
  button,
  onPress,
  children,
  className,
  styles,
  ...props
}: ToolbarMenuProps<T>) {
  const [isOpen, setIsOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement | null>(null);

  const triggerRefCallback = useCallback((node: HTMLButtonElement | null) => {
    triggerRef.current = node;
  }, []);

  useEffect(() => {
    if (!isOpen) return;

    const onPointerDown = (e: PointerEvent) => {
      const target = e.target as Node;
      if (triggerRef.current?.contains(target)) return;

      const root = triggerRef.current?.getRootNode() as ShadowRoot | Document;
      const popover = root?.querySelector('.react-aria-Popover');
      if (popover?.contains(target)) return;

      setIsOpen(false);
    };

    const root = triggerRef.current?.getRootNode() as ShadowRoot | Document;
    root?.addEventListener('pointerdown', onPointerDown as EventListener);
    document.addEventListener('pointerdown', onPointerDown as EventListener);

    return () => {
      root?.removeEventListener('pointerdown', onPointerDown as EventListener);
      document.removeEventListener(
        'pointerdown',
        onPointerDown as EventListener,
      );
    };
  }, [isOpen]);

  return (
    <>
      {styles && <style>{styles}</style>}
      <Menu
        isOpen={isOpen}
        onOpenChange={setIsOpen}
        button={button}
        buttonRef={triggerRefCallback}
        onPress={onPress}
        isNonModal={true}
        className={className}
        {...props}
      >
        {children}
      </Menu>
    </>
  );
}

export function ToolbarMenuItem<T extends object>(props: MenuItemProps<T>) {
  return <MenuItem {...props} />;
}
