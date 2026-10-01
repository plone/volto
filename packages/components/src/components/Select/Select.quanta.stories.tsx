import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import {
  Autocomplete,
  Collection,
  Group,
  Select as RACSelect,
  SelectValue,
  useFilter,
} from 'react-aria-components';

import { Button } from '../Button/Button.quanta';
import { Label } from '../Field/Field.quanta';
import { Popover } from '../Popover/Popover.quanta';
import { SearchField } from '../SearchField/SearchField.quanta';
import { Tag, TagGroup } from '../TagGroup/TagGroup.quanta';
import {
  Select,
  SelectItem,
  SelectListBox,
  SelectSection,
  SelectSectionHeader,
  type SelectItemObject,
  type SelectProps,
} from './Select.quanta';

const options = [
  { label: '1', value: 'Aerospace' },
  { label: '2', value: 'Mechanical' },
  { label: '3', value: 'Civil' },
  { label: '4', value: 'Biomedical' },
  { label: '5', value: 'Nuclear' },
  { label: '6', value: 'Industrial' },
  { label: '7', value: 'Chemical' },
  { label: '8', value: 'Agricultural' },
  { label: '9', value: 'Electrical' },
  { label: '10', value: 'Telco' },
];

const groupedOptions = [
  {
    name: 'Fruit',
    children: [
      { id: 'apple', name: 'Apple' },
      { id: 'banana', name: 'Banana' },
      { id: 'orange', name: 'Orange' },
      { id: 'pear', name: 'Pear' },
    ],
  },
  {
    name: 'Vegetable',
    children: [
      { id: 'broccoli', name: 'Broccoli' },
      { id: 'carrots', name: 'Carrots' },
      { id: 'lettuce', name: 'Lettuce' },
      { id: 'spinach', name: 'Spinach' },
    ],
  },
];

const categories = [
  { id: 'news', name: 'News' },
  { id: 'travel', name: 'Travel' },
  { id: 'shopping', name: 'Shopping' },
  { id: 'business', name: 'Business' },
  { id: 'entertainment', name: 'Entertainment' },
  { id: 'food', name: 'Food' },
  { id: 'technology', name: 'Technology' },
  { id: 'health', name: 'Health' },
  { id: 'science', name: 'Science' },
];

const states = [
  { id: 'AL', name: 'Alabama' },
  { id: 'AK', name: 'Alaska' },
  { id: 'AZ', name: 'Arizona' },
  { id: 'CA', name: 'California' },
  { id: 'CO', name: 'Colorado' },
  { id: 'FL', name: 'Florida' },
  { id: 'MA', name: 'Massachusetts' },
  { id: 'NY', name: 'New York' },
  { id: 'TX', name: 'Texas' },
  { id: 'WA', name: 'Washington' },
];

