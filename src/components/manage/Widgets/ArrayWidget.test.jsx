import React from 'react';
import renderer from 'react-test-renderer';
import ArrayWidget from './ArrayWidget';

test('renders an array widget component', () => {
  const component = renderer.create(
    <ArrayWidget
      id="my-field"
      title="My field"
      onChange={() => {}}
    />,
  );
  const json = component.toJSON();
  expect(json).toMatchSnapshot();
});
