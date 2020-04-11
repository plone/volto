import React from 'react';
import renderer from 'react-test-renderer';
import EventView from './EventView';
import { settings } from '~/config';

test('renders an event view component with all props', () => {
  const component = renderer.create(
    <EventView
      content={{
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
      }}
    />,
  );
  const json = component.toJSON();
  expect(json).toMatchSnapshot();
});

test('renders an event view component with only required props', () => {
  const component = renderer.create(
    <EventView
      content={{
        title: 'Hello World!',
        attendees: [],
        end: '2019-06-23T16:20:00+00:00',
        start: '2019-06-23T15:20:00+00:00',
        subjects: [],
      }}
    />,
  );
  const json = component.toJSON();
  expect(json).toMatchSnapshot();
});

test('renders an event view component without links to api in the text', () => {
  const component = renderer.create(
    <EventView
      content={{
        title: 'Hello World!',
        attendees: [],
        end: '2019-06-23T16:20:00+00:00',
        start: '2019-06-23T15:20:00+00:00',
        subjects: [],
        text: {
          data: `<p>Hello World!</p><p>This is an <a href="${settings.apiPath}/foo/bar">internal link</a> and a <a href="${settings.apiPath}/foo/baz">second link</a></p>`,
        },
      }}
    />,
  );
  const json = component.toJSON();
  expect(json).toMatchSnapshot();
});
