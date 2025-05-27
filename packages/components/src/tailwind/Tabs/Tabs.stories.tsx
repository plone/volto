import * as React from 'react';
import { Tabs } from './Tabs';
import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'Tailwind/Tabs',
  component: Tabs,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  // argTypes: {
  //   // variant: {
  //   //   control: 'select',
  //   //   options: ['neutral', 'primary', 'destructive'],
  //   // },
  // },
  // args: {
  //   isDisabled: false,
  //   children: 'Tabs',
  //   // accent: false,
  // },
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

// export const AccentPrimary: Story = {
//   render: Neutral.render,
//   args: {
//     variant: 'primary',
//     accent: true,
//   },
// };

// export const AccentPrimarySmall: Story = {
//   render: Neutral.render,
//   args: {
//     variant: 'primary',
//     accent: true,
//     size: 'S',
//   },
// };

// export const AccentPrimaryLarge: Story = {
//   render: Neutral.render,
//   args: {
//     variant: 'primary',
//     accent: true,
//     size: 'L',
//   },
// };

// export const Destructive: Story = {
//   args: {
//     variant: 'destructive',
//   },
// };

// export const Disabled: Story = {
//   args: {
//     isDisabled: true,
//   },
// };

// export const Icon: Story = {
//   render: (args) => (
//     <Button {...args}>
//       <BinIcon />
//     </Button>
//   ),
// };

// export const IconAccentPrimarySmall: Story = {
//   render: (args) => (
//     <Button {...args}>
//       <BinIcon />
//     </Button>
//   ),
//   args: {
//     variant: 'primary',
//     accent: true,
//     size: 'S',
//   },
// };

// export const IconAccentPrimary: Story = {
//   render: (args) => (
//     <Button {...args}>
//       <BinIcon />
//     </Button>
//   ),
//   args: {
//     variant: 'primary',
//     accent: true,
//   },
// };

// export const IconAccentPrimaryLarge: Story = {
//   render: (args) => (
//     <Button {...args}>
//       <BinIcon />
//     </Button>
//   ),
//   args: {
//     variant: 'primary',
//     accent: true,
//     size: 'L',
//   },
// };

// export const WithClassName: Story = {
//   args: {
//     className: 'my-custom-classname',
//     accent: true,
//     variant: 'destructive',
//   },
// };

// export const WithTWClassName: Story = {
//   args: {
//     className: 'border-5 border-amber-300',
//     variant: 'destructive',
//     accent: true,
//   },
// };
