import React from 'react';
import { SevenContext } from './SevenContext';
import { Button } from '../Button/Button';
import type { Meta, StoryObj } from '@storybook/react';
import { Checkbox } from '../Checkbox/Checkbox';

const meta = {
  title: 'Tailwind/SevenContext',
  component: SevenContext,
  parameters: {
    layout: 'centered',
    backgrounds: { disable: true },
  },
  tags: ['autodocs'],
  argTypes: {},
  args: {},
} satisfies Meta<typeof SevenContext>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Custom: Story = {
  render: (args) => (
    <div className="flex gap-8">
      <SevenContext.Provider value={args.value}>
        <Button variant="primary" accent={true}>
          Custom
        </Button>
        <Checkbox>Customized</Checkbox>
      </SevenContext.Provider>
      <Button variant="primary" accent={true}>
        Pimary
      </Button>
      <Checkbox>Basic</Checkbox>
    </div>
  ),
  args: {
    value: {
      button: {
        base: 'text-4xl',
        variants: {
          variant: {
            primary: 'bg-red-600 text-white',
          },
        },
      },
      checkbox: {
        base: 'bg-red-600 text-4xl text-white px-2',
      },
    },
  },
};
