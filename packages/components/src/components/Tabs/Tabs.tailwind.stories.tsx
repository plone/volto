import * as React from 'react';
import { Tabs } from './Tabs.tailwind';
import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'Tailwind/Tabs',
  component: Tabs,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Tabs>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <div className="flex gap-8">
      <Tabs {...args}></Tabs>
    </div>
  ),
  args: {
    defaultSelectedKey: 'FoR',
    tabs: [
      {
        id: 'FoR',
        title: 'Founding of Rome',
        content: (
          <div className="p-4">
            Arma virumque cano, Troiae qui primus ab oris.
          </div>
        ),
      },
      {
        id: 'MaR',
        title: 'Monarchy and Republic',
        content: <div className="p-4">Senatus Populusque Romanus.</div>,
      },
      {
        id: 'Emp',
        title: 'Empire',
        content: <div className="p-4">Alea jacta est.</div>,
      },
    ],
  },
};

export const Vertical: Story = {
  render: Default.render,
  args: {
    orientation: 'vertical',
    defaultSelectedKey: 'FoR',
    tabs: [
      {
        id: 'FoR',
        title: 'Founding of Rome',
        content: <div>Arma virumque cano, Troiae qui primus ab oris.</div>,
      },
      {
        id: 'MaR',
        title: 'Monarchy and Republic',
        content: <div>Senatus Populusque Romanus.</div>,
      },
      {
        id: 'Emp',
        title: 'Empire',
        content: <div>Alea jacta est.</div>,
      },
    ],
  },
};
