import React from 'react';
import FormFieldWrapper from './FormFieldWrapper';
import WidgetStory from './story';

export const Default = WidgetStory.bind({
  widget: FormFieldWrapper,
  props: { children: React.createElement('input', { className: 'blue' }) },
});
Default.args = {
  id: 'localhost:3000/something',
  title: 'Item title',
  description: 'Optional text',
};

export const Errored = WidgetStory.bind({
  widget: FormFieldWrapper,
  props: { children: React.createElement('input', { className: 'blue' }) },
});
Errored.args = {
  id: 'localhost:3000/something',
  title: 'Item title',
  description: 'Optional help text',
  error: ['this is an error'],
};

export const SingleColumn = WidgetStory.bind({
  widget: FormFieldWrapper,
  props: { children: React.createElement('input', { className: 'blue' }) },
});
SingleColumn.args = {
  id: 'localhost:3000/something',
  title: 'Item title',
  columns: 1,
  description: 'Optional help text',
};

export const Required = WidgetStory.bind({
  widget: FormFieldWrapper,
  props: { children: React.createElement('input', { className: 'blue' }) },
});
Required.args = {
  id: 'localhost:3000/something',
  title: 'Item title',
  required: true,
  description: 'Optional text',
};

export const Unwrapped = WidgetStory.bind({
  widget: FormFieldWrapper,
  props: { children: React.createElement('input', { className: 'blue' }) },
});
Unwrapped.args = {
  id: 'localhost:3000/something',
  title: 'Item title',
  wrapped: false,
  description: 'Optional text',
};
// ** Currently included in OnEdit **
// export const Draggable = WidgetStory.bind({
//   widget: FormFieldWrapper,
//   props: { children: React.createElement('input', { className: 'blue' }) },
// });
// Draggable.args = {
//   id: 'localhost:3000/something',
//   title: 'Item title',
//   draggable: true,
//   onEdit: true,
//   description: 'Optional text',
// };

// export const Disabled = WidgetStory.bind({
//   widget: FormFieldWrapper,
//   props: { children: React.createElement('input', { className: 'blue' }) },
// });
// Disabled.args = {
//   id: 'localhost:3000/something',
//   title: 'Item title',
//   isDisabled: true,
//   onEdit: true,
//   description: 'Optional text',
// };

export const OnEdit = WidgetStory.bind({
  widget: FormFieldWrapper,
  props: { children: React.createElement('input', { className: 'blue' }) },
});
OnEdit.args = {
  id: 'localhost:3000/something',
  title: 'Item title',
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
