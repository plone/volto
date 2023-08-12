import { injectIntl } from 'react-intl';
import React from 'react';
import EventViewComponent from './EventView';
import { RealStoreWrapper as Wrapper } from '@plone/volto/storybook';
import config from '@plone/volto/registry';
const IntlEventViewComponent = injectIntl(EventViewComponent);
const { settings } = config;

function StoryComponent(args) {
  return (
    <Wrapper
      customStore={{
        intl: {
          locale: 'en',
          messages: {},
        },
      }}
    >
      <div id="toolbar" style={{ display: 'none' }} />
      <IntlEventViewComponent
        content={{
          '@id': 'http://localhost:8080/Plone/my-page',
          ...args,
        }}
      />
    </Wrapper>
  );
}

export const Default = StoryComponent.bind({});
Default.args = {
  title: 'Hello World!',
  end: '2019-06-23T16:20:00+00:00',
  start: '2019-06-23T15:20:00+00:00',
  attendees: [],
  subjects: [],
};

export const EventViewAllProps = StoryComponent.bind({});
EventViewAllProps.args = {
  title: 'Hello World!',
  description: 'Hi',
  text: {
    data: '<p>Hello World!</p>',
  },
  attendees: ['John Doe', 'Mario Rossi'],
  contact_email: 'test@example.com',
  contact_name: 'John Doe',
  contact_phone: '0123456789',
  end: '2019-06-24T15:20:00+00:00',
  event_url: 'https://www.example.com',
  location: 'Volto, Plone',
  open_end: false,
  recurrence: 'RRULE:FREQ=DAILY;INTERVAL=7;COUNT=7',
  start: '2019-06-23T15:20:00+00:00',
  subjects: ['Guillotina', 'Volto'],
  whole_day: false,
};

export const EventViewWithoutLinkToApiInTheText = StoryComponent.bind({});
EventViewWithoutLinkToApiInTheText.args = {
  title: 'Hello World!',
  attendees: [],
  end: '2019-06-23T16:20:00+00:00',
  start: '2019-06-23T15:20:00+00:00',
  subjects: [],
  text: {
    data: `<p>Hello World!</p><p>This is an <a href="${settings.apiPath}/foo/bar">internal link</a> and a <a href="${settings.apiPath}/foo/baz">second link</a></p>`,
  },
};
export default {
  title: 'Public components/EventView',
  component: EventViewComponent,
  decorators: [
    (Story) => (
      <div className="ui segment form attached" style={{ width: '900px' }}>
        <Story />
      </div>
    ),
  ],
  argTypes: {
    end: {
      control: 'date',
    },
    start: {
      control: 'date',
    },
  },
};
