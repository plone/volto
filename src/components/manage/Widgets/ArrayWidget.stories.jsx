import React from 'react';
import ArrayWidget, { ArrayWidgetComponent } from './ArrayWidget';
import WidgetStory from './story';

const choices = [
  ['foo', 'Foo'],
  ['bar', 'Bar'],
  ['fooBar', 'FooBar'],
];

export const Default = WidgetStory.bind({ widget: ArrayWidget });
Default.args = {
  id: 'field-empty',
  title: 'field 1 title',
  description: 'Optional help text',
  placeholder: 'Type something…',
  choices,
};

export const Required = WidgetStory.bind({ widget: ArrayWidget });
Required.args = {
  id: 'field-empty',
  title: 'field 1 title',
  description: 'Optional help text',
  placeholder: 'Type something…',
  choices,
  required: true,
};

export const Filled = WidgetStory.bind({
  widget: ArrayWidget,
  props: { value: ['foo'] },
});
Filled.args = {
  id: 'field-filled',
  title: 'Filled field title',
  description: 'Optional help text',
  choices,
  value: ['foo'],
  placeholder: 'Type something…',
  required: true,
};

export const Errored = WidgetStory.bind({ widget: ArrayWidget });
Errored.args = {
  id: 'field-errored',
  title: 'Errored field title',
  description: 'Optional help text',
  placeholder: 'Type something…',
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
  choices,
  value: ['Foo'],
  error: ['This is the error'],
  required: true,
};

export const NoPlaceholder = WidgetStory.bind({ widget: ArrayWidget });
NoPlaceholder.args = {
  id: 'field-without-novalue',
  title: 'Field title',
  description: 'This field has no value option',
  choices,
  required: true,
};

export const WithoutNoValueOption = WidgetStory.bind({ widget: ArrayWidget });
WithoutNoValueOption.args = {
  id: 'field-without-novalue',
  title: 'Field title',
  description: 'This field has no value option',
  placeholder: 'something…',
  choices,
  required: true,
  noValueOption: false,
};

export const VocabularyBased = WidgetStory.bind({ widget: ArrayWidget });
VocabularyBased.args = {
  id: 'field-vocab-based',
  title: 'field title',
  description: 'This is a vocab-based field',
  placeholder: 'Select something…',
  // choices in Vocabulary based selects that has choices and spects a string in return
  // Use case: Language select - A Choice schema that spects a string as value
  //   language = schema.Choice(
  //     title=_(u'label_language', default=u'Language'),
  //     vocabulary='plone.app.vocabularies.SupportedContentLanguages',
  //     required=False,
  //     missing_value='',
  //     defaultFactory=default_language,
  // )
  // p.restapi vocab endpoint outputs
  // "items": [{title: "English", token: "en"}, ...]
  // The widget sends a string as value in the PATCH/POST:
  // value: "en"
  choices: [
    { label: 'English', value: 'en' },
    { label: 'Catala', value: 'ca' },
  ],
  required: true,
  vocabBaseUrl: 'https://anapivocabularyURL',
};

export const Disabled = WidgetStory.bind({ widget: ArrayWidget });
Disabled.args = {
  id: 'field-disabled',
  title: 'Disabled field title',
  description: 'This select field is disabled',
  disabled: true,
};

export const Creatable = WidgetStory.bind({ widget: ArrayWidget });
Creatable.args = {
  id: 'field-creatable',
  title: 'Field with creatable',
  description: 'Allows creation of new terms',
  creatable: true,
};

const getOptionsGenerator = (count) => {
  const options = [];
  for (let i = 0; i < count; i = i + 1) {
    options.push([i.toString(), `Option ${i}`]);
  }
  return options;
};

export const ManyOptions1000 = WidgetStory.bind({ widget: ArrayWidget });
ManyOptions1000.args = {
  id: 'field-empty',
  title: 'field 1 title',
  description: 'Optional help text',
  placeholder: 'Type something…',
  choices: getOptionsGenerator(1000),
};

export const ManyOptions500 = WidgetStory.bind({ widget: ArrayWidget });
ManyOptions500.args = {
  id: 'field-empty',
  title: 'field 1 title',
  description: 'Optional help text',
  placeholder: 'Type something…',
  choices: getOptionsGenerator(500),
};

export default {
  title: 'Edit Widgets/Array',
  component: ArrayWidgetComponent,
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
