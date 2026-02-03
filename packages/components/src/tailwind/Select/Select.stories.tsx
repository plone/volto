import React from 'react';
import { Select } from './Select';

export default {
  title: 'Tailwind/Select',
  component: Select,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {},
  args: {},
};

const software = [
  { id: 1, name: 'Adobe Photoshop' },
  { id: 2, name: 'Sketch' },
  { id: 3, name: 'Figma' },
  { id: 4, name: 'Adobe XD' },
  { id: 5, name: 'InVision' },
];

export const Default = (args: any) => {
  return (
    <div className="w-full max-w-[400px]">
      <Select label="Software" items={software} />
    </div>
  );
};

Default.args = {
  label: 'Software',
  items: software,
};
