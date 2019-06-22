import React from 'react';
import renderer from 'react-test-renderer';
import View from './View';

test('renders a view image component', () => {
  const component = renderer.create(
    <View data={{ cards: [{ url: 'image.jpg', id: 'unique-id' }] }} />,
  );
  const json = component.toJSON();
  expect(json).toMatchSnapshot();
});
