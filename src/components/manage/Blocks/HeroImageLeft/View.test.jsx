import React from 'react';
import renderer from 'react-test-renderer';
import View from './View';

test('renders a view hero component', () => {
  const component = renderer.create(<View data={{ url: 'heroimage.jpg' }} />);
  const json = component.toJSON();
  expect(json).toMatchSnapshot();
});
