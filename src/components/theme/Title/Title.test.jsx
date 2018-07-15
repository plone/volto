import React from 'react';
import renderer from 'react-test-renderer';
import Title from './Title';

test('Renders', () => {
  const component = renderer.create(<Title title="test" />);
  const json = component.toJSON();
  expect(json).toMatchSnapshot();
});
