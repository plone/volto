import React from 'react';
import renderer from 'react-test-renderer';
import TileChooser from './TileChooser';

test('renders a TileChooser component', () => {
  const component = renderer.create(
    <TileChooser onMutateTile={() => {}} currentTile="thetileid" />,
  );
  const json = component.toJSON();
  expect(json).toMatchSnapshot();
});
