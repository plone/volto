import * as React from 'react';
import { WidthWidget, defaultActionsInfo } from './WidthWidget';
import type { Meta, StoryObj } from '@storybook/react';
import { Form } from 'react-aria-components';
import { Button } from '../Button/Button';
import { ImageIcon } from '../../components/icons/ImageIcon';

const meta = {
  title: 'Tailwind/WidthWidget',
  component: WidthWidget,
  parameters: {
    layout: 'centered',
    backgrounds: { disable: true },
  },
  tags: ['autodocs'],
  argTypes: {},
  args: {},
} satisfies Meta<typeof WidthWidget>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: 'Block Width',
    description: 'Choose the width of your content block',
    name: 'width',
  },
};

export const AllOptions: Story = {
  args: {
    label: 'All Width Options',
    description: 'Complete set of width options',
    name: 'all-width',
  },
};

export const FilteredActions: Story = {
  args: {
    label: 'Filtered Width Options',
    description: 'Only narrow and full width options',
    name: 'filtered-width',
  },
};

export const WithoutLabel: Story = {
  args: {
    name: 'no-label',
  },
};
export const WithDefault: Story = {
  args: {
    name: 'with-default',
    defaultValue: 'default',
  },
};

const ControlledExample = () => {
  const [value, setValue] = React.useState('default');

  return (
    <div className="flex flex-col gap-4">
      <WidthWidget
        id="controlled-width"
        value={value}
        onChange={(width) => setValue(width)}
      />
      <div className="text-sm text-gray-600">
        Current value: <strong>{value}</strong>
      </div>
      <div className="flex gap-2">
        <Button variant="neutral" onPress={() => setValue('narrow')}>
          Set Narrow
        </Button>
        <Button variant="neutral" onPress={() => setValue('default')}>
          Set Default
        </Button>
        <Button variant="neutral" onPress={() => setValue('layout')}>
          Set Layout
        </Button>
        <Button variant="neutral" onPress={() => setValue('full')}>
          Set Full
        </Button>
      </div>
    </div>
  );
};

export const Controlled: StoryObj<typeof WidthWidget> = {
  render: ControlledExample,
  parameters: {
    docs: {
      description: {
        story: 'Controlled WidthWidget example with external state management',
      },
    },
  },
};

const customActionsInfo = {
  ...defaultActionsInfo,
  custom: [ImageIcon, 'Custom Width'] as [React.ComponentType<any>, string],
};

export const CustomActions: Story = {
  args: {
    label: 'Custom Width Options',
    description: 'Example with custom actions and info mapping',
    actionsInfoMap: customActionsInfo,
    name: 'custom-width',
  },
};

const FormExample = () => {
  const [selectedValue, setSelectedValue] = React.useState('');

  return (
    <Form className="flex flex-col items-start gap-4">
      <WidthWidget
        name="block-width"
        label="Block Width"
        description="Select the width of your content block (form integration)"
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
