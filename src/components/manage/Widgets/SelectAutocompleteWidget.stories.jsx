import React from 'react';
import { SelectAutoCompleteComponent } from './SelectAutoComplete';
import WidgetStory from './story';

import { injectLazyLibs } from '@plone/volto/helpers/Loadable/Loadable';

const SelectAutocompleteWidget = injectLazyLibs(['reactSelectAsync'])(
  SelectAutoCompleteComponent,
);

const props = {
  choices: [
    { token: 'foo', title: 'Foo' },
    { token: 'bar', title: 'Bar' },
    { token: 'fooBar', title: 'FooBar' },
  ],

  getVocabulary: () => {
    return Promise.resolve({ items: props.choices });
  },
  getVocabularyTokenTitle: () => {},
};

export const Default = WidgetStory.bind({
  widget: SelectAutocompleteWidget,
});
Default.args = {
  ...props,
  id: 'field-empty',
  title: 'field 1 title',
  description: 'Optional help text',
  placeholder: 'Type something…',
};

export const Required = WidgetStory.bind({
  widget: SelectAutocompleteWidget,
});
Required.args = {
  ...props,
  id: 'field-empty',
  title: 'field 1 title',
  description: 'Optional help text',
  placeholder: 'Type something…',
  required: true,
};

export const FilledWithToken = WidgetStory.bind({
  widget: SelectAutocompleteWidget,
});
FilledWithToken.args = {
  ...props,
  id: 'field-filled',
  title: 'Filled field title',
  description: 'Optional help text',
  value: [{ token: 'foo', title: 'Foo' }],
  placeholder: 'Type something…',
  required: true,
};

export const FilledWithString = WidgetStory.bind({
  widget: SelectAutocompleteWidget,
});
FilledWithString.args = {
  ...props,
  id: 'field-filled',
  title: 'Filled field title',
  description: 'Optional help text',
  value: ['foo'],
  placeholder: 'Type something…',
  required: true,
};

export const Errored = WidgetStory.bind({
  widget: SelectAutocompleteWidget,
});
Errored.args = {
  ...props,
  id: 'field-errored',
  title: 'Errored field title',
  description: 'Optional help text',
  placeholder: 'Type something…',
  value: [{ token: 'foo', title: 'Foo' }],
  error: ['This is the error'],
  required: true,
};

export const NoPlaceholder = WidgetStory.bind({
  widget: SelectAutocompleteWidget,
});
NoPlaceholder.args = {
  ...props,
  id: 'field-without-novalue',
  title: 'Field title',
  description: 'This field has no value option',
  required: true,
};

export const Disabled = WidgetStory.bind({
  widget: SelectAutocompleteWidget,
});
Disabled.args = {
  ...props,
  id: 'field-disabled',
  title: 'Disabled field title',
  description: 'This select field is disabled',
  disabled: true,
};

const getOptionsGenerator = (count) => {
  const options = [];
  for (let i = 0; i < count; i = i + 1) {
    options.push({ token: i.toString(), title: `Option ${i}` });
  }
  return options;
};

const manyOptions1000 = getOptionsGenerator(1000);

export const ManyOptions1000 = WidgetStory.bind({
  widget: SelectAutocompleteWidget,
});
ManyOptions1000.args = {
  ...props,
  id: 'field-empty',
  title: 'field 1 title',
  description: 'Optional help text',
  placeholder: 'Type something…',
  choices: manyOptions1000.slice(0, 20),
  getVocabulary: () => {
    return Promise.resolve({
      items: manyOptions1000,
    });
  },
};

export default {
  title: 'Edit Widgets/SelectAutocomplete Widget',
  component: SelectAutoCompleteComponent,
  decorators: [
    (Story) => (
      <div style={{ width: '400px' }}>
        <Story />
      </div>
    ),
  ],
  argTypes: {
    // controlled value prop
    value: {
      control: {
        disable: true,
      },
    },
    getVocabulary: {
      control: {
        disable: true,
      },
    },
  },
  // excludeStories: ['searchResults'],
  // subcomponents: { ArgsTable },
};
