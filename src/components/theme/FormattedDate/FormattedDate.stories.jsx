import React from 'react';
import Wrapper from '@plone/volto/storybook';
import FormattedDate from './FormattedDate';

const date = new Date();

function StoryComponent(args) {
  const { date, format, long, includeTime, locale = 'en' } = args;
  return (
    <Wrapper
      customStore={{ intl: { locale } }}
      location={{ pathname: '/folder2/folder21/doc212' }}
    >
      <FormattedDate
        date={date}
        format={format}
        long={long}
        includeTime={includeTime}
      />
    </Wrapper>
  );
}

export const Default = StoryComponent.bind({});
Default.args = {
  date,
};

export const Localized = StoryComponent.bind({});
Localized.args = {
  date,
  locale: 'de',
};

export const Long = StoryComponent.bind({});
Long.args = {
  date,
  long: true,
};

export const IncludeTime = StoryComponent.bind({});
IncludeTime.args = {
  date,
  includeTime: true,
};

export const CustomFormat = StoryComponent.bind({});
CustomFormat.args = {
  date,
  format: {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  },
};

export default {
  title: 'Internal Components/Formatted Date',
  component: FormattedI18nDate,
  decorators: [
    (Story) => (
      <div style={{ width: '400px' }}>
        <Story />
      </div>
    ),
  ],
  argTypes: {
    locale: {
      control: {
        type: 'select',
        options: ['en', 'de', 'us'],
      },
    },
  },
};
