import React from 'react';
import Wrapper from '@plone/volto/storybook';
import FormattedRelativeDate from './FormattedRelativeDate';

const date = new Date();

function StoryComponent(args) {
  const { date, style, locale } = args;
  return (
    <Wrapper
      customStore={{ intl: { locale } }}
      location={{ pathname: '/folder2/folder21/doc212' }}
    >
      <FormattedRelativeDate date={date} locale={locale} style={style}>
        {this.children}
      </FormattedRelativeDate>
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

export const Style = StoryComponent.bind({});
Style.args = {
  date,
  style: 'short',
};

export const SplitParts = StoryComponent.bind({
  children: (parts) =>
    parts.map((p, i) => (
      <div key={i}>
        <strong>{p.value}</strong> <small>({p.type}</small>)
      </div>
    )),
});
SplitParts.args = {
  date,
  long: true,
};

export default {
  title: 'Internal Components/Formatted Relative Date',
  component: FormattedRelativeDate,
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
    style: {
      control: {
        type: 'select',
        options: ['long', 'short', 'narrow'],
      },
    },
  },
};
