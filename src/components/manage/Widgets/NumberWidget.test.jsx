import React from 'react';
import renderer from 'react-test-renderer';
import NumberWidget from './NumberWidget';

test('renders a number widget component', () => {
  const component = renderer.create(
    <NumberWidget id="my-field" title="My field" onChange={() => {}} />,
  );
  const json = component.toJSON();
  expect(json).toMatchSnapshot();
});
