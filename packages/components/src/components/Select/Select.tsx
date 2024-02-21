import React from 'react';
import {
  Button,
  FieldError,
  Label,
  ListBox,
  ListBoxItem,
  ListBoxItemProps,
  Popover,
  Select as RACSelect,
  SelectProps as RACSelectProps,
  SelectValue,
  Text,
  ValidationResult,
} from 'react-aria-components';

import { ChevrondownIcon } from '../Icons/ChevrondownIcon';
import { ChevronupIcon } from '../Icons/ChevronupIcon';

export interface SelectProps<T extends object>
  extends Omit<RACSelectProps<T>, 'children'> {
  label?: string;
  description?: string;
  errorMessage?: string | ((validation: ValidationResult) => string);
  items?: Iterable<T>;
  children: React.ReactNode | ((item: T) => React.ReactNode);
}

/**
 * See https://react-spectrum.adobe.com/react-aria/Select.html
 *
 * An iterable list of options is passed to the Select using the items prop. Each item
 * accepts an id prop, which is passed to the onSelectionChange handler to identify
 * the selected item. Alternatively, if the item objects contain an id property, as
 * shown in the example below, then this is used automatically and an id prop is not
 * required.
 *
 * Setting a selected option can be done by using the defaultSelectedKey or selectedKey
 * prop. The selected key corresponds to the id prop of an item. When Select is used
 * with a dynamic collection as described above, the id of each item is derived from
 * the data.
 *
 */
export function Select<T extends object>({
  label,
  description,
  errorMessage,
  children,
  items,
  ...props
}: SelectProps<T>) {
  return (
    <RACSelect {...props}>
      {({ isOpen }) => (
        <>
          <Label>{label}</Label>
          <Button>
            <SelectValue />
            {/* Next span is flexed to position the icon just in the middle */}
            <span aria-hidden="true" style={{ display: 'flex' }}>
              {isOpen ? <ChevronupIcon /> : <ChevrondownIcon />}
            </span>
          </Button>
          {description && <Text slot="description">{description}</Text>}
          <FieldError>{errorMessage}</FieldError>
          <Popover>
            <ListBox items={items}>{children}</ListBox>
          </Popover>
        </>
      )}
    </RACSelect>
  );
}

export function SelectItem(props: ListBoxItemProps) {
  return <ListBoxItem {...props} />;
}
