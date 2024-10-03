import * as React from 'react';
import { ColorSwatchPicker, ColorSwatchPickerItem } from './ColorSwatchPicker';

import type { Meta, StoryObj } from '@storybook/react';

import '../../styles/basic/ColorSwatchPicker.css';

const meta = {
  title: 'Widgets/ColorSwatchPicker',
  component: ColorSwatchPicker,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof ColorSwatchPicker>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args: any) => (
    <ColorSwatchPicker {...args}>
      <ColorSwatchPickerItem color="#A00" />
      <ColorSwatchPickerItem color="#f80" />
      <ColorSwatchPickerItem color="#080" />
      <ColorSwatchPickerItem color="#08f" />
      <ColorSwatchPickerItem color="#088" />
      <ColorSwatchPickerItem color="#008" />
    </ColorSwatchPicker>
  ),
};
