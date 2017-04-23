import React from 'react';
import renderer from 'react-test-renderer';
import { ContentsItemComponent as ContentsItem } from './ContentsItem';

test('renders a contents item component', () => {
  const component = renderer.create(
    <ContentsItem
      item={{
        '@id': '/blog',
        title: 'Blog',
        is_folderish: false,
        '@type': 'Document',
      }}
      selected={false}
      onClick={() => {}}
      indexes={[
        {
          id: 'title',
          type: 'string',
        },
      ]}
      onCut={() => {}}
      onCopy={() => {}}
      onDelete={() => {}}
      onMoveToTop={() => {}}
      onMoveToBottom={() => {}}
      onOrderItem={() => {}}
      connectDragSource={x => x}
      connectDragPreview={x => x}
      connectDropTarget={x => x}
      order={1}
      isDragging={false}
    />,
  );
  const json = component.toJSON();
  expect(json).toMatchSnapshot();
});
