import React from 'react';
import renderer from 'react-test-renderer';
import DatetimeWidget from './DatetimeWidget';

test('renders a datetime widget component', () => {
  const component = renderer.create(
    <DatetimeWidget id="my-field" title="My field" onChange={() => {}} />,
  );
  const json = component.toJSON();
  expect(json).toMatchSnapshot();
});
