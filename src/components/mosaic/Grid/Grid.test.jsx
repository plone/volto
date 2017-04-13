import React from 'react';
import renderer from 'react-test-renderer';
import Grid from './Grid';

jest.mock('../Row/Row', () => jest.fn(() => <div />));

test('renders a grid component', () => {
  const component = renderer.create(
    <Grid
      rows={[['cell 1.1', 'cell 1.2'], ['cell 2.1', 'cell 2.2']]}
      selectTile={() => {}}
      setTileContent={() => {}}
    />,
  );
  const json = component.toJSON();
  expect(json).toMatchSnapshot();
});
