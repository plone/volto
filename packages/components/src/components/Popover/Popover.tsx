import React from 'react';
import {
  Dialog,
  OverlayArrow,
  Popover as RACPopover,
  PopoverProps as RACPopoverProps,
} from 'react-aria-components';

export interface PopoverProps extends Omit<RACPopoverProps, 'children'> {
  children: React.ReactNode;
}

export function Popover({ children, ...props }: PopoverProps) {
  return (
    <RACPopover {...props}>
      <OverlayArrow>
        <svg width={12} height={12} viewBox="0 0 12 12">
          <path d="M0 0 L6 6 L12 0" />
        </svg>
      </OverlayArrow>
      <Dialog>{children}</Dialog>
    </RACPopover>
  );
}
