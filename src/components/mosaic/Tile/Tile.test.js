import React from 'react';
import renderer from 'react-test-renderer';
import Tile from './Tile';

jest.mock('draft-js-editor',
  () => jest.fn(() => <div />));
global.__SERVER__ = true;

test('renders a tile component', () => {
  const component = renderer.create(
    <Tile
      content={'<h1>Hello World!</h1>'}
      width={4}
      row={0}
      column={0}
      selected={true}
      selectTile={() => {}}
      setTileContent={() => {}}
    />
  );
  const json = component.toJSON();
  expect(json).toMatchSnapshot();
});
