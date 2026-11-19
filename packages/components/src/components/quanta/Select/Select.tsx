import React from 'react';
import { SelectContext } from 'react-aria-components';

import {
  Select,
  SelectItem,
  SelectListBox,
  SelectPopoverContext,
  SelectSection,
  SelectSectionHeader,
  type SelectItemObject,
  type SelectProps,
} from '../../Select/Select';

export function QuantaSelect<
  T extends object = SelectItemObject,
  M extends 'single' | 'multiple' = 'single',
>(props: SelectProps<T, M>) {
  return (
    <SelectContext.Provider value={{ className: 'q react-aria-Select' }}>
      <SelectPopoverContext.Provider
        value={{ className: 'q react-aria-Popover' }}
      >
        <Select {...props} />
      </SelectPopoverContext.Provider>
    </SelectContext.Provider>
  );
}

export { SelectItem, SelectListBox, SelectSection, SelectSectionHeader };
export type { SelectItemObject, SelectProps };
