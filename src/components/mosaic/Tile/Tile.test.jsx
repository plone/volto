import React from 'react';
import renderer from 'react-test-renderer';
import Tile from './Tile';

jest.mock('draft-js-editor', () => jest.fn(() => <div />));
global.__SERVER__ = true; // eslint-disable-line no-underscore-dangle

test('renders a tile component', () => {
  const component = renderer.create(
    <Tile
      content={{ data: '<h1>Hello World!</h1>' }}
      width={4}
      row={0}
      column={0}
      selected
      selectTile={() => {}}
      setTileContent={() => {}}
    />,
  );
  const json = component.toJSON();
  expect(json).toMatchSnapshot();
});
