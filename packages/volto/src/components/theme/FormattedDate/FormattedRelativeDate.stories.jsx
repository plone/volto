import React from 'react';
import Wrapper from '@plone/volto/storybook';
import FormattedRelativeDate from './FormattedRelativeDate';

const date = new Date(new Date() - 1000);
const relativeTo = new Date(new Date().getTime() + 123213124);

const toDate = (date) => (typeof date === 'number' ? new Date(date) : date);

function StoryComponent(args) {
  const { style, locale, live, refresh } = args;
  const date = toDate(args.date);
  const relativeTo = args.relativeTo
    ? toDate(args.relativeTo)
    : args.relativeTo;
  return (
    <Wrapper
      customStore={{ intl: { locale } }}
      location={{ pathname: '/folder2/folder21/doc212' }}
    >
      <FormattedRelativeDate
        date={date}
        locale={locale}
        style={style}
        relativeTo={relativeTo}
        live={live}
        refresh={refresh}
      >
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

export const RelativeToDate = StoryComponent.bind({});
RelativeToDate.args = {
  date,
  relativeTo,
};

export const LiveRefresh = StoryComponent.bind({});
LiveRefresh.args = {
  date,
  live: true,
  refresh: 1000,
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
    live: {
      control: {
        type: 'disabled',
      },
    },
    refresh: {
      control: {
        type: 'disabled',
      },
    },
    date: {
      control: {
        type: 'date',
      },
    },
    relativeTo: {
      control: {
        type: 'date',
      },
    },
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
