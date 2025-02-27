import { Checkbox } from './Checkbox';

export default {
  title: 'Tailwind/Checkbox',
  component: Checkbox,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {},
  args: {
    isDisabled: false,
    children: 'Checkbox',
  },
};

export const Default = {
  args: {},
};
