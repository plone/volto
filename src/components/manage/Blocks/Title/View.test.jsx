import React from 'react';
import renderer from 'react-test-renderer';
import View from './View';

test('renders a view title component', () => {
  const component = renderer.create(
    <View properties={{ title: 'My Title' }} />,
  );
  const json = component.toJSON();
  expect(json).toMatchSnapshot();
});
