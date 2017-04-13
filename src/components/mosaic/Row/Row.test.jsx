import React from 'react';
import renderer from 'react-test-renderer';
import Row from './Row';

jest.mock('../Tile/Tile', () => jest.fn(() => <div />));

test('renders a row component', () => {
  const component = renderer.create(
    <Row
      tiles={[
        {
          url: 'http://localhost',
        },
      ]}
      row={0}
      selectTile={() => {}}
      setTileContent={() => {}}
    />,
  );
  const json = component.toJSON();
  expect(json).toMatchSnapshot();
});
