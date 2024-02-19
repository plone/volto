import React from 'react';
import { PopoverContext } from 'react-aria-components';
import { Popover, PopoverProps } from '../../Popover/Popover';

export function QuantaPopover(props: PopoverProps) {
  return (
    <PopoverContext.Provider value={{ className: 'q react-aria-Popover' }}>
      <Popover {...props} />
    </PopoverContext.Provider>
  );
}
