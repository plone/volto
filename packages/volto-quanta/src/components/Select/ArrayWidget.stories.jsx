import React from 'react';
import { ArrayWidgetComponent } from './ArrayWidget';
import { injectLazyLibs } from '@plone/volto/helpers/Loadable/Loadable';
import { RealStoreWrapper as Wrapper } from '@plone/volto/storybook';

const ArrayComponent = injectLazyLibs([
  'reactSelect',
  'reactSelectCreateable',
  'reactSortableHOC',
])(ArrayWidgetComponent);

const Array = (args) => {
  const [value, setValue] = React.useState(args.value ?? '');
  const onChange = (block, value) => {
    // args.onChange({ value });
    setValue(value);
  };

  return (
    <Wrapper>
      <ArrayComponent {...args} onChange={onChange} value={value} />
    </Wrapper>
  );
};

export const Default = Array.bind({});
Default.args = {
  id: 'field-default',
  title: 'Default array field',
  description: 'Simple array with (open) list of choices',
  // Default with choices, no vocabulary associated
  // Then it's an open list of choices coming from a schema.List
  // with some default options (the choices)
  // No no-value option possible
  choices: [
    ['Foo', 'Foo'],
    ['Bar', 'Bar'],
    ['FooBar', 'FooBar'],
  ],
};

export const Required = Array.bind({});
Required.args = {
  id: 'field-required',
  title: 'Required array field',
  description: 'Required, with placeholder',
  placeholder: 'Select a list of options…',
  choices: [
    ['Foo', 'Foo'],
    ['Bar', 'Bar'],
    ['FooBar', 'FooBar'],
  ],
  required: true,
};

export const Filled = Array.bind({});
Filled.args = {
  id: 'field-filled',
  title: 'Filled array field',
  description: 'Pre-filled with an simple value (array of strings)',
  placeholder: 'Select a list of options…',
  choices: [
    ['Foo', 'Foo'],
    ['Bar', 'Bar'],
    ['FooBar', 'FooBar'],
  ],
  value: ['Foo'],
  required: true,
};

export const Errored = Array.bind({});
Errored.args = {
  id: 'field-errored',
  title: 'Errored array field',
  description:
    'Errored filled array field with an simple value (array of strings)',
  placeholder: 'Select a list of options…',
  // Simplest example in Plone - a "hardcoded, hand made" vocab using SimpleVocabulary/SimpleTerm
  // allow_discussion = schema.Choice(
  //     title=_(u'Allow discussion'),
  //     description=_(u'Allow discussion for this content object.'),
  //     vocabulary=SimpleVocabulary([
  //       SimpleTerm(value=True, title=_(u'Yes')),
  //       SimpleTerm(value=False, title=_(u'No')),
  //     ]),
  //     required=False,
  //     default=None,
  // )
  choices: [
    ['Foo', 'Foo'],
    ['Bar', 'Bar'],
    ['FooBar', 'FooBar'],
  ],
  value: ['Foo'],
  error: ['This is the error'],
  required: true,
};

export const NoPlaceholder = Array.bind({});
NoPlaceholder.args = {
  id: 'field-without-no-placeholder',
  title: 'Field title',
  description: 'This field has no placeholder, required',
  choices: [
    ['Foo', 'Foo'],
    ['Bar', 'Bar'],
    ['FooBar', 'FooBar'],
  ],
  required: true,
};

export const VocabularyBased = Array.bind({});
VocabularyBased.args = {
  id: 'field-vocab-based',
  title: 'Vocabulary based array field',
  description: 'This is a vocab-based field (AsyncSelect based)',
  // Eg. a schema.List driven by a vocabulary like `available_languages` in
  //     language control panel:
  //   available_languages = schema.List(
  //     title=_(u'heading_available_languages',
  //             default=u'Available languages'),
  //     description=_(u'description_available_languages',
  //                   default=u'The languages in which the site should be '
  //                           u'translatable.'),
  //     required=True,
  //     default=['en'],
  //     missing_value=[],
  //     value_type=schema.Choice(
  //         vocabulary='plone.app.vocabularies.AvailableContentLanguages'
  //     )
  // )
  // Default value is an array (with tokens) or could also be
  // an object like { label: item.title || item.token, value: item.token }
  //  the vocabulary return an array of pairs
  // [{title: "Afrikaans", token: "af"} ... ]
  // No choices existing in the json schema
  required: true,
  choices: [
    ['Foo', 'Foo'],
    ['Bar', 'Bar'],
    ['FooBar', 'FooBar'],
  ],
  vocabulary: { '@id': 'https://anapivocabularyURL' },
};

export const Disabled = Array.bind({});
Disabled.args = {
  id: 'field-disabled',
  title: 'Disabled field title',
  description: 'This select field is disabled',
  disabled: true,
};

export default {
  title: 'Widgets/ArrayWidget',
  component: ArrayComponent,
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
  },
  // excludeStories: ['searchResults'],
  // subcomponents: { ArgsTable },
};
