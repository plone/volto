import React from 'react';
import { TextFieldContext } from 'react-aria-components';
import {
  Select as BasiqSelect,
  SelectItem,
  SelectProps as BasiqSelectProps,
} from '../../Select/Select';

export function Select<T extends object>(props: BasiqSelectProps<T>) {
  return (
    <TextFieldContext.Provider value={{ className: 'q react-aria-Select' }}>
      <BasiqSelect {...props} />
    </TextFieldContext.Provider>
  );
}

export { SelectItem };
