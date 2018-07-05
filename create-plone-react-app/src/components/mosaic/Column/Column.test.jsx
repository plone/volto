import React from 'react';
import renderer from 'react-test-renderer';

import Column from './Column';

jest.mock('../Tile/Tile', () => jest.fn(() => <div />));

describe('Column', () => {
  it('renders a column component', () => {
    const component = renderer.create(
      <Column
        width={1}
        tiles={[
          {
            url: '/blog',
            content: {},
            type: 'Title',
          },
        ]}
        row={0}
        column={0}
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
});
