import React, { useRef, useState, useEffect, useCallback, useId } from 'react';
import {
  Button,
  ComboBox,
  Input,
  Label,
  ListBox,
  Popover,
  Text,
  type Key,
  ListBoxItem,
  TagGroup,
  TagList,
  Tag,
} from 'react-aria-components';
import { useListData } from 'react-stately';
import { useFilter } from 'react-aria';

import Close from '../../icons/close.svg?react';

export type Option = {
  id: string;
  name: string;
};

export function MultipleSelect({
  label,
  placeholder = 'Select items...',
  items,
  defaultSelectedKeys = [],
  className = '',
  disabled = false,
  description,
  onItemCleared,
  onItemInserted,
  renderEmptyState,
  errorMessage,
  selectedItems,
  ...props
}: any) {
  const triggerRef = useRef<HTMLDivElement | null>(null);
  const tagGroupIdentifier = useId();
  const triggerButtonRef = useRef<HTMLButtonElement | null>(null);
  const selectedKeys = selectedItems?.items.map((i: any) => i.id);
  const [width, setWidth] = useState(0);
  const { contains } = useFilter({ sensitivity: 'base' });

  const filter = useCallback(
    (item: any, filterText: string) => {
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
      console.log('onRemove', keys);
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
    console.log('this is input', fieldState.inputValue);
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
      console.log('onKeyDownCapture', e);
      if (e.key === 'Backspace' && fieldState.inputValue === '') {
        popLast();
      }

      if (e.key === 'Enter' && fieldState.inputValue) {
        onCreateTag();
      }
    },
    [popLast, fieldState.inputValue, onCreateTag],
  );

  return (
    <div className={`w-full ${className}`}>
      {label && (
        <Label className="mb-1 block text-sm font-medium text-gray-700">
          {label}
        </Label>
      )}
      <div ref={triggerRef} className="relative">
        <div className="relative flex min-h-10 w-full flex-wrap items-center gap-1 rounded-md border border-gray-300 px-3 py-1.5 focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-500">
          <TagGroup
            id={tagGroupIdentifier}
            aria-label="Selected items"
            onRemove={onRemove}
          >
            <TagList
              items={selectedItems.items}
              className="flex items-center gap-1"
            >
              {(item) => (
                <Tag
                  className="inline-flex items-center gap-x-1.5 rounded-md bg-blue-100 px-2 py-0.5 text-sm text-blue-800"
                  textValue={item.name}
                  id={item.id}
                  tabIndex={0}
                >
                  {item.name}
                  <Button
                    slot="remove"
                    className="grid cursor-pointer place-content-center"
                    type="button"
                  >
                    <Close className="icon--sizeXXS" />
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
            className="flex flex-1"
          >
            <Input
              className="outline:none ml-1 flex-1 px-0.5 py-1 shadow-none ring-0 focus:ring-0 focus:outline-none"
              placeholder={placeholder}
              onBlur={() => {
                setFieldState({
                  inputValue: '',
                  selectedKey: null,
                });
                accessibleList.setFilterText('');
              }}
              onKeyDownCapture={onKeyDownCapture}
            />

            <Button
              className="absolute top-1/2 right-2 -translate-y-1/2 p-1 text-gray-400"
              type="button"
              ref={triggerButtonRef}
              slot="remove"
            >
              show
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
                className="rounded-md border border-red-200 bg-white p-1 shadow-lg"
                disallowEmptySelection={false}
                renderEmptyState={
                  renderEmptyState
                    ? renderEmptyState()
                    : () => (
                        <div
                          className="block cursor-pointer p-3 hover:bg-blue-500 focus:bg-blue-500"
                          role="button"
                          onMouseDown={(e) => {
                            e.stopPropagation();

                            if (fieldState.inputValue) {
                              onCreateTag();
                            }
                          }}
                          tabIndex={0}
                        >
                          {fieldState.inputValue ? (
                            <>
                              Create:{' '}
                              <strong className="text-fg font-medium hover:bg-blue-500 focus:bg-blue-500">
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
                {(item: any) => (
                  <ListBoxItem
                    key={item.id}
                    id={item.id}
                    textValue={item.name}
                    className="cursor-pointer px-3 py-2 hover:bg-blue-500 focus:bg-blue-500 focus:outline-none data-[focused]:bg-blue-500"
                  >
                    {item.name}
                  </ListBoxItem>
                )}
              </ListBox>
            </Popover>
          </ComboBox>
        </div>
      </div>
      {description && (
        <Text slot="description" className={`mt-1 text-sm text-red-500`}>
          {description}
        </Text>
      )}
    </div>
  );
}
