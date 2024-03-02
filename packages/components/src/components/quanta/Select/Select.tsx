import React from 'react';
import { SelectContext, PopoverContext } from 'react-aria-components';
import { Select, SelectItem, SelectProps } from '../../Select/Select';

export function QuantaSelect<T extends object>(props: SelectProps<T>) {
  return (
    <SelectContext.Provider value={{ className: 'q react-aria-Select' }}>
      <PopoverContext.Provider value={{ className: 'q react-aria-Popover' }}>
        <Select {...props} />
      </PopoverContext.Provider>
    </SelectContext.Provider>
  );
}

export { SelectItem };
