import React, { useState } from 'react';
import {
  MultipleSelect,
  type Option,
  type MultipleSelectProps,
} from './MultipleSelect';
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
  title: 'Tailwind/MultipleSelect',
  component: MultipleSelect,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    label: { control: 'text' },
    placeholder: { control: 'text' },
    description: { control: 'text' },
  },
};

export const Default = (args: MultipleSelectProps<Option>) => {
  const selectedItems = useListData({
    initialItems: [items[0], items[2]],
  });

  return (
    <div className="w-full max-w-[400px]">
      <MultipleSelect
        {...args}
        items={items}
        selectedItems={selectedItems}
        onItemInserted={(id: Key) => console.log('Item inserted:', id)}
        onItemCleared={(id: Key) => console.log('Item removed:', id)}
      />
    </div>
  );
};

Default.args = {
  label: 'Fruits',
};
