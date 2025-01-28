import React from 'react';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import { render } from '@testing-library/react';
import SchemaWidgetFieldsetComponent from './SchemaWidgetFieldset';
import { __setLoadables } from '@plone/volto/helpers/Loadable/Loadable';

vi.mock('@plone/volto/helpers/Loadable/Loadable');
beforeAll(async () => {
  await __setLoadables();
});

test('renders a contents item component', () => {
  const { container } = render(
    <DragDropContext onDragEnd={(x) => x}>
      <Droppable droppableId="tabs-schema-edit" direction="horizontal">
        {(provided, snapshot) => (
          <div
            role="tablist"
            className="ui pointing secondary attached tabular menu"
            ref={provided.innerRef}
            {...provided.draggableProps}
          >
            <SchemaWidgetFieldsetComponent
              order={1}
              title="test"
              active={false}
              onOrderFieldset={(x) => x}
              onShowEditFieldset={(x) => x}
              onShowDeleteFieldset={(x) => x}
              onClick={(x) => x}
              getItemStyle={(x) => ({})}
              isDraggable={false}
              isDisabled={false}
            />
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>,
  );

  expect(container).toMatchSnapshot();
});
