import React from 'react';
import renderer from 'react-test-renderer';
import SelectWidget from './SelectWidget';

test('renders a select widget component', () => {
  const component = renderer.create(
    <SelectWidget
      id="my-field"
      title="My field"
      onChange={() => {}}
    />,
  );
  const json = component.toJSON();
  expect(json).toMatchSnapshot();
});
