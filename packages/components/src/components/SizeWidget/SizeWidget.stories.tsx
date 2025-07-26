import * as React from 'react';
import { SizeWidget, defaultSizeActionsInfo } from './SizeWidget';
import type { Meta, StoryObj } from '@storybook/react';
import { Form } from 'react-aria-components';
import { Button } from '../Button/Button.quanta';

const meta = {
  title: 'Quanta/SizeWidget',
  component: SizeWidget,
  parameters: {
    layout: 'centered',
    backgrounds: { disable: true },
  },
  tags: ['autodocs'],
  argTypes: {},
  args: {},
} satisfies Meta<typeof SizeWidget>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: 'Content Size',
    description: 'Choose the size of your content',
    name: 'size',
  },
};

export const AllOptions: Story = {
  args: {
    label: 'All Size Options',
    description: 'Complete set of size options',
    name: 'all-size',
  },
};

export const FilteredActions: Story = {
  args: {
    label: 'Filtered Size Options',
    description: 'Only small and large size options',
    actions: ['s', 'l'],
    name: 'filtered-size',
  },
};

export const WithoutLabel: Story = {
  args: {
    actions: ['s', 'm', 'l'],
    name: 'no-label',
  },
};

export const WithDefault: Story = {
  args: {
    name: 'with-default',
    defaultValue: 'm',
  },
};

const ControlledExample = () => {
  const [value, setValue] = React.useState('m');

  return (
    <div className="flex flex-col gap-4">
      <SizeWidget
        id="controlled-size"
        value={value}
        onChange={(size) => setValue(size)}
      />
      <div className="text-sm text-gray-600">
        Current value: <strong>{value}</strong>
      </div>
      <div className="flex gap-2">
        <Button variant="neutral" onPress={() => setValue('s')}>
          Set Small
        </Button>
        <Button variant="neutral" onPress={() => setValue('m')}>
          Set Medium
        </Button>
        <Button variant="neutral" onPress={() => setValue('l')}>
          Set Large
        </Button>
      </div>
    </div>
  );
};

export const Controlled: StoryObj<typeof SizeWidget> = {
  render: ControlledExample,
  parameters: {
    docs: {
      description: {
        story: 'Controlled SizeWidget example with external state management',
      },
    },
  },
};

const customActionsInfo = {
  ...defaultSizeActionsInfo,
  xs: ['XS', 'Extra Small'] as [string, string],
  xl: ['XL', 'Extra Large'] as [string, string],
};

export const CustomActions: Story = {
  args: {
    label: 'Custom Size Options',
    description: 'Example with custom actions and info mapping',
    actions: ['xs', 's', 'm', 'l', 'xl'],
    actionsInfoMap: customActionsInfo,
    name: 'custom-size',
  },
};

const FormExample = () => {
  const [selectedValue, setSelectedValue] = React.useState('');

  return (
    <Form>
      <SizeWidget
        name="content-size"
        label="Content Size"
        description="Select the size of your content (form integration)"
        isRequired
        value={selectedValue}
        onChange={setSelectedValue}
      />
      <div className="text-sm text-gray-600">
        Selected value: <strong>{selectedValue}</strong>
      </div>
      <Button type="submit" variant="primary">
        Submit
      </Button>
    </Form>
  );
};

export const FormIntegration: StoryObj = {
  render: FormExample,
};

export const Disabled: Story = {
  args: {
    label: 'Content Size',
    description: 'This widget is disabled',
    name: 'disabled-size',
    isDisabled: true,
  },
};
