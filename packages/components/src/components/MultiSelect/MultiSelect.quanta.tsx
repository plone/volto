import React, { useRef, useState, useEffect, useCallback, useId } from 'react';
import {
  Button,
  ComboBox,
  Input,
  ListBox,
  Popover,
  type Key,
  ListBoxItem,
  TagGroup,
  TagList,
  Tag,
} from 'react-aria-components';
import { Description, Label } from '../Field/Field.quanta';
import { useListData } from 'react-stately';
import type { ListData } from 'react-stately';
import { useFilter } from 'react-aria';
import { twMerge } from 'tailwind-merge';

import { CloseIcon as Close } from '../../components/icons/CloseIcon';
import { ChevrondownIcon } from '../../components/icons/ChevrondownIcon';

export type Option = {
  id: Key;
  name: string;
};

export interface MultiSelectProps<T extends object> {
  items: Array<T>;
  selectedItems: ListData<T>;
  className?: string;
  placeholder?: string;
  label?: string;
  description?: string;
  creatable?: boolean;
  onItemInserted?: (key: Key) => void;
  onItemCleared?: (key: Key) => void;
  renderEmptyState?: (inputValue: string) => React.ReactNode;
}

export function MultiSelect({
  label,
  placeholder = 'Select items...',
  items,
  className = '',
  description,
  onItemCleared,
  onItemInserted,
  renderEmptyState,
  selectedItems,
  creatable = true,
  ...props
}: MultiSelectProps<Option>) {
  const triggerRef = useRef<HTMLDivElement | null>(null);
  const tagGroupIdentifier = useId();
  const selectedKeys = selectedItems?.items.map((i: Option) => i.id);
  const [width, setWidth] = useState(0);
  const { contains } = useFilter({ sensitivity: 'base' });

  const filter = useCallback(
    (item: Option, filterText: string) => {
      return !selectedKeys.includes(item.id) && contains(item.name, filterText);
    },
    [contains, selectedKeys],
  );

  const accessibleList = useListData({
    initialItems: items,
    filter,
  });

  const [fieldState, setFieldState] = useState<{
    selectedKey: Key | null;
    inputValue: string;
  }>({
    selectedKey: null,
    inputValue: '',
  });

  const onRemove = useCallback(
    (keys: Set<Key>) => {
      const key = keys.values().next().value;
      if (key) {
        selectedItems.remove(key);
        setFieldState({
          inputValue: '',
          selectedKey: null,
        });
        onItemCleared?.(key);
      }
    },
    [selectedItems, onItemCleared],
  );

  const onSelectionChange = (id: Key | null) => {
    if (!id) {
      return;
    }

    const item = accessibleList.getItem(id);

    if (!item) {
      return;
    }

    if (!selectedKeys.includes(id)) {
      selectedItems.append(item);
      setFieldState({
        inputValue: '',
        selectedKey: id,
      });
      onItemInserted?.(id);
    }

    accessibleList.setFilterText('');
  };
  const onInputChange = (value: string) => {
    setFieldState((prev) => ({
      inputValue: value,
      selectedKey: value === '' ? null : prev.selectedKey,
    }));

    accessibleList.setFilterText(value);
  };

  useEffect(() => {
    const trigger = triggerRef.current;
    if (!trigger) return;

    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        setWidth(entry.target.clientWidth);
      }
    });

    observer.observe(trigger);
    return () => {
      observer.unobserve(trigger);
    };
  }, []);

  const onCreateTag = useCallback(() => {
    const inputValue = fieldState.inputValue.trim();
    const id = inputValue.toLocaleLowerCase();

    let item = accessibleList.getItem(id);

    if (!item) {
      item = {
        id: id,
        name: inputValue,
      };

      setFieldState((prev) => ({
        ...prev,
        inputValue: '',
        selectedKey: id,
      }));

      accessibleList.append(item);
      selectedItems.append(item);
    }
  }, [fieldState.inputValue, accessibleList, selectedItems, setFieldState]);

  const popLast = useCallback(() => {
    if (selectedItems.items.length === 0) {
      return;
    }

    const endKey = selectedItems.items[selectedItems.items.length - 1];

    if (endKey) {
      selectedItems.remove(endKey.id);
      onItemCleared?.(endKey.id);
    }

    setFieldState({
      inputValue: '',
      selectedKey: null,
    });
  }, [selectedItems, onItemCleared]);

  const onKeyDownCapture = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Backspace' && fieldState.inputValue === '') {
        popLast();
      }

      if (
        e.key === 'Enter' &&
        fieldState.inputValue &&
        creatable &&
        accessibleList.items.length === 0
      ) {
        onCreateTag();
      }
    },
    [popLast, fieldState.inputValue, onCreateTag, creatable, accessibleList],
  );

  return (
    <div className={twMerge('w-full', className)}>
      {label && <Label>{label}</Label>}
      <div ref={triggerRef} className="relative">
        <div
          className={`
            relative flex min-h-10 w-full flex-wrap items-center gap-1 rounded-md border
            border-gray-300 bg-white px-3 py-1.5 shadow-sm
            focus-within:border-gray-500 focus-within:ring-2 focus-within:ring-gray-400
          `}
        >
          <TagGroup
            id={tagGroupIdentifier}
            aria-label="Selected items"
            onRemove={onRemove}
          >
            <TagList
              items={selectedItems.items}
              className="flex flex-wrap items-center gap-1"
            >
              {(item: Option) => (
                <Tag
                  className={`
                    inline-flex items-center gap-x-1.5 rounded-md bg-gray-200 px-2 py-0.5 text-sm
                    text-gray-800
                  `}
                  textValue={item.name}
                  id={item.id}
                >
                  {item.name}
                  <Button
                    slot="remove"
                    className={`
                      grid cursor-pointer place-content-center text-gray-500
                      hover:bg-gray-600 hover:text-gray-300
                      focus:bg-gray-600 focus:outline-none
                    `}
                    type="button"
                  >
                    <Close size="xs" />
                  </Button>
                </Tag>
              )}
            </TagList>
          </TagGroup>
          <ComboBox
            {...props}
            allowsEmptyCollection
            aria-label="Available items"
            items={accessibleList.items}
            selectedKey={fieldState.selectedKey}
            inputValue={fieldState.inputValue}
            onSelectionChange={onSelectionChange}
            onInputChange={onInputChange}
            className="relative flex flex-1"
          >
            <Input
              placeholder={placeholder}
              onBlur={() => {
                setFieldState({
                  inputValue: '',
                  selectedKey: null,
                });
                accessibleList.setFilterText('');
              }}
              onKeyDownCapture={onKeyDownCapture}
              className={`
                min-w-0 flex-1 bg-white px-2 py-1.5 text-sm text-gray-800 outline-0
                disabled:text-gray-200
              `}
            />

            <Button
              className={`
                absolute top-1/2 right-2 -translate-y-1/2 p-1 text-gray-400
                hover:text-gray-600
                focus:outline-none
              `}
              type="button"
            >
              <ChevrondownIcon />
            </Button>

            <Popover
              isNonModal
              trigger="ComboBox"
              triggerRef={triggerRef}
              style={{ width: `${width}px` }}
              className="max-w-none overflow-hidden"
            >
              <ListBox
                selectionMode="multiple"
                className="rounded-md border border-gray-200 bg-white p-1 shadow-lg"
                disallowEmptySelection={false}
                renderEmptyState={
                  renderEmptyState
                    ? () => renderEmptyState(fieldState.inputValue)
                    : () => (
                        <div
                          className={`
                            block cursor-pointer rounded-md px-3 py-2 text-gray-700
                            hover:bg-gray-100
                            focus:bg-gray-100 focus:outline-none
                          `}
                          role="button"
                          onMouseDown={(e) => {
                            e.stopPropagation();
                            if (fieldState.inputValue && creatable) {
                              onCreateTag();
                            }
                          }}
                          tabIndex={0}
                        >
                          {fieldState.inputValue ? (
                            <>
                              {creatable ? 'Create:' : 'No results found for:'}{' '}
                              <strong className="font-medium text-gray-900">
                                {fieldState.inputValue}
                              </strong>
                            </>
                          ) : (
                            'No options'
                          )}
                        </div>
                      )
                }
              >
                {(item: Option) => (
                  <ListBoxItem
                    key={item.id}
                    id={item.id}
                    textValue={item.name}
                    className={`
                      cursor-pointer rounded-md px-3 py-2 text-gray-700
                      hover:bg-gray-100
                      focus:bg-gray-100 focus:outline-none
                      data-[focused]:bg-gray-100
                    `}
                  >
                    {item.name}
                  </ListBoxItem>
                )}
              </ListBox>
            </Popover>
          </ComboBox>
        </div>
      </div>
      {description && <Description>{description}</Description>}
    </div>
  );
}
