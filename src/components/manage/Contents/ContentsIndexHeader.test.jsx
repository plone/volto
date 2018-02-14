import React from 'react';
import renderer from 'react-test-renderer';
import { ContentsIndexHeaderComponent as ContentsIndexHeader } from './ContentsIndexHeader';

test('renders a contents item component', () => {
  const component = renderer.create(
    <ContentsIndexHeader
      width={1}
      label="Title"
      onOrderIndex={() => {}}
      connectDragSource={x => x}
      connectDropTarget={x => x}
      order={1}
      isDragging={false}
    />,
  );
  const json = component.toJSON();
  expect(json).toMatchSnapshot();
});
