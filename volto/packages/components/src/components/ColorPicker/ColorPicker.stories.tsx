import * as React from 'react';
import { ColorPicker } from './ColorPicker';

import type { Meta, StoryObj } from '@storybook/react';

import '../../styles/basic/ColorPicker.css';

const meta = {
  title: 'Widgets/ColorPicker',
  component: ColorPicker,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof ColorPicker>;

const ColorPickerStory = (args: any) => {
  const [color, setColor] = React.useState(args.defaultValue);

  return (
    <>
      <ColorPicker {...args} value={color} onChange={setColor} />
      The color is: {color.toString('hex')}
    </>
  );
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: ColorPickerStory,
};

Default.args = {
  label: 'Fill color',
  defaultValue: '#f00',
};
