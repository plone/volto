import React from 'react';
import {
  OverlayArrow,
  Popover as RACPopover,
  type PopoverProps as RACPopoverProps,
} from 'react-aria-components';
import { Dialog } from '../Dialog/Dialog';

export interface PopoverProps extends Omit<RACPopoverProps, 'children'> {
  children: React.ReactNode;
  /** Mandatory when children don't contain a <Heading slot="title"> or dialogAriaLabelledBy */
  dialogAriaLabel?: string;
  /** Mandatory when children don't contain a <Heading slot="title"> or dialogAriaLabel */
  dialogAriaLabelledby?: string;
  showArrow?: boolean;
}

export function Popover({
  children,
  dialogAriaLabel,
  dialogAriaLabelledby,
  showArrow,
  ...props
}: PopoverProps) {
  return (
    <RACPopover {...props}>
      {showArrow && (
        <OverlayArrow>
          <svg width={12} height={12} viewBox="0 0 12 12">
            <path d="M0 0 L6 6 L12 0" />
          </svg>
        </OverlayArrow>
      )}
      <Dialog
        aria-label={dialogAriaLabel}
        aria-labelledby={dialogAriaLabelledby}
      >
        {children}
      </Dialog>
    </RACPopover>
  );
}
