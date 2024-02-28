import React from 'react';
import { TextFieldContext } from 'react-aria-components';
import { Select, SelectItem, SelectProps } from '../../Select/Select';

export function QuantaSelect<T extends object>(props: SelectProps<T>) {
  return (
    <TextFieldContext.Provider value={{ className: 'q react-aria-Select' }}>
      <Select {...props} />
    </TextFieldContext.Provider>
  );
}

export { SelectItem };
