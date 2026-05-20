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
 *  - Blocking Tab while the menu is open, to trap the focus
 *  - Restoring focus to the trigger button when the menu closes
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
import { type ComponentProps } from 'react';
import { Button } from 'react-aria-components';
import { MenuTrigger } from '@plone/components';

export interface ToolbarMenuProps extends ComponentProps<typeof MenuTrigger> {
  icon?: React.ReactNode;
  /** CSS string (imported with `?inline`) to inject into the shadow root. */
  styles?: string;
}

export function ToolbarMenu({
  icon,
  children,
  styles,
  ...props
}: ToolbarMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement | null>(null);

  const triggerRefCallback = useCallback((node: HTMLButtonElement | null) => {
    triggerRef.current = node;
  }, []);

  const onOpenChange = (isOpen: boolean) => {
    setIsOpen(isOpen);

    if (!isOpen) {
      triggerRef.current?.focus();
    }
  };

  // Closes the menu on outside clicks. Two listeners are needed because Shadow DOM
  // retargets events at the document level, so only the shadow-root listener can
  // distinguish trigger clicks from popover clicks within the toolbar.
  useEffect(() => {
    if (!isOpen) return;

    const shadowRoot = triggerRef.current?.getRootNode() as ShadowRoot | null;
    if (!shadowRoot || !('host' in shadowRoot)) return;

    // Inside the shadow root e.target is the real element, so plain contains() works.
    const onShadowPointerDown = (e: PointerEvent) => {
      const target = e.target as Node;
      if (triggerRef.current?.contains(target)) {
        setIsOpen(false);
        return;
      }
      const popover = shadowRoot.querySelector('.react-aria-Popover');
      if (popover?.contains(target)) return;
      setIsOpen(false);
    };

    // At the document level, shadow-root events are retargeted to the shadow
    // host — only close when the click genuinely came from outside the toolbar.
    const onDocumentPointerDown = (e: PointerEvent) => {
      if (shadowRoot.host.contains(e.target as Node)) return;
      setIsOpen(false);
    };

    shadowRoot.addEventListener(
      'pointerdown',
      onShadowPointerDown as EventListener,
    );
    document.addEventListener(
      'pointerdown',
      onDocumentPointerDown as EventListener,
    );

    return () => {
      shadowRoot.removeEventListener(
        'pointerdown',
        onShadowPointerDown as EventListener,
      );
      document.removeEventListener(
        'pointerdown',
        onDocumentPointerDown as EventListener,
      );
    };
  }, [isOpen]);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Tab') {
        e.preventDefault();
      }
    };

    if (isOpen) document.addEventListener('keydown', onKeyDown);

    return () => document.removeEventListener('keydown', onKeyDown);
  }, [isOpen]);

  return (
    <>
      {styles && <style>{styles}</style>}
      <MenuTrigger
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        isNonModal={true}
        {...props}
      >
        <Button ref={triggerRefCallback}>{icon}</Button>
        {children}
      </MenuTrigger>
    </>
  );
}
