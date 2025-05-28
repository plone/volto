import React from 'react';
import {
  Dialog as RACDialog,
  type DialogProps as RACDialogProps,
} from 'react-aria-components';
import { twMerge } from 'tailwind-merge';

export function Dialog(props: RACDialogProps) {
  return (
    <RACDialog
      {...props}
      className={twMerge(
        'relative max-h-[inherit] overflow-auto p-6 outline outline-0 [[data-placement]>&]:p-4',
        props.className,
      )}
    />
  );
}
