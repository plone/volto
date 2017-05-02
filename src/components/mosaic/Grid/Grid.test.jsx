import React from 'react';
import renderer from 'react-test-renderer';
import Grid from './Grid';

jest.mock('../Row/Row', () => jest.fn(() => <div />));
jest.mock('../Column/ColumnResizeHelper', () => jest.fn(() => <div />));

describe('Grid', () => {
  it('renders a grid component', () => {
    const component = renderer.create(
      <Grid
        rows={[{ colums: [] }]}
        selectTile={() => {}}
        deleteTile={() => {}}
        setHovered={() => {}}
        handleDrop={() => {}}
        setTileContent={() => {}}
        startResize={() => {}}
        endResize={() => {}}
      />,
    );
    const json = component.toJSON();
    expect(json).toMatchSnapshot();
  });
});
