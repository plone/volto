import React from 'react';
import renderer from 'react-test-renderer';
import Grid from './Grid';

jest.mock('../Row/Row', () => jest.fn(() => <div />));

test('renders a grid component', () => {
  const component = renderer.create(
    <Grid
      rows={[{ colums: [] }]}
      selectTile={() => {}}
      deleteTile={() => {}}
      setHovered={() => {}}
      handleDrop={() => {}}
      setTileContent={() => {}}
    />,
  );
  const json = component.toJSON();
  expect(json).toMatchSnapshot();
});
