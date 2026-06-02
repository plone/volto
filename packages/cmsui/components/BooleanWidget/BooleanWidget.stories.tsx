import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { BooleanWidget } from './BooleanWidget';

const meta = {
  title: 'CMS UI/Widgets/BooleanWidget',
  component: BooleanWidget,
  args: {
    name: 'exclude_from_nav',
    label: 'Exclude from navigation',
    description: 'Hide this item from navigation menus.',
    value: false,
    onChange: () => {},
    required: false,
  },
} satisfies Meta<typeof BooleanWidget>;

export default meta;

type Story = StoryObj<typeof meta>;

function BooleanWidgetStory(args: React.ComponentProps<typeof BooleanWidget>) {
  const [value, setValue] = useState(!!args.value);

  return <BooleanWidget {...args} value={value} onChange={setValue} />;
}

export const Default: Story = {
  args: {
    name: 'exclude_from_nav',
    label: 'Exclude from navigation',
    description: 'Hide this item from navigation menus.',
    value: false,
    onChange: () => {},
    required: false,
  },
  render: (args) => <BooleanWidgetStory {...args} />,
};

export const WithError: Story = {
  args: {
    name: 'confirm',
    label: 'Confirm publishing',
    value: false,
    onChange: () => {},
    errors: ['This field is required.'],
  },
  render: (args) => <BooleanWidgetStory {...args} />,
};
