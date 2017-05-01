import React from 'react';
import renderer from 'react-test-renderer';
import Row from './Row';

jest.mock('../Column/Column', () => jest.fn(() => <div />));

test('renders a row component', () => {
  const component = renderer.create(
    <Row
      columns={[
        {
          width: 2,
          tiles: [],
        },
      ]}
      row={0}
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
