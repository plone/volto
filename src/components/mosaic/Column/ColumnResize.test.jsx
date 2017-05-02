import React from 'react';
import renderer from 'react-test-renderer';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

import ColumnResize from './ColumnResize';

const Wrapper = DragDropContext(HTML5Backend)(({ children }) => (
  <div>{children}</div>
));

describe('ColumnResize', () => {
  it('renders a column resize component', () => {
    const component = renderer.create(
      <Wrapper>
        <ColumnResize
          row={0}
          column={0}
          columns={3}
          startResize={() => {}}
          endResize={() => {}}
        />
      </Wrapper>,
    );
    const json = component.toJSON();
    expect(json).toMatchSnapshot();
  });
});
