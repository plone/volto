import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import {
  Autocomplete,
  Collection,
  Group,
  Label,
  Popover,
  Select as RACSelect,
  SelectValue,
  useFilter,
} from 'react-aria-components';

import { Button } from '../Button/Button';
import { Form } from '../Form/Form';
import { SearchField } from '../SearchField/SearchField';
import { Tag, TagGroup } from '../TagGroup/TagGroup';
import {
  Select,
  SelectItem,
  SelectListBox,
  SelectSection,
  SelectSectionHeader,
} from './Select';

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

const meta = {
  title: 'Basic/Forms/Select',
  component: Select,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div
        style={
          {
            width: '420px',
            '--rac-select-min-width': '220px',
          } as React.CSSProperties
        }
      >
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Select>;

export default meta;
type Story = StoryObj<typeof meta>;

function ControlledValueStory(args: any) {
  const [value, setValue] = React.useState<string>('10');

  return (
    <>
      <Select {...args} items={options} value={value} onChange={setValue} />
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
      />
      <pre style={{ fontSize: 12 }}>
        Current selection: {JSON.stringify(value)}
      </pre>
    </>
  );
}

function AutocompletePopoverStory() {
  const { contains } = useFilter({ sensitivity: 'base' });

  return (
    <RACSelect>
      <Label>Category</Label>
      <Button>
        <SelectValue />
      </Button>
      <Popover
        style={{
          display: 'flex',
          flexDirection: 'column',
        }}
      >
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
  const selectedStateItems = (
    selectedItems: Array<(typeof states)[number] | null>,
  ) =>
    selectedItems.filter(
      (item): item is (typeof states)[number] => item != null,
    );

  return (
    <RACSelect
      selectionMode="multiple"
      value={value}
      onChange={(nextValue) => setValue(nextValue as string[])}
    >
      <Label>States</Label>
      <Group aria-label="States" ref={triggerRef}>
        <SelectValue<(typeof states)[number]> style={{ flex: 1 }}>
          {({ selectedItems }) => (
            <TagGroup
              aria-label="Selected states"
              items={selectedStateItems(selectedItems)}
              renderEmptyState={() => 'No selected items'}
              onRemove={(keys) =>
                setValue((current) => current.filter((key) => !keys.has(key)))
              }
            >
              {(item: (typeof states)[number]) => <Tag>{item.name}</Tag>}
            </TagGroup>
          )}
        </SelectValue>
        <Button aria-label="Open state picker">+</Button>
      </Group>
      <Popover
        triggerRef={triggerRef}
        style={{
          display: 'flex',
          flexDirection: 'column',
          width: 250,
          padding: 4,
        }}
      >
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
    <Select {...args} items={groupedOptions}>
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

export const Validation: Story = {
  render: (args) => (
    <Form>
      <Select {...args}>
        <SelectItem id="aardvark">Aardvark</SelectItem>
        <SelectItem id="cat">Cat</SelectItem>
        <SelectItem id="dog">Dog</SelectItem>
        <SelectItem id="kangaroo">Kangaroo</SelectItem>
        <SelectItem id="panda">Panda</SelectItem>
        <SelectItem id="snake">Snake</SelectItem>
      </Select>
      <Button type="submit">Submit</Button>
    </Form>
  ),
  args: {
    label: 'Animal',
    name: 'animal',
    isRequired: true,
    description: 'Please select an animal.',
  },
};
