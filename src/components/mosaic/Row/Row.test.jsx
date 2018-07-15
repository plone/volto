import React from 'react';
import renderer from 'react-test-renderer';
import Row from './Row';

jest.mock('../Column/Column', () => jest.fn(() => <div />));
jest.mock('../Column/ColumnResize', () => jest.fn(() => <div />));

describe('Row', () => {
  it('renders a row component', () => {
    const component = renderer.create(
      <Row
        columns={[
          {
            width: 2,
            tiles: [],
          },
        ]}
        row={0}
        resize={false}
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
