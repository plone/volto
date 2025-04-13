'use client';

import React from 'react';

import { cn, withRef } from '@udecode/cn';
import {
  PlateElement,
  useFocused,
  useReadOnly,
  useSelected,
} from '@udecode/plate/react';

export const HrElement = withRef<typeof PlateElement>(
  ({ className, nodeProps, ...props }, ref) => {
    const { children } = props;

    const readOnly = useReadOnly();
    const selected = useSelected();
    const focused = useFocused();

    return (
      <PlateElement ref={ref} className={className} {...props}>
        <div className="py-6" contentEditable={false}>
          <hr
            {...nodeProps}
            className={cn(
              'h-0.5 rounded-sm border-none bg-muted bg-clip-content',
              selected && focused && 'ring-2 ring-ring ring-offset-2',
              !readOnly && 'cursor-pointer'
            )}
          />
        </div>
        {children}
      </PlateElement>
    );
  }
);
