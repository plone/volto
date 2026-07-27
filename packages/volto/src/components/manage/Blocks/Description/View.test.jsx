import React from 'react';
import renderer from 'react-test-renderer';
import View from './View';

it('renders a view description component', () => {
  const component = renderer.create(
    <View properties={{ description: 'My Description' }} />,
  );
  const json = component.toJSON();
  expect(json).toMatchSnapshot();
});
