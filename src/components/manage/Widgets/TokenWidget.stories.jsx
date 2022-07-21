import React from 'react';
import TokenWidget from './TokenWidget';

import WidgetStory from './story';

const vocabBaseUrl = 'https://anapivocabularyURL';

const defaults = {
  widget: TokenWidget,
  props: {
    widgetOptions: {
      vocabulary: {
        '@id': vocabBaseUrl,
      },
    },
  },
  customStore: {
    userSession: { token: '1234' },
    intl: {
      locale: 'en',
      messages: {},
    },
    vocabularies: {
      [vocabBaseUrl]: {
        subrequests: {
          en: {
            items: [
              { value: 'foo', label: 'Foo' },
              { value: 'bar', label: 'Bar' },
              { value: 'fooBar', label: 'FooBar' },
            ],
          },
        },
      },
    },
  },
};

export const Default = WidgetStory.bind(defaults);
Default.args = {
  id: 'field-empty',
  title: 'field 1 title',
  description: 'Optional help text',
  placeholder: 'Type something…',
  vocabBaseUrl,
};

export const Required = WidgetStory.bind(defaults);
Required.args = {
  id: 'field-empty',
  title: 'field 1 title',
  description: 'Optional help text',
  placeholder: 'Type something…',
  required: true,
  vocabBaseUrl,
};

export const Filled = WidgetStory.bind(defaults);
Filled.args = {
  id: 'field-filled',
  title: 'Filled field title',
  description: 'Optional help text',
  value: ['Foo'],
  placeholder: 'Type something…',
  required: true,
  vocabBaseUrl,
};

export const Errored = WidgetStory.bind(defaults);
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
  value: ['Foo'],
  error: ['This is the error'],
  required: true,
  vocabBaseUrl,
};

export const NoPlaceholder = WidgetStory.bind(defaults);
NoPlaceholder.args = {
  id: 'field-without-novalue',
  title: 'Field title',
  description: 'This field has no value option',
  required: true,
  vocabBaseUrl,
};

export const WithoutNoValueOption = WidgetStory.bind(defaults);
WithoutNoValueOption.args = {
  id: 'field-without-novalue',
  title: 'Field title',
  description: 'This field has no value option',
  placeholder: 'something…',
  required: true,
  noValueOption: false,
  vocabBaseUrl,
};

export const Disabled = WidgetStory.bind(defaults);
Disabled.args = {
  id: 'field-disabled',
  title: 'Disabled field title',
  description: 'This select field is disabled',
  disabled: true,
  vocabBaseUrl,
};

export default {
  title: 'Edit Widgets/Token',
  component: TokenWidget,
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
