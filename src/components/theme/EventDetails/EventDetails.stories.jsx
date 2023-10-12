import { injectIntl } from 'react-intl';
import React from 'react';
import EventDetailsComponent from './EventDetails';
import { RealStoreWrapper as Wrapper } from '@plone/volto/storybook';

const IntlEventDetailsComponent = injectIntl(EventDetailsComponent);

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
      <IntlEventDetailsComponent
        content={{
          '@id': 'http://localhost:8080/Plone/my-page',
          title: 'Hello World!',
          description: 'Hi',
          text: {
            data: '<p>Hello World!</p>',
          },
          ...args,
        }}
      />
    </Wrapper>
  );
}

export const EventDetails = StoryComponent.bind({});
EventDetails.args = {
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
export default {
  title: 'Public components/EventDetails',
  component: EventDetails,
  decorators: [
    (Story) => (
      <div className="ui segment form attached" style={{ width: '400px' }}>
        <Story />
      </div>
    ),
  ],
  argTypes: {
    contact_email: {
      description: 'email address',
    },
    contact_name: {
      description: 'name of the attendee',
    },
    contact_phone: {
      description: 'contact phone of the attendee',
    },
    end: {
      control: { type: 'date' },
      description: 'end date/time of the event',
    },
    event_url: {
      description: 'event url',
    },
    start: {
      control: { type: 'date' },
      context: 'time',
      description: 'start date/time of the event',
    },
    whole_day: {
      description: 'whether the event will be whole day or not',
    },
    subjects: {
      description: 'subjects covered in the event meetings',
    },
  },
};
