import React from 'react';
import renderer from 'react-test-renderer';
import View from './View';

test('renders a view html component', () => {
  const component = renderer.create(<View data={{ html: '<h1></h1>' }} />);
  const json = component.toJSON();
  expect(json).toMatchSnapshot();
});
