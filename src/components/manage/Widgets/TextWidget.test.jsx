import React from 'react';
import renderer from 'react-test-renderer';
import TextWidget from './TextWidget';

test('renders a text widget component', () => {
  const component = renderer.create(
    <TextWidget id="my-field" title="My field" onChange={() => {}} />,
  );
  const json = component.toJSON();
  expect(json).toMatchSnapshot();
});
