import React from 'react';
import renderer from 'react-test-renderer';
import CheckboxWidget from './CheckboxWidget';

test('renders a checkbox widget component', () => {
  const component = renderer.create(
    <CheckboxWidget
      id="my-field"
      title="My field"
      onChange={() => {}}
    />,
  );
  const json = component.toJSON();
  expect(json).toMatchSnapshot();
});
