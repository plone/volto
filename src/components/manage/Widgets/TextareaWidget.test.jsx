import React from 'react';
import renderer from 'react-test-renderer';
import TextareaWidget from './TextareaWidget';

test('renders a textarea widget component', () => {
  const component = renderer.create(
    <TextareaWidget
      id="my-field"
      title="My field"
      onChange={() => {}}
    />,
  );
  const json = component.toJSON();
  expect(json).toMatchSnapshot();
});
