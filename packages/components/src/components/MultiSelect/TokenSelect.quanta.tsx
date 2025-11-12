import React, { useRef } from 'react';
import { Label } from '../Field/Field.quanta';
import { DropdownItem, ListBox } from '../ListBox/ListBox.quanta';
import { Popover } from '../Popover/Popover.quanta';
import { Button } from '../Button/Button.quanta';
import {
  Autocomplete,
  Select,
  SelectValue,
  useFilter,
  type SelectProps as AriaSelectProps,
  type Key,
} from 'react-aria-components';
import { Tag, TagGroup } from '../TagGroup/TagGroup.quanta';
import { AddIcon } from '../icons/AddIcon';
import { SearchField } from '../SearchField/SearchField.quanta';

export type Option = {
  id: Key;
  name: string;
};

export interface TokenSelectProps<T extends Option = Option>
  extends Omit<AriaSelectProps<T>, 'children'> {
  items: Iterable<T>;
  children: React.ReactNode | ((item: T) => React.ReactNode);
}

export function TokenSelect<T extends Option>(props: TokenSelectProps<T>) {
  const triggerRef = useRef<HTMLDivElement | null>(null);
  const { contains } = useFilter({ sensitivity: 'base' });
  const { items } = props;

  return (
    <Select
      selectionMode="multiple"
      className="group relative mx-auto mt-4 flex w-fit flex-col gap-1"
    >
      <Label>States</Label>
      <div
        ref={triggerRef}
        className="flex w-[250px] items-center gap-2 rounded-lg border border-black/10 bg-white p-2"
      >
        <SelectValue<Option> className="flex-1">
          {({ selectedItems, state }) => (
            <TagGroup
              aria-label="Selected states"
              items={selectedItems.filter((item) => item != null)}
              renderEmptyState={() => (
                <i className="pl-2 text-sm text-gray-600">No selected items</i>
              )}
              onRemove={(keys) => {
                // Remove keys from Select state.
                if (Array.isArray(state.value)) {
                  state.setValue(state.value.filter((k) => !keys.has(k)));
                }
              }}
            >
              {(item) => <Tag>{item.name}</Tag>}
            </TagGroup>
          )}
        </SelectValue>
        <Button>
          <AddIcon size="sm" />
        </Button>
      </div>
      <Popover
        // Position popover relative to the wrapping div instead of only the Button
        triggerRef={triggerRef}
        placement="bottom end"
        className="flex w-[250px] flex-col p-2"
      >
        <Autocomplete filter={contains}>
          <SearchField autoFocus className="mb-2" />
          <ListBox items={items}>
            {(state) => <DropdownItem>{state.name}</DropdownItem>}
          </ListBox>
        </Autocomplete>
      </Popover>
    </Select>
  );
}
