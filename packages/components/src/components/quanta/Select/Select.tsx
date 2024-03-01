import React from 'react';
import { SelectContext } from 'react-aria-components';
import { Select, SelectItem, SelectProps } from '../../Select/Select';

export function QuantaSelect<T extends object>(props: SelectProps<T>) {
  return (
    <SelectContext.Provider value={{ className: 'q react-aria-Select' }}>
      <Select {...props} />
    </SelectContext.Provider>
  );
}

export { SelectItem };
