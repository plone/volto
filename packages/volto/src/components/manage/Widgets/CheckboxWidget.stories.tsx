import { Meta, StoryFn } from '@storybook/react';
import CheckboxWidget, { CheckboxWidgetProps } from './CheckboxWidget';

export default {
  title: 'Edit Widgets/Checkbox',
  component: CheckboxWidget,
  decorators: [
    (Story) => (
      <div className="ui segment form attached" style={{ width: '400px' }}>
        <Story />
      </div>
    ),
  ],
  argTypes: {},
} as Meta<typeof CheckboxWidget>;

const Template: StoryFn<CheckboxWidgetProps> = (args) => (
  <CheckboxWidget {...args} />
);

export const Checkbox = Template.bind({});
Checkbox.args = { id: 'field', title: 'Checkbox' };
