import React from 'react';
import renderer from 'react-test-renderer';
import View from './View';

test('renders a view text component', () => {
  const component = renderer.create(
    <View data={{ text: { data: '<h1>My Header</h1>' } }} />,
  );
  const json = component.toJSON();
  expect(json).toMatchSnapshot();
});
