import React from 'react';
import renderer from 'react-test-renderer';
import FileWidget from './FileWidget';

test('renders a file widget component', () => {
  const component = renderer.create(
    <FileWidget id="my-field" title="My field" onChange={() => {}} />,
  );
  const json = component.toJSON();
  expect(json).toMatchSnapshot();
});
