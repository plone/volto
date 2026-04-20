import * as React from 'react';
import { AlignWidget, defaultActionsInfo } from './AlignWidget';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Button } from '../Button/Button.quanta';
import { AligncenterIcon } from '../../components/icons/AligncenterIcon';
import { Form } from '../..';

const meta = {
  title: 'Quanta/AlignWidget',
  component: AlignWidget,
  parameters: {
    layout: 'centered',
    backgrounds: { disable: true },
  },
  tags: ['autodocs'],
  argTypes: {},
  args: {},
} satisfies Meta<typeof AlignWidget>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: 'Image Alignment',
    description: 'Choose how to align your image',
    actions: ['left', 'right', 'center', 'full'],
    actionsInfoMap: defaultActionsInfo,
    name: 'alignment',
  },
};

export const AllOptions: Story = {
  args: {
    label: 'All Alignment Options',
    description: 'Complete set of alignment options',
    actions: ['left', 'right', 'center', 'narrow', 'wide', 'full'],
    actionsInfoMap: defaultActionsInfo,
    name: 'all-alignment',
  },
};

export const LeftRightOnly: Story = {
  args: {
    label: 'Left/Right Alignment',
    description: 'Simple left or right alignment',
    actions: ['left', 'right'],
    actionsInfoMap: defaultActionsInfo,
    name: 'left-right',
  },
};

export const WithoutLabel: Story = {
  args: {
    actions: ['left', 'center', 'right', 'full'],
    actionsInfoMap: defaultActionsInfo,
    name: 'no-label',
  },
};

export const WithDefault: Story = {
  args: {
    name: 'with-default',
    defaultValue: 'center',
  },
};
const ControlledExample = () => {
  const [value, setValue] = React.useState('center');

  return (
    <>
      <AlignWidget
        id="controlled-align"
        value={value}
        onChange={(action) => setValue(action)}
      />
      <div className="text-sm text-gray-600">
        Current value: <strong>{value}</strong>
      </div>
      <div className="flex gap-2">
        <Button variant="neutral" onPress={() => setValue('left')}>
          Set Left
        </Button>
        <Button variant="neutral" onPress={() => setValue('center')}>
          Set Center
        </Button>
        <Button variant="neutral" onPress={() => setValue('right')}>
          Set Right
        </Button>
        <Button variant="neutral" onPress={() => setValue('full')}>
          Set Full
        </Button>
      </div>
    </>
  );
};

export const Controlled: StoryObj<typeof AlignWidget> = {
  render: ControlledExample,
  parameters: {
    docs: {
      description: {
        story: 'Controlled AlignWidget example with external state management',
      },
    },
  },
};

const customActionsInfo = {
  ...defaultActionsInfo,
  custom: [AligncenterIcon, 'Custom Alignment'] as [
    React.ComponentType<any>,
    string,
  ],
};

export const CustomActions: Story = {
  args: {
    label: 'Custom Alignment Options',
    description: 'Example with custom actions and info mapping',
    actions: ['left', 'center', 'custom', 'full'],
    actionsInfoMap: customActionsInfo,
    name: 'custom-alignment',
  },
};

const FormExample = () => {
  const [selectedValue, setSelectedValue] = React.useState('');

  return (
    <Form>
      <AlignWidget
        name="alignment"
        label="Image Alignment"
        description="Select how to align your image (form integration)"
        isRequired
        value={selectedValue}
        onChange={(value) => setSelectedValue(value)}
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
