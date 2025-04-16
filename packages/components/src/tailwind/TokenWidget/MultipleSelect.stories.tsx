import React, { useState } from 'react';
import { MultipleSelect, type Option } from './MultipleSelect';
import { ListBoxItem } from 'react-aria-components';
import { useListData } from 'react-stately';

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
    defaultSelectedKeys: { control: 'object' },
  },
};

export const Default = (args) => {
  const selectedItems = useListData({
    initialItems: [items[0], items[2]],
  });

  return (
    <MultipleSelect
      {...args}
      items={items}
      selectedItems={selectedItems}
      defaultSelectedKeys={['apple', 'orange']}
    />
  );
};

Default.args = {
  label: 'Fruits',
};
