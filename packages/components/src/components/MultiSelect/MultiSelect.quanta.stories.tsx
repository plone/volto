import React from 'react';
import {
  MultiSelect,
  type Option,
  type MultiSelectProps,
} from './MultiSelect.quanta';
import { useListData } from 'react-stately';
import { type Key } from 'react-aria-components';

const items: Option[] = [
  { id: 'apple', name: 'Apple' },
  { id: 'banana', name: 'Banana' },
  { id: 'orange', name: 'Orange' },
  { id: 'strawberry', name: 'Strawberry' },
  { id: 'blueberry', name: 'Blueberry' },
  { id: 'raspberry', name: 'Raspberry' },
  { id: 'blackberry', name: 'Blackberry' },
  { id: 'grape', name: 'Grape' },
  { id: 'watermelon', name: 'Watermelon' },
  { id: 'pineapple', name: 'Pineapple' },
  { id: 'mango', name: 'Mango' },
  { id: 'peach', name: 'Peach' },
];

export default {
  title: 'Quanta/MultiSelect',
  component: MultiSelect,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    items: {
      control: false,
      description:
        'The list of available options to display in the dropdown. Each item should have an `id` and a `name`.',
    },
    selectedItems: {
      control: 'false',
      description:
        'A list manager initialized using `useListData({ initialItems })`. Used to control selected items statefully.',
    },
    label: { control: 'text', description: 'The label of the tag field' },
    placeholder: {
      control: 'text',
      description: 'Placeholder text displayed when no items are selected.',
    },
    description: {
      control: 'text',
      description: 'Additional helper text displayed below the field.',
    },
    onItemInserted: {
      action: 'item-inserted',
      description:
        'Callback fired when an item is selected. Receives the item `id` as a `Key`.',
    },
    onItemCleared: {
      action: 'item-cleared',
      description:
        'Callback fired when an item is removed. Receives the item `id` as a `Key`.',
    },
    creatable: {
      control: 'boolean',
      description: 'Whether the user can create new options not in the list.',
    },
  },
};

export const Default = (args: MultiSelectProps<Option>) => {
  const selectedItems = useListData({
    initialItems: [items[0], items[2]],
  });

  return (
    <div className="w-full max-w-[400px]">
      <MultiSelect {...args} selectedItems={selectedItems} />
    </div>
  );
};

Default.args = {
  label: 'Fruits',
  items: items,
  onItemInserted: (id: Key) => console.log('Item inserted:', id),
  onItemCleared: (id: Key) => console.log('Item removed:', id),
} as Partial<MultiSelectProps<Option>>;

export const NonCreatable = Default.bind({});

NonCreatable.args = {
  ...Default.args,
  creatable: false,
  label: 'Non-Creatable Fruits',
};
