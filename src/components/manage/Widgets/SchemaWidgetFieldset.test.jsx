import React from 'react';
import renderer from 'react-test-renderer';

import { SchemaWidgetFieldsetComponent } from './SchemaWidgetFieldset';

test('renders a contents item component', () => {
  const component = renderer.create(
    <SchemaWidgetFieldsetComponent
      connectDragSource={(x) => x}
      connectDragPreview={(x) => x}
      connectDropTarget={(x) => x}
      order={1}
      isDragging={false}
      active={false}
      onOrderFieldset={(x) => x}
      onShowEditFieldset={(x) => x}
      onShowDeleteFieldset={(x) => x}
      onClick={(x) => x}
    />,
  );
  const json = component.toJSON();
  expect(json).toMatchSnapshot();
});
