import React from 'react';
import renderer from 'react-test-renderer';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

import ColumnResizeHelper from './ColumnResizeHelper';

const Wrapper = DragDropContext(HTML5Backend)(({ children }) => (
  <div>{children}</div>
));

describe('ColumnResizeHelper', () => {
  it('renders a column resize helper component', () => {
    const component = renderer.create(
      <Wrapper>
        <ColumnResizeHelper />
      </Wrapper>,
    );
    const json = component.toJSON();
    expect(json).toMatchSnapshot();
  });
});
