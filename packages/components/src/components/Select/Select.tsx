import React from 'react';
import {
  Button,
  FieldError,
  Label,
  ListBox,
  ListBoxItem,
  type ListBoxItemProps,
  Popover,
  PopoverContext,
  Select as RACSelect,
  type SelectProps as RACSelectProps,
  SelectValue,
  Text,
  useContextProps,
  type ValidationResult,
} from 'react-aria-components';

import { ChevrondownIcon } from '../icons/ChevrondownIcon';
import { ChevronupIcon } from '../icons/ChevronupIcon';

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
export function Select<T extends SelectItemObject>({
  label,
  description,
  errorMessage,
  children,
  items,
  ...props
}: SelectProps<T>) {
  // In case that we want to customize the Popover, we proxy the PopoverContext props down
  const [popoverProps] = useContextProps({}, null, PopoverContext);

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
          <Popover {...popoverProps}>
            {children ? (
              <ListBox items={items}>{children}</ListBox>
            ) : (
              <ListBox items={items}>
                {(item) => (
                  <SelectItem id={item.label}>{item.value}</SelectItem>
                )}
              </ListBox>
            )}
          </Popover>
        </>
      )}
    </RACSelect>
  );
}

export type SelectItemObject = {
  label: string;
  value: string;
};

export function SelectItem(props: ListBoxItemProps) {
  return <ListBoxItem {...props} />;
}