const meta: Meta<typeof Select> = {
  title: 'Quanta/Select',
  component: Select,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

function ControlledValueStory(args: any) {
  const [value, setValue] = React.useState<string>('10');

  return (
    <>
      <Select {...args} items={options} value={value} onChange={setValue}>
        {(item: SelectItemObject) => (
          <SelectItem id={item.label}>{item.value}</SelectItem>
        )}
      </Select>
      <pre style={{ fontSize: 12 }}>
        Current selection: {JSON.stringify(value)}
      </pre>
    </>
  );
}

function MultipleValueStory(args: any) {
  const [value, setValue] = React.useState<string[]>(['2', '9']);

  return (
    <>
      <Select
        {...args}
        items={options}
        selectionMode="multiple"
        value={value}
        onChange={setValue}
      >
        {(item: SelectItemObject) => (
          <SelectItem id={item.label}>{item.value}</SelectItem>
        )}
      </Select>
      <pre style={{ fontSize: 12 }}>
        Current selection: {JSON.stringify(value)}
      </pre>
    </>
  );
}

function AutocompletePopoverStory() {
  const { contains } = useFilter({ sensitivity: 'base' });

  return (
    <RACSelect className="group flex flex-col gap-1">
      <Label>Category</Label>
      <Button variant="neutral" accent>
        <SelectValue />
      </Button>
      <Popover className="flex flex-col p-1">
        <Autocomplete filter={contains}>
          <SearchField
            aria-label="Search categories"
            placeholder="Search categories"
            autoFocus
          />
          <SelectListBox items={categories}>
            {(item: (typeof categories)[number]) => (
              <SelectItem id={item.id}>{item.name}</SelectItem>
            )}
          </SelectListBox>
        </Autocomplete>
      </Popover>
    </RACSelect>
  );
}

function TagGroupValueStory() {
  const triggerRef = React.useRef<HTMLDivElement | null>(null);
  const { contains } = useFilter({ sensitivity: 'base' });
  const [value, setValue] = React.useState<string[]>([]);

  return (
    <RACSelect
      className="group flex flex-col gap-1"
      selectionMode="multiple"
      value={value}
      onChange={(nextValue) => setValue(nextValue as string[])}
    >
      <Label>States</Label>
      <Group
        aria-label="States"
        ref={triggerRef}
        className="flex min-h-11 min-w-[250px] items-center gap-2 rounded-lg bg-quanta-snow p-2"
      >
        <SelectValue<(typeof states)[number]> style={{ flex: 1 }}>
          {({ selectedItems }) => (
            <TagGroup
              aria-label="Selected states"
              items={selectedItems.filter(
                (item): item is (typeof states)[number] => item != null,
              )}
              renderEmptyState={() => 'No selected items'}
              onRemove={(keys: Set<React.Key>) =>
                setValue((current) => current.filter((key) => !keys.has(key)))
              }
            >
              {(item: (typeof states)[number]) => <Tag>{item.name}</Tag>}
            </TagGroup>
          )}
        </SelectValue>
        <Button variant="primary" accent aria-label="Open state picker">
          +
        </Button>
      </Group>
      <Popover triggerRef={triggerRef} className="flex w-[250px] flex-col p-1">
        <Autocomplete filter={contains}>
          <SearchField
            aria-label="Search states"
            placeholder="Search states"
            autoFocus
          />
          <SelectListBox items={states}>
            {(item: (typeof states)[number]) => (
              <SelectItem id={item.id}>{item.name}</SelectItem>
            )}
          </SelectListBox>
        </Autocomplete>
      </Popover>
    </RACSelect>
  );
}

export const Default: Story = {
  args: {
    name: 'field-default',
    label: 'Field title',
    description: 'Optional help text',
    placeholder: 'Select...',
    children: (
      <>
        <SelectItem id="hello">Hello</SelectItem>
        <SelectItem id="lorem">Lorem Ipsum</SelectItem>
      </>
    ),
  },
};

export const Items: Story = {
  render: (args) => (
    <Select<SelectItemObject, 'single'>
      {...(args as SelectProps<SelectItemObject, 'single'>)}
    >
      {(item: SelectItemObject) => (
        <SelectItem id={item.label}>{item.value}</SelectItem>
      )}
    </Select>
  ),
  args: {
    name: 'field-items',
    label: 'Field title',
    description: 'Optional help text',
    placeholder: 'Select...',
    items: options,
  },
};

export const Sections: Story = {
  render: (args) => (
    <Select<(typeof groupedOptions)[number], 'single'>
      {...(args as SelectProps<(typeof groupedOptions)[number], 'single'>)}
      items={groupedOptions}
    >
      {(section: (typeof groupedOptions)[number]) => (
        <SelectSection id={section.name}>
          <SelectSectionHeader>{section.name}</SelectSectionHeader>
          <Collection items={section.children}>
            {(item: (typeof groupedOptions)[number]['children'][number]) => (
              <SelectItem id={item.id}>{item.name}</SelectItem>
            )}
          </Collection>
        </SelectSection>
      )}
    </Select>
  ),
  args: {
    name: 'field-sections',
    label: 'Preferred fruit or vegetable',
    placeholder: 'Select...',
  },
};

export const ControlledValue: Story = {
  render: ControlledValueStory,
  args: {
    name: 'field-controlled',
    label: 'Pick an industry',
    placeholder: 'Select...',
  },
};

export const MultipleValue: Story = {
  render: MultipleValueStory,
  args: {
    name: 'field-multiple',
    label: 'Pick industries',
    placeholder: 'Select...',
  },
};

export const AutocompletePopover: Story = {
  render: AutocompletePopoverStory,
};

export const TagGroupValue: Story = {
  render: TagGroupValueStory,
};

export const Required: Story = {
  ...Items,
  args: {
    ...Items.args,
    name: 'field-required',
    isRequired: true,
  },
};

export const Filled: Story = {
  ...Items,
  args: {
    ...Items.args,
    name: 'field-filled',
    label: 'Filled field title',
    defaultValue: '10',
    isRequired: true,
  },
};

export const Errored: Story = {
  ...Items,
  args: {
    ...Items.args,
    name: 'field-errored',
    label: 'Errored field title',
    defaultValue: '10',
    errorMessage: 'This is the error',
    isInvalid: true,
    isRequired: true,
  },
};

export const Disabled: Story = {
  ...Items,
  args: {
    ...Items.args,
    name: 'field-disabled',
    label: 'Disabled field title',
    isDisabled: true,
  },
};
