import React from 'react';
import FormFieldWrapper from './FormFieldWrapper';
import WidgetStory from './story';

export const Default = WidgetStory.bind({
  widget: FormFieldWrapper,
  props: { children: React.createElement('input', { className: 'blue' }) },
});
Default.args = {
  id: 'fieldWrapper',
  title: 'Field Wrapper',
  description: 'Optional text',
};

export const Errored = WidgetStory.bind({
  widget: FormFieldWrapper,
  props: { children: React.createElement('input', { className: 'blue' }) },
});
Errored.args = {
  id: 'fieldWrapper',
  title: 'Field Wrapper',
  description: 'Optional help text',
  error: ['this is an error'],
};

export const SingleColumn = WidgetStory.bind({
  widget: FormFieldWrapper,
  props: { children: React.createElement('input', { className: 'blue' }) },
});
SingleColumn.args = {
  id: 'fieldWrapper',
  title: 'Field Wrapper',
  columns: 1,
  description: 'Optional help text',
};

export const Required = WidgetStory.bind({
  widget: FormFieldWrapper,
  props: { children: React.createElement('input', { className: 'blue' }) },
});
Required.args = {
  id: 'fieldWrapper',
  title: 'Field Wrapper',
  required: true,
  description: 'Optional text',
};

export const Unwrapped = WidgetStory.bind({
  widget: FormFieldWrapper,
  props: { children: React.createElement('input', { className: 'blue' }) },
});
Unwrapped.args = {
  id: 'fieldWrapper',
  title: 'Field Wrapper',
  wrapped: false,
  description: 'Optional text',
};
// ** Currently included in OnEdit **
// export const Draggable = WidgetStory.bind({
//   widget: FormFieldWrapper,
//   props: { children: React.createElement('input', { className: 'blue' }) },
// });
// Draggable.args = {
//   id: 'fieldWrapper',
//  title: 'Field Wrapper',
//   draggable: true,
//   onEdit: true,
//   description: 'Optional text',
// };

// export const Disabled = WidgetStory.bind({
//   widget: FormFieldWrapper,
//   props: { children: React.createElement('input', { className: 'blue' }) },
// });
// Disabled.args = {
//   id: 'fieldWrapper',
//  title: 'Field Wrapper',
//   isDisabled: true,
//   onEdit: true,
//   description: 'Optional text',
// };

export const OnEdit = WidgetStory.bind({
  widget: FormFieldWrapper,
  props: { children: React.createElement('input', { className: 'blue' }) },
});
OnEdit.args = {
  id: 'fieldWrapper',
  title: 'Field Wrapper',
  onEdit: true,
  draggable: false,
  isDisabled: false,
  description: 'Optional text',
};

export default {
  title: 'Edit Widgets/FormFieldWrapper',
  component: Default,
  decorators: [
    (Story) => (
      <div className="ui segment form attached" style={{ width: '400px' }}>
        <Story />
      </div>
    ),
  ],
  argTypes: {},
};
