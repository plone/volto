import React from 'react';
import { Radio, RadioGroup, type RadioGroupProps } from './Radio';

export default {
  title: 'Tailwind/Radio',
  component: Radio,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {},
};

export const Default = (args: RadioGroupProps) => {
  return (
    <div className="w-full max-w-[400px]">
      <RadioGroup {...args}>
        <Radio value="ap">Apple: Red, Green, Golden</Radio>
        <Radio value="bn">Banana: Ripe, Unripe, Overripe</Radio>
        <Radio value="gr">Grapes: Seedless, With seeds, Dried (Raisin)</Radio>
        <Radio value="or">Orange: Navel, Blood, Mandarin</Radio>
        <Radio value="mg">Mango: Alphonso, Kesar, Dasheri</Radio>
      </RadioGroup>
    </div>
  );
};

Default.args = { label: 'Fruits' } as RadioGroupProps;

// Disabled story
export const Disabled = Default.bind({});
Disabled.args = {
  isDisabled: true,
};

// Invalid story
export const Invalid = Default.bind({});
Invalid.args = {
  isInvalid: true,
  errorMessage: 'Please select a fruits.',
};
