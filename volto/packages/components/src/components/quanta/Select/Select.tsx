import React from 'react';
import { SelectContext, PopoverContext } from 'react-aria-components';
import {
  Select,
  SelectItem,
  type SelectProps,
  type SelectItemObject,
} from '../../Select/Select';

export function QuantaSelect<T extends SelectItemObject>(
  props: SelectProps<T>,
) {
  return (
    <SelectContext.Provider value={{ className: 'q react-aria-Select' }}>
      <PopoverContext.Provider value={{ className: 'q react-aria-Popover' }}>
        <Select {...props} />
      </PopoverContext.Provider>
    </SelectContext.Provider>
  );
}

export { SelectItem };
