import React from 'react';
import renderer from 'react-test-renderer';
import DatetimeWidget from './DatetimeWidget';
import moment from 'moment';

test('renders a datetime widget component', () => {
  const component = renderer.create(
    <DatetimeWidget
      id="my-field"
      title="My field"
      onChange={() => {}}
      value={moment('2019-10-21').toISOString()}
    />,
  );
  const json = component.toJSON();
  expect(json).toMatchSnapshot();
});
